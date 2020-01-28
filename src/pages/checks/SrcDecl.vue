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
    <!-- <div
        v-if="currentFile !== '' && content.results[ currentFile ] && ( content.results[ currentFile ].results.length > 0 || content.results[ currentFile ].errors.length > 0 )"
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      > -->
    <div class="flex-column flex-fill overflow-auto">
      <WarningErrorMembers
        :data="content.results[ currentFile ]"
        title=""
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

	name: 'SrcDecl',

	components: {
		FilesList,
		WarningErrorMembers
	},

	props: {
	},

	data: function () {

		return {
			shortnameToTableCaption: {
				onlySource: 'Only in the source file',
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

				let counter;

				if ( this.content.results[ file ].results.length === 0 )
					counter = 0;
				else
					counter = this.content.results[ file ].results[ 0 ].onlySource.methods.length +
					this.content.results[ file ].results[ 0 ].onlyDecl.methods.length +
					this.content.results[ file ].results[ 0 ].onlySource.properties.length +
					this.content.results[ file ].results[ 0 ].onlyDecl.properties.length;

				all[ file ] = {
					hide: ( counter === 0 && this.content.results[ file ].errors.length === 0 ),
					name: file,
					decoration: { text: counter, class: 'bg-warning' },
					error: this.content.results[ file ].errors.length > 0,
					warning: false
				};

				return all;

			}, {} );

		}

	},

};
</script>
