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
  <a
    tabindex="0"
    href="#"
    :class="textClasses"
    @mouseover="active = true"
    @mouseout="active = false"
  >
    <slot
      name="suggestion"
      v-bind="{ data: data, htmlText: htmlText }"
    >
      <span v-html="htmlText" />
    </slot>
  </a>
</template>

<script>
export default {
	name: 'VueBootstrapTypeaheadListItem',

	props: {
		data: {},
		htmlText: {
			type: String
		},
		backgroundVariant: {
			type: String
		},
		textVariant: {
			type: String
		}
	},

	data() {

		return {
			active: false
		};

	},

	computed: {
		textClasses() {

			let classes = '';
			classes += this.active ? 'active' : '';
			classes += this.backgroundVariant ? ` bg-${this.backgroundVariant}` : '';
			classes += this.textVariant ? ` text-${this.textVariant}` : '';
			return `vbst-item list-group-item list-group-item-action ${classes}`;

		}
	}
};
</script>
