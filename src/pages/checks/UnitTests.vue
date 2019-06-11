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

// const API_URL = 'http://localhost:8855';
const API_URL = '/api';


export default {

	name: 'ChecksUnitTests',

	components: { },

	props: {
		'run': {
			type: Number,
			default: 1,
			required: true
		}
	},

	data: function () {

		return {

			content: '',
			runInfo: {}

		};

	},

	computed: {

		revision: function () {

			return this.runInfo.sha;

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

	},

	watch: {

		revision: async function ( rev ) {

			if ( rev && rev.length > 0 ) {

				if ( ! this.content || Object.keys( this.content ).length === 0 ) {

					this.content = { "Loading...": true };
					this.content = await this._fetchFilesOfRevision( this.revision );

				} else
					console.log( 'content already loaded' );

			} else {

				this.content = '';

			}

		}

	},

	created() {

		this.pullRunInfo();

	},

	methods: {

		// TODO: replace with vuex (store)
		pullRunInfo() {

			return fetch( `${API_URL}/runInfo/${this.run}` )
				.then( res => res.json() )
				.then( runInfo => {

					this.runInfo = runInfo;

					console.log( { runInfo } );

					return true;

				} )
				.catch( err => console.error( 'runInfo request:', err ) );

		},

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/checkUnitTests/showFile/${rev}` )
				.then( res => res.json() )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

		}

	}

};
</script>

<style scoped>

td { text-align: right; }

</style>
