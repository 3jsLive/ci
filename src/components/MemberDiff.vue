<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="d-flex flex-column flex-fill">
    <h4 class="text-center text-capitalize">
      {{ title }}
    </h4>
    <div class="d-flex flex-row">
      <div class="flex-fill d-flex flex-row">
        <template v-for="( shortname, index ) in Object.keys( contentObj ).filter( shortname => ignoredNames.includes( shortname ) === false )">
          <table

            :key="index"
            class="table m-2"
            :style="`width: ${100 / Object.keys( contentObj ).filter( shortname => ignoredNames.includes( shortname ) === false ).length}%;`"
          >
            <thead class="thead-light">
              <tr>
                <th class="text-center">
                  {{ translationTable[ shortname ] }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="( mem, index2 ) in contentObj[ shortname ][ memberName ]">
                <tr :key="`${JSON.stringify( mem )}-${index2}`">
                  <td
                    align="center"
                    v-html="format( mem )"
                  />
                </tr>
              </template>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {

	name: 'MemberDiff',

	props: {
		contentObj: {
			type: Object,
			required: true
		},
		memberName: {
			type: String,
			required: true
		},
		translationTable: {
			type: Object,
			required: true
		},
		ignoredNames: {
			type: Array,
			required: false,
			default: ( ) => [ 'error', 'warning', 'class', 'name' ]
		},
		title: {
			type: String,
			required: true
		}

	},

	methods: {

		format( entry ) {

			let retval = '';

			if ( typeof entry === 'string' ) {

				retval += entry;

			} else if ( typeof entry === 'object' && entry.decl ) {

				retval += `<strong>${entry.decl.name}</strong><br /><em>${entry.decl.type}</em> vs. <em>${entry.docs.type}</em>`;

			} else if ( typeof entry === 'object' && entry.name ) {

				retval += entry.name;

			} else {

				retval += entry;

			}

			if ( entry.legacy && entry.legacy === true )
				retval += '<span class="ml-1 badge badge-pill badge-warning">LEGACY</span>';

			return retval;

		}

	}

};

</script>
