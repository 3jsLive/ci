<template>
  <div>
    <table class="table table-sm overview">
      <tbody>
        <tr>
          <th class="group">
            Checks (# of hits)
          </th><th class="sparkline">
			&nbsp;
          </th><th
            class="result"
          >
            Result
          </th><th class="parent">
            Parent
          </th><th class="parent-delta">
            % Parent
          </th><th class="baseline">
            Baseline
          </th><th class="baseline-delta">
            % Baseline
          </th><th class="history">
            History
          </th>
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
          <template v-if="showDetails( test )">
            <results-table-row
              v-for="file in Object.keys( detailsPrepped[ test ] )"
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
    <table class="table table-sm overview">
      <tbody>
        <tr>
          <th class="group">
            Linters (# of hits)
          </th><th class="sparkline">
			&nbsp;
          </th><th
            class="result"
          >
            Result
          </th><th class="parent">
            Parent
          </th><th class="parent-delta">
            % Parent
          </th><th class="baseline">
            Baseline
          </th><th class="baseline-delta">
            % Baseline
          </th><th class="history">
            History
          </th>
        </tr>
        <template v-for="( [ test, name ] ) of Object.entries( $workerToDescription.linters )">
          <results-table-row
            :key="test"
            :show-parent="true"
            :show-history="true"
            :show-baseline="true"
            :show-links="true"
            :show-expander="true"
            :data="prepResultsTableRowData( 'linters', test, name )"
          />
          <template v-if="showDetails( test )">
            <results-table-row
              v-for="file in Object.keys( detailsPrepped[ test ] )"
              :key="`${test}-${file}-details`"
              :show-parent="true"
              :show-history="false"
              :show-baseline="true"
              :show-links="true"
              :data="prepResultsTableRowDataDetails( 'linters', test, name, file )"
            />
          </template>
        </template>
      </tbody>
    </table>
    <table class="table table-sm overview">
      <tbody>
        <tr>
          <th class="group">
            Type Search (# of mismatches)
          </th><th class="sparkline">
			&nbsp;
          </th><th
            class="result"
          >
            Result
          </th><th class="parent">
            Parent
          </th><th class="parent-delta">
            % Parent
          </th><th class="baseline">
            Baseline
          </th><th class="baseline-delta">
            % Baseline
          </th><th class="history">
            History
          </th>
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
    <table class="table table-sm overview">
      <tbody>
        <tr>
          <th class="group">
            Profiling (# of suspicious runs)
          </th><th class="sparkline">
			&nbsp;
          </th><th
            class="result"
          >
            Result
          </th><th class="parent">
            Parent
          </th><th class="parent-delta">
            % Parent
          </th><th class="baseline">
            Baseline
          </th><th class="baseline-delta">
            % Baseline
          </th><th class="history">
            History
          </th>
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
    <table class="table table-sm overview">
      <tbody>
        <tr>
          <th class="group">
            Dependencies (# of errors)
          </th><th class="sparkline">
			&nbsp;
          </th><th
            class="result"
          >
            Result
          </th><th class="parent">
            Parent
          </th><th class="parent-delta">
            % Parent
          </th><th class="baseline">
            Baseline
          </th><th class="baseline-delta">
            % Baseline
          </th><th class="history">
            History
          </th>
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

// import { mapGetters } from 'vuex';

const ResultsTableRow = () => import( /* webpackChunkName: "ResultsTableRow" */ '@/src/components/ResultsTableRow.vue' );

import API_URL from '@/src/environments/environment';


export default {

	name: 'OverviewTable',

	components: {
		ResultsTableRow
	},

	props: {},

	data: function () {

		return {

			details: {},
			detailsPrepped: {},
			detailsStatus: {}

		};

	},

	computed: {

		overview: function () {

			return this.$store.getters.overview( this.$route.params.run );

		},

		sparkline: function () {

			return this.$store.getters.sparkline( this.$route.params.run );

		},

		currentRunId: function () {

			return this.$route.params.run;

		}

	},

	mounted() {

		this.$eventBus.$on( 'detailReq', payload => {

			const test = payload.test;
			const amount = payload.amount;

			// not open -> open
			if ( ! this.detailsStatus[ test ] ) {

				console.log( `${test} needs more details` );

				this.pullAndSetDetailedOverview( test, amount );

			} else if ( this.detailsStatus[ test ] === amount ) {		// open and same amount -> close

				this.$set( this.detailsPrepped, test, {} );

				this.$set( this.detailsStatus, test, false );

			} else { // open and different amount -> switch

				if ( amount === 'all' ) {

					this.$set( this.detailsPrepped, test, this.details[ test ] );

				} else {

					const reduced = Object.entries( this.details[ test ] ).reduce( ( all, [ file, result ] ) => {

						if ( result.result !== result.parent || result.result !== result.baseline )
							all[ file ] = result;

						return all;

					}, {} );

					this.$set( this.detailsPrepped, test, reduced );

				}

				this.$set( this.detailsStatus, test, amount );

			}

		} );

	},

	methods: {

		showDetails( test ) {

			if ( test in this.detailsStatus && this.detailsStatus[ test ] !== false )
				return true;
			else
				return false;

		},

		prepResultsTableRowData( testGroup, testName, name ) {

			const data = ( this.overview[ testName ] ) ? this.overview[ testName ] : {
				errors: 0,
				result: '-',
				parent: '-',
				parentDelta: '-',
				baseline: '-',
				baselineDelta: '-'
			};

			const sparkline = ( this.sparkline && this.sparkline[ testName ] ) ? Object.entries( this.sparkline[ testName ] ) : [];

			return {
				run: this.currentRunId,
				test: testName,
				errors: data.errors,

				linkTarget: `${testGroup}/${testName}`,
				linkText: name,

				history: sparkline,

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

		pullAndSetDetailedOverview( test, amount ) {

			return fetch( `${API_URL}/detailedOverview/${this.currentRunId}/${test}` )
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

					return prepared;

				} )
				.then( prepared => {

					if ( amount === 'all' ) {

						this.$set( this.detailsPrepped, test, prepared );

					} else {

						const reduced = Object.entries( this.details[ test ] ).reduce( ( all, [ file, result ] ) => {

							if ( result.result !== result.parent || result.result !== result.baseline )
								all[ file ] = result;

							return all;

						}, {} );

						this.$set( this.detailsPrepped, test, reduced );

					}

					this.$set( this.detailsStatus, test, amount );

					return prepared;

				} )
				.catch( err => console.error( 'detailedOverview request:', err ) );

		},

		prepResultsTableRowDataDetails( testGroup, testName, name, file ) {

			const data = this.details[ testName ][ file ];

			return {
				run: this.currentRunId,
				test: testName,

				linkTarget: `${testGroup}/${testName}?filename=${file}`,
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
/* table.table > tbody > tr:first-of-type > th:first-of-type { width: 50%; } */

table.table > tbody > tr { text-align: right; }
table.table > tbody > tr > th:first-of-type { text-align: left; }
table.table > tbody > tr > td:first-of-type { text-align: left; }

table.table a { text-decoration-line: line-through}

/* .overview */
.overview .group { min-width: 63ch }
.overview .sparkline { width: 120px }
.overview .result { width: 6ch }
.overview .parent { width: 6ch }
.overview .parent-delta { width: 10ch }
.overview .baseline { width: 7ch }
.overview .baseline-delta { width: 12ch }
.overview .history { width: 13ch }

</style>
