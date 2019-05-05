<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>
          Test with TypeScript compiler<h6 class="d-inline">
            TODO add more details
          </h6>
        </h1>
      </div>
    </div>
    <div class="row mb-5 justify-content-center">
      <div class="col-6">
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
        <vue-bootstrap-typeahead
          ref="search2"
          v-model="selectedRev2"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          :disabled="true"
          :placeholder="'TODO'"
          prepend="Revision 2"
        />
      </div>
      <div class="col">
        <div class="form-check form-check-inline">
          <input
            id="radioShowAll"
            v-model="radioShow"
            class="form-check-input"
            type="radio"
            value="all"
            checked
          >
          <label
            class="form-check-label"
            for="radioShowAll"
          >
            Show all
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="radioShowDiffs"
            v-model="radioShow"
            class="form-check-input"
            type="radio"
            value="diffs"
            disabled
          >
          <label
            class="form-check-label"
            for="radioShowDiffs"
          >
            Show only differences
          </label>
        </div>
      </div>
    </div>
    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <div
        v-if="revision1 && content1"
        class="h-100 d-flex flex-column align-items-center"
      >
        <div class="row">
          <div class="input-group mb-1 input-group-sm">
            <div class="input-group-prepend">
              <span class="input-group-text">Filename</span>
            </div>
            <input
              v-model="query"
              type="search"
              class="form-control"
              placeholder="Type to filter by name"
            >
          </div>
        </div>
        <div
          id="files-container"
          class="row overflow-auto border h-100"
        >
          <ul
            class="list-group list-group-flush h-100"
            style="min-width: 440px"
          >
            <button
              v-for="( f, index ) in queryMatches"
              :ref="'entry-' + f.raw"
              :key="`${f.raw}-${index}`"
              type="button"
              :class="{ active: filename === f.raw }"
              class="list-group-item-action list-group-item d-flex justify-content-between align-items-center py-1"
              :value="f.raw"
              @mousedown="selectedFilename = f.raw"
            >
              <span v-html="f.markup" />
              <span
                v-if="diffCounter[ f.raw ]"
                :class="{ 'badge-light': filename === f.raw }"
                class="badge btn-lg badge-pill bg-warning"
              >{{ diffCounter[ f.raw ] }}</span>
            </button>
          </ul>
        </div>
      </div>

      <div
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <template
          v-if="showDiffResults && false"
        >
          <h4 class="text-center">
            Diff of Rev1 -> Rev2
          </h4>
          <DataTable
            :header-fields="tableHeaders"
            :data="tableDiff"
            :css="tableCss"
          />
        </template>
        <template
          v-if="tableData1"
        >
          <h4 class="text-center">
            Revision 1
          </h4>
          <DataTable
            :header-fields="tableHeaders"
            :data="tableData1"
            :css="tableCss"
          />
        </template>
        <template
          v-if="showRev2"
        >
          <h4 class="text-center">
            Revision 2
          </h4>
          <DataTable
            :header-fields="tableHeaders"
            :data="tableData2"
            :css="tableCss"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import { DataTable } from 'v-datatable-light';
import VueBootstrapTypeahead from './components/VueBootstrapTypeahead.vue';
import * as justDiff from 'just-diff';

const API_URL = 'http://localhost:8855';


export default {

	name: 'CheckWithTS',

	components: {
		VueBootstrapTypeahead,
		DataTable
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

			radioShow: 'all',

			content1: '',
			content2: '',

			selectedRev1: '',
			selectedRev2: '',
			revisions: [],

			selectedFilename: '',

			tableCss: {
				table: 'table table-bordered table-hover table-striped table-center w-100',
				th: 'header-item',
				thWrapper: 'th-wrapper',
				thWrapperCheckboxes: 'th-wrapper checkboxes',
				arrowsWrapper: 'arrows-wrapper',
				arrowUp: 'arrow up',
				arrowDown: 'arrow down',
				footer: 'footer'
			},

			tableHeaders: [ {
				name: 'line', label: 'Line'
			}, {
				name: 'message', label: 'Message'
			}, {
				name: 'code', label: 'Code'
			} ]

		};

	},

	computed: {

		tableData1: function () {

			if ( this.content1 && this.filename ) {

				return [
					...Object.values( this.content1.js[ this.filename ] || {} ),
					...Object.values( this.content1.dts[ this.filename ] || {} )
				];

			} else {

				return [];

			}

		},

		tableData2: function () {

			if ( this.content2 && this.filename ) {

				return [
					...Object.values( this.content2.js[ this.filename ] || {} ),
					...Object.values( this.content2.dts[ this.filename ] || {} )
				];

			} else {

				return [];

			}

		},

		tableDiff: function () {

			if ( this.diffCurrent && this.filename ) {

				return this.diffCurrent;

			} else {

				return [];

			}

		},

		files1: function () {

			if ( this.content1 && this.content1.js && this.content1.dts ) {

				const uniques = new Set( [ ...Object.keys( this.content1.js ), ...Object.keys( this.content1.dts ) ] );

				return [ ...uniques ];

			} else {

				return [];

			}

		},

		files2: function () {

			if ( this.content2 && this.content2.js && this.content2.dts ) {

				const uniques = new Set( [ ...Object.keys( this.content2.js ), ...Object.keys( this.content2.dts ) ] );

				return [ ...uniques ];

			} else {

				return [];

			}

		},

		selectionShowAll: function () {

			return this.radioShow === 'all';

		},

		selectionShowDiffs: function () {

			return this.radioShow === 'diffs';

		},

		secondRevDisabled: function () {

			return ( this.revision1 ) ? false : true;

		},

		secondRevPlaceholder: function () {

			return ( this.revision1 ) ? "works: SHA, TODO: HEAD, <branch>, <PR id>" : "Please select revision 1 first";

		},

		showDiffResults: function () {

			if ( this.showRev2 &&
                this.diffCurrent
			)
				return true;

			return false;

		},

		showRev1: function () {

			if ( this.revision1 &&
                this.filename &&
				this.content1 &&
                ( typeof this.content1[ 'js' ][ this.filename ] !== 'undefined' || typeof this.content1[ 'dts' ][ this.filename ] !== 'undefined' )
			)
				return true;

			return false;

		},

		showRev2: function () {

			if ( this.showRev1 &&
                this.revision2 &&
				this.content2 &&
				( typeof this.content2[ 'js' ] !== 'undefined' && typeof this.content2[ 'dts' ] !== 'undefined' ) &&
				( typeof this.content2[ 'js' ][ this.filename ] !== 'undefined' || typeof this.content2[ 'dts' ][ this.filename ] !== 'undefined' )
			)
			    return true;

			return false;

		},

		queryMatches: function () {

			// first: apply query filter
			let matches;
			if ( this.query.length > 0 ) {

				matches = this.files1

					// filter by actual matches (case insensitive)
					.filter( name => name.toLowerCase().includes( this.query.toLowerCase() ) )

					// highlight query-hits
					.map( name => ( { raw: name, markup: name.replace( new RegExp( '(' + this.query + ')', 'gi' ), '<b>$1</b>' ) } ) );

			} else {

				// or don't, just adapt to expected format
				matches = this.files1.map( name => ( { raw: name, markup: name } ) );

			}


			// then: filter by "Show $foo" choice
			return matches

				// if "Show only differences" is selected, filter out all non-diffs
				.filter( entry => {

					if ( this.selectionShowDiffs ) {

						if ( this.diffCounter[ entry.raw ] > 0 )
							return true;
						else
							return false;

					}

					return true;

				} );

		},

		diff: function () {

			if ( this.revision1 &&
				this.revision2 &&
				this.content1 && typeof this.content1[ 'js' ] !== 'undefined' && typeof this.content1[ 'dts' ] !== 'undefined' &&
				this.content2 && typeof this.content2[ 'js' ] !== 'undefined' && typeof this.content2[ 'dts' ] !== 'undefined'
			)
				return justDiff.diff( this.content1, this.content2 );

			return [];

		},

		diffCurrent: function () {

			this.filename;
			this.content1;
			this.content2;
			this.diff;

			if ( this.filename ) {

				// let copy = JSON.parse( JSON.stringify( this.content2.js[ this.filename ] ) );
				let copy = [];
				if ( this.content2.js && this.content2.js[ this.filename ] )
					copy = copy.concat( this.content2.js[ this.filename ] );
				if ( this.content2.dts && this.content2.dts[ this.filename ] )
					copy = copy.concat( this.content2.dts[ this.filename ] );

				const current = this.diff.filter( patch => patch.path[ 1 ] === this.filename );

				console.log( 'Current: %o', current );

				// TODO: refactor all of this
				for ( const change of current ) {

					// /* const filecheck =  */change.path.shift();

					// if ( [ 'warning', 'error' ].includes( change.path[ 0 ] ) )
					// 	continue;

					// if ( change.path[ 0 ] === 'diff' ) {

						/* const obj = this.content1[ this.filename ][ change.path[ 2 ] ][ change.path[ 3 ] ] ||
                            this.content2[ this.filename ][ change.path[ 2 ] ][ change.path[ 3 ] ];

						// temp hack
						copy[ change.path[ 2 ] ][ change.path[ 3 ] ] =
                            ( copy[ change.path[ 2 ] ][ change.path[ 3 ] ] || "" ) +
							`<span class="bg-warning">[${change.op}]</span> ${name} (${declType} vs. ${docsType})<br>`;

					} else if ( change.op === 'remove' ) {

						const value = this.content1[ this.filename ][ change.path[ 2 ] ][ change.path[ 3 ] ];

						copy[ change.path[ 2 ] ][ change.path[ 3 ] ] =
                            ( copy[ change.path[ 2 ] ][ change.path[ 3 ] ] || "" ) +
									'<span class="bg-danger">[' + change.op + ']</span> ' + JSON.stringify( value ) + "<br>";

					} else  {*/

						copy[ change.path[ 2 ] ][ change.path[ 3 ] ] =
                            ( copy[ change.path[ 2 ] ][ change.path[ 3 ] ] || "" ) +
                            '<span class="bg-primary">[' + change.op + ']</span> ' + '<span class="text-break">' + JSON.stringify( change ) + "</span><br>";

					// }

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

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content1 ).includes( 'Loading...' ) || Object.keys( this.content2 ).includes( 'Loading...' ) )
				return {};

			return this.diff.reduce( ( all, current ) => {

				const filename = current.path[ 1 ]; // path[0] === 'js' || 'dts'

				all[ filename ] = all[ filename ] || 0;
				all[ filename ] ++;

				return all;

			}, {} );

		}

	},

	watch: {

		// selected first revision changed, update nagivation
		selectedRev1: function ( /* rev */ ) {

			if ( this.revision1 !== this.selectedRev1 ) {

				let params;
				if ( this.revision2 && this.selectedRev1 ) params = { firstRev: this.selectedRev1, secondRev: this.revision2 };
				else if ( this.selectedRev1 ) params = { firstRev: this.selectedRev1 };
				else params = {};

				const query = ( this.filename && this.selectedRev1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'checkWithTS',
					params, query
				} );

			}

		},

		// selected second revision changed, update nagivation
		selectedRev2: function ( /* rev */ ) {

			if ( this.revision2 !== this.selectedRev2 ) {

				const params = ( this.selectedRev2 && this.revision1 ) ? { firstRev: this.revision1, secondRev: this.selectedRev2 } : { firstRev: this.revision1 };
				const query = ( this.filename && this.revision1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'checkWithTS',
					params, query
				} );

			}

		},

		// selected filename changed, update nagivation
		selectedFilename: function ( /* file */ ) {

			if ( this.filename !== this.selectedFilename ) {

				let params;
				if ( this.revision2 && this.revision1 ) params = { firstRev: this.revision1, secondRev: this.revision2 };
				else if ( this.revision1 ) params = { firstRev: this.revision1 };
				else params = {};

				const query = ( this.selectedFilename && this.revision1 ) ? { filename: this.selectedFilename } : {};

				this.$router.push( { name: 'checkWithTS', params, query } );

			}

		},

		revision1: async function ( rev ) {

			this.selectedRev1 = this.revision1;

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

	created() {

		this.pullRevisions();

		this.selectedRev1 = this.revision1;
		this.selectedRev2 = this.revision2;
		this.selectedFilename = this.filename;

		this.changeRevision1();
		this.changeRevision2();

	},

	methods: {

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/checkWithTS/showFile/${rev}` )
				.then( res => res.json() )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

		},

		async changeRevision1() {

			this.content1 = '';

			if ( this.revision1 ) {

				// initialise content
				this.content1 = await this._fetchFilesOfRevision( this.revision1 );

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

			}

		},

		pullRevisions() {

			this.revisions = [];

			return fetch( `${API_URL}/checkWithTS/revisions` )
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

<style>
#content { height: 100%; overflow: hidden }
#content.row {
    height: 100%;
	overflow: auto;
}

/* Datatable CSS */
.v-datatable-light {
  width: 1167px;
}
.v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}
.v-datatable-light .header-item:hover {
  color: #ed9b19;
}
.v-datatable-light .header-item.no-sortable{
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}
.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}
.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}
.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}
.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}
.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
}
.v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}
.v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}
.v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}
.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}

/* End Datatable CSS */

</style>
