<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>
          DoobsDoc linter
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
          @hit="updateRev1()"
        />
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
          @hit="updateRev2()"
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
                :class="[{ 'badge-light': filename === f.raw }, diffCounter[ f.raw ].class ]"
                class="badge btn-lg badge-pill"
              >{{ diffCounter[ f.raw ].text }}</span>
            </button>
          </ul>
        </div>
      </div>

      <div
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <template
          v-if="showDiffResults"
        >
          <h4 class="text-center">
            Diff of Rev1 -> Rev2
          </h4>
          <DataTable
            :header-fields="tableHeadersDiff"
            :data="tableDiff"
            :css="tableCss"
            :sort-field="sortFieldDiff"
            :sort="sortDirDiff"
            @onUpdate="dtUpdateSortDiff"
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
            :sort-field="sortField1"
            :sort="sortDir1"
            @onUpdate="dtUpdateSort1"
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
            :sort-field="sortField2"
            :sort="sortDir2"
            @onUpdate="dtUpdateSort2"
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

	name: 'LinterDoobsDoc',

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

			sortField1: 'line',
			sortDir1: 'asc',
			sortField2: 'line',
			sortDir2: 'asc',
			sortFieldDiff: 'line',
			sortDirDiff: 'asc',

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
				name: 'line', label: 'Line', sortable: true
			}, {
				name: 'level', label: 'Level', sortable: true
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'ruleId', label: 'RuleId', sortable: true
			} ],

			tableHeadersDiff: [ {
				name: 'op', 'label': '', sortable: false,
			}, {
				name: 'line', label: 'Line', sortable: true
			}, {
				name: 'level', label: 'Level', sortable: true
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'ruleId', label: 'RuleId', sortable: true
			} ]

		};

	},

	computed: {

		tableData1: function () {

			if ( this.content1 && this.filename ) {

				const data = this.content1[ this.filename ] || [];

				if ( this.sortField1 === 'message' || this.sortField1 === 'level' ) {

					return ( this.sortDir1 === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField1 ].localeCompare( b[ this.sortField1 ] ) )
						:
						data.sort( ( a, b ) => b[ this.sortField1 ].localeCompare( a[ this.sortField1 ] ) );

				} else {

					return ( this.sortDir1 === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField1 ] - b[ this.sortField1 ] )
						:
						data.sort( ( a, b ) => b[ this.sortField1 ] - a[ this.sortField1 ] );

				}

			} else {

				return [];

			}

		},

		tableData2: function () {

			if ( this.content2 && this.filename ) {

				const data = this.content2[ this.filename ] || [];

				if ( this.sortField2 === 'message' || this.sortField2 === 'level' ) {

					return ( this.sortDir2 === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField2 ].localeCompare( b[ this.sortField2 ] ) )
						:
						data.sort( ( a, b ) => b[ this.sortField2 ].localeCompare( a[ this.sortField2 ] ) );

				} else {

					return ( this.sortDir2 === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField2 ] - b[ this.sortField2 ] )
						:
						data.sort( ( a, b ) => b[ this.sortField2 ] - a[ this.sortField2 ] );

				}

			} else {

				return [];

			}

		},

		tableDiff: function () {

			if ( this.diffCurrent ) {

				const data = this.diffCurrent;

				if ( this.sortFieldDiff === 'message' || this.sortFieldDiff === 'level' ) {

					return ( this.sortDirDiff === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortFieldDiff ].localeCompare( b[ this.sortFieldDiff ] ) )
						:
						data.sort( ( a, b ) => b[ this.sortFieldDiff ].localeCompare( a[ this.sortFieldDiff ] ) );

				} else {

					return ( this.sortDirDiff === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortFieldDiff ] - b[ this.sortFieldDiff ] )
						:
						data.sort( ( a, b ) => b[ this.sortFieldDiff ] - a[ this.sortFieldDiff ] );

				}

			} else {

				return [];

			}

		},

		files1: function () {

			return ( this.content1 ) ? Object.keys( this.content1 ).sort() : [];

		},

		files2: function () {

			return ( this.content2 ) ? Object.keys( this.content2 ).sort() : [];

		},

		filesAll: function () {

			if ( this.files1 && this.files2 )
				return this.files1.concat( this.files2 ).filter( ( el, i, arr ) => arr.indexOf( el ) === i ).sort();
			else if ( this.files1 )
				return this.files1;
			else if ( this.files2 )
				return this.files2;
			else
				return [];

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
				this.content1
			)
				return true;

			return false;

		},

		showRev2: function () {

			if ( this.showRev1 &&
                this.revision2 &&
				this.content2
			)
			    return true;

			return false;

		},

		queryMatches: function () {

			let matches;

			// first: apply query filter
			if ( this.query.length > 0 ) {

				matches = this.filesAll

					// filter by actual matches (case insensitive)
					.filter( name => name.toLowerCase().includes( this.query.toLowerCase() ) )

					// highlight query-hits
					.map( name => ( { raw: name, markup: name.replace( new RegExp( '(' + this.query + ')', 'gi' ), '<b>$1</b>' ) } ) );

			} else {

				// or don't, just adapt to expected format
				matches = this.filesAll.map( name => ( { raw: name, markup: name } ) );

			}


			// then: filter by "Show $foo" choice
			return matches

				// if "Show only differences" is selected, filter out all non-diffs
				.filter( entry => {

					if ( this.selectionShowDiffs ) {

						if ( this.diffCounter[ entry.raw ] )
							return true;
						else
							return false;

					}

					return true;

				} );

		},

		diffCurrent: function () {

			this.filename;
			this.content1;
			this.content2;

			return this.customDiff( this.filename );

		},

		diffCounter: function () {

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content1 ).includes( 'Loading...' ) || Object.keys( this.content2 ).includes( 'Loading...' ) )
				return {};

			return this.filesAll.reduce( ( all, file ) => {

				const diff = this.customDiff( file );

				const changes = diff.filter( patch => patch.op !== 'copy' ).length;

				if ( diff.length === 1 && diff[ 0 ].op === 'new' ) {

					all[ file ] = { text: 'add', class: 'diff-new' };

				} else if ( diff.length === 1 && diff[ 0 ].op === 'deleted' ) {

					all[ file ] = { text: 'del', class: 'diff-deleted' };

				} else if ( changes === 0 ) {

					// all[ file ] = { text: '', class: 'diff-null' };
					return all;

				} else {

					all[ file ] = { text: changes, class: 'diff-edited' };

				}

				return all;

			}, {} );

		}

	},

	watch: {

		// selected first revision changed, update nagivation
		selectedRev1: function ( /* rev */ ) {

			// TODO: simplify because of === ''
			if ( this.selectedRev1 === '' && this.revision1 !== this.selectedRev1 ) {

				let params;
				if ( this.revision2 && this.selectedRev1 ) params = { firstRev: this.selectedRev1, secondRev: this.revision2 };
				else if ( this.selectedRev1 ) params = { firstRev: this.selectedRev1 };
				else params = {};

				const query = ( this.filename && this.selectedRev1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'linterDoobsDoc',
					params, query
				} );

			}

		},

		// selected second revision changed, update nagivation
		selectedRev2: function ( /* rev */ ) {

			// TODO: simplify because of === ''
			if ( this.selectedRev2 === '' && this.revision2 !== this.selectedRev2 ) {

				const params = ( this.selectedRev2 && this.revision1 ) ? { firstRev: this.revision1, secondRev: this.selectedRev2 } : { firstRev: this.revision1 };
				const query = ( this.filename && this.revision1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'linterDoobsDoc',
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

				this.$router.push( { name: 'linterDoobsDoc', params, query } );

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

		updateRev1: function () {

			if ( this.revision1 !== this.selectedRev1 ) {

				let params;
				if ( this.revision2 && this.selectedRev1 ) params = { firstRev: this.selectedRev1, secondRev: this.revision2 };
				else if ( this.selectedRev1 ) params = { firstRev: this.selectedRev1 };
				else params = {};

				const query = ( this.filename && this.selectedRev1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'linterDoobsDoc',
					params, query
				} );

			}

		},

		updateRev2: function () {

			if ( this.revision2 !== this.selectedRev2 ) {

				const params = ( this.selectedRev2 && this.revision1 ) ? { firstRev: this.revision1, secondRev: this.selectedRev2 } : { firstRev: this.revision1 };
				const query = ( this.filename && this.revision1 ) ? { filename: this.filename } : {};

				this.$router.push( {
					name: 'linterDoobsDoc',
					params, query
				} );

			}

		},

		// TODO: refactor into one
		dtUpdateSort1: function ( { sortField, sort } ) {

			this.sortField1 = sortField;
			this.sortDir1 = sort;

		},

		dtUpdateSort2: function ( { sortField, sort } ) {

			this.sortField2 = sortField;
			this.sortDir2 = sort;

		},

		dtUpdateSortDiff: function ( { sortField, sort } ) {

			this.sortFieldDiff = sortField;
			this.sortDirDiff = sort;

		},

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/linterDoobsDoc/showFile/${rev}` )
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

			}

		},

		pullRevisions() {

			this.revisions = [];

			return fetch( `${API_URL}/linterDoobsDoc/revisions` )
				.then( res => res.json() )
				.then( revs => {

					revs.sort( ( a, b ) => a.localeCompare( b ) );
					this.revisions = revs;

					return true;

				} )
				.catch( err => console.error( err ) );

		},

		customDiff( filename ) {

			// filename is non-negotionable
			if ( ! filename )
				throw new Error( 'customDiff called without filename' );

			// might have been called too early
			if ( ! this.content1 || ! this.content2 )
				return [];

			if ( ! ( filename in this.content1 ) )
				return [ { op: 'new' } ];

			if ( ! ( filename in this.content2 ) )
				return [ { op: 'deleted' } ];


			// stay classy
			const left = JSON.parse( JSON.stringify( this.content1[ filename ] ) ).sort( ( a, b ) => a.start - b.start );
			const right = JSON.parse( JSON.stringify( this.content2[ filename ] ) ).sort( ( a, b ) => a.start - b.start );

			let leftIndex = 0, rightIndex = 0;
			let final = [];
			let rounds = 0;

			while ( rounds < 100 && leftIndex < left.length && rightIndex < right.length ) {

				rounds ++; // fail safe

				if ( left[ leftIndex ].index === right[ rightIndex ].index ) {

					if ( left[ leftIndex ].ruleId === right[ rightIndex ].ruleId ) {

						if ( left[ leftIndex ].length === right[ rightIndex ].length ) {

							final.push( { op: 'copy', ...left[ leftIndex ] } );

						} else {

							final.push( { op: 'replace', old: left[ leftIndex ], new: right[ rightIndex ], ...right[ rightIndex ] } );

						}

					} else {

						final.push( { op: 'replace', old: left[ leftIndex ], new: right[ rightIndex ], ...right[ rightIndex ] } );

					}

					leftIndex ++;
					rightIndex ++;

				} else if ( left[ leftIndex ].index < right[ rightIndex ].index ) {

					final.push( { op: 'delete', ...left[ leftIndex ] } );

					leftIndex ++;

				} else if ( left[ leftIndex ].index > right[ rightIndex ].index ) {

					final.push( { op: 'add', ...right[ rightIndex ] } );

					rightIndex ++;

				} else {

					console.error( `left: ${left[ leftIndex ]} @ ${leftIndex}, right: ${right[ rightIndex ]} @ ${rightIndex}` );
					break;

				}

			}

			console.log( final );

			return final;

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

.diff-new { background-color: green; color: white }
.diff-deleted { background-color: red }
.diff-edited { background-color: yellow }

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
