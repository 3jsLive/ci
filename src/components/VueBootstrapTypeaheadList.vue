/* eslint-disable */
// based on the below
/* Copyright 2018 Alex Urquhart

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
<template>
  <div class="list-group shadow">
    <vue-bootstrap-typeahead-list-item
      v-for="(item, id) in matchedItems"
      :key="id"
      :data="item.data"
      :html-text="highlight(item.text)"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      @click.native="handleHit(item, $event)"
    >
      <template
        v-if="$scopedSlots.suggestion"
        slot="suggestion"
        slot-scope="{ data, htmlText }"
      >
        <slot
          name="suggestion"
          v-bind="{ data, htmlText }"
        />
      </template>
    </vue-bootstrap-typeahead-list-item>
  </div>
</template>

<script>
import VueBootstrapTypeaheadListItem from './VueBootstrapTypeaheadListItem.vue';

function sanitize( text ) {

	return text.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );

}

function escapeRegExp( str ) {

	return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );

}

export default {
	name: 'VueBootstrapTypeaheadList',

	components: {
		VueBootstrapTypeaheadListItem
	},

	props: {
		data: {
			type: Array,
			required: true,
			validator: d => d instanceof Array
		},
		query: {
			type: String,
			default: ''
		},
		backgroundVariant: {
			type: String
		},
		textVariant: {
			type: String
		},
		maxMatches: {
			type: Number,
			default: 10
		},
		minMatchingChars: {
			type: Number,
			default: 2
		}
	},

	computed: {
		highlight() {

			return ( text ) => {

				text = sanitize( text );
				if ( this.query.length === 0 ) {

					return text;

				}
				const re = new RegExp( this.escapedQuery, 'gi' );

				return text.replace( re, `<strong>$&</strong>` );

			};

		},

		escapedQuery() {

			return escapeRegExp( sanitize( this.query ) );

		},

		matchedItems() {

	  // *** https://github.com/alexurquhart/vue-bootstrap-typeahead/pull/40
			// If no query, but minMatchingChars is 0: return trimmed data. filter and sort are not applicable as there is no query string.
			if ( this.query.length === 0 && this.minMatchingChars === 0 ) return this.data.slice( 0, this.maxMatches );

			const re = new RegExp( this.escapedQuery, 'gi' );

			// Filter, sort, and concat
			return this.data
				.filter( i => i.text.match( re ) !== null )
				.sort( ( a, b ) => {

					const aIndex = a.text.indexOf( a.text.match( re )[ 0 ] );
					const bIndex = b.text.indexOf( b.text.match( re )[ 0 ] );

					if ( aIndex < bIndex ) {

						return - 1;

					}
					if ( aIndex > bIndex ) {

						return 1;

					}
					return 0;

				} ).slice( 0, this.maxMatches );

		}
	},

	methods: {
		handleHit( item, evt ) {

			this.$emit( 'hit', item );
			evt.preventDefault();

		}
	}
};
</script>
