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
  <div>
    <div :class="sizeClasses">
      <div
        v-if="$slots.prepend || prepend"
        ref="prependDiv"
        class="input-group-prepend"
      >
        <slot name="prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </slot>
      </div>
      <input
        ref="input"
        type="search"
        :class="`form-control ${inputClass}`"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :value="inputValue"
        autocomplete="off"
        :disabled="disabled"
        @focus="isFocused = true"
        @blur="handleBlur"
        @input="handleInput($event.target.value)"
      >
      <div
        v-if="$slots.append || append"
        class="input-group-append"
      >
        <slot name="append">
          <span class="input-group-text">{{ append }}</span>
        </slot>
      </div>
    </div>
    <vue-bootstrap-typeahead-list
      v-show="isFocused && data.length > 0"
      ref="list"
      class="vbt-autcomplete-list"
      :query="inputValue"
      :data="formattedData"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      :max-matches="maxMatches"
      :min-matching-chars="minMatchingChars"
      @hit="handleHit"
    >
      <!-- pass down all scoped slots -->
      <template
        v-for="(slot, slotName) in $scopedSlots"
        :slot="slotName"
        slot-scope="{ data, htmlText }"
      >
        <slot
          :name="slotName"
          v-bind="{ data, htmlText }"
        />
      </template>
      <!-- below is the right solution, however if the user does not provide a scoped slot, vue will still set $scopedSlots.suggestion to a blank scope
      <template v-if="$scopedSlots.suggestion" slot="suggestion" slot-scope="{ data, htmlText }">
        <slot name="suggestion" v-bind="{ data, htmlText }" />
      </template>-->
    </vue-bootstrap-typeahead-list>
  </div>
</template>

<script>
import VueBootstrapTypeaheadList from './VueBootstrapTypeaheadList.vue';
import ResizeObserver from 'resize-observer-polyfill';

export default {
	name: 'VueBootstrapTypehead',

	components: {
		VueBootstrapTypeaheadList
	},

	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: null,
			validator: size => [ 'lg', 'sm' ].indexOf( size ) > - 1
		},
		value: {
			type: String
		},
		data: {
			type: Array,
			required: true,
			validator: d => d instanceof Array
		},
		serializer: {
			type: Function,
			default: ( d ) => d,
			validator: d => d instanceof Function
		},
		backgroundVariant: String,
		textVariant: String,
		inputClass: {
			type: String,
			default: ''
		},
		maxMatches: {
			type: Number,
			default: 10
		},
		minMatchingChars: {
			type: Number,
			default: 2
		},
		placeholder: String,
		prepend: String,
		append: String
	},

	data() {

		return {
			isFocused: false,
			inputValue: this.value
		};

	},

	computed: {
		sizeClasses() {

			return this.size ? `input-group input-group-${this.size}` : 'input-group';

		},

		formattedData() {

			if ( ! ( this.data instanceof Array ) ) {

				return [];

			}
			return this.data.map( ( d, i ) => {

				return {
					id: i,
					data: d,
					text: this.serializer( d )
				};

			} );

		}
	},

	watch: {

		'value'( newValue ) {

			this.inputValue = newValue;

		}

	},

	mounted() {

		this.$_ro = new ResizeObserver( ( /* e */ ) => {

			this.resizeList( this.$refs.input );

		} );
		this.$_ro.observe( this.$refs.input );
		this.$_ro.observe( this.$refs.list.$el );

	},

	beforeDestroy() {

		this.$_ro.disconnect();

	},

	methods: {
		resizeList( el ) {

			const rect = el.getBoundingClientRect();
			const listStyle = this.$refs.list.$el.style;

			// Set the width of the list on resize
			listStyle.width = rect.width + 'px';

			// Set the margin when the prepend prop or slot is populated
			// (setting the "left" CSS property doesn't work)
			if ( this.$refs.prependDiv ) {

				const prependRect = this.$refs.prependDiv.getBoundingClientRect();
				listStyle.marginLeft = prependRect.width + 'px';

			}

		},

		handleHit( evt ) {

			if ( typeof this.value !== 'undefined' ) {

				this.$emit( 'input', evt.text );

			}

			this.inputValue = evt.text;
			this.$emit( 'hit', evt.data );
			this.$refs.input.blur();
			this.isFocused = false;

		},

		handleBlur( evt ) {

			const tgt = evt.relatedTarget;
			if ( tgt && tgt.classList.contains( 'vbst-item' ) ) {

				return;

			}
			this.isFocused = false;

		},

		handleInput( newValue ) {

			this.inputValue = newValue;

			// If v-model is being used, emit an input event
			if ( typeof this.value !== 'undefined' ) {

				this.$emit( 'input', newValue );

			}

		}
	}
};
</script>

<style scoped>
  .vbt-autcomplete-list {
    padding-top: 5px;
    position: absolute;
    max-height: 350px;
    overflow-y: auto;
    z-index: 999;
  }
</style>
