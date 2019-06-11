<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column">
    <div class="row flex-fill">
      <div class="col-12">
        <h2>
          Results for run #{{ run }}, Rev: {{ runInfo.sha }}
        </h2>
      </div>
    </div>
    <div
      id="content"
    >
      <div class="row mt-3">
        <div class="col-8">
          <div class="row">
            <div class="col-7">
              <div class="row flex-column">
                <div
                  v-if="runInfo !== false && ( reduceToNotable( 'parent' ).improvements.length > 0 || reduceToNotable( 'parent' ).regressions.length > 0 )"
                  class="col"
                >
                  <notable-changes
                    :same="runInfo.baselineRunId === runInfo.parentRunId"
                    type="parent"
                    :data="reduceToNotable( 'parent' )"
                  />
                </div>

                <div
                  v-if="runInfo !== false && ( reduceToNotable( 'baseline' ).improvements.length > 0 || reduceToNotable( 'baseline' ).regressions.length > 0 )"
                  class="col mt-4"
                >
                  <notable-changes
                    type="baseline"
                    :data="reduceToNotable( 'baseline' )"
                  />
                </div>
              </div>
            </div>
            <div class="col-5">
              <run-info
                :run-info="runInfo"
              />
            </div>
          </div>
          <div
            v-if="runInfo !== false"
            class="row mt-5"
          >
            <div class="col">
              <div
                id="results-overview"
                class="card"
              >
                <h5 class="card-header">
                  Overview
                </h5>
                <div class="card-body">
                  <p class="card-text">
                    <overview-table
                      :data="JSON.parse( runInfo.overviewJson )"
                      :run="run"
                      :history="history || []"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="col">
            <history-list
              :history="history"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import OverviewTable from '@/src/components/OverviewTable.vue';
import NotableChanges from '@/src/components/NotableChanges.vue';
import RunInfo from '@/src/components/RunInfo.vue';
import HistoryList from '@/src/components/HistoryList.vue';


// const API_URL = 'http://localhost:8855';
const API_URL = '/api';
const NOTABLE_LIMIT = 0.025;


export default {

	name: 'Run',

	components: {
		OverviewTable,
		NotableChanges,
		RunInfo,
		HistoryList
	},

	filters: {

		timespanString: function ( value ) {

			const seconds = Math.abs( value );
			const days = Math.floor( seconds / 1440 );
			const hours = Math.floor( ( seconds - ( days * 1440 ) ) / 3600 );
			const min = Math.floor( ( seconds - ( days * 1440 ) - ( hours * 3600 ) ) / 60 );
			const sec = seconds - ( days * 1440 ) - ( hours * 3600 ) - ( min * 60 );

			// only if we actually crossed over into days
			const daysStr = ( days > 0 ) ? days + 'd ' : '';

			// always if more than 0 days, pad left if less than 10 but more than 0 and hide if 0
			const hoursStr = ( days > 0 || hours > 9 ) ? hours + 'h ' : ( hours < 10 && hours > 0 ) ? '0' + hours + 'h ' : '';

			return `${daysStr}${hoursStr}${min < 10 ? '0' + min : min}m ${sec < 10 ? '0' + sec : sec}s`;

		}

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
			shownRun: 0,
			runInfo: false,
			history: false
		};

	},

	computed: {

	},

	created() {

		this.shownRun = this.run;

		this.pullRunInfo();
		this.pullRunHistory();

	},

	beforeRouteUpdate( to, from, next ) {

		this.shownRun = to.params.run;

		this.runInfo = false;
		this.history = false;

		this.pullRunInfo();
		this.pullRunHistory();

		next();

  	},

	methods: {

		reduceToNotable( type ) {

			const deltaType = type + 'Delta';
			const data = JSON.parse( this.runInfo.overviewJson );

			return Object.keys( data ).reduce( ( all, cur ) => {

				if ( data[ cur ][ deltaType ] >= NOTABLE_LIMIT )
					all.improvements.push( {
						name: cur,
						result: data[ cur ].result,
						[ type ]: data[ cur ][ type ],
						[ deltaType ]: data[ cur ][ deltaType ]
					} );
				else if ( data[ cur ][ deltaType ] < - 1 * NOTABLE_LIMIT )
					all.regressions.push( {
						name: cur,
						result: data[ cur ].result,
						[ type ]: data[ cur ][ type ],
						[ deltaType ]: data[ cur ][ deltaType ]
					} );

				return all;

			}, { improvements: [], regressions: [] } );

		},

		pullRunInfo() {

			return fetch( `${API_URL}/runInfo/${this.shownRun}` )
				.then( res => res.json() )
				.then( runInfo => {

					console.log( { runInfo } );

					return fetch( `${API_URL}/runInfo/${this.shownRun}/overview` )
						.then( res => res.text() )
						.then( overviewJson => {

							runInfo.overviewJson = overviewJson;

							this.runInfo = runInfo;

							return runInfo;

						} );

				} )
				.catch( err => console.error( 'runInfo request:', err ) );

		},

		pullRunHistory() {

			return fetch( `${API_URL}/runInfo/${this.shownRun}/backstory` )
				.then( res => res.json() )
				.then( history => {

					return fetch( `${API_URL}/runInfo/${this.shownRun}/overview?backstory` )
						.then( res => res.json() )
						.then( overviewHistories => {

							console.log( { overviewHistories } );

							this.history = history.map( ( { runId, sha } ) => {

								const runResults = Object.keys( overviewHistories ).reduce( ( all, testname ) => {

									all[ testname ] = { result: overviewHistories[ testname ][ runId ] };
									return all;

								}, {} );

								return { name: runId, runId, sha, overviewJson: JSON.stringify( runResults ) };

							} );

							return overviewHistories;

						} )
						.catch( err => console.error( 'overview backstory request:', err ) );

				} )
				.catch( err => console.error( 'backstory request:', err ) );

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

table.table > tbody > tr:first-of-type > th { border-top: 0px; }
table.table > tbody > tr:first-of-type > th:first-of-type { width: 50%; }

table.table > tbody > tr { text-align: right; }
table.table > tbody > tr > th:first-of-type { text-align: left; }
table.table > tbody > tr > td:first-of-type { text-align: left; }

#tests-summary table.table > tbody > tr:nth-of-type(2) > th { text-align: right }

table.table a.offline { text-decoration-line: line-through}


.diff-neg-0 { background-color: #FFFFFF }
.diff-neg-1 { background-color: #FFE0E0 }
.diff-neg-2 { background-color: #FFD0D0 }
.diff-neg-3 { background-color: #FFC0C0 }
.diff-neg-4 { background-color: #FFB0B0 }
.diff-neg-5 { background-color: #FFA0A0 }
.diff-neg-6 { background-color: #FF9090 }
.diff-neg-7 { background-color: #FF8080 }
.diff-neg-8 { background-color: #FF7070 }
.diff-neg-F { background-color: #FF0000 }
.diff-pos-0 { background-color: #FFFFFF }
.diff-pos-1 { background-color: #EEFFEE }
.diff-pos-2 { background-color: #D0FFD0 }
.diff-pos-3 { background-color: #C0FFC0 }
.diff-pos-4 { background-color: #B0FFB0 }
.diff-pos-5 { background-color: #A0FFA0 }
.diff-pos-6 { background-color: #90FF90 }
.diff-pos-7 { background-color: #80FF80 }
.diff-pos-8 { background-color: #70FF70 }
.diff-pos-F { background-color: #00FF00 }

</style>
