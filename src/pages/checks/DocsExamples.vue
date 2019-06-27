<template>
  <div class="container-fluid d-flex flex-column h-100">
    <div
      id="content"
      class="row d-flex align-items-stretch"
    >
      <div
        class="flex-fill h-100 ml-4 pl-0"
        style="width: 500px;overflow: scroll;max-width: 100%"
      >
        <h4 class="text-center">
          Results
        </h4>
        <DataTable
          :header-fields="tableHeaders"
          :data="tableData1"
          :css="tableCss"
        >
          <div
            slot="ExampleOrError"
            slot-scope="props"
          >
            <span v-if="props.rowData.value.example">{{ props.rowData.value.example }}</span>
            <span
              v-else
              class="alert alert-danger"
            ><strong>Error: </strong>{{ props.rowData.value.error }}</span>
          </div>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>

import { DataTable } from 'v-datatable-light';

import { mapGetters } from 'vuex';

export default {

	name: 'CheckDocsExamples',

	components: {
		DataTable
	},

	props: {
	},

	data: function () {

		return {

			tableCss: {
				table: 'table table-bordered table-hover table-striped table-center',
				th: 'header-item',
				thWrapper: 'th-wrapper',
				thWrapperCheckboxes: 'th-wrapper checkboxes',
				arrowsWrapper: 'arrows-wrapper',
				arrowUp: 'arrow up',
				arrowDown: 'arrow down',
				footer: 'footer'
			},

			tableHeaders: [ {
				name: 'page', label: 'Doc page'
			}, {
				// name: 'value', label: 'Example name', format: ( field ) => ( field.example ) ? field.example : field.error
				name: 'value', label: 'Example name', customElement: "ExampleOrError"
			} ]

		};

	},

	computed: {
		...mapGetters( [
			'testData'
		] ),

		content1: function () {

			return this.testData( this.$route.params.run, this.$route.name ) || {};

		},

		tableData1: function () {

			if ( this.content1 && Object.keys( this.content1 ).includes( 'Loading...' ) === false ) {

				return Object.keys( this.content1.results ).reduce( ( all, file ) => {

					// this.content1[ file ].forEach( example => all.push( { page: file, example: example } ) );
					let element = { page: file, value: { example: false, error: false } };

					if ( this.content1.results[ file ].results.length > 0 )
						element.value.example = this.content1.results[ file ].results.map( r => r.example ).join( ', ' );

					if ( this.content1.results[ file ].errors.length > 0 )
						element.value.error = this.content1.results[ file ].errors.map( err => ( err.message ) ? `${err.message} (line ${err.location.start.line})` : err ).join( '<br />' );

					all.push( element );

					return all;

				}, [] );

			} else {

				return [];

			}

		},

		files1: function () {

			if ( this.content1 && this.content1.results ) {

				return Object.keys( this.content1.results );

			} else {

				return [];

			}

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

/* Datatable CSS */
.v-datatable-light {
  width: 1167px;
  margin-left: auto;
  margin-right: auto;
}
.v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}
.v-datatable-light .header-item:hover {
  color: #ed9b19;
}
.v-datatable-light .header-item.no-sortable{
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}
.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}
.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}
.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}
.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}
.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.v-datatable-light .arrow.up {
  border-bottom: 8px solid #337ab7;
}
.v-datatable-light .arrow.up:hover {
  border-bottom: 8px solid #ed9b19;
}
.v-datatable-light .arrow.down {
  border-top: 8px solid #337ab7;
}
.v-datatable-light .arrow.down:hover {
  border-top: 8px solid #ed9b19;
}
.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}

/* End Datatable CSS */

</style>
