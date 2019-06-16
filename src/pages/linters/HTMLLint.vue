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

	name: 'LinterHtml',

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

			apiSection: 'linterHtml',

			route: 'linterHtml',

			tableHeaders: [ {
				name: 'line', label: 'Line', sortable: true
			}, {
				name: 'type', label: 'Type', sortable: true
			}, {
				name: 'message', label: 'Message', sortable: true
			}, {
				name: 'rule', label: 'RuleId', sortable: true, format: rule => rule.id
			} ]

		};

	}

};
</script>

<style>
</style>
