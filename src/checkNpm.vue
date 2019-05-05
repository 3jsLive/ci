<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>
          Scan NPM for outdated dependencies
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
          :disabled="secondRevDisabled"
          :placeholder="secondRevPlaceholder"
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
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <template
          v-if="showDiffResults"
        >
          <h4 class="text-center">
            Diff between Rev1 and Rev2
          </h4>
          <DataTable
            :header-fields="tableHeadersDiff"
            :data="tableDiff"
            :css="tableCss"
          />
        </template>
        <template
          v-if="showRev1"
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

	name: 'CheckNpm',

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

			tableCss: {
				table: 'table table-bordered table-hover table-striped table-center',
				th: 'header-item',
				thWrapper: 'th-wrapper',
				thWrapperCheckboxes: 'th-wrapper checkboxes',
				arrowsWrapper: 'arrows-wrapper',
				arrowUp: 'arrow up',
				arrowDown: 'arrow down',
				footer: 'footer'
			},

			tableHeaders: [ {
				name: 'name', label: 'Dependency'
			}, {
				name: 'version', label: 'New version'
			} ],

			tableHeadersDiff: [ {
				name: 'name', label: 'Dependency'
			} ]

		};

	},

	computed: {

		tableData1: function () {

			if ( this.content1 && this.content1.results ) {

				return this.content1.results;

			} else {

				return [];

			}

		},

		tableData2: function () {

			if ( this.content2 && this.content2.results ) {

				return this.content2.results;

			} else {

				return [];

			}

		},

		tableDiff: function () {

			if ( this.diffAll ) {

				return this.diffAll.filter( ( el, i, arr ) => arr.findIndex( x => x.name === el.name ) === i );

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
                this.diffAll
			)
				return true;

			return false;

		},

		showRev1: function () {

			if ( this.revision1 &&
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

		diff: function () {

			if ( this.revision1 &&
				this.revision2 &&
				this.content1 && this.content1.results &&
				this.content2 && this.content2.results
			)
				return justDiff.diff( this.content1.results, this.content2.results );

			return [];

		},

		diffAll: function () {

			if ( this.content1 && this.content1.results &&
				this.content2 && this.content2.results &&
				this.diff
			)
				return this.diff.map( patch => ( { name: this.content1.results[ patch.path[ 0 ] ].name } ) );
			else
				return [];

		}/* ,

		diffCounter: function () {

			if ( ! this.diff || this.diff.length === 0 )
				return {};

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content1 ).includes( 'Loading...' ) || Object.keys( this.content2 ).includes( 'Loading...' ) )
				return {};

			return this.diff.reduce( ( all, current ) => {

				const filename = current.path[ 0 ];

				all[ filename ] = all[ filename ] || 0;
				all[ filename ] ++;

				return all;

			}, {} );

		} */

	},

	watch: {

		// selected first revision changed, update nagivation
		selectedRev1: function ( /* rev */ ) {

			if ( this.revision1 !== this.selectedRev1 ) {

				let params;
				if ( this.revision2 && this.selectedRev1 ) params = { firstRev: this.selectedRev1, secondRev: this.revision2 };
				else if ( this.selectedRev1 ) params = { firstRev: this.selectedRev1 };
				else params = {};

				this.$router.push( {
					name: 'checkNpm',
					params
				} );

			}

		},

		// selected second revision changed, update nagivation
		selectedRev2: function ( /* rev */ ) {

			if ( this.revision2 !== this.selectedRev2 ) {

				const params = ( this.selectedRev2 && this.revision1 ) ? { firstRev: this.revision1, secondRev: this.selectedRev2 } : { firstRev: this.revision1 };

				this.$router.push( {
					name: 'checkNpm',
					params
				} );

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

		this.changeRevision1();
		this.changeRevision2();

	},

	methods: {

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/checkNpm/showFile/${rev}` )
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

			return fetch( `${API_URL}/checkNpm/revisions` )
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
  margin-left: auto;
  margin-right: auto;
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
