<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div
      id="content"
      class="row h-100"
    >
      <div class="col-4 h-100">
        <FilesList
          v-if="revision && content"
          :files="filesWithCounter"
          :selected="selectedFilename"
          style="z-index: 0"
          @selected="selectedFilename = $event"
        />
      </div>
      <div class="col h-100">
        <div
          class="flex-fill d-flex flex-column align-items-center h-100 ml-1 mr-3"
        >
          <h4 class="text-center">
            Results
          </h4>

          <DataTable
            :header-fields="tableHeaders"
            :data="tableData"
            :css="tableCss"
            :sort-field="sortField"
            :sort="sortDir"
            @onUpdate="dtUpdateSort"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { DataTable } from 'v-datatable-light';
import FilesList from '@/src/components/FilesList.vue';

// const API_URL = 'http://localhost:8855';
const API_URL = '/api';


export default {

	name: 'CheckWithTS',

	components: {
		DataTable,
		FilesList
	},

	props: {
		'filename': {
			type: String,
			default: ''
		},
		'run': {
			type: Number,
			default: 1,
			required: true
		}
	},

	data: function () {

		return {
			runInfo: {},

			query: '',

			sortField: 'line',
			sortDir: 'asc',

			content: '',

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
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'code', label: 'Code', sortable: true
			} ]

		};

	},

	computed: {

		revision: function () {

			return this.runInfo.sha;

		},

		tableData: function () {

			console.log( this.content, this.filename );
			if ( this.content && this.filename ) {

				const data = [
					...Object.values( this.content.js[ this.filename ] || {} ),
					...Object.values( this.content.dts[ this.filename ] || {} )
				];
				console.log( { data } );
				if ( this.sortField === 'message' ) {

					return ( this.sortDir === 'asc' ) ?
						data.sort( ( a, b ) => a.message.localeCompare( b.message ) )
						:
						data.sort( ( a, b ) => b.message.localeCompare( a.message ) );

				} else {

					return ( this.sortDir === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField ] - b[ this.sortField ] )
						:
						data.sort( ( a, b ) => b[ this.sortField ] - a[ this.sortField ] );

				}

			} else {

				return [];

			}

		},

		filesAll: function () {

			if ( this.content && this.content.js && this.content.dts ) {

				const uniques = new Set( [ ...Object.keys( this.content.js ), ...Object.keys( this.content.dts ) ] );

				return [ ...uniques ];

			} else {

				return [];

			}

		},

		filesWithCounter: function () {

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.filesAll ).includes( 'Loading...' ) )
				return {};

			return this.filesAll.reduce( ( all, current ) => {

				const counter = ( this.content.js[ current ] !== undefined ) ? this.content.js[ current ].length : this.content.dts[ current ].length;

				all[ current ] = { hide: false, name: current, decoration: { text: counter, class: 'bg-warning' } };

				return all;

			}, {} );

		}

	},

	watch: {

		filename: function () {

			this.selectedFilename = this.filename;

		},

		// selected filename changed, update nagivation
		selectedFilename: function ( /* file */ ) {

			if ( this.filename !== this.selectedFilename ) {

				const params = { run: this.run };

				const query = ( this.selectedFilename ) ? { filename: this.selectedFilename } : {};

				this.$router.push( { name: 'checkWithTS', params, query } );

			}

		},

		revision: async function ( rev ) {

			if ( rev && rev.length > 0 ) {

				if ( ! this.content || Object.keys( this.content ).length === 0 ) {

					this.content = { "Loading...": true };
					this.content = await this._fetchFilesOfRevision( this.revision );

				} else
					console.log( 'content already loaded' );

			} else {

				this.content = '';

			}

		}

	},

	created() {

		this.pullRunInfo();

		this.selectedFilename = this.filename;

	},

	methods: {

		// TODO: replace with vuex (store)
		pullRunInfo() {

			return fetch( `${API_URL}/runInfo/${this.run}` )
				.then( res => res.json() )
				.then( runInfo => {

					this.runInfo = runInfo;

					console.log( { runInfo } );

					return true;

				} )
				.catch( err => console.error( 'runInfo request:', err ) );

		},

		dtUpdateSort: function ( { sortField, sort } ) {

			this.sortField = sortField;
			this.sortDir = sort;

		},

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/checkWithTS/showFile/${rev}` )
				.then( res => res.json() )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

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
