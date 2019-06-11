<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <div
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <h4 class="text-center">
          Results
        </h4>
        <DataTable
          :header-fields="tableHeaders"
          :data="tableData1"
          :css="tableCss"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { DataTable } from 'v-datatable-light';

// const API_URL = 'http://localhost:8855';
const API_URL = '/api';


export default {

	name: 'CheckDocsExamples',

	components: {
		DataTable
	},

	props: {
		'run': {
			type: Number,
			default: 1,
			required: true
		}
	},

	data: function () {

		return {
			runInfo: {},

			content1: '',

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
				name: 'page', label: 'Doc page'
			}, {
				name: 'example', label: 'Example name'
			} ]

		};

	},

	computed: {

		tableData1: function () {

			if ( this.content1 && Object.keys( this.content1 ).includes( 'Loading...' ) === false ) {

				return Object.keys( this.content1 ).reduce( ( all, file ) => {

					// this.content1[ file ].forEach( example => all.push( { page: file, example: example } ) );
					all.push( { page: file, example: this.content1[ file ].join( ', ' ) } );

					return all;

				}, [] );

			} else {

				return [];

			}

		},

		files1: function () {

			if ( this.content1 ) {

				return Object.keys( this.content1 );

			} else {

				return [];

			}

		},

		revision1: function () {

			return this.runInfo.sha;

		}

	},
	watch: {

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

		}

	},

	created() {

		this.pullRunInfo();

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

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/checks/DocsExamples/showFile/${rev}` )
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
