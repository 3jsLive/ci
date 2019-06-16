<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <FilesList
        v-if="revision && content"
        :files="filesWithCounter"
        :selected="selectedFilename"
        style="z-index: 0"
        @selected="selectedFilename = $event"
      />
      <div
        v-if="filename !== '' && ( content.results[ filename ].results.length > 0 || content.results[ filename ].errors.length > 0 )"
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <WarningErrorMembers
          :data="content.results[ filename ]"
          :title="'Results'"
          :shortname-to-table-caption="shortnameToTableCaption"
        />
      </div>
    </div>
  </div>
</template>

<script>

import WarningErrorMembers from '@/src/components/WarningErrorMembers.vue';
import FilesList from '@/src/components/FilesList.vue';

// const API_URL = 'http://localhost:8855';
const API_URL = '/api';


export default {

	name: 'DocsDecl',

	components: {
		WarningErrorMembers,
		FilesList
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

			runInfo: {},

			content: '',

			selectedFilename: '',

			shortnameToTableCaption: {
				onlyDocs: 'Only in the docs',
				diff: 'In both files but with two (possibly) different types',
				onlyDecl: 'Only in the declaration file'
			}

		};

	},

	computed: {

		revision: function () {

			return this.runInfo.sha;

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
					counter = this.content.results[ file ].results[ 0 ].diff.methods.length +
					this.content.results[ file ].results[ 0 ].onlyDocs.methods.length +
					this.content.results[ file ].results[ 0 ].onlyDecl.methods.length +
					this.content.results[ file ].results[ 0 ].diff.properties.length +
					this.content.results[ file ].results[ 0 ].onlyDocs.properties.length +
					this.content.results[ file ].results[ 0 ].onlyDecl.properties.length;

				all[ file ] = {
					hide: ( counter === 0 && this.content.results[ file ].errors.length === 0 ),
					name: file,
					decoration: { text: counter, class: 'bg-warning' },
					error: this.content.results[ file ].errors.length > 0,
					warning: false //this.content[ file ].warning
				};

				return all;

			}, {} );

		}

	},

	watch: {

		filename: function () {

			this.selectedFilename = this.filename;

		},

		// selected filename changed, update nagivation
		selectedFilename: function ( /* file */ ) {

			if ( this.filename !== this.selectedFilename ) {

				const params = { run: this.run };

				const query = ( this.selectedFilename ) ? { filename: this.selectedFilename } : {};

				this.$router.push( { name: 'docsdecl', params, query } );

			}

		},

		revision: async function ( rev ) {

			if ( rev && rev.length > 0 ) {

				if ( ! this.content || Object.keys( this.content ).length === 0 ) {

					this.content = { "Loading...": true };
					this.content = await this._fetchFilesOfRevision( this.revision );

				} else
					console.log( 'content already loaded' );

			} else {

				this.content = '';

			}

		},

	},

	created() {

		this.pullRunInfo();

		this.selectedFilename = this.filename;

	},

	methods: {

		// TODO: replace with vuex (store)
		pullRunInfo() {

			return fetch( `${API_URL}/runInfo/${this.run}` )
				.then( res => res.json() )
				.then( runInfo => {

					this.runInfo = runInfo;

					console.log( { runInfo } );

					return true;

				} )
				.catch( err => console.error( 'runInfo request:', err ) );

		},

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/ddd-viewer/showFile/${rev}` )
				.then( res => res.json() )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

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
