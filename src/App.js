import Vue from 'vue';

import 'jquery';
import 'popper.js';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
// import docsdecl from './DocsDecl.vue';
// import srcdecl from './SrcDecl.vue';
// import objdecl from './ObjDecl.vue';

import VueRouter from 'vue-router';

const docsdecl = resolve => require( [ './DocsDecl.vue' ], resolve );
const srcdecl = resolve => require( [ './SrcDecl.vue' ], resolve );
const objdecl = resolve => require( [ './ObjDecl.vue' ], resolve );


const routes = [
	{
		path: '/docsdecl/:firstRev?/:secondRev?',
		component: docsdecl,
		name: 'docsdecl',
		props: ( route ) => ( { filename: route.query.filename, revision1: route.params.firstRev, revision2: route.params.secondRev } )
	},
	{
		path: '/srcdecl/:firstRev?/:secondRev?',
		component: srcdecl,
		name: 'srcdecl',
		props: ( route ) => ( { filename: route.query.filename, revision1: route.params.firstRev, revision2: route.params.secondRev } )
	},
	{
		path: '/objdecl/:firstRev?/:secondRev?',
		component: objdecl,
		name: 'objdecl',
		props: ( route ) => ( { filename: route.query.filename, revision1: route.params.firstRev, revision2: route.params.secondRev } )
	}
];

Vue.use( VueRouter );

const router = new VueRouter( {
	linkActiveClass: 'active',
	routes
} );

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

const app = new Vue( {
	render: h => h( App ),
	router
} ).$mount( '#app' );

console.log( { app } );
