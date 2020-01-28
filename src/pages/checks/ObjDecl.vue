<template>
  <div
    id="content"
    class="d-flex flex-fill"
  >
    <FilesList
      v-if="content"
      :files="filesWithCounter"
      style="z-index: 0"
    />

    <div
      v-if="content.results[ currentFile ]"
      class="flex-fill d-flex"
    >
      <div class="d-flex flex-column flex-fill">
        <WarningErrorMembers
          :data="content.results[ currentFile ]"
          :shortname-to-table-caption="shortnameToTableCaption"
          title=""
        />
        <div
          v-if="showLegacy"
          class="row"
        >
          <div class="col">
            <span class="badge badge-pill badge-warning">LEGACY</span>: This member is referenced in <code>Three.Legacy.js</code>, likely a false positive
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import WarningErrorMembers from '@/src/components/WarningErrorMembers.vue';
import FilesList from '@/src/components/FilesList.vue';

import { mapGetters } from 'vuex';

export default {

	name: 'ObjDecl',

	components: {
		WarningErrorMembers,
		FilesList
	},

	props: {
	},

	data: function () {

		return {

			shortnameToTableCaption: {
				onlySource: 'Only on the object',
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

		instanceProps: function () {

			if ( ! this.content.results[ this.currentFile ].results )
				return [];

			return this.content.results[ this.currentFile ].results[ 0 ].onlySource.properties.map( prop => {

				return { name: this.content.results[ this.currentFile ].results[ 0 ][ 'class' ] + '.' + prop.name, legacy: prop.legacy };

			} );

		},

		declProps: function () {

			if ( ! this.content.results[ this.currentFile ] )
				return [];

			return this.content.results[ this.currentFile ].results[ 0 ].onlyDecl.properties.map( prop => {

				return { name: this.content.results[ this.currentFile ].results[ 0 ][ 'class' ] + '.' + prop.name, legacy: prop.legacy };

			} );

		},

		showLegacy: function () {

			return this.declProps.some( x => x.legacy === true ) || this.instanceProps.some( x => x.legacy === true );

		},

		filesWithCounter: function () {

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content ).includes( 'Loading...' ) )
				return {};

			const filesAll = Object.keys( this.content.results ).sort();

			return filesAll.reduce( ( all, file ) => {

				let counter;

				if ( this.content.results[ file ].results.length === 0 )
					return all;

				if ( ! this.content.results[ file ].results[ 0 ].onlySource || ! this.content.results[ file ].results[ 0 ].onlyDecl )
					counter = 0;
				else if ( ! this.content.results[ file ].results[ 0 ].onlySource.methods || ! this.content.results[ file ].results[ 0 ].onlyDecl.methods ||
						! this.content.results[ file ].results[ 0 ].onlySource.properties || ! this.content.results[ file ].results[ 0 ].onlyDecl.properties )
					return all;
				else if ( this.content.results[ file ].errors.length === 0 )
					counter = this.content.results[ file ].results[ 0 ].onlySource.methods.length +
						this.content.results[ file ].results[ 0 ].onlySource.properties.length +
						this.content.results[ file ].results[ 0 ].onlyDecl.methods.length +
						this.content.results[ file ].results[ 0 ].onlyDecl.properties.length;
				else
					counter = '???';

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

	}

};
</script>

<style scoped>
#content { height: 100%; overflow: hidden }
#content.row {
    height: 100%;
	overflow: auto;
}
</style>
