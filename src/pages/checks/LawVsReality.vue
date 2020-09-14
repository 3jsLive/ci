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
    <div
      v-if="currentFile !== '' && ( content.results[ currentFile ].results.length > 0 || content.results[ currentFile ].errors.length > 0 )"
      class="flex-column flex-fill overflow-auto"
    >
      <b>layout obviously WIP</b><br>
      <p class="border border-primary p-3">
        How to read this:<br>
        This scans parameter types and names as they're declared in the .d.ts files and compares them to the types and names the various
        functions have actually been called with in the examples. On the left are the expected types and names and on the right the logged ones.<br>
        If a type or name is <span class="bg-success">green</span> on both sides, it means we indeed came accross an example that called the function with the declared type.<br>
        If a type or name is <span class="bg-warning">yellow</span> on the left, then we saw no code that used it or we're not quite sure about type-interplay.<br>
        If a type or name is <span class="bg-danger">red</span> on the right, it doesn't match any of the possible types declared in the .d.ts<br>
        <br>
        There is some degree of heuristics going on, but occasionally it messes up - especially when it comes to type aliases or inheritance - so proceed with caution.
      </p>
      <template v-for="( result, index ) of content.results[ currentFile ].results">
        <div :key="`results-${index}`">
          <h4 v-html="`Result #${index + 1} for <code>${result.name}</code> in <span style='text-decoration: underline' title='${( Array.isArray( result.examples ) ) ? result.examples.join( '\n' ) : result.examples}'>${Array.isArray( result.examples ) ? result.examples.length : 1} examples</span>`" />
          <template v-for="( signature, csIndex ) of result.callSignatures">
            <div :key="`csIndex-${csIndex}`">
              <h5>{{ `CallSignature #${csIndex + 1} of ${result.callSignatures.length}` }}</h5>
              <template v-for="( param, paramIndex ) of signature.results">
                <div :key="`paramIndex-${paramIndex}`">
                  <!-- <h6>Law</h6> -->
                  <p class="text-monospace">
                    <span>{{ `Param #${paramIndex + 1}` }}</span>
                    &lt;<span
                      v-if="param.lawTypes.correct.length > 0"
                      class="bg-success"
                    >{{ `${param.lawTypes.correct.join( ',' )}` }}</span>
                    <span v-if="param.lawTypes.correct.length > 0 && param.lawTypes.missing.length > 0">,</span>
                    <span
                      v-if="param.lawTypes.missing.length > 0"
                      class="bg-warning"
                    >{{ `${param.lawTypes.missing.join( ',' )}` }}</span>&gt;<span :class="degreeToColor[ param.degree ]">{{ param.lawName }}</span>

                    vs

                    <!-- </p> -->
                    <!-- <h6>Reality</h6> -->
                    <!-- <p class="text-monospace"> -->
                    &lt;<span
                      v-if="param.realityTypes.correct.length > 0"
                      class="bg-success"
                    >{{ `${param.realityTypes.correct.join( ',' )}` }}</span>
                    <span v-if="param.realityTypes.correct.length > 0 && param.realityTypes.wrong.length > 0">,</span>
                    <span
                      v-if="param.realityTypes.wrong.length > 0"
                      class="bg-danger"
                    >{{ `${param.realityTypes.wrong.join( ',' )}` }}</span>&gt;<span :class="degreeToColor[ param.degree ]">{{ param.realityName }}</span>
                  </p>
                </div>
              </template>
              <template v-for="( ret, retIndex ) of result.returns">
                <div :key="`retIndex-${retIndex}`">
                  <h5>{{ `Return #${retIndex + 1}` }}</h5>
                  <p class="text-monospace">
                    &lt;<span
                      v-if="ret.lawTypes.correct.length > 0"
                      class="bg-success"
                    >{{ `${ret.lawTypes.correct.join( ',' )}` }}</span>
                    <span v-if="ret.lawTypes.correct.length > 0 && ret.lawTypes.missing.length > 0">,</span>
                    <span
                      v-if="ret.lawTypes.missing.length > 0"
                      class="bg-warning"
                    >{{ `${ret.lawTypes.missing.join( ',' )}` }}</span>&gt;

                    vs

                    &lt;<span
                      v-if="ret.realityTypes.correct.length > 0"
                      class="bg-success"
                    >{{ `${ret.realityTypes.correct.join( ',' )}` }}</span>
                    <span v-if="ret.realityTypes.correct.length > 0 && ret.realityTypes.wrong.length > 0">,</span>
                    <span
                      v-if="ret.realityTypes.wrong.length > 0"
                      class="bg-danger"
                    >{{ `${ret.realityTypes.wrong.join( ',' )}` }}</span>&gt;
                  </p>
                  <hr>
                </div>
              </template>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import FilesList from '@/src/components/FilesList.vue';

import { mapGetters } from 'vuex';

export default {

	name: 'LawVsReality',

	components: {
		FilesList
	},

	props: {
	},

	data: function () {

		return {

			degreeToColor: {
				'green': 'text-success',
				'yellow': 'text-warning',
				'red': 'text-danger '
			},

			shortnameToTableCaption: {
				lawCorrect: 'lawCorrect',
				lawMissing: 'lawMissing',
				realityCorrect: 'realityCorrect',
				realityWrong: 'realityWrong'
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

		/* cleanResults: function () {

			const results = this.content[ this.currentFile ];
			console.log( { results } );

			const r = results.results.reduce( ( all, res ) => {

				const { callSignatures: cs, errors, examples, name, original, returns } = res;

				all.push( cs.map( ( { errors, index, results } ) => {

					return {
						lawCorrect: results.map( r => r.lawTypes.correct.join( ',' ) ),
						lawMissing: results.map( r => r.lawTypes.missing.join( ',' ) ),
						realityCorrect: results.map( r => r.realityTypes.correct.join( ',' ) ),
						realityWrong: results.map( r => r.realityTypes.wrong.join( ',' ) )
					};

				} ) );

				return all;

			}, [] );

			return { errors: [], results: r };

		}, */

		filesWithCounter: function () {

			// HACK this hasn't been init'ed fully yet
			if ( Object.keys( this.content ).includes( 'Loading...' ) )
				return {};

			const filesAll = Object.entries( this.content.results );
			filesAll.sort(); // FIXME: what's this doing here?

			return filesAll.reduce( ( all, [ file, result ] ) => {

				// let counter;

				// if ( this.content.results[ file ].results.length === 0 )
				// 	counter = 0;
				// else
				// 	counter = this.content.results[ file ].results[ 0 ].diff.methods.length +
				// 	this.content.results[ file ].results[ 0 ].onlyDocs.methods.length +
				// 	this.content.results[ file ].results[ 0 ].onlyDecl.methods.length +
				// 	this.content.results[ file ].results[ 0 ].diff.properties.length +
				// 	this.content.results[ file ].results[ 0 ].onlyDocs.properties.length +
				// 	this.content.results[ file ].results[ 0 ].onlyDecl.properties.length;

				all[ file ] = {
					hide: ( result.hits === 0 && result.errors.length === 0 ),
					name: file,
					decoration: { text: result.hits, class: 'badge-warning' },
					error: result.errors.length > 0,
					warning: false //result.warnings.length > 0
				};

				return all;

			}, {} );

		}

	},

};
</script>

<style scoped>
</style>
