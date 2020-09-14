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
          role="button"
          @click="detailRequest( data.test, 'all' )"
        ><small>[hits]</small></a>
        <a
          v-if="showExpander && somethingChanged"
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
  </tr>
</template>

<script>


export default {

	name: 'LawVsRealityRow',

	components: {

	},

	/* 	filters: {

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
*/
	props: {
		'data': {
			type: Object,
			default: () => ( { } )
		}
	},

	data: function () {

		return {

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
/*
tr > th:first-of-type { text-align: left; }
tr > td:first-of-type { text-align: left; }
td > a:first-of-type { padding-right: 1rem!important; }
a.offline { text-decoration-line: line-through }
 */
</style>
