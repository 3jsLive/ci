<template>
  <div
    class="card"
  >
    <h5 class="card-header">
      Run info
    </h5>
    <div class="card-body">
      <p
        v-if="runInfo"
        class="card-text"
      >
        <table class="table table-sm table-striped">
          <tbody>
            <tr><td>Started on</td><td>{{ new Date( runInfo.timestamp ).toUTCString() }}</td></tr>
            <tr><td>Duration</td><td>{{ runInfo.duration | timespanString }}</td></tr>
            <tr>
              <td>Delay after commit</td><td :style="{ filter: ( runInfo.delayAfterCommit === 0 ) ? 'blur(10px)' : ''}">
                {{ runInfo.delayAfterCommit | timespanString }}
              </td>
            </tr>
            <tr><td>Trigger</td><td>{{ runInfo.reason }}</td></tr>
            <tr>
              <td>Baseline run</td><td>
                <router-link :to="`/runs/${runInfo.baselineRunId}`">
                  #{{ runInfo.baselineRunId }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td>Parent run</td><td>
                <router-link :to="`/runs/${runInfo.parentRunId}`">
                  #{{ runInfo.parentRunId }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td>Errors</td><td>
                <span class="bg-warning">TODO</span>
              </td>
            </tr>
            <!-- <tr><td>Dependencies recalculated</td><td><span class="bg-warning">TODO</span>{{ runInfo.dependenciesChanged }}</td></tr> -->
            <tr><td>Machine</td><td>{{ runInfo.info }}</td></tr>
          </tbody>
        </table>
      </p>
      <div
        v-else
        class="text-center"
      >
        <div
          class="spinner-border"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

	name: "RunInfo",

	filters: {

		timespanString: function ( value ) {

			const seconds = Math.abs( value );
			const days = Math.floor( seconds / 86400 );
			const hours = Math.floor( ( seconds - ( days * 86400 ) ) / 3600 );
			const min = Math.floor( ( seconds - ( days * 86400 ) - ( hours * 3600 ) ) / 60 );
			const sec = seconds - ( days * 86400 ) - ( hours * 3600 ) - ( min * 60 );

			// only if we actually crossed over into days
			const daysStr = ( days > 0 ) ? days + 'd ' : '';

			// always if more than 0 days, pad left if less than 10 but more than 0 and hide if 0
			const hoursStr = ( days > 0 || hours > 9 ) ? hours + 'h ' : ( hours < 10 && hours > 0 ) ? '0' + hours + 'h ' : '';

			return `${daysStr}${hoursStr}${min < 10 ? '0' + min : min}m ${sec < 10 ? '0' + sec : sec}s`;

		}

	},

	props: {
		'runInfo': {
			type: [ Object, Boolean ],
			default: () => ( { } )
		}
	},

	data: function () {

		return {

		};

	},

};
</script>

<style scoped>

table.table > tbody > tr:first-of-type > th { border-top: 0px; }
table.table > tbody > tr:first-of-type > th:first-of-type { width: 50%; }

table.table > tbody > tr { text-align: right; }
table.table > tbody > tr > th:first-of-type { text-align: left; }
table.table > tbody > tr > td:first-of-type { text-align: left; }

#tests-summary table.table > tbody > tr:nth-of-type(2) > th { text-align: right }

</style>

