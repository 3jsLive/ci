<template>
  <base-linter
    :filename="filename"
    :run="run"
    :table-headers="tableHeaders"
    :api-section="apiSection"
    :route="route"
  />
</template>

<script>
const BaseLinter = () => import( /* webpackChunkName: "BaseLinter" */ './BaseLinter.vue' );

export default {

	name: 'LinterDoobsDoc',

	components: {
		BaseLinter
	},

	props: {
		'filename': {
			type: String,
			default: ''
		},
		'run': {
			type: Number,
			default: 1,
			required: true
		}
	},

	data: function () {

		return {

			apiSection: 'linterDoobsDoc',

			route: 'linterDoobsDoc',

			tableHeaders: [ {
				name: 'line', label: 'Line', sortable: true
			}, {
				name: 'level', label: 'Level', sortable: true
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'ruleId', label: 'RuleId', sortable: true
			} ]

		};

	}

};
</script>

<style scoped>
</style>
