<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div class="row flex-fill">
      <div class="col-12">
        <h1>checks-lints-src-decl-diff-viewer thingie</h1>
      </div>
    </div>
    <div class="row mb-5 justify-content-center">
      <div class="col">
        <vue-bootstrap-typeahead
          ref="search1"
          v-model="revision1"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          placeholder="works: SHA, TODO: HEAD, <branch>, <PR id>"
          prepend="Revision 1"
          @hit="changeRevision1()"
        />
      </div>
      <div class="col">
        <vue-bootstrap-typeahead
          ref="search2"
          v-model="revision2"
          :data="revisions"
          :min-matching-chars="0"
          :max-matches="revisions.length"
          size="sm"
          :disabled="secondRevActive"
          :placeholder="secondRevPlaceholder"
          prepend="Revision 2"
          @hit="changeRevision2()"
        />
      </div>
    </div>

    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <div
        class="col-3 flex-fill"
        style="height: 100%; overflow: auto;"
      >
        <ul class="list-group list-group-flush">
          <button
            v-for="( f, index ) in files1"
            :key="`${f}-${index}`"
            :ref="'entry-' + f"
            :value="f"
            :class="{ active: filename === f, 'bg-danger text-white': content1[ f ].error || false, 'bg-warning': content1[ f ].warning || false }"
            class="list-group-item-action list-group-item d-flex justify-content-between align-items-center"
            type="button"
            @mousedown="filename = f"
          >
            {{ f }}
            <!-- <span class="badge badge-pill" :class="badgeDiff.class" v-if="counts1[ f ] > 0">{{ counts1[ f ] }}</span> -->
            <span
              :class="badgeDiff( f ).class"
              class="badge badge-pill"
            >{{ badgeDiff( f ).text }}</span>
          </button>
        </ul>
      </div>

      <div
        v-if="typeof content1[ filename ] !== 'undefined'"
        class="col-9 flex-fill"
        style="height: 100%; overflow: auto;"
      >
        <WarningErrorMembers
          v-if="diff"
          :data="diff"
          :title="'Diff'"
        />

        <WarningErrorMembers
          v-if="typeof content1[ filename ] !== 'undefined' && diff.error === false"
          :data="content1[ filename ]"
          :title="'Rev1'"
        />

        <WarningErrorMembers
          v-if="typeof content2[ filename ] !== 'undefined'"
          :data="content2[ filename ]"
          :title="'Rev2'"
        />

      </div>
    </div>
  </div>
</template>

<script>

import VueBootstrapTypeahead from './components/VueBootstrapTypeahead.vue';
import MemberDiff from './components/MemberDiff.vue';
import WarningErrorMembers from './components/WarningErrorMembers.vue';
import * as justDiff from 'just-diff';

const API_URL = 'http://localhost:8855';


export default {

	name: 'SrcDecl',

	components: {
		VueBootstrapTypeahead,
		MemberDiff,
		WarningErrorMembers
	},

	data: function () {

		return {
			query1: '',
			query2: '',

			content1: '',
			content2: '',

			revision1: '',
			revision2: '',
			revisions: [],

			files1: [],
			files2: [],
			filename: '',

			shortnameToTableCaption: {
				'onlyDecl': 'Only in the declaration file',
				'onlySource': 'Only in the source file'
			}

		};

	},

	computed: {

		secondRevActive: function () {

			return ( this.revision1 ) ? false : true;

		},

		secondRevPlaceholder: function () {

			return ( this.revision1 ) ? "works: SHA, TODO: HEAD, <branch>, <PR id>" : "Please select revision 1 first";

		},

		queryMatches: function () {

			if ( this.query.length > 0 )
				return this.files
					.filter( name => name.includes( this.query ) )
					.map( name => name.replace( this.query, '___' + this.query + '___' ) );
			else
				return this.files;

		},

		counts1: function () {

			if ( this.files1.length > 0 ) {

				return this.files1.reduce( ( all, cur ) => {

					const differentName =
						this.content1[ cur ].onlySource.methods.length +
						this.content1[ cur ].onlySource.properties.length +
						this.content1[ cur ].onlyDecl.methods.length +
						this.content1[ cur ].onlyDecl.properties.length;

					all[ cur ] = differentName;

					return all;

				}, {} );

			}

			return {};

		},

		counts2: function () {

			if ( this.files2.length > 0 ) {

				return this.files2.reduce( ( all, cur ) => {

					const differentName =
						this.content2[ cur ].onlySource.methods.length +
						this.content2[ cur ].onlySource.properties.length +
						this.content2[ cur ].onlyDecl.methods.length +
						this.content2[ cur ].onlyDecl.properties.length;

					all[ cur ] = differentName;

					return all;

				}, {} );

			}

			return {};

		},

		diff: function () {

            if ( this.filename && this.revision1 && this.revision2 ) {

                if ( this.content1[ this.filename ] && this.content2[ this.filename ] ) {

                    const contentDiff = justDiff.diff( this.content1[ this.filename ], this.content2[ this.filename ] );

                    let copy = JSON.parse( JSON.stringify( this.content2[ this.filename ] ) );

                    for ( const change of contentDiff ) {

                        if ( change.path.length !== 3 )
                            console.error( 'path.length !== 3' );
                        else {

                            // temp hack
                            copy[ change.path[ 0 ] ][ change.path[ 1 ] ][ change.path[ 2 ] ] =
                                '<span class="bg-warning">[' + change.op + ']</span> ' +
                                this.content1[ this.filename ][ change.path[ 0 ] ][ change.path[ 1 ] ][ change.path[ 2 ] ];

                        }

                    }

                    console.log( copy );

                    return copy;

                }

                return { error: `Diff failed, content is missing`, warning: false, onlyDecl: [], onlySource: [] };
                
            }

            return { error: false, warning: false, onlyDecl: [], onlySource: [] };

		}

	},

	watch: {

		revision1: function ( rev ) {

			console.log( 'revision1 watcher', this.revision1, rev );

			this.files1 = [];
			this.content1 = '';

			this.filename = '';

		}

	},

	created() {

		this.pullRevisions();

		if ( this.$route.params.firstRev )
			this.revision1 = this.$route.params.firstRev;

		if ( this.$route.params.secondRev )
			this.revision2 = this.$route.params.secondRev;

		this.query1 = this.revision1;
		this.query2 = this.revision2;

	},

	mounted() {


		// this.$eventBus.$on( 'scrollme', this.scrollme );

		// console.log( 'search1', this.$refs.search1 );

		// this.$refs.search1.inputValue = this.revision1;
		// this.$refs.search1.handleHit();
		// this.$refs.search1.$refs.input.emit( 'hit', [ this.revision1 ] );


	},

	methods: {

		pullRevisions() {

			this.revision1 = '';
			this.revision2 = '';
			this.revisions = [];

			this.files1 = [];
			this.files2 = [];
			this.filename = '';

			this.content1 = [];
			this.content2 = [];

			return fetch( `${API_URL}/sdd-viewer/revisions` )
				.then( res => res.json() )
				.then( revs => {

					revs.sort( ( a, b ) => a.localeCompare( b ) );
					this.revisions = revs;

					return true;

				} )
				.catch( err => console.error( err ) );

		},

		_fetchFilesOfRevision( rev ) {

			return fetch( `${API_URL}/sdd-viewer/showFile/${rev}` )
				.then( res => res.json() )
				.catch( err => console.error( '_fetchFilesOfRevision: %o', err ) );

		},

		_pushHistory() {

			if ( ! this.revision1 ) {

				console.error( `Can't commit to history without a first revision` );
				return false;

			}

			const params = ( this.revision2 ) ? { firstRev: this.revision1, secondRev: this.revision2 } : { firstRev: this.revision1 };

			this.$router.push( { name: 'srcdecl', params } );

		},

		async changeRevision1() {

			this.files1 = [];
			this.filename = '';

			this.content1 = '';

			if ( this.revision1 ) {

				// add new revision to history
				this._pushHistory();

				// initialise content
				this.content1 = await this._fetchFilesOfRevision( this.revision1 );
				this.files1 = Object.keys( this.content1 );

			} else {

				console.error( 'changeRevision1 > %o', this.revision1 );

			}

		},

		async changeRevision2() {

			this.files2 = [];
			this.content2 = '';

			if ( this.revision2 ) {

				// add new revision to history
				this._pushHistory();

                // initialise content
				this.content2 = await this._fetchFilesOfRevision( this.revision2 );
				this.files2 = Object.keys( this.content2 );

			} else {

				console.error( 'changeRevision2 > %o', this.revision2 );

			}

		},

		scrollToMe: function ( ) {

			this.$refs[ 'entry-' + this.filename ][ 0 ].scrollIntoView( { behavior: "smooth", block: "center" } );

		},

		badgeDiff: function ( filename ) {

			if ( this.revision1 && this.revision2 ) {

				const match1 = typeof this.counts1[ filename ] !== 'undefined';
				const match2 = typeof this.counts2[ filename ] !== 'undefined';

				if ( match1 === true && match2 === false )
					return { class: 'badge-secondary', text: 'rev1 only' + this.counts1[ filename ] };
				else if ( match1 === false && match2 === true )
					return { class: 'badge-secondary', text: this.counts2[ filename ] + 'rev2 only' };
				else if ( match1 === true && match2 === true ) {

					// const diff = this.counts1[ filename ] - this.counts2[ filename ];

                    return { class: 'badge-success', text: 'Changes!' };
					// if ( diff > 0 )
					// 	return { class: 'badge-success', text: '<< ' + diff };
					// else if ( diff < 0 )
					// 	return { class: 'badge-danger', text: diff + ' >>' };
					// else
					// 	return { class: 'badge-secondary', text: '- 0 -' };

				}

			}

			return { class: 'd-none', text: '' };

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
