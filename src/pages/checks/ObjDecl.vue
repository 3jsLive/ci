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
        v-if="content.results[ filename ]"
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <WarningErrorMembers
          :data="content.results[ filename ]"
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

// const API_URL = 'http://localhost:8855';
const API_URL = '/api';


export default {

	name: 'ObjDecl',

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
				onlySource: 'Only on the object',
				onlyDecl: 'Only in the declaration file'
			}

		};

	},

	computed: {

		revision: function () {

			return this.runInfo.sha;

		},

		instanceProps: function () {

			if ( ! this.content.results[ this.filename ] )
				return [];

			return this.content.results[ this.filename ].results[ 0 ].onlySource.properties.map( prop => {

				return { name: this.content.results[ this.filename ].results[ 0 ][ 'class' ] + '.' + prop.name, legacy: prop.legacy };

			} );

		},

		declProps: function () {

			if ( ! this.content.results[ this.filename ] )
				return [];

			return this.content.results[ this.filename ].results[ 0 ].onlyDecl.properties.map( prop => {

				return { name: this.content.results[ this.filename ].results[ 0 ][ 'class' ] + '.' + prop.name, legacy: prop.legacy };

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

				this.$router.push( { name: 'objdecl', params, query } );

			}

		},

		revision: async function ( rev ) {

			if ( rev && rev.length > 0 ) {

				if ( ! this.content || Object.keys( this.content ).length === 0 ) {

					this.content = { "Loading...": true };

					const raw = await this._fetchFilesOfRevision( this.revision );

					this.content = Object.keys( raw.results ).reduce( ( all, file ) => {

						const classes = raw.results[ file ].results.map( r => r.name ) || [ file ];

						classes.forEach( ( klass, index ) => {

							all.results[ `${file} : ${klass}` ] = {
								errors: raw.results[ file ].errors,
								results: [ { 'class': klass, ...raw.results[ file ].results[ index ] } ]
							};

						} );

						return all;

					}, { errors: [], results: {} } );


				} else
					console.log( 'content already loaded' );

			} else {

				this.content = '';

			}

		}

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

			return fetch( `${API_URL}/odd-viewer/showFile/${rev}` )
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
