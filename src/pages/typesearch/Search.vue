<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="content"
    class="d-flex flex-grow-1"
  >
    <div class="flex-grow-0">
      <div
        class="d-flex flex-column justify-content-start"
        selected="selected"
        style="z-index: 0; height: 100%;"
      >
        <h4 class="text-center">
          Filters
        </h4>
        <FilesListPlain
          v-model="activeExample"
          category="examples"
          title="Example file"
          :items="examples"
        />
        <FilesListPlain
          v-model="activeSource"
          category="sources"
          title="Source file"
          :items="sources"
        />
        <FilesListPlain
          v-model="activeType"
          category="types"
          title="Type name"
          :items="types"
        />
        <FilesListPlain
          v-model="activeFunction"
          category="functions"
          title="Function name"
          :items="functions"
        />
        <FilesListPlain
          v-model="activeCategory"
          category="categories"
          title="Category"
          :items="categories"
          :grow="false"
        />
      </div>
    </div>
    <div
      class="flex-fill d-flex flex-column align-items-center ml-3 mb-3"
    >
      <!-- <div
        v-if="showError !== false"
        class="alert alert-danger text-center"
        role="alert"
      >
        <strong>Error</strong><br>{{ showError }}
      </div>
      <template
        v-if="filteredContent && showError === false"
      >
        <h4 class="text-center">
          {{ resultsHeadline }}
        </h4>

        <div
          id="results-container"
        >
          <ul
            class="list-group list-group-flush"
          >
            <ResultsRowItem
              v-for="(item, index) in filteredContent"
              :key="`result-${index}-${item.name}`"
              :item="item"
              :sha="sha"
            />
          </ul>
        </div>
      </template> -->
      <h4 class="text-center">
        {{ resultsHeadline }}
      </h4>
      <div
        id="results-container"
      >
        <DynamicScroller
          :items="filteredContent"
          :min-item-size="156"
          :min-item-height="156"
          class="scroller"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :key-field="index"
              :item="item"
              :active="active"
              :size-dependencies="[
                item.params,item.retval,item.examples /* *** */
              ]"
              :data-index="index"
              class="message"
              :tag="'div'"
            >
              <ResultsRowItem
                :key="`result-${index}-${item.name}`"
                :item="item"
                :sha="sha"
              />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </div>
    </div>
  </div>
</template>

<script>

const FilesListPlain = () => import( /* webpackChunkName: "FilesListPlain" */ '@/src/components/FilesListPlain.vue' );
const ResultsRowItem = () => import( /* webpackChunkName: "TypesearchResultsRow" */ '@/src/components/TypesearchResultsRow.vue' );

import { mapGetters } from 'vuex';

/**
 * @typedef {{ line: number, column: number, file: number }} original
 * @typedef {{ name: string, start: number, startLineNumber: number }} func
 * @typedef {{ name: string, type: string[], symbol: Symbol, pos: any }} param
 * @typedef {{ example: string, func: func, params: param[], retval: string[], line: string, original: original }} filledResult
 * @typedef {{ example: number, func: number, params: number[], retval: number[], line: number, original: number }} normedResult
 */
export default {

	name: 'TypesearchSearch',

	components: {
		ResultsRowItem,
		FilesListPlain
	},

	data: function () {

		return {

			activeExample: 'ALL',
			activeSource: 'ALL',
			activeType: 'ALL',
			activeFunction: 'ALL',
			activeCategory: 'ALL'

		};

	},

	computed: {

		sha: function () {

			return this.runInfo( this.$route.params.run ).sha;

		},

		/**
		 * @returns {{ _examples: string[], _lines: string[], _files: string[], _originals: original[], _functions: func[], _params: param[], _types: string[], results: normedResult[]}}
		 */
		content: function () {

			return this.testData( this.$route.params.run, this.$route.name ) || [];

		},

		/**
		 * @returns {filledResult[]}
		 */
		filledContent: function () {

			if ( ! this.content.results )
				return [];

			return this.content.results.map( result => {

				// basics
				const ret = JSON.parse( JSON.stringify( {
					func: this.content[ "_functions" ][ result.func ],
					params: result.params,
					retval: result.retval,
					line: this.content[ "_lines" ][ result.line ],
					original: this.content[ "_originals" ][ result.original ],
					// example: result.file ***
					examples: ( Array.isArray( result.file ) ) ? result.file : [ result.file ]
				} ) );

				// extended
				ret.original.file = this.content[ '_files' ][ ret.original.file ].slice( 0 );
				ret.params.forEach( ( p, idx ) => {

					ret.params[ idx ] = { ...this.content[ '_params' ][ p.p ], types: p.t.map( t => this.content[ '_types' ][ t ] ) };

				} );
				ret.retval = ret.retval.map( r => this.content[ "_types" ][ r ] );

				return ret;

			} );

		},

		/**
		 * @returns {normedResult}
		 */
		filteredContent: function () {

			if ( ! this.filledContent )
				return [];

			let results = this.filledContent;

			// ***
			// if ( this.activeExample !== 'ALL' )
			//  	results = results.filter( r => r.example === this.activeExample );
			if ( this.activeExample !== 'ALL' )
				results = results.filter( r => r.examples.indexOf( this.activeExample ) !== - 1 );
			// ***

			if ( this.activeSource !== 'ALL' )
				results = results.filter( r => r.original.file === this.activeSource );

			if ( this.activeFunction !== 'ALL' )
				results = results.filter( r => r.func.name === this.activeFunction );

			if ( this.activeType !== 'ALL' ) {

				if ( this.activeCategory === 'ALL' )
					results = results.filter( r => r.retval.indexOf( this.activeType ) !== - 1 || this._paramTypesOfResult( r ).indexOf( this.activeType ) !== - 1 );
				else if ( this.activeCategory === 'Parameter' )
					results = results.filter( r => this._paramTypesOfResult( r ).indexOf( this.activeType ) !== - 1 );
				else if ( this.activeCategory === 'Return' )
					results = results.filter( r => r.retval.indexOf( this.activeType ) !== - 1 );

			}

			return results.map( ( r, i ) => ( { id: i, ...r } ) );

		},

		resultsHeadline: function () {

			if ( ! this.filteredContent )
				return '---';

			const shownResults = this.filteredContent.length;

			return ( shownResults !== 1 ) ? `${shownResults} Results` : `${shownResults} Result`;

		},

		examples: function () {

			if ( ! this.filteredContent )
				return false;

			if ( this.activeExample !== 'ALL' )
				return [ this.activeExample ];

			return this.filteredContent
				.reduce( ( all, obj ) => {

					// all.push( obj.example ); ***
					all.push( ...obj.examples );
					return all;

				}, [] )
				.filter( ( x, i, a ) => a.indexOf( x ) === i )
				.sort( ( a, b ) => a.localeCompare( b ) );

		},

		sources: function () {

			const currentFiles = this.filteredContent.map( c => c.original.file );

			const sorted = ( this.activeSource !== 'ALL' ) ? [ this.activeSource ] : currentFiles.filter( ( x, i, a ) => a.indexOf( x ) === i )
				.sort( ( a, b ) => a.toLowerCase().localeCompare( b.toLowerCase() ) );

			const startBuild = sorted.findIndex( src => src.startsWith( 'build/' ) );
			const startExamples = sorted.findIndex( src => src.startsWith( 'examples/' ) );
			const startSrc = sorted.findIndex( src => src.startsWith( 'src/' ) );

			const endExamples = ( startSrc === - 1 ) ? sorted.length : startSrc;

			const all = [];

			if ( startBuild !== - 1 )
				all.push( { header: true, text: 'build' }, ...sorted.slice( 0, startBuild + 1 ) );
			if ( startExamples !== - 1 )
				all.push( { header: true, text: 'examples' }, ...sorted.slice( startExamples, endExamples ) );
			if ( startSrc !== - 1 )
				all.push( { header: true, text: 'source' }, ...sorted.slice( startSrc ) );

			return all;

		},

		types: function () {

			if ( this.activeType !== 'ALL' )
				return [ this.activeType ];

			const params = this.filteredContent.map( c => c.params );
			const currentTypes = params.reduce( ( total, ps ) => total.concat( ps.reduce( ( all, p ) => all.concat( p.types ), [] ) ), [] );

			return currentTypes
				.filter( ( x, i, a ) => a.indexOf( x ) === i )
				.sort( ( a, b ) => a.toLowerCase().localeCompare( b.toLowerCase() ) );

		},

		functions: function () {

			if ( this.activeFunction !== 'ALL' )
				return [ this.activeFunction ];

			return this.filteredContent
				.map( c => c.func.name )
				.filter( ( x, i, a ) => a.indexOf( x ) === i )
				.sort( ( a, b ) => a.toLowerCase().localeCompare( b.toLowerCase() ) );

		},

		categories: function () {

			return [ 'Parameter', 'Return' ]; // TODO: adapt to filteredContent?

		},

		showError: function ( ) {

			// if ( this.content && this.currentFile &&
			// 	this.content.results &&
			// 	this.content.results[ this.currentFile ] &&
			// 	this.content.results[ this.currentFile ].errors.length > 0
			// ) {

			// 	const errors = this.content.results[ this.currentFile ].errors;

			// 	const errorsText = errors.map( err => {

			// 		if ( err.message )
			// 			return err.message;
			// 		else
			// 			return err;

			// 	} ).join( '<br />' );

			// 	return errorsText;

			// }

			return false;

		},

		...mapGetters( [
			'currentFile',
			'testData',
			'runInfo'
		] )

	},

	methods: {

		'_paramTypesOfResult': function ( result ) {

			const params = result.params.reduce( ( all, paramObj ) => {

				all.push( ...paramObj.types );
				return all;

			}, [] );

			return params;


		}

	}

};
</script>

<style scoped>

.scroller {
  height: 100%;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 5px 0 5px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0,0,0,.125); width: 100%
}


#results-container {
	border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
	overflow: auto;
	width: 100%;
	height: 100%;
}

#results-container .list-group-item { font-size: medium }

main {
	overflow: auto!important;
}
</style>
