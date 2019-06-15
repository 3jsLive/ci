console.log( 'start of App.js' );

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
import store from './store';





import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add( faExclamationCircle );

Vue.component( 'font-awesome-icon', FontAwesomeIcon );

import { dom } from '@fortawesome/fontawesome-svg-core';

dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver






// checks
const docsdecl = resolve => require( [ '@/src/pages/checks/DocsDecl.vue' ], resolve );
const srcdecl = resolve => require( [ '@/src/pages/checks/SrcDecl.vue' ], resolve );
const objdecl = resolve => require( [ '@/src/pages/checks/ObjDecl.vue' ], resolve );
const checkWithTS = resolve => require( [ '@/src/pages/checks/TSCompiler.vue' ], resolve );
const checkDocsExamples = resolve => require( [ '@/src/pages/checks/DocsExamples.vue' ], resolve );
const checkDocsExternals = resolve => require( [ '@/src/pages/checks/DocsExternals.vue' ], resolve );
const checkNonDocsExternals = resolve => require( [ '@/src/pages/checks/NonDocsExternals.vue' ], resolve );
const unittests = resolve => require( [ '@/src/pages/checks/UnitTests.vue' ], resolve );

// linters
const linters = resolve => require( [ '@/src/linters.vue' ], resolve );
const linterDoobsDoc = resolve => require( [ '@/src/pages/linters/DoobsDoc.vue' ], resolve );
const linterHtml = resolve => require( [ '@/src/pages/linters/HTMLLint.vue' ], resolve );
const linterCss = resolve => require( [ '@/src/pages/linters/StyleLint.vue' ], resolve );
const linterEslintCodeTags = resolve => require( [ '@/src/pages/linters/ESLintCodeTags.vue' ], resolve );
const linterEslintScriptTags = resolve => require( [ '@/src/pages/linters/ESLintScriptTags.vue' ], resolve );
const linterEslintJsFiles = resolve => require( [ '@/src/pages/linters/ESLintJsFiles.vue' ], resolve );
const linterEslintTsFiles = resolve => require( [ '@/src/pages/linters/ESLintTsFiles.vue' ], resolve );

// notifiers
const checkNpm = resolve => require( [ '@/src/pages/notifiers/CheckNPM.vue' ], resolve );

// general
const run = resolve => require( [ '@/src/Run.vue' ], resolve );
const home = resolve => require( [ '@/src/Home.vue' ], resolve );
const NavBar = resolve => require( [ '@/src/components/Navbar.vue' ], resolve );

// const list = resolve => require( [ './List.vue' ], resolve );

// convenience
const propsRun = ( route ) => ( { run: Number.parseInt( route.params.run ) } );
const propsRunFilename = ( route ) => ( { filename: route.query.filename, run: Number.parseInt( route.params.run ) } );

const routes = [
	{
		path: "/index.html",
		redirect: "/"
	},
	{
		path: '/',
		redirect: "/runs"
	},
	{
		path: '/runs',
		components: { navbar: NavBar, default: home },
		name: 'home'
	},
	{
		path: '/runs/:run([0-9]+)',
		components: { navbar: NavBar, default: run },
		name: 'run',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters',
		components: { navbar: NavBar, default: linters },
		name: 'lintersSummary',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/DoobsDoc',
		components: { navbar: NavBar, default: linterDoobsDoc },
		name: 'linterDoobsDoc',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/HTMLLint',
		components: { navbar: NavBar, default: linterHtml },
		name: 'linterHtml',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/StyleLint',
		components: { navbar: NavBar, default: linterCss },
		name: 'linterCss',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintCodeTags',
		components: { navbar: NavBar, default: linterEslintCodeTags },
		name: 'linterEslintCodeTags',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintJsFiles',
		components: { navbar: NavBar, default: linterEslintJsFiles },
		name: 'linterEslintJsFiles',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintTsFiles',
		components: { navbar: NavBar, default: linterEslintTsFiles },
		name: 'linterEslintTsFiles',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintScriptTags',
		components: { navbar: NavBar, default: linterEslintScriptTags },
		name: 'linterEslintScriptTags',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	}, {
		path: '/runs/:run([0-9]+)/checks/DocsExamples',
		components: { navbar: NavBar, default: checkDocsExamples },
		name: 'checkDocsExamples',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/DocsExternals',
		components: { navbar: NavBar, default: checkDocsExternals },
		name: 'checkDocsExternals',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/NonDocsExternals',
		components: { navbar: NavBar, default: checkNonDocsExternals },
		name: 'checkNonDocsExternals',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/TSCompiler',
		components: { navbar: NavBar, default: checkWithTS },
		name: 'checkWithTS',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/DocsDecl',
		components: { navbar: NavBar, default: docsdecl },
		name: 'docsdecl',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/ObjDecl',
		components: { navbar: NavBar, default: objdecl },
		name: 'objdecl',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/SrcDecl',
		components: { navbar: NavBar, default: srcdecl },
		name: 'srcdecl',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/UnitTests',
		components: { navbar: NavBar, default: unittests },
		name: 'unittests',
		props: propsRun
	},
	// {
	// 	path: '/runs/:run([0-9]+)/list/:test',
	// 	components: { navbar: NavBar, default: list},
	// 	name: 'list',
	// 	props: ( route ) => ( { run: Number.parseInt( route.params.run ), test: route.params.test } )
	// },
	{
		// test route
		path: '/linters.vue', //([a-f0-9A-F]+)
		components: { navbar: NavBar, default: linters },
		name: 'linters',
		props: ( route ) => ( { revision1: route.params.firstRev } )
	},
	{
		path: '/checkNpm/:firstRev?/:secondRev?',
		components: { navbar: NavBar, default: checkNpm },
		name: 'checkNpm',
		props: ( route ) => ( { revision1: route.params.firstRev, revision2: route.params.secondRev } )
	}

];

Vue.use( VueRouter );

const router = new VueRouter( {
	linkActiveClass: 'active',
	routes
} );


Vue.prototype.$eventBus = new Vue();

// FIXME: ugly prototype pollution
Vue.prototype.$workerToDescription = {
	checks: {
		'DocsDecl': 'Docs vs. Declaration',
		'SrcDecl': 'Source vs. Declaration',
		'ObjDecl': 'Objects vs. Declaration',
		'TSCompiler': 'Test with TypeScript compiler',
		'DocsExamples': 'Scan Docs for broken example links',
		'DocsExternals': 'Scan Docs for broken external links',
		'NonDocsExternals': 'Scan Non-Docs for broken external links',
		'UnitTests': 'Unit tests (browser)',
		'ScanCompletion': 'Check for orphaned pages'
	},
	notifiers: {
		'CheckNPM': 'Check NPM for outdated dependencies',
		'ScanLegacy': 'Check for files still importing Three.Legacy.js code'
	},
	linters: {
		'DoobsDoc': 'DoobsDoc linting',
		'HTMLLint': 'HTML linting',
		'ESLintJsFiles': 'ESLint (JavaScript, stand-alone files)',
		'ESLintScriptTags': 'ESLint (JavaScript, <script> elements)',
		'ESLintCodeTags': 'ESLint (JavaScript, <code> elements)',
		'ESLintTsFiles': 'ESLint (TypeScript)',
		'StyleLint': 'StyleLint (CSS)',
		'glslang': 'glsl Validator'
	},
	typesearch: {
		'TypeCore': 'Core',
		'TypeExamples': 'Examples'
	},
	profiling: {
		'ProfTraces': 'Traces',
		'ProfStats': 'Stats',
		'ProfVisual': 'Visual',
		'ProfConsole': 'Console'
	},
	dependencies: {
		'DocsDocsDeps': 'Dependencies between doc pages',
		'DocsSrcDeps': 'Dependencies between docs and source',
		'SrcSrcDeps': 'Dependencies between source files'
	}
};

Vue.prototype.$workerToDescription[ '_all' ] = Object.values( Vue.prototype.$workerToDescription )
	.reduce( ( all, workers ) => ( { ...all, ...workers } ), {} );


import hc from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import boost from "highcharts/modules/boost";

boost( hc );

Vue.use( HighchartsVue );

const app = new Vue( {
	render: h => h( App ),
	router,
	store
} ).$mount( '#app' );

console.log( { app } );
