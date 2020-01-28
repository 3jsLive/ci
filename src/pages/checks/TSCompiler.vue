<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div
      id="content"
      class="row h-100"
    >
      <div class="col-4 h-100">
        <FilesList
          v-if="content"
          :files="filesWithCounter"
          style="z-index: 0"
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
const FilesList = () => import( /* webpackChunkName: "FilesList" */ '@/src/components/FilesList.vue' );

import { mapGetters } from 'vuex';

export default {

	name: 'CheckWithTS',

	components: {
		DataTable,
		FilesList
	},

	props: {
	},

	data: function () {

		return {
			query: '',

			sortField: 'line',
			sortDir: 'asc',

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

		...mapGetters( [
			'currentFile',
			'testData'
		] ),

		content: function () {

			return this.testData( this.$route.params.run, this.$route.name ) || {};

		},

		tableData: function () {

			console.log( this.content, this.currentFile );
			if ( this.content && this.currentFile &&
				( this.content.js && this.content.dts ) &&
				( this.content.js.results || this.content.dts.results )
			) {

				let data = [];
				if ( this.content.js.results[ this.currentFile ] )
					data.push( ...this.content.js.results[ this.currentFile ].results );
				if ( this.content.dts.results[ this.currentFile ] )
					data.push( ...this.content.dts.results[ this.currentFile ].results );

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

				const uniques = new Set( [ ...Object.keys( this.content.js.results ), ...Object.keys( this.content.dts.results ) ] );

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

				const counter = ( this.content.js.results[ current ] !== undefined ) ? this.content.js.results[ current ].length : this.content.dts.results[ current ].length;

				all[ current ] = { hide: false, name: current, decoration: { text: counter, class: 'bg-warning' } };

				return all;

			}, {} );

		}

	},

	methods: {

		dtUpdateSort: function ( { sortField, sort } ) {

			this.sortField = sortField;
			this.sortDir = sort;

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
