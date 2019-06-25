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
import store from '../../store';

const API_URL = '/api';


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

			content: '',

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

		tableHeaders: function () {

			return [ {
				name: 'tag', label: 'Line', sortable: true, format: val => val.location.start.line
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'source', label: 'Source tag', sortable: true
			} ];

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

		},

		...mapGetters( [
			'runInfo',
			'currentFile',
			'currentRunId',
			'testData'
		] )

	},

	mounted() {

		// console.log( 'pulling because mounted' );

		// this.$store.dispatch( 'pullTestData' );

	},

	// beforeRouteEnter( to, from, next ) {

	// 	Promise.all( [
	// 		store.dispatch( 'pullTestData' )
	// 	] ).then( () => {

	// 		console.log( 'after beforeRouteEnter', this.testData );

	// 		next();

	// 	} );

	// },

	async beforeRouteUpdate( to, from, next ) {

		// Reset state if user goes from /editor/:id to /editor
		// The component is not recreated so we use to hook to reset the state.

		if ( to.params.run === from.params.run ) {

			console.log( 'same runId' );

		} else {

			console.log( 'different runId' );

			const newData = await store.dispatch( 'pullTestData', { runId: to.params.run } );
			this.content = newData;

		}

		if ( to.query.filename && from.query.filename ) {

			if ( to.query.filename === from.query.filename ) {

				console.log( 'same file selected' );

			} else {

				console.log( 'different file selected' );

			}

		} else {

			console.log( 'different files selected (or none at all)' );

		}
		// console.info( 'beforeRouteUpdate', to.params.run );
		// await store.dispatch( 'pullTestData', { runId: to.params.run } );
		// this.content = this.testData;
		return next();

	},
	async beforeRouteEnter( to, from, next ) {

		// SO: https://github.com/vuejs/vue-router/issues/1034
		// If we arrive directly to this url, we need to fetch the article

		return next( async vm => {

			// from here on out, 'vm' is the instanced component (i.e. 'this' otherwise)

			return await store.dispatch( 'pullRunData' )
				.then( foo => {

					console.log( { foo } );

					return store.dispatch( 'pullTestData', { runId: to.params.run } );

				} )
				.then( bar => {

					console.log( { bar } );
					vm.content = bar; //vm.testData;

					console.log( vm );
					return bar;

				} );

		} );

	},
	async beforeRouteLeave( to, from, next ) {

		console.info( 'beforeRouteLeave', to.params.run );
		// await store.dispatch( 'pullTestData' );
		// this.content = this.testData;
		next();

	},


	// async created() {

	// 	console.log( 'pulling because created' );

	// 	const start = ( this.runInfo ) ? Promise.resolve( true ) : this.$store.dispatch( 'pullRunData' );

	// 	return start
	// 		.then( async () => {

	// 			if ( this.testData )
	// 				return Promise.resolve( true );
	// 			else
	// 				return await this.$store.dispatch( 'pullTestData' );

	// 		} ).then( () => {

	// 			this.content = this.testData;

	// 			console.log( 'testData', this.testData );

	// 			return Promise.resolve( true );

	// 		} );

	// },

	methods: {

		dtUpdateSort: function ( { sortField, sort } ) {

			this.sortField = sortField;
			this.sortDir = sort;

		},

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/depsDocsDocs/showFile/${rev}` )
				.then( res => res.json() )
				.then( json => {

					for ( const file of Object.keys( json.results ) ) {

						for ( const result of json.results[ file ].results ) {

							result.message = result.message || result.err.message;
							result.source = result.tag.source;

						}

					}

					return json;

				} )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

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
