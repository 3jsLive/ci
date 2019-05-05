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
const checkWithTS = resolve => require( [ './checkWithTS.vue' ], resolve );
const checkDocsExamples = resolve => require( [ './checkDocsExamples.vue' ], resolve );
const checkDocsExternals = resolve => require( [ './checkDocsExternals.vue' ], resolve );
const checkNonDocsExternals = resolve => require( [ './checkNonDocsExternals.vue' ], resolve );
const checkNpm = resolve => require( [ './checkNpm.vue' ], resolve );

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
	},
	{
		path: '/checkWithTS/:firstRev?/:secondRev?',
		component: checkWithTS,
		name: 'checkWithTS',
		props: ( route ) => ( { filename: route.query.filename, revision1: route.params.firstRev, revision2: route.params.secondRev } )
	},
	{
		path: '/checkDocsExamples/:firstRev?/:secondRev?',
		component: checkDocsExamples,
		name: 'checkDocsExamples',
		props: ( route ) => ( { revision1: route.params.firstRev, revision2: route.params.secondRev } )
	},
	{
		path: '/checkDocsExternals/:firstRev?/:secondRev?',
		component: checkDocsExternals,
		name: 'checkDocsExternals',
		props: ( route ) => ( { revision1: route.params.firstRev, revision2: route.params.secondRev } )
	},
	{
		path: '/checkNonDocsExternals/:firstRev?/:secondRev?',
		component: checkNonDocsExternals,
		name: 'checkNonDocsExternals',
		props: ( route ) => ( { revision1: route.params.firstRev, revision2: route.params.secondRev } )
	},
	{
		path: '/checkNpm/:firstRev?/:secondRev?',
		component: checkNpm,
		name: 'checkNpm',
		props: ( route ) => ( { revision1: route.params.firstRev, revision2: route.params.secondRev } )
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
