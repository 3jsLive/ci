<template>
  <div>
    <table class="table table-sm">
      <tbody>
        <tr>
          <th>Checks (# of hits)</th><th colspan="2">
            Result
          </th><th>Parent</th><th>% Parent</th><th>Baseline</th><th>% Baseline</th><th>History</th>
        </tr>
        <template v-for="( [ test, name ] ) of Object.entries( $workerToDescription.checks )">
          <results-table-row
            :key="test"
            :show-parent="true"
            :show-history="true"
            :show-baseline="true"
            :show-links="true"
            :show-expander="true"
            :data="prepResultsTableRowData( 'checks', test, name )"
          />
          <template v-if="details[ test ]">
            <results-table-row
              v-for="file in Object.keys( details[ test ] )"
              :key="`${test}-${file}-details`"
              :show-parent="true"
              :show-history="false"
              :show-baseline="true"
              :show-links="true"
              :data="prepResultsTableRowDataDetails( 'checks', test, name, file )"
            />
          </template>
        </template>
      </tbody>
    </table>
    <table class="table table-sm">
      <tbody>
        <tr>
          <th>Linters (# of hits)</th><th colspan="2">
            Result
          </th><th>Parent</th><th>% Parent</th><th>Baseline</th><th>% Baseline</th><th>History</th>
        </tr>
        <template v-for="( [ test, name ] ) of Object.entries( $workerToDescription.linters )">
          <results-table-row
            :key="test"
            :show-parent="true"
            :show-history="true"
            :show-baseline="true"
            :show-links="true"
            :data="prepResultsTableRowData( 'linters', test, name )"
          />
        </template>
      </tbody>
    </table>
    <table class="table table-sm">
      <tbody>
        <tr>
          <th>Type Search (# of mismatches)</th><th colspan="2">
            Result
          </th><th>Parent</th><th>% Parent</th><th>Baseline</th><th>% Baseline</th><th>History</th>
        </tr>
        <template v-for="( [ test, name ] ) of Object.entries( $workerToDescription.typesearch )">
          <results-table-row
            :key="test"
            :show-parent="true"
            :show-history="true"
            :show-baseline="true"
            :show-links="true"
            :data="prepResultsTableRowData( 'typesearch', test, name )"
          />
        </template>
      </tbody>
    </table>
    <table class="table table-sm">
      <tbody>
        <tr>
          <th>Profiling (# of suspicious runs)</th><th colspan="2">
            Result
          </th><th>Parent</th><th>% Parent</th><th>Baseline</th><th>% Baseline</th><th>History</th>
        </tr>
        <template v-for="( [ test, name ] ) of Object.entries( $workerToDescription.profiling )">
          <results-table-row
            :key="test"
            :show-parent="true"
            :show-history="true"
            :show-baseline="true"
            :show-links="true"
            :data="prepResultsTableRowData( 'profiling', test, name )"
          />
        </template>
      </tbody>
    </table>
    <table class="table table-sm">
      <tbody>
        <tr>
          <th>Dependencies (# of errors)</th><th colspan="2">
            Result
          </th><th>Parent</th><th>% Parent</th><th>Baseline</th><th>% Baseline</th><th>History</th>
        </tr>
        <template v-for="( [ test, name ] ) of Object.entries( $workerToDescription.dependencies )">
          <results-table-row
            :key="test"
            :show-parent="true"
            :show-history="true"
            :show-baseline="true"
            :show-links="true"
            :data="prepResultsTableRowData( 'dependencies', test, name )"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>

import ResultsTableRow from './ResultsTableRow.vue';

// const API_URL = 'http://localhost:8855';
const API_URL = '/api';


export default {

	name: 'OverviewTable',

	components: {
		ResultsTableRow
	},

	props: {
		'data': {
			type: Object,
			default: () => ( {} )
		},
		'run': {
			type: Number,
			default: 0
		},
		'history': {
			type: Array,
			default: () => ( [] )
		}
	},

	data: function () {

		return {

			currentlyOpen: {},
			details: {}

		};

	},

	mounted() {

		this.$eventBus.$on( 'detail', test => {

			console.log( `${test} needs more details` );

			this.pullDetailedOverview( test );

			this.currentlyOpen[ test ] = true;

		} );

	},

	methods: {

		prepResultsTableRowData( testGroup, testName, name ) {

			const data = ( this.data[ testName ] ) ? this.data[ testName ] : {
				result: '-',
				parent: '-',
				parentDelta: '-',
				baseline: '-',
				baselineDelta: '-'
			};

			const history = this.history.map( run => {

				const json = JSON.parse( run.overviewJson || '{}' );

				if ( json[ testName ] )
					return [ `${run.name}`, json[ testName ].result ];
				else
					return [ `${run.name}`, null ];

			} );

			return {
				run: this.run,
				test: testName,

				linkTarget: `${testGroup}/${testName}`,
				linkText: name,

				history: history,

				name: name,
				result: data.result,

				parent: data.parent,
				parentDelta: data.parentDelta,
				parentHigherWorse: false,

				baseline: data.baseline,
				baselineDelta: data.baselineDelta,
				baselineHigherWorse: false
			};

		},

		pullDetailedOverview( test ) {

			return fetch( `${API_URL}/detailedOverview/${this.run}/${test}` )
				.then( res => res.json() )
				.then( details => {

					const prepared_full = details.rows.reduce( ( all, row ) => {

						all[ row.name ] = all[ row.name ] || { baseline: - 1, parent: - 1, result: - 1 };

						if ( row.runId === details.baselineRunId )
							all[ row.name ].baseline = row.value;
						else if ( row.runId === details.parentRunId )
							all[ row.name ].parent = row.value;
						else
							all[ row.name ].result = row.value;

						return all;

					}, {} );

					console.log( { prepared_full } );

					const prepared = Object.keys( prepared_full ).reduce( ( all, key ) => {

						// if the history is non-existant (-1) or simply not interesting (0), skip this
						if (
							[ 0, - 1 ].includes( prepared_full[ key ].baseline ) &&
							[ 0, - 1 ].includes( prepared_full[ key ].parent ) &&
							prepared_full[ key ].result === 0
						)
							return all;

						// even with proper history: if we have no valid result for this run -> abort
						// if ( prepared_full[ key ].result === - 1 )
						// return all;

						// we proceed
						all[ key ] = prepared_full[ key ];

						// non-existant values get formatted
						if ( prepared_full[ key ].result === - 1 )
							all[ key ].result = '-';

						if ( prepared_full[ key ].baseline === - 1 )
							all[ key ].baseline = '-';

						if ( prepared_full[ key ].parent === - 1 )
							all[ key ].parent = '-';

						// defaults
						all[ key ].baselineDelta = '-';
						all[ key ].parentDelta = '-';

						// replace deltas if mathematically possible
						if ( [ 0, '-' ].includes( prepared_full[ key ].result ) === false ) {

							if ( [ 0, '-' ].includes( prepared_full[ key ].baseline ) === false )
								all[ key ].baselineDelta = ( 1 - all[ key ].result / all[ key ].baseline );

							if ( [ 0, '-' ].includes( prepared_full[ key ].parent ) === false )
								all[ key ].parentDelta = ( 1 - all[ key ].result / all[ key ].parent );

						} else {

							if ( [ 0, '-' ].includes( prepared_full[ key ].baseline ) === false )
								all[ key ].baselineDelta = 1;

							if ( [ 0, '-' ].includes( prepared_full[ key ].parent ) === false )
								all[ key ].parentDelta = 1;

						}

						return all;

					}, {} );

					this.$set( this.details, test, prepared );

					console.log( { details: this.details } );

					return true;

				} )
				.catch( err => console.error( 'detailedOverview request:', err ) );

		},

		prepResultsTableRowDataDetails( testGroup, testName, name, file ) {

			const data = this.details[ testName ][ file ];

			return {
				run: this.run,
				test: testName,

				linkTarget: `${testGroup}/${testName}?file=${file}`,
				linkText: `—— ${file}`,

				history: null,

				name: file,
				result: data.result,

				parent: data.parent,
				parentDelta: data.parentDelta,
				parentHigherWorse: false,

				baseline: data.baseline,
				baselineDelta: data.baselineDelta,
				baselineHigherWorse: false
			};

		}

	}

};
</script>

<style scoped>

table.table > tbody > tr:first-of-type > th { border-top: 0px; }
table.table > tbody > tr:first-of-type > th:first-of-type { width: 50%; }

table.table > tbody > tr { text-align: right; }
table.table > tbody > tr > th:first-of-type { text-align: left; }
table.table > tbody > tr > td:first-of-type { text-align: left; }

table.table a { text-decoration-line: line-through}

</style>
