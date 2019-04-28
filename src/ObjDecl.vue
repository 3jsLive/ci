<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>checks-lints-object-decl-diff-viewer thingie</h1>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-3">
        <!-- <select class="small" v-model="revision" @change="changeRevision()">
					<option v-for="r in revisions" :value="r" :key="r">{{ r }}</option>
				</select> -->
        <vue-bootstrap-typeahead
          v-model="revision"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          placeholder="works: SHA, TODO: HEAD, <branch>, <PR id>"
          prepend="Revision"
          @hit="changeRevision()"
        />
      </div>
    </div>

    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <div
        class="col-3 flex-fill"
        style="height: 100%; overflow: auto;"
      >
        <!-- <form class="form-inline mx-5 mt-5 mb-2 w100">
					<input class="form-control" v-model="query" @change="updateQuery()" type="text" placeholder="Filename">
				</form> -->
        <ul class="list-group list-group-flush">
          <button
            v-for="( f, index ) in files"
            :ref="'entry-' + f"
            :key="`${f}-${index}`"
            type="button"
            :class="{ active: filename === f, 'bg-danger text-white': content[ f ].error || false, 'bg-warning': content[ f ].warning || false }"
            class="list-group-item-action list-group-item d-flex justify-content-between align-items-center"
            :value="f"
            @mousedown="clickItem( f )"
          >
            {{ f }}<span
              v-if="counts[ f ] > 0"
              class="badge badge-dark badge-pill"
            >{{ counts[ f ] }}</span>
          </button>
        </ul>
      </div>

      <div
        class="col-9 flex-fill"
        style="height: 100%; overflow: auto;"
      >
        <template v-if="typeof content[filename] !== 'undefined' && ! content[ filename ].error">
          <h4 class="text-center">
            Members
          </h4>
          <div class="d-flex">
            <table class="table m-2">
              <thead class="thead-light">
                <tr>
                  <th class="text-center">
                    Only on the object
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="( entry, index ) in instanceProps">
                  <tr :key="`${JSON.stringify( entry )}-${index}`">
                    <td align="center">
                      {{ entry.name }}<span
                        v-if="entry.legacy"
                        class="ml-1 badge badge-pill badge-warning"
                      >LEGACY</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>

            <table class="table m-2">
              <thead class="thead-light">
                <tr>
                  <th class="text-center">
                    Only in the declaration file
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="( entry, index ) in declProps">
                  <tr :key="`${JSON.stringify( entry )}-${index}`">
                    <td align="center">
                      {{ entry.name }}<span
                        v-if="entry.legacy"
                        class="ml-1 badge badge-pill badge-warning"
                      >LEGACY</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div
            v-if="showLegacy"
            class="row"
          >
            <div class="col">
              <span class="badge badge-pill badge-warning">LEGACY</span>: This member is referenced in <code>Three.Legacy.js</code>, likely a false positive
            </div>
          </div>
        </template>

        <template v-else-if="typeof content[filename] !== 'undefined' && content[ filename ].error">
          <div
            class="alert alert-danger"
            role="alert"
          >
            <strong>WORKER ERROR</strong><br>{{ content[ filename ].error }}
          </div>
          <pre>Debug: {{ content[ filename ] }}</pre>
        </template>

        <template v-if="typeof content[filename] !== 'undefined' && content[ filename ].warning">
          <div
            class="alert alert-warning"
            role="alert"
          >
            <strong>WARNING</strong><br>{{ content[ filename ].warning }}
          </div>
          <pre>Debug: {{ content[ filename ] }}</pre>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import VueBootstrapTypeahead from './components/VueBootstrapTypeahead.vue';

const API_URL = 'http://localhost:8855';


export default {

	name: 'ObjDecl',

	components: {
		VueBootstrapTypeahead
	},

	data: function () {

		return {
			query: '',
			content: '',
			revision: '',
			revisions: [],

			files: [],
			filename: ''
		};

	},

	computed: {

		queryMatches: function () {

			if ( this.query.length > 0 )
				return this.files
					.filter( name => name.includes( this.query ) )
					.map( name => name.replace( this.query, '___' + this.query + '___' ) );
			else
				return this.files;

		},

		instanceProps: function () {

			let res = [];
			for ( const klass in this.content[ this.filename ] ) {

				const extendedNames = this.content[ this.filename ][ klass ].onlySource.properties.map( prop => {

					return { name: klass + '.' + prop.name, legacy: prop.legacy };

				} );

				res = res.concat( extendedNames );

			}
			return res;

		},

		declProps: function () {

			let res = [];
			for ( const klass in this.content[ this.filename ] ) {

				const extendedNames = this.content[ this.filename ][ klass ].onlyDecl.properties.map( prop => {

					return { name: klass + '.' + prop.name, legacy: prop.legacy };

				} );

				res = res.concat( extendedNames );

			}
			return res;

		},

		showLegacy: function () {

			return this.declProps.some( x => x.legacy === true ) || this.instanceProps.some( x => x.legacy === true );

		},

		counts: function () {

			if ( this.files.length > 0 ) {

				return this.files.reduce( ( all, cur ) => {

					const count = Object.keys( this.content[ cur ] ).reduce( ( all, klass ) => {

						if ( ! this.content[ cur ][ klass ].onlySource || ! this.content[ cur ][ klass ].onlyDecl )
							return all;

						if ( ! this.content[ cur ][ klass ].onlySource.methods || ! this.content[ cur ][ klass ].onlyDecl.methods ||
							! this.content[ cur ][ klass ].onlySource.properties || ! this.content[ cur ][ klass ].onlyDecl.properties )
							return all;

						all +=
							this.content[ cur ][ klass ].onlySource.methods.length +
							this.content[ cur ][ klass ].onlySource.properties.length +
							this.content[ cur ][ klass ].onlyDecl.methods.length +
							this.content[ cur ][ klass ].onlyDecl.properties.length;

						return all;

					}, 0 );

					all[ cur ] = count;

					return all;

				}, {} );

			}

			return {};

		}

	},

	mounted() {

		this.pullRevisions();

		this.$eventBus.$on( 'scrollme', this.scrollme );

	},

	methods: {

		loadFile( sha ) {

			// return fetch( `https://raw.githubusercontent.com/mrdoob/three.js/${sha}/${filename}` )
			return fetch( `${API_URL}/odd-viewer/showFile/${sha}` )
				.then( res => res.json() )
				.then( content => {

					console.log( content );

					return content;

				} )
				.catch( err => console.error( 'loadFile', sha, err ) );

		},

		pullRevisions() {

			this.revision = '';
			this.revisions = [];

			this.filename = '';

			return fetch( `${API_URL}/odd-viewer/revisions` )
				.then( res => res.json() )
				.then( revs => {

					revs.sort( ( a, b ) => a.localeCompare( b ) );
					this.revisions = revs;

					return true;

				} )
				.catch( err => console.error( err ) );

		},

		changeRevision() {

			this.files = [];

			this.filename = '';
			this.content = '';
			this.annotations = [];

			if ( this.revision ) {

				return fetch( `${API_URL}/odd-viewer/showFile/${this.revision}` )
					.then( res => res.json() )
					.then( content => {

						this.content = content;

						this.files = Object.keys( content );

						return content;

					} )
					.catch( err => console.error( err ) );

			} else {

				console.error( 'changeRevision > %o', this.revision );

			}

		},

		scrollToMe: function ( ) {

			this.$refs[ 'entry-' + this.filename ][ 0 ].scrollIntoView( { behavior: "smooth", block: "center" } );

		},

		clickItem: function ( file ) {

			this.filename = file;

		}

	}
};
</script>

<style scoped>
#content { height: 100%; overflow: hidden }
#content.row {
    height: 100%;
	overflow: auto;
}
</style>
