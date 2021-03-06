<template>
  <div class="container-fluid h-100 overflow-hidden">
    <div
      id="content"
      class="row h-100"
    >
      <div class="col-4 h-100">
        <FilesList
          v-if="content"
          :files="filesWithCounter"
          :selected="currentFile"
          style="z-index: 0"
        />
      </div>
      <div class="col h-100">
        <div
          class="flex-fill d-flex flex-column align-items-center h-100 ml-1 mr-3"
        >
          <div
            v-if="showError !== false"
            class="alert alert-danger text-center"
            role="alert"
            data-cy="alert-danger"
          >
            <strong>{{ `Error${showError.length > 1 ? 's' : ''}:` }}</strong>
            <template
              v-for="( err, index ) in showError"
            >
              <br :key="`${err}-${index}-br`">
              <span :key="`${err}-${index}-text`">
                {{ err }}
              </span>
            </template>
          </div>
          <template
            v-if="tableData && showError === false"
          >
            <h4 class="text-center">
              Results
            </h4>

            <DataTable
              :header-fields="tableHeaders"
              :data="formattedData"
              :css="tableCss"
              :sort-field="sortField"
              :sort="sortDir"
              data-cy="results-table"
              @onUpdate="dtUpdateSort"
            >
              <div
                slot="spinner"
                class="spinner-border"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </DataTable>
          </template>
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

	name: 'DepsDocsDocs',

	components: {
		DataTable,
		FilesList
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

		content: function () {

			return this.testData( this.$route.params.run, this.$route.name ) || {};

		},

		tableHeaders: function () {

			return [ {
				name: 'tag', label: 'Line', sortable: true, format: val => val.location.start.line
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'source', label: 'Source tag', sortable: true
			} ];

		},

		// necessary because the original data is incompatible with datatable
		formattedData: function () {

			const formatted = this.tableData.map( res => {

				return {
					tag: res.tag,
					message: ( res.err ) ? res.err.message : res.message,
					source: res.tag.source
				};

			} );

			return formatted;

		},

		tableData: function () {

			if ( this.content && this.currentFile && this.content.results ) {

				const data = this.content.results[ this.currentFile ].results || [];

				if ( this.sortField === 'message' ) {

					return ( this.sortDir === 'asc' ) ?
						data.sort( ( a, b ) => a[ this.sortField ].localeCompare( b[ this.sortField ] ) )
						:
						data.sort( ( a, b ) => b[ this.sortField ].localeCompare( a[ this.sortField ] ) );

				} else if ( this.sortField === 'source' ) {

					return ( this.sortDir === 'asc' ) ?
						data.sort( ( a, b ) => a.tag.source.localeCompare( b.tag.source ) )
						:
						data.sort( ( a, b ) => b.tag.source.localeCompare( a.tag.source ) );

				} else if ( this.sortField === 'tag' ) {

					return ( this.sortDir === 'asc' ) ?
						data.sort( ( a, b ) => a.tag.location.start.line - b.tag.location.start.line )
						:
						data.sort( ( a, b ) => b.tag.location.start.line - a.tag.location.start.line );

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

					if ( err.err && err.err.message )
						return `${err.err.message} triggered by ${err.tag.source}`;
					else
						return JSON.stringify( err );

				} );

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

		},

		...mapGetters( [
			'currentFile',
			'testData'
		] )

	},

	methods: {

		dtUpdateSort: function ( { sortField, sort } ) {

			this.sortField = sortField;
			this.sortDir = sort;

		}

	}

};
</script>

<style>

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
