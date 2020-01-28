<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="trrTable ml-3">
    <div class="trrRow">
      <div class="trrHead">
        Function name
      </div>
      <div class="trrCell">
        {{ item.func.name }}
      </div>
    </div>
    <div class="trrRow">
      <div class="trrHead">
        Called from example
      </div>
      <div class="trrCell">
        <!-- *** {{ item.example }} -->
        {{ ( item.examples.length > 5 ) ? `${item.examples.slice( 0, 4 ).join( ', ')} and ${item.examples.length - 4} more` : item.examples.join( ', ' ) }}
      </div>
    </div>
    <div class="trrRow">
      <div class="trrHead">
        Resolved Location
      </div>
      <div
        class="trrCell"
        v-html=" `${item.original.file} (Line ${item.original.line} <a href='https://github.com/mrdoob/three.js/blob/${sha}/${item.original.file}#L${item.original.line}'>@ GitHub</a>)`"
      />
    </div>
    <div class="trrRow">
      <div class="trrHead">
        First line
      </div>
      <div class="trrCell">
        <code>{{ item.line }}</code>
      </div>
    </div>
    <div class="trrRow">
      <div class="trrHead">
        Parameters and seen types
      </div>
      <div class="trrCell">
        <ol class="pl-3 mb-0">
          <li
            v-for="(p, pIndex) in item.params"
            :key="p.name + pIndex"
          >
            {{ p.name + ' - ' + p.types.join( ' | ' ) }}
          </li>
        </ol>
      </div>
    </div>
    <div class="trrRow">
      <div class="trrHead">
        Seen return types
      </div>
      <div class="trrCell">
        {{ item.retval.join( ' | ' ) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>

<script>

export default {

	name: 'TypesearchResultsRow',

	props: {
		sha: { type: String, default: 'dev' },
		item: { type: Object, default: () => ( { } ) }
	},

	data: function () {

		return {};

	}

};
</script>

<style scoped>

.trrTable{
	display: table;
	width: auto;
	/* display: flex; */
	    border-collapse: collapse;
		border: none;
}
.trrRow {
	display: table-row;
}
.trrCell {
	display: table-cell;
	padding: 0 0 0 0px;

}
.trrHead {
	display: table-cell;
	padding: 0 15px 0 0;
	text-align: right;
	font-weight: bold;
	font-size: medium;
	color: #495057;
	white-space: nowrap;

}
</style>
