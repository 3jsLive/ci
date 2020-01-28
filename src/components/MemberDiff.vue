<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <h4 class="text-center text-capitalize">
      {{ title }}
    </h4>
    <div class="d-flex overflow-hidden">
      <template v-for="( shortname, index ) in Object.keys( contentObj ).filter( shortname => ignoredNames.includes( shortname ) === false )">
        <div
          :key="index"
          class="d-flex flex-fill h-100"
        >
          <table


            class="h-100 m-2 table"
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
        </div>
      </template>
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
