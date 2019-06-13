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

import BaseLinter from './BaseLinter.vue';

export default {

	name: 'LinterEslintCodeTags',

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

			apiSection: 'linterEslintCodeTags',

			route: 'linterEslintCodeTags',

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
