<template>
  <div>
    <template v-if="data.errors.length === 0">
      <MemberDiff
        v-if="countMemberEntries[ 'properties' ] && countMemberEntries[ 'properties' ] > 0"
        :content-obj="data.results[ 0 ]"
        :translation-table="shortnameToTableCaption"
        :title="'Properties ' + title"
        member-name="properties"
      />

      <MemberDiff
        v-if="countMemberEntries[ 'methods' ] && countMemberEntries[ 'methods' ] > 0"
        :content-obj="data.results[ 0 ]"
        :translation-table="shortnameToTableCaption"
        :title="'Methods ' + title"
        member-name="methods"
      />
    </template>

    <div
      v-else-if="data.errors.length !== 0"
      class="alert alert-danger"
      role="alert"
    >
      <strong class="text-uppercase">{{ "WORKER ERROR " + title }}</strong>
      <br>{{ data.errors }}
    </div>
  </div>
</template>

<script>

const MemberDiff = () => import( /* webpackChunkName: "MemberDiff" */ './MemberDiff.vue' );

export default {

	name: 'WarningErrorMembers',

	components: {
		MemberDiff
	},

	props: {
		data: {
			type: Object,
			required: true,
			// validator: obj => typeof obj.warning !== 'undefined' && typeof obj.error !== 'undefined'
		},
		title: {
			type: String,
			required: true
		},
		shortnameToTableCaption: {
			type: Object,
			required: false,
			default: () => ( {
				'onlyDecl': 'Only in the declaration file',
				'onlySource': 'Only in the source file',
				'onlyDocs': 'Only in the docs',
				'diff': 'In both files but with two (possibly) different types',
			} )
		}
	},

	data() {

		return { };

	},

	computed: {

		countMemberEntries: function () {

			let memberEntries = {};

			// e.g. 'onlyDecl' or 'onlySource'
			const shortnames = Object.keys( this.data.results[ 0 ] );

			shortnames.forEach( short => {

				if ( typeof this.shortnameToTableCaption[ short ] === 'undefined' )
					return;

				console.log( { short } );

				Object.keys( this.data.results[ 0 ][ short ] ).forEach( memberName => {

					memberEntries[ memberName ] = memberEntries[ memberName ] || 0;
					memberEntries[ memberName ] += this.data.results[ 0 ][ short ][ memberName ].length;

				} );

			} );

			return memberEntries;

		}

	}

};
</script>

<style scoped>

</style>
