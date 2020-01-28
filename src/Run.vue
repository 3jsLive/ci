<template>
  <div class="container-fluid d-flex flex-column">
    <div class="row flex-fill">
      <div class="col-12">
        <h2>
          Results for run #{{ currentRunId }}, Rev: {{ runInfo.sha }}
        </h2>
      </div>
    </div>
    <div id="content">
      <div class="row mt-3">
        <div class="col-8">
          <div class="row">
            <div class="col-5">
              <run-info
                :run-info="runInfo"
              />
            </div>
            <div class="col-7">
              <div
                v-if="runInfo !== false"
                class="row flex-column"
              >
                <div class="col">
                  <notable-changes
                    :same="runInfo.baselineRunId === runInfo.parentRunId"
                    type="parent"
                    :data="reduceToNotable( 'parent' )"
                  />
                </div>
                <div
                  class="col"
                  :class="{ 'mt-4': parentExists === true }"
                >
                  <notable-changes
                    type="baseline"
                    :data="reduceToNotable( 'baseline' )"
                  />
                </div>
              </div>
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
                    <overview-table />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <history-list
            :history="backstory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HistoryList from '@/src/components/HistoryList.vue';
import NotableChanges from '@/src/components/NotableChanges.vue';
import OverviewTable from '@/src/components/OverviewTable.vue';
import RunInfo from '@/src/components/RunInfo.vue';

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

	props: {},

	data: function () {

		return {};

	},

	computed: {

		parentExists: function () {

			const data = this.reduceToNotable( 'parent' );
			return data.improvements.length > 0 || data.regressions.length > 0;

		},

		runInfo: function () {

			return this.$store.getters.runInfo( this.$route.params.run );

		},

		overview: function () {

			return this.$store.getters.overview( this.$route.params.run );

		},

		backstory: function () {

			return this.$store.getters.backstory( this.$route.params.run );

		},

		currentRunId: function () {

			return this.$route.params.run;

		}

	},

	methods: {

		reduceToNotable( type ) {

			const deltaType = type + 'Delta';
			const data = this.overview;

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

	}

};
</script>

<style scoped>

table.table > tbody > tr:first-of-type > th { border-top: 0px; }
table.table > tbody > tr:first-of-type > th:first-of-type { width: 50%; }

table.table > tbody > tr { text-align: right; }
table.table > tbody > tr > th:first-of-type { text-align: left; }
table.table > tbody > tr > td:first-of-type { text-align: left; }

#tests-summary table.table > tbody > tr:nth-of-type(2) > th { text-align: right }

table.table a.offline { text-decoration-line: line-through}
</style>
