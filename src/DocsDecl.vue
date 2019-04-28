<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>
          checks-lints-docs-decl-diff-viewer thingie<h6 style="display: inline">
            (en&amp;&amp;src only for now, no zh||examples)
          </h6>
        </h1>
      </div>
    </div>
    <div class="row mb-5 justify-content-center">
      <div class="col">
        <vue-bootstrap-typeahead
          ref="search1"
          v-model="revision1"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          placeholder="works: SHA, TODO: HEAD, <branch>, <PR id>"
          prepend="Revision 1"
          @hit="changeRevision1()"
        />
      </div>
      <div class="col">
        <vue-bootstrap-typeahead
          ref="search2"
          v-model="revision2"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          :disabled="secondRevActive"
          :placeholder="secondRevPlaceholder"
          prepend="Revision 2"
          @hit="changeRevision2()"
        />
      </div>
    </div>
    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <div
        v-if="revision1"
        class="h-100 d-flex flex-column align-items-center"
      >
        <div class="row">
          <form class="form-inline">
            <input
              v-model="query"
              class="form-control btn-sm"
              type="search"
              placeholder="Filename"
            >
            <button
              type="button"
              class="form-control btn-sm"
            >
              clear
            </button>
          </form>
        </div>
        <div
          id="files-container"
          class="row overflow-auto bg-warning"
        >
          <ul
            class="list-group list-group-flush bg-primary h-100"
            style="min-width: 440px"
          >
            <button
              v-for="( f, index ) in queryMatches"
              :ref="'entry-' + f.raw"
              :key="`${f.raw}-${index}`"
              type="button"
              :class="{ active: filename === f.raw, 'bg-danger text-white': content1[ f.raw ].error || false }"
              class="list-group-item-action list-group-item d-flex justify-content-between align-items-center"
              :value="f.raw"
              @mousedown="filename = f.raw"
            >
              <span v-html="f.markup" /><span
                v-if="counts[ f.raw ] > 0"
                :class="{ 'badge-light': filename === f.raw, 'badge-dark': filename !== f.raw }"
                class="badge btn-lg badge-pill"
              >{{ counts[ f.raw ] }}</span>
            </button>
          </ul>
        </div>
      </div>

      <div class="col-9 flex-fill overflow-auto h-100 ml-4 pl-0">
        <template v-if="typeof content1[ filename ] !== 'undefined'">
          <template v-if="content1[ filename ].warning">
            <div
              class="alert alert-warning"
              role="alert"
            >
              <strong>WARNING</strong><br>{{ content1[ filename ].warning }}
            </div>
          </template>

          <template v-if="content1[ filename ].error">
            <div
              class="alert alert-danger"
              role="alert"
            >
              <strong>WORKER ERROR</strong><br>{{ content1[ filename ].error }}
            </div>
          </template>

          <template v-else>
            <!--             <MemberDiff
              :content-obj="content1[ filename ]"
              :translation-table="shortnameToTableCaption"
              title="Properties"
              member-name="properties"
            />
            <MemberDiff
              :content-obj="content1[ filename ]"
              :translation-table="shortnameToTableCaption"
              title="Methods"
              member-name="methods"
            /> -->
            <WarningErrorMembers
              v-if="typeof content1[ filename ] !== 'undefined'"
              :data="content1[ filename ]"
              :title="'Rev1'"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import VueBootstrapTypeahead from './components/VueBootstrapTypeahead.vue';
import WarningErrorMembers from './components/WarningErrorMembers.vue';

const API_URL = 'http://localhost:8855';


export default {

	name: 'DocsDecl',

	components: {
		VueBootstrapTypeahead,
		WarningErrorMembers
	},

	data: function () {

		return {
			query: '',

			content1: '',
			content2: '',

			revision1: '',
			revision2: '',
			revisions: [],

			files1: [],
			files2: [],
			filename: '',

			shortnameToTableCaption: {
				onlyDocs: 'Only in the docs',
				diff: 'Appears in both but with two (possibly) different types',
				onlyDecl: 'Only in the declaration file'
			}

		};

	},

	computed: {

		secondRevActive: function () {

			return ( this.revision1 ) ? false : true;

		},

		secondRevPlaceholder: function () {

			return ( this.revision1 ) ? "works: SHA, TODO: HEAD, <branch>, <PR id>" : "Please select revision 1 first";

		},

		queryMatches: function () {

			if ( this.query.length > 0 )
				return this.files1
					.filter( name => name.toLowerCase().includes( this.query.toLowerCase() ) )
					.map( name => ( { raw: name, markup: name.replace( new RegExp( '(' + this.query + ')', 'gi' ), '<b>$1</b>' ) } ) );
			else
				return this.files1.map( name => ( { raw: name, markup: name } ) );

		},

		counts: function () {

			if ( this.files1.length > 0 ) {

				return this.files1.reduce( ( all, cur ) => {

					const differentName =
						this.content1[ cur ].onlyDocs.methods.length +
						this.content1[ cur ].onlyDocs.properties.length +
						this.content1[ cur ].onlyDecl.methods.length +
						this.content1[ cur ].onlyDecl.properties.length;

					const differentType = this.content1[ cur ].diff.methods.length + this.content1[ cur ].diff.properties.length;

					all[ cur ] = differentName + differentType;

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

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/ddd-viewer/showFile/${rev}` )
				.then( res => res.json() )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

		},

		_pushHistory() {

			if ( ! this.revision1 ) {

				console.error( `Can't commit to history without revision1` );
				return false;

			}

			const params = ( this.revision2 ) ? { firstRev: this.revision1, secondRev: this.revision2 } : { firstRev: this.revision1 };

			this.$router.push( { name: 'docsdecl', params } );

			return true;

		},

		async changeRevision1() {

			this.files1 = [];
			this.filename = '';

			this.content1 = '';

			if ( this.revision1 ) {

				// add new revision to history
				this._pushHistory();

				// initialise content
				this.content1 = await this._fetchFilesOfRevision( this.revision1 );
				this.files1 = Object.keys( this.content1 );

			} else {

				console.error( 'changeRevision1 > %o', this.revision1 );

			}

		},

		async changeRevision2() {

			this.files2 = [];
			this.content2 = '';

			if ( this.revision2 ) {

				// add new revision to history
				this._pushHistory();

				// initialise content
				this.content2 = await this._fetchFilesOfRevision( this.revision2 );
				this.files2 = Object.keys( this.content2 );

			} else {

				console.error( 'changeRevision2 > %o', this.revision2 );

			}

		},
		/* 		loadFile( sha ) {

			// return fetch( `https://raw.githubusercontent.com/mrdoob/three.js/${sha}/${filename}` )
			return fetch( `${API_URL}/ddd-viewer/showFile/${sha}` )
				.then( res => res.json() )
				.then( content => {

					console.log( content );

					return content;

				} )
				.catch( err => console.error( 'loadFile', sha, err ) );

		}, */

		pullRevisions() {

			this.revision1 = '';
			this.revision2 = '';
			this.revisions = [];

			this.filename = '';

			return fetch( `${API_URL}/ddd-viewer/revisions` )
				.then( res => res.json() )
				.then( revs => {

					revs.sort( ( a, b ) => a.localeCompare( b ) );
					this.revisions = revs;

					return true;

				} )
				.catch( err => console.error( err ) );

		},
		/*
		changeRevision() {

			this.files = [];

			this.filename = '';
			this.content = '';
			this.annotations = [];

			if ( this.revision ) {

				return fetch( `${API_URL}/ddd-viewer/showFile/${this.revision}` )
					.then( res => res.json() )
					.then( content => {

						this.content = content;

						this.files = Object.keys( content );

						// const VBT = Vue.extend( VueBootstrapTypeahead );
						// const instance = new VBT( {
						// 	propsData: {
						// 		data: [ '1', '2', '3' ],
						// 		minMatchingChars: 0,
						// 		maxMatches: 3,
						// 		size: "sm",
						// 		placeholder: "",
						// 		prepend: "Filename"
						// 	}
						// } );
						// instance.$mount( '#files-container' );

						return content;

					} )
					.catch( err => console.error( err ) );

			} else {

				console.error( 'changeRevision > %o', this.revision );

			}

		}, */

		scrollToMe: function ( ) {

			this.$refs[ 'entry-' + this.filename ][ 0 ].scrollIntoView( { behavior: "smooth", block: "center" } );

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
