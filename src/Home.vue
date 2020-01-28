<template>
  <div class="container-fluid d-flex flex-column">
    <div
      id="content"
    >
      <div class="row">
        <div class="col">
          <div class="alert bg-warning">
            <h5 class="alert-heading font-weight-bold">
              Warning
            </h5>
            Programmer-crafted interface straight ahead! No designers were harmed in the making of this.. or consulted.
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-6"
          style="margin-left: auto; margin-right: auto;"
        >
          <div
            class="card"
          >
            <div
              class="card-body"
            >
              <p class="card-text">
                <table
                  v-if="init"
                  class="table table-sm"
                >
                  <tbody>
                    <tr align="center">
                      <th>Run</th>
                      <th>Revision</th>
                      <th>Timestamp</th>
                      <th>Reason</th>
                      <!-- <th>Errors</th> -->
                    </tr>
                    <tr
                      v-for="run in init"
                      :key="run.runId"
                    >
                      <template>
                        <td>
                          <router-link :to="'/runs/' + run.runId">
                            #{{ run.runId }}
                          </router-link>
                        </td>
                        <td>{{ run.sha }}</td>
                        <td>{{ run.timestamp | prettyDate }}</td>
                        <td>{{ run.reason }}</td>
                        <!-- <td>{{ run.majorErrors }}</td> -->
                      </template>
                    </tr>
                  </tbody>
                </table>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// const API_URL = 'http://127.0.0.1:8080/api/ci';
const API_URL = 'https://api.3ci.dev:5081/api/ci';

export default {

	name: 'Home',

	filters: {

		prettyDate: function ( timestamp ) {

			return new Date( timestamp ).toLocaleString();

		}

	},

	data: function () {

		return {
			init: false
		};

	},

	created() {

		this.pullInit();

	},

	methods: {

		pullInit() {

			return fetch( `${API_URL}/init` )
				.then( res => res.json() )
				.then( init => {

					this.init = init;

					return true;

				} )
				.catch( err => console.error( 'init request:', err ) );

		}

	}

};
</script>

<style scoped>
#content {
	height: 100%;
	overflow: hidden
}

#content.row {
    height: 100%;
	overflow: auto;
}

table.table > tbody > tr:first-of-type > th { border-top: 0px; }

table.table > tbody > tr { text-align: center; }
</style>
