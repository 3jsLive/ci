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

	name: 'LinterEslintJsFiles',

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

			apiSection: 'linterEslintJsFiles',

			route: 'linterEslintJsFiles',

			tableHeaders: [ {
				name: 'line', label: 'Line', sortable: true
			}, {
				name: 'severity', label: 'Type', sortable: true
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'ruleId', label: 'RuleId', sortable: true
			} ]

		};

	}

};
</script>

<style>
</style>
