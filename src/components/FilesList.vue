<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="h-75"
  >
    <h4 class="text-center">
      Files
    </h4>
    <div class="input-group mb-1 input-group-sm pl-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Filter</span>
      </div>
      <input
        v-model="query"
        type="search"
        class="form-control"
        placeholder="Type to filter by name"
      >
    </div>
    <div
      id="files-container"
      :ref="'filesContainer'"
      class="overflow-auto h-100 ml-3"
    >
      <ul
        class="list-group h-100"
      >
        <button
          v-for="( f, index ) in queryMatches()"
          :key="`${f.raw}-${index}`"
          :ref="f.raw"
          type="button"
          class="list-group-item-action list-group-item d-flex justify-content-between align-items-center py-1"
          :class="{ active: selectedFilename === f.raw, 'bg-warning text-dark': f.warning || false, 'bg-danger text-white': f.error || false }"
          @mousedown="mousedown( f.raw )"
        >
          <span v-html="f.markup" />
          <span
            v-if="f.decoration && ! f.error"
            :class="[{ 'text-dark': selectedFilename === f.raw }, f.decoration.class ]"
            class="badge btn-lg badge-pill"
          >{{ f.decoration.text }}</span>
        </button>
      </ul>
    </div>
  </div>
</template>

<script>

// import Vue from 'vue';
// import { setTimeout } from 'timers';

export default {

	name: 'FilesList',

	components: { },

	props: {
		// {
		//   'docs/foo.html': { hide: true, name: 'docs/foo.html', decoration: { class: 'bg-primary', text: 'foo' } } },
		//   'docs/bar.html': { hide: false, name: 'docs/bar.html', decoration: false, error?: '', warning?: '' },
		//   ...
		// }
		'files': {
			type: Object,
			default: () => ( {} )
		},
		'selected': {
			type: String,
			default: ''
		}
	},

	data: function () {

		return {

			query: '',
			selectedFilename: ''

		};

	},

	watch: {

		selected: function () {

			this.selectedFilename = this.selected;

		}

	},

	created() {

		this.selectedFilename = this.selected;

	},

	mounted() {

		this.selectedFilename = this.selected;

		// Vue.nextTick()
		// .then( () => {

		// oh god
		if ( this.selectedFilename )
			return setTimeout( () => this.$refs[ this.selectedFilename ][ 0 ].scrollIntoView(), 500 );

		// } );

	},

	methods: {

		mousedown: function ( raw ) {

			this.selectedFilename = raw;

			this.$emit( 'selected', raw );

		},

		queryMatches: function () {

			let matches;

			// first: apply query filter
			if ( this.query.length > 0 ) {

				const matchRx = new RegExp( '(' + this.query + ')', 'gi' );

				matches = Object.values( this.files )

					// wants to be hidden
					.filter( file => ! file.hide )

					// filter by actual matches (case insensitive)
					.filter( file => file.name.toLowerCase().includes( this.query.toLowerCase() ) )

					// highlight query-hits
					.map( file => ( {
						raw: file.name,
						markup: file.name.replace( matchRx, '<b>$1</b>' ),
						...file
					} ) );

			} else {

				// or don't, just adapt to expected format
				matches = Object.values( this.files ).filter( file => ! file.hide ).map( file => ( {
					raw: file.name,
					markup: file.name,
					...file
				} ) );

			}

			return matches;

		}

	}

};
</script>

<style scoped>

</style>
