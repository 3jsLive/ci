<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="fileslistplain-container flex-shrink-1 mb-3 d-flex flex-column"
    :class="{ 'flex-grow-1': grow, 'flex-grow-0': ! grow }"
    :style="{ 'height': ( grow === false ) ? 'auto' : '18%' }"
  >
    <div
      class="py-1 text-center fileslistplain-title"
    >
      {{ title }}
    </div>
    <div style="overflow: hidden auto;">
      <ul class="list-group list-group-flush mt-0">
        <template v-for="item in allItems">
          <li
            v-if="item.header === true"
            :key="category + '-header-' + item.text"
            class="list-group-item py-1"
          >
            <span><b>{{ item.text }}</b></span>
          </li>
          <button
            v-else
            :key="category + '-' + item"
            type="button"
            class="list-group-item-action list-group-item d-flex justify-content-between align-items-center py-1"
            :class="{ active: value === item }"
            :value="item"
            @mousedown="$emit('input', item)"
          >
            <span>{{ item }}</span>
          </button>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>

export default {

	name: 'FilesListPlain',

	components: {},

	props: {
		'items': { type: Array, default: () => ( [] ) },
		'title': { type: String, default: 'title here' },
		'category': { type: String, default: 'category' },
		'value': { type: String, default: 'ALL' },
		'grow': { type: Boolean, default: true }
	},

	data: function () {

		return {};

	},

	computed: {

		allItems: function () {

			return [ 'ALL', ...this.items ];

		}
	}

};
</script>

<style scoped>

.fileslistplain-container {
	/* border: 1px solid black; */

	overflow: hidden auto;
	/* height: 18%; */
	width: 26em;

	border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.fileslistplain-title {
	background-color: rgba(0,0,0,.03);
	position: sticky;
	top: 0;
}

.list-group-item { font-size: small }


</style>
