<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="content"
    class="d-flex h-100 overflow-hidden pb-3"
  >
    <FilesList
      v-if="content"
      :files="filesWithCounter"
      style="z-index: 0"
    />
    <!--     <div
      v-if="currentFile !== '' && ( content.results[ currentFile ].results.length > 0 || content.results[ currentFile ].errors.length > 0 )"
      class="flex-fill d-flex"
    > -->
    <div class="flex-column flex-fill overflow-auto">
      <WarningErrorMembers
        :data="content.results[ currentFile ]"
        :title="'Results'"
        :shortname-to-table-caption="shortnameToTableCaption"
      />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>

import WarningErrorMembers from '@/src/components/WarningErrorMembers.vue';
import FilesList from '@/src/components/FilesList.vue';

import { mapGetters } from 'vuex';

export default {

	name: 'DocsDecl',

	components: {
		WarningErrorMembers,
		FilesList
	},

	props: {
	},

	data: function () {

		return {

			shortnameToTableCaption: {
				onlyDocs: 'Only in the docs',
				diff: 'In both files but with two (possibly) different types',
				onlyDecl: 'Only in the declaration file'
			}

		};

	},

	computed: {

		...mapGetters( [
			'currentFile',
			'testData'
		] ),

		content: function () {

			return this.testData( this.$route.params.run, this.$route.name ) || {};

		},

		filesWithCounter: function () {

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content ).includes( 'Loading...' ) )
				return {};

			const filesAll = Object.keys( this.content.results ).sort();

			return filesAll.reduce( ( all, file ) => {

				all[ file ] = {
					hide: ( this.content.results[ file ].hits === 0 && this.content.results[ file ].errors.length === 0 ),
					name: file,
					decoration: { text: this.content.results[ file ].hits, class: 'badge-warning' },
					error: this.content.results[ file ].errors.length > 0,
					warning: false //this.content[ file ].warning
				};

				return all;

			}, {} );

		}

	},

};
</script>

<style scoped>
</style>
