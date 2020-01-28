<template>
  <div
    id="content"
    class="d-flex flex-fill"
  >
    <FilesList
      v-if="content"
      :files="filesWithCounter"
      :selected="currentFile"
      style="z-index: 0"
    />
    <div
      class="flex-fill d-flex flex-column align-items-center overflow-auto ml-1 mr-3"
    >
      <div
        v-if="showError !== false"
        class="alert alert-danger text-center"
        role="alert"
      >
        <strong>Error</strong><br>{{ showError }}
      </div>
      <template
        v-if="tableData && showError === false"
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
      </template>
    </div>
  </div>
</template>

<script>

import { DataTable } from 'v-datatable-light';
const FilesList = () => import( /* webpackChunkName: "FilesList" */ '@/src/components/FilesList.vue' );

import { mapGetters } from 'vuex';

export default {

	name: 'BaseLinter',

	components: {
		DataTable,
		FilesList
	},

	props: {
		'tableHeaders': {
			type: Array,
			required: true
		}
	},

	data: function () {

		return {

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
			}

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

			if ( this.content && this.currentFile && this.content.results ) {

				const data = this.content.results[ this.currentFile ].results || [];

				if ( this.sortField === 'message' || this.sortField === 'level' ) {

					return ( this.sortDir === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField ].localeCompare( b[ this.sortField ] ) )
						:
						data.sort( ( a, b ) => b[ this.sortField ].localeCompare( a[ this.sortField ] ) );

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

		showError: function ( ) {

			if ( this.content && this.currentFile &&
				this.content.results &&
				this.content.results[ this.currentFile ] &&
				this.content.results[ this.currentFile ].errors.length > 0
			) {

				const errors = this.content.results[ this.currentFile ].errors;

				const errorsText = errors.map( err => {

					if ( err.message )
						return err.message;
					else
						return err;

				} ).join( '<br />' );

				return errorsText;

			}

			return false;

		},

		filesAll: function () {

			return ( this.content && this.content.results ) ? Object.keys( this.content.results ).sort() : [];

		},

		filesWithCounter: function () {

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content ).includes( 'Loading...' ) )
				return {};

			return this.filesAll.reduce( ( all, file ) => {

				let counter;
				if ( this.content.results[ file ].errors.length > 0 ) {

					counter = this.content.results[ file ].errors.length;

					all[ file ] = { hide: false, name: file, decoration: { text: counter, class: 'bg-danger text-white' } };

				} else {

					counter = this.content.results[ file ].results.length;

					all[ file ] = { hide: false, name: file, decoration: { text: counter, class: 'bg-warning' } };

				}

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

</style>
