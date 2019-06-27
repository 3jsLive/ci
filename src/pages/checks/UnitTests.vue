<template>
  <div class="container-fluid h-100 overflow-hidden">
    <div
      id="content"
      class="row"
    >
      <div class="col-2">
        <div
          class="card"
        >
          <h5 class="card-header">
            Results
          </h5>
          <div class="card-body">
            <p class="card-text">
              <table class="table table-sm">
                <tbody>
                  <tr class="table-success">
                    <th>Passed</th><td>{{ tests.passed }}</td>
                  </tr>
                  <tr class="table-danger">
                    <th>Failed</th><td>{{ tests.failed }}</td>
                  </tr>
                  <tr>
                    <th>Skipped</th><td>{{ tests.skipped }}</td>
                  </tr>
                  <tr>
                    <th>Todo</th><td>{{ tests.todo }}</td>
                  </tr>
                  <tr class="border-top-0 thead-light">
                    <th>TOTAL</th><th class="text-right">
                      {{ tests.tests }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <h5 class="card-header">
            Console
          </h5><div class="card-body">
            <div
              v-for="( event, index ) in tests.events"
              :key="index"
              class="card-text"
            >
              <span class="text-monospace">{{ `${event.type}:${event.payload.type}:"${event.payload.text}"` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {

	name: 'ChecksUnitTests',

	components: { },

	props: { },

	data: function () {

		return { };

	},

	computed: {

		...mapGetters( [
			'testData'
		] ),

		content: function () {

			return this.testData( this.$route.params.run, this.$route.name ) || {};

		},

		tests: function () {

			return {
				passed: this.content.tests - this.content.failed - this.content.skipped - this.content.todo,
				failed: this.content.failed,
				skipped: this.content.skipped,
				todo: this.content.todo,
				tests: this.content.tests,
				events: this.content.events
			};

		}

	}

};
</script>

<style scoped>

td { text-align: right; }

</style>
