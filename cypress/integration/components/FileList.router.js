import Vue from 'vue';
import VueRouter from 'vue-router';
import FilesList from '../../../src/components/FilesList.vue';

Vue.use( VueRouter );

const propsRunFilename = ( route ) => ( { filename: route.query.filename } );

export default new VueRouter( {
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: FilesList,
			children: [
				{ path: '', name: 'home', component: FilesList }
	  ],
	  props: {
				default: propsRunFilename
			}
		}
	]
} );
