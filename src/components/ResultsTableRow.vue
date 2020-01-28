<!--
Always:
data.name
data.result
data.errors

Link:
showLink			flag
data.linkTarget		relative url to point to
data.linkText		text to display

Parent:
showParent				flag
data.parent				result
data.parentDelta		result in %
data.parentHigherWorse	higher is worse-flag

Baseline:
showBaseline				flag
data.baseline				result
data.baselineDelta			result in %
data.baselineHigherWorse	higher is worse-flag

History:
data.run	current run
data.test	current test
-->
<template>
  <tr :class="{ 'text-muted': data.result === '-' }">
    <td>
      <template v-if="showLinks">
        <!-- <font-awesome-icon
          v-if="data.errors > 0"
          icon="exclamation-circle"
          class="text-danger"
          fixed-width
          :title="`${data.errors} errors encountered`"
        /> -->
        <router-link
          :class="{ 'offline text-muted': data.result === '-' }"
          :to="data.linkTarget"
          append
        >
          {{ data.linkText }}
        </router-link> <a
          v-if="showExpander && somethingChanged"
          data-toggle="collapse"
          :href="`#files-${data.test}`"
          role="button"
          @click="detailRequest( data.test, 'all' )"
        ><small>[hits]</small></a>
        <a
          v-if="showExpander && somethingChanged"
          data-toggle="collapse"
          :href="`#files-${data.test}`"
          role="button"
          @click="detailRequest( data.test, 'diff' )"
        ><small class="pl-2">[diff]</small></a>
        <!-- <div>foo▲▼</div> -->
      </template>
      <span v-else>{{ data.name }}</span>
    </td>
    <td>
      <highcharts
        v-if="showHistory && showSparklines"
        :ref="`chart-${data.test}`"
        :callback="chartLoaded"
        class="chart"
        :options="chartOptions"
      />
    </td>
    <td>{{ data.result }}</td>
    <template v-if="showParent">
      <td>{{ ( data.parent === undefined ) ? '-' : data.parent }}</td>
      <td :class="percentageColors( data.parentDelta, data.parentHigherWorse )">
        {{ data.parentDelta | prettyPercentage }}
      </td>
    </template>
    <template v-if="showBaseline">
      <td>{{ ( data.baseline === undefined ) ? '-' : data.baseline }}</td>
      <td :class="percentageColors( data.baselineDelta, data.baselineHigherWorse )">
        {{ data.baselineDelta | prettyPercentage }}
      </td>
    </template>
    <td
      v-if="showHistory"
    >
      <router-link
        class="offline"
        :class="{ 'text-muted': data.result === '-' }"
        :to="
          `/runs/${data.run}/matrix/${data.test}`"
      >
        Matrix
      </router-link>
      <router-link
        class="offline"
        :class="{ 'text-muted': data.result === '-' }"
        :to="`/runs/${data.run}/plot/${data.test}`"
      >
        Plot
      </router-link>
    </td>
  </tr>
</template>

<script>

import { Chart } from 'highcharts-vue';


export default {

	name: 'ResultsTableRow',

	components: {
		highcharts: Chart
	},

	filters: {

		prettyPercentage: function ( number ) {

			if ( number === '-' )
				return '-';

			const value = ( number * 100 ).toFixed( 2 );

			if ( number > 0 )
				return '-' + value;
			else if ( number < 0 )
				return '+' + Math.abs( value );
			else if ( number === 0 )
				return '±0.00';
			else
				return '-';

		}

	},

	props: {
		'data': {
			type: Object,
			default: () => ( { } )
		},
		'showHistory': {
			type: Boolean,
			default: false
		},
		'showParent': {
			type: Boolean,
			default: false
		},
		'showBaseline': {
			type: Boolean,
			default: false
		},
		'showLinks': {
			type: Boolean,
			default: false
		},
		'showExpander': {
			type: Boolean,
			default: false
		}
	},

	data: function () {

		return {
			// updateArgs: [ true, true, { duration: 1000 } ],
			chartOptions: {
				chart: {
					backgroundColor: null,
					borderWidth: 0,
					type: 'area',
					margin: [ 2, 0, 2, 0 ],
					width: 120,
					height: 20,
					style: {
						overflow: 'visible'
					},
					overflow: 'visible',

					// small optimalization, saves 1-2 ms each sparkline
					skipClone: true
				},
				            title: {
					text: ''
				},
				credits: {
					enabled: false
				},
				xAxis: {
					labels: {
						enabled: false
					},
					title: {
						text: null
					},
					startOnTick: false,
					endOnTick: false,
					tickPositions: [],

					// plotLines: [ {
					// 	color: '#FF0000',
					// 	width: 2,
					// 	value: 2
					// } ]

				},
				yAxis: {
					endOnTick: false,
					startOnTick: false,
					labels: {
						enabled: false
					},
					title: {
						text: null
					},
					tickPositions: [ 0 ]
				},
				legend: {
					enabled: false
				},
				tooltip: {
					hideDelay: 0,
					outside: true,
					shared: true
				},
				plotOptions: {
					series: {
						animation: false,
						lineWidth: 1,
						shadow: false,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						marker: {
							radius: 1,
							states: {
								hover: {
									radius: 2
								}
							}
						},
						fillOpacity: 0.25
					},
					column: {
						negativeColor: '#910000',
						borderColor: 'silver'
					}
				},
				series: [ {
					data: [],
					pointStart: 0
				} ],
				// tooltip: {
				// 	headerFormat: '{point.y} @',
				// 	pointFormat: '<b>{point.name}</b>'
				// }
				tooltip: {
					formatter: function () {

						// console.log( this.point );

						return `${this.point.name}: ${this.point.y}`;

					}
				},
			}
		};

	},

	computed: {

		// check whether there's actually something noteworthy going on
		somethingChanged: function () {

			return this.data.result !== '-' // we have an up-to-date result
				&& (
					( this.data.parentDelta && this.data.parentDelta !== 0 ) // something changed between parent and current run
					||
					( this.data.baselineDelta && this.data.baselineDelta !== 0 ) // or between baseline and current run
				);

		},

		showSparklines: function () {

			return this.data.result !== '-' || this.data.parent !== '-' || this.data.baseline !== '-';

		}

	},

	watch: {

		data( newValue ) {

			if ( newValue && typeof newValue[ 'history' ] !== 'undefined' && newValue.history && newValue.history.length > 0 ) {

				this.chartOptions.series[ 0 ].data = this.data.history;

			}

		}

	},

	methods: {

		detailRequest( test, amount ) {

			this.$eventBus.$once( 'detailRepl', ( rows ) => {

				console.log( rows, 'received' );

			} );

			this.$eventBus.$emit( 'detailReq', { test, amount } );

		},

		percentageColors( value, higherIsWorse = true ) {

			let sign;

			if ( value === 0 )
				return 'diff-neutral';

			if ( higherIsWorse )
				sign = ( value < 0 ) ? 'pos' : 'neg';
			else
				sign = ( value < 0 ) ? 'neg' : 'pos';

			const steps = Math.floor( Math.abs( value ) / 0.01 ); // ?

			if ( steps >= 9 )
				return `diff-${sign}-9`;
			else
				return `diff-${sign}-${steps}`;

		},


		chartLoaded( chart ) {

			chart.renderTo.style.overflow = 'visible';

			console.log( 'chart loaded' );

			if ( typeof this.data[ 'history' ] !== 'undefined' && this.data.history && this.data.history.length > 0 ) {

				this.chartOptions.series[ 0 ].data = this.data.history;

			}

		}

	}

};
</script>

<style scoped>
.highcharts-tooltip>span {
	opacity: 1;
    background: white;
    border: 1px solid silver;
    border-radius: 3px;
    box-shadow: 1px 1px 2px #888;
    padding: 8px;
}

tr > th:first-of-type { text-align: left; }
tr > td:first-of-type { text-align: left; }
td > a:first-of-type { padding-right: 1rem!important; }
a.offline { text-decoration-line: line-through }

.diff-neutral { color: darkgray };
.diff-neg-0 { color: black; background-color: #FFFFFF }
.diff-neg-1 { color: black; background-color: #FFE0E0 }
.diff-neg-2 { color: black; background-color: #FFD0D0 }
.diff-neg-3 { color: black; background-color: #FFC0C0 }
.diff-neg-4 { color: black; background-color: #FFB0B0 }
.diff-neg-5 { color: black; background-color: #FFA0A0 }
.diff-neg-6 { color: black; background-color: #FF9090 }
.diff-neg-7 { color: black; background-color: #FF8080 }
.diff-neg-8 { color: black; background-color: #FF7070 }
.diff-neg-9 { color: black; background-color: #FF0000 }
.diff-pos-0 { color: black; background-color: #FFFFFF }
.diff-pos-1 { color: black; background-color: #EEFFEE }
.diff-pos-2 { color: black; background-color: #D0FFD0 }
.diff-pos-3 { color: black; background-color: #C0FFC0 }
.diff-pos-4 { color: black; background-color: #B0FFB0 }
.diff-pos-5 { color: black; background-color: #A0FFA0 }
.diff-pos-6 { color: black; background-color: #90FF90 }
.diff-pos-7 { color: black; background-color: #80FF80 }
.diff-pos-8 { color: black; background-color: #70FF70 }
.diff-pos-9 { color: black; background-color: #00FF00 }

</style>
