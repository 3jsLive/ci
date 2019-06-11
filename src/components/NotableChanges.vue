<template>
  <div
    v-if="data.improvements.length > 0 || data.regressions.length > 0"
    id="diff-baseline"
    class="card"
  >
    <h5 class="card-header">
      Notable changes since {{ type }} revision
    </h5>
    <div
      v-if="same"
      class="alert alert-info"
      role="alert"
    >
      {{ type | capitalize }} run same as baseline run, skipping...
    </div>
    <div
      v-else
      class="card-body"
    >
      <p
        v-if="data.improvements.length > 0"
        class="card-text"
      >
        <table class="table table-sm">
          <tbody>
            <tr>
              <th>Improvements</th>
              <th colspan="2">
                Result
              </th>
              <th>{{ type | capitalize }}</th>
              <th>% {{ type | capitalize }}</th>
            </tr>
            <results-table-row
              v-for="imp of data.improvements"
              :key="imp.name"
              :show-parent="type === 'parent'"
              :show-baseline="type === 'baseline'"
              :show-history="false"
              :data="prepResultsTableRowData( imp )"
            />
          </tbody>
        </table>
      </p>
      <p
        v-if="data.regressions.length > 0"
        class="card-text"
      >
        <table class="table table-sm">
          <tbody>
            <tr>
              <th>Regressions</th>
              <th colspan="2">
                Result
              </th>
              <th>{{ type | capitalize }}</th>
              <th>% {{ type | capitalize }}</th>
            </tr>
            <results-table-row
              v-for="reg of data.regressions"
              :key="reg.name"
              :show-parent="type === 'parent'"
              :show-baseline="type === 'baseline'"
              :show-history="false"
              :data="prepResultsTableRowData( reg )"
            />
          </tbody>
        </table>
      </p>
    </div>
  </div>
</template>

<script>

import ResultsTableRow from './ResultsTableRow.vue';

export default {

	name: 'NotableChanges',

	components: {
		ResultsTableRow
	},

	filters: {

		capitalize: function ( value ) {

			if ( ! value ) return '';
			value = value.toString();
			return value.charAt( 0 ).toUpperCase() + value.slice( 1 );

		}

	},

	props: {
		'type': {
			type: String,
			default: ''
		},
		'data': {
			type: Object,
			default: () => ( {} )
		},
		'same': {
			type: Boolean,
			default: false
		}
	},

	data: function () {

		return {

		};

	},

	methods: {

		prepResultsTableRowData( val ) {

			const name = this.$workerToDescription[ '_all' ][ val.name ];

			return {
				name: name,
				result: val.result,

				[ this.type ]: val[ this.type ],
				[ this.type + 'Delta' ]: val[ this.type + 'Delta' ],
				[ this.type + 'HigherWorse' ]: false
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

.diff-neg-0 { background-color: #FFFFFF }
.diff-neg-1 { background-color: #FFE0E0 }
.diff-neg-2 { background-color: #FFD0D0 }
.diff-neg-3 { background-color: #FFC0C0 }
.diff-neg-4 { background-color: #FFB0B0 }
.diff-neg-5 { background-color: #FFA0A0 }
.diff-neg-6 { background-color: #FF9090 }
.diff-neg-7 { background-color: #FF8080 }
.diff-neg-8 { background-color: #FF7070 }
.diff-neg-9 { background-color: #FF0000 }
.diff-pos-0 { background-color: #FFFFFF }
.diff-pos-1 { background-color: #EEFFEE }
.diff-pos-2 { background-color: #D0FFD0 }
.diff-pos-3 { background-color: #C0FFC0 }
.diff-pos-4 { background-color: #B0FFB0 }
.diff-pos-5 { background-color: #A0FFA0 }
.diff-pos-6 { background-color: #90FF90 }
.diff-pos-7 { background-color: #80FF80 }
.diff-pos-8 { background-color: #70FF70 }
.diff-pos-9 { background-color: #00FF00 }

</style>
