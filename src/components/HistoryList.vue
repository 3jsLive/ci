<template>
  <div
    class="card"
  >
    <h5 class="card-header">
      History
    </h5>
    <div class="card-body">
      <p
        v-if="history"
        class="card-text"
      >
        <ul>
          <li>
            <router-link
              v-if="history[ 0 ].runId !== - 1"
              :to="'/runs/' + history[ 0 ].runId"
            >
              {{ `#${history[ 0 ].runId}` }}
            </router-link>
            <span v-else>---</span>: {{ history[ 0 ].sha }} <span class="badge badge-pill badge-primary">Base</span>
          </li>
          <li
            v-for="row in history.slice(1)"
            :key="row.sha"
          >
            <router-link
              v-if="row.runId !== - 1"
              :to="'/runs/' + row.runId"
            >
              {{ `#${row.runId}` }}
            </router-link>
            <span v-else>---</span>{{ `: ${row.sha}` }}
          </li>
        </ul>
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

	name: "HistoryList",

	props: {
		'history': {
			type: [ Array, Boolean ],
			default: () => ( [] )
		}
	},

	data: function () {

		return {

		};

	},

};
</script>
