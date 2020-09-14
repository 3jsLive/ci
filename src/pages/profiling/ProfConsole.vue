<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="content"
    class="d-flex h-100 overflow-hidden pb-3"
  >
    <FilesList
      v-if="content"
      :files="filesWithCounter"
      :selected="currentFile"
      style="z-index: 0"
    />
    <div
      class="flex-column flex-fill overflow-auto"
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
          data-cy="results-table"
          @onUpdate="dtUpdateSort"
        >
          <div
            slot="messageMono"
            slot-scope="props"
          >
            <pre>{{ props.rowData.message }}</pre>
          </div>
        </DataTable>
      </template>
    </div>
  </div>
</template>

<script>

import { DataTable } from 'v-datatable-light';
const FilesList = () => import( /* webpackChunkName: "FilesList" */ '@/src/components/FilesList.vue' );

import { mapGetters } from 'vuex';

export default {

	name: 'ProfilingConsole',

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

			apiSection: 'profilingConsole',

			route: 'profilingConsole',

			tableHeaders: [ {
				name: 'number', label: 'Number', sortable: true
			}, {
				name: 'type', label: 'Type', sortable: true
			}, {
				name: 'severity', label: 'Severity', sortable: true
			}, {
				name: 'location', label: 'Location', sortable: true
			}, {
				name: 'message', label: 'Message', sortable: true, customElement: 'messageMono'
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

			if ( this.content && this.currentFile && this.content.results ) {

				const data = this.content.results[ this.currentFile ].results.map( ( d, i ) => ( {
					...d,
					number: i,
					severity: d.msg.type || 'error',
					location: ( d.msg.location && d.msg.location.columnNumber ) ?
						`${d.msg.location.url}:${d.msg.location.lineNumber}:${d.msg.location.columnNumber}`
						:
						`${d.msg.location && d.msg.location.url ? d.msg.location.url : '-'}`,
					message: d.msg ? d.msg.text : '-',
				} ) ) || [];

				if ( this.sortField === 'severity' || this.sortField === 'message' || this.sortField === 'location' || this.sortField === 'type' ) {

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
						return JSON.stringify( err );

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

				const errors = this.content.results[ file ].errors.length;
				const hits = this.content.results[ file ].hits;

				if ( errors <= 0 && hits <= 0 )
					return all;

				// visually distinguish files with errors from files with no errors
				const [ text, style ] = ( errors > 0 ) ? [ errors, 'bg-danger text-white' ] : [ hits, 'bg-warning' ];

				all[ file ] = { hide: false, name: file, decoration: { text: text, class: style } };

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
