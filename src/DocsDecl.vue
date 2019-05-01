<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>
          Docs vs. Declarations<h6 style="display: inline">
            (en&amp;&amp;src only for now, no zh||examples)
          </h6>
        </h1>
      </div>
    </div>
    <div class="row mb-5 justify-content-center">
      <div class="col">
        <vue-bootstrap-typeahead
          ref="search1"
          v-model="selectedRev1"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          placeholder="works: SHA, TODO: HEAD, <branch>, <PR id>"
          prepend="Revision 1"
        />
        <!-- <vue-bootstrap-typeahead
          ref="search1"
          v-model="revision1"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          placeholder="works: SHA, TODO: HEAD, <branch>, <PR id>"
          prepend="Revision 1"
          @hit="changeRevision1()"
        /> -->
      </div>
      <div class="col">
        <vue-bootstrap-typeahead
          ref="search2"
          v-model="selectedRev2"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          :disabled="secondRevDisabled"
          :placeholder="secondRevPlaceholder"
          prepend="Revision 2"
        />
        <!-- <vue-bootstrap-typeahead
          ref="search2"
          v-model="revision2"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          :disabled="secondRevDisabled"
          :placeholder="secondRevPlaceholder"
          prepend="Revision 2"
          @hit="changeRevision2()"
        /> -->
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
              type="text"
              placeholder="Type to filter files by name..."
            >
            <button
              type="button"
              class="form-control btn-sm"
              @click="query = ''"
            >
              Clear
            </button>
          </form>
        </div>
        <div
          id="files-container"
          class="row overflow-auto"
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
              class="list-group-item-action list-group-item d-flex justify-content-between align-items-center py-1"
              :value="f.raw"
              @mousedown="selectedFilename = f.raw"
            >
              <span v-html="f.markup" />
              <span
                v-if="diffCounter[ f.raw ]"
                :class="{ 'badge-light': filename === f.raw, 'badge-warning': filename !== f.raw }"
                class="badge btn-lg badge-pill"
              >{{ diffCounter[ f.raw ] }}</span>
            </button>
          </ul>
        </div>
      </div>

      <div
        v-if="content1[ filename ]"
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;max-width: 100%"
      >
        <WarningErrorMembers
          v-if="showDiffResults"
          :data="diffCurrent"
          :title="'Found in Diff from Rev1 to Rev2'"
        />
        <WarningErrorMembers
          :data="content1[ filename ]"
          :title="'found in Rev1'"
        />
        <WarningErrorMembers
          v-if="showRev2"
          :data="content2[ filename ]"
          :title="'found in Rev2'"
        />
      </div>
    </div>
  </div>
</template>

<script>

import VueBootstrapTypeahead from './components/VueBootstrapTypeahead.vue';
import WarningErrorMembers from './components/WarningErrorMembers.vue';
import * as justDiff from 'just-diff';

const API_URL = 'http://localhost:8855';


export default {

	name: 'DocsDecl',

	components: {
		VueBootstrapTypeahead,
		WarningErrorMembers
	},

	props: {
		'revision1': {
			type: String,
			default: ''
		},
		'revision2': {
			type: String,
			default: ''
		},
		'filename': {
			type: String,
			default: ''
		}
	},

	data: function () {

		return {
			query: '',

			content1: '',
			content2: '',

			// revision1: '',
			// revision2: '',
			selectedRev1: '',
			selectedRev2: '',
			revisions: [],

			// filename: '',
			selectedFilename: '',

			shortnameToTableCaption: {
				onlyDocs: 'Only in the docs',
				diff: 'In both files but with two (possibly) different types',
				onlyDecl: 'Only in the declaration file'
			}

		};

	},

	computed: {

		files1: function () {

			return Object.keys( this.content1 ) || [];

		},

		files2: function () {

			return Object.keys( this.content2 ) || [];

		},

		secondRevDisabled: function () {

			return ( this.revision1 ) ? false : true;

		},

		secondRevPlaceholder: function () {

			return ( this.revision1 ) ? "works: SHA, TODO: HEAD, <branch>, <PR id>" : "Please select revision 1 first";

		},

		showDiffResults: function () {

			if ( this.showRev2 &&
                this.diffCurrent &&
                this.content1[ this.filename ].error === false &&
                this.content2[ this.filename ].error === false
			)
				return true;

			return false;

		},

		showRev1: function () {

			if ( this.revision1 &&
                this.filename &&
                typeof this.content1[ this.filename ] !== 'undefined'
			)
				return true;

			return false;

		},

		showRev2: function () {

			if ( this.showRev1 &&
                this.revision2 &&
                typeof this.content2[ this.filename ] !== 'undefined'
			)
			    return true;

			return false;

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

			this.files1;
			this.content1;

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

		},

		diff: function () {

			this.revision1;
			this.revision2;
			this.content1;
			this.content2;

			if ( ! this.revision1 || ! this.revision2 )
				return [];

			if ( ! this.content1 || ! this.content2 )
				return [];

			return justDiff.diff( this.content1, this.content2 );

		},

		diffCurrent: function () {

			this.filename;
			this.content1;
			this.content2;
			this.diff;

			if ( this.filename ) {

				let copy = JSON.parse( JSON.stringify( this.content2[ this.filename ] ) );

				const current = this.diff.filter( patch => patch.path[ 0 ] === this.filename );

				console.log( 'Current: %o', current );

				// TODO: refactor all of this
				for ( const change of current ) {

					// /* const filecheck =  */change.path.shift();

					// if ( [ 'warning', 'error' ].includes( change.path[ 0 ] ) )
					// 	continue;

					if ( change.path[ 0 ] === 'diff' ) {

						const obj = this.content1[ this.filename ][ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] ||
                            this.content2[ this.filename ][ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ];

						const name = obj.decl.name;
						const declType = obj.decl.type;
						const docsType = obj.docs.type;

						// temp hack
						copy[ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] =
                            ( copy[ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] || "" ) +
							`<span class="bg-warning">[${change.op}]</span> ${name} (${declType} vs. ${docsType})<br>`;

					} else if ( change.op === 'remove' ) {

						const value = this.content1[ this.filename ][ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ];

						copy[ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] =
                            ( copy[ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] || "" ) +
									'<span class="bg-danger">[' + change.op + ']</span> ' + JSON.stringify( value ) + "<br>";

					} else {

						console.log( { change } );

						if ( [ 'warning', 'error' ].includes( change.path[ 1 ] ) ) {

							console.log( 'warning or error, ignore', change );

							continue;

						}

						copy[ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] =
                            ( copy[ change.path[ 1 ] ][ change.path[ 2 ] ][ change.path[ 3 ] ] || "" ) +
                            '<span class="bg-primary">[' + change.op + ']</span> ' + '<span class="text-break">' + JSON.stringify( change ) + "</span><br>";

					}

				}

				console.log( { copy } );

				return copy;

			} else {

				return {};

			}

		},

		diffCounter: function () {

			if ( ! this.diff || this.diff.length === 0 )
				return {};

			return this.diff.reduce( ( all, current ) => {

				const filename = current.path[ 0 ];

				all[ filename ] = all[ filename ] || 0;
				all[ filename ] ++;

				return all;

			}, {} );

		}

	},

	watch: {

		filename: function ( f ) {

			console.log( 'filename watcher', this.filename, f );

			if ( ! f || f.length === 0 ) {

				this.$router.push( { path: this.$route.fullPath } );

			} else {

				this.$router.push( { path: this.$route.fullPath, query: { filename: f } } );

			}

		},

		// selected first revision changed, update nagivation
		selectedRev1: function ( /* rev */ ) {

			if ( this.revision1 !== this.selectedRev1 ) {

				console.log( 'push to selected', this.selectedRev1, 'selected2/second', this.selectedRev2 || this.revision2, 'file', this.filename );

				let params;
				if ( this.revision2 && this.selectedRev1 ) params = { firstRev: this.selectedRev1, secondRev: this.revision2 };
				else if ( this.selectedRev1 ) params = { firstRev: this.selectedRev1 };
				else params = {};

				const query = ( this.filename && this.selectedRev1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'docsdecl',
					params, query
				} );

			}

		},

		// selected second revision changed, update nagivation
		selectedRev2: function ( /* rev */ ) {

			if ( this.revision2 !== this.selectedRev2 ) {

				console.log( 'push to first', this.revision1, 'selected2', this.selectedRev2, 'file', this.filename );

				const params = ( this.selectedRev2 && this.revision1 ) ? { firstRev: this.revision1, secondRev: this.selectedRev2 } : { firstRev: this.revision1 };
				const query = ( this.filename && this.revision1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'docsdecl',
					params, query
				} );

			}

		},

		// selected filename changed, update nagivation
		selectedFilename: function ( /* file */ ) {

			if ( this.filename !== this.selectedFilename ) {

				console.log( 'New file selected:', this.selectedFilename, 'old:', this.filename );

				let params;
				if ( this.revision2 ) params = { firstRev: this.revision1, secondRev: this.revision2 };
				else if ( this.revision1 ) params = { firstRev: this.revision1 };
				else params = {};

				const query = ( this.selectedFilename && this.revision1 ) ? { filename: this.selectedFilename } : {};

				this.$router.push( { name: 'docsdecl', params, query } );

			}

		},

		revision1: async function ( rev ) {

			this.selectedRev1 = this.revision1;

			console.log( 'revision1 watcher', rev );
			if ( rev && rev.length > 0 ) {

				if ( ! this.content1 || Object.keys( this.content1 ).length === 0 ) {

					this.content1 = { "Loading...": true };
					this.content1 = await this._fetchFilesOfRevision( this.revision1 );

				} else
					console.log( 'content1 already loaded' );

			} else {

				this.content1 = '';

			}

		},

		revision2: async function ( rev ) {

			this.selectedRev2 = this.revision2;

			console.log( 'revision2 watcher', rev );
			if ( rev && rev.length > 0 ) {

				if ( ! this.revision1 )
					console.error( '! this.revision1' );

				if ( ! this.content2 || Object.keys( this.content2 ).length === 0 ) {

					this.content2 = { "Loading...": true };
					this.content2 = await this._fetchFilesOfRevision( this.revision2 );

				} else
					console.log( 'content2 already loaded' );

			} else {

				this.content2 = '';

			}

		}

	},

	beforeRouteUpdate( to, from, next ) {

		console.log( { to } );

		// this.revision1 = to.params.firstRev || '';
		// this.revision2 = to.params.secondRev || '';
		// this.filename = ( to.query ) ? to.query.filename : '';

		next();

	},

	created() {

		this.pullRevisions();

		// this.$eventBus.$on( 'scrollme', this.scrollme ); // mounted()

		// if ( this.$route.params.firstRev ) {

		// this.revision1 = this.$route.params.firstRev;
		this.changeRevision1( false );

		// }

		// if ( this.$route.params.secondRev ) {

		// this.revision2 = this.$route.params.secondRev;
		this.changeRevision2( false );

		// }

		// if ( this.$route.query.filename ) {

		// this.filename = this.$route.query.filename;

		// }

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

			// this.filename = '';
			this.content1 = '';

			if ( this.revision1 ) {

				// initialise content
				this.content1 = await this._fetchFilesOfRevision( this.revision1 );

			} else {

				console.error( 'changeRevision1 > %o', this.revision1 );

			}

		},

		async changeRevision2() {

			this.content2 = '';

			if ( this.revision2 ) {

				// initialise content
				this.content2 = await this._fetchFilesOfRevision( this.revision2 );

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

			// this.revision1 = '';
			// this.revision2 = '';
			this.revisions = [];

			// this.filename = '';

			return fetch( `${API_URL}/ddd-viewer/revisions` )
				.then( res => res.json() )
				.then( revs => {

					revs.sort( ( a, b ) => a.localeCompare( b ) );
					this.revisions = revs;

					return true;

				} )
				.catch( err => console.error( err ) );

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
