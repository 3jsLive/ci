console.log( 'start of App.js' );

import Vue from 'vue';

import 'jquery';
import 'popper.js';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap.native/dist/bootstrap-native-v4';

// import App from './App.vue';
const App = () => import( /* webpackChunkName: "App" */ './App.vue' );


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
const docsdecl = () => import( /* webpackChunkName: "docsdecl" */ './pages/checks/DocsDecl.vue' );
const srcdecl = () => import( /* webpackChunkName: "srcdecl" */ './pages/checks/SrcDecl.vue' );
const objdecl = () => import( /* webpackChunkName: "objdecl" */ './pages/checks/ObjDecl.vue' );
const checkWithTS = () => import( /* webpackChunkName: "checkWithTS" */ './pages/checks/TSCompiler.vue' );
const checkDocsExamples = () => import( /* webpackChunkName: "checkDocsExamples" */ './pages/checks/DocsExamples.vue' );
const checkDocsExternals = () => import( /* webpackChunkName: "checkDocsExternals" */ './pages/checks/DocsExternals.vue' );
const checkNonDocsExternals = () => import( /* webpackChunkName: "checkNonDocsExternals" */ './pages/checks/NonDocsExternals.vue' );
const unittests = () => import( /* webpackChunkName: "unittests" */ './pages/checks/UnitTests.vue' );

// linters
const linters = () => import( /* webpackChunkName: "linters" */ './linters.vue' );
const linterDoobsDoc = () => import( /* webpackChunkName: "linterDoobsDoc" */ './pages/linters/DoobsDoc.vue' );
const linterHtml = () => import( /* webpackChunkName: "linterHtml" */ './pages/linters/HTMLLint.vue' );
const linterCss = () => import( /* webpackChunkName: "linterCss" */ './pages/linters/StyleLint.vue' );
const linterEslintCodeTags = () => import( /* webpackChunkName: "linterEslintCodeTags" */ './pages/linters/ESLintCodeTags.vue' );
const linterEslintScriptTags = () => import( /* webpackChunkName: "linterEslintScriptTags" */ './pages/linters/ESLintScriptTags.vue' );
const linterEslintJsFiles = () => import( /* webpackChunkName: "linterEslintJsFiles" */ './pages/linters/ESLintJsFiles.vue' );
const linterEslintTsFiles = () => import( /* webpackChunkName: "linterEslintTsFiles" */ './pages/linters/ESLintTsFiles.vue' );

// notifiers
const checkNpm = () => import( /* webpackChunkName: "checkNpm" */ './pages/notifiers/CheckNPM.vue' );

// general
// const run = resolve => require( [ '@/src/Run.vue' ], resolve );
// const home = resolve => require( [ '@/src/Home.vue' ], resolve );
// const NavBar = resolve => require( [ '@/src/components/Navbar.vue' ], resolve );

// convenience
const propsRun = ( route ) => ( { run: Number.parseInt( route.params.run ) } );
const propsRunFilename = ( route ) => ( { filename: route.query.filename, run: Number.parseInt( route.params.run ) } );

const Run = () => import( /* webpackChunkName: "Run" */ './Run.vue' );
const Home = () => import( /* webpackChunkName: "Home" */ './Home.vue' );

// components
const NavBar = () => import( /* webpackChunkName: "NavBar" */ './components/Navbar.vue' );
// const FilesList = () => import( /* webpackChunkName: "FilesList" */ './components/FilesList.vue' );
// const HistoryList = () => import( /* webpackChunkName: "HistoryList" */ './components/HistoryList.vue' );
// const NotableChanges = () => import( /* webpackChunkName: "NotableChanges" */ './components/NotableChanges.vue' );
// const OverviewTable = () => import( /* webpackChunkName: "OverviewTable" */ './components/OverviewTable.vue' );
// const ResultsTableRow = () => import( /* webpackChunkName: "ResultsTableRow" */ './components/ResultsTableRow.vue' );
// const RunInfo = () => import( /* webpackChunkName: "RunInfo" */ './components/RunInfo.vue' );


const components = {
	Run, Home,
	docsdecl, srcdecl, objdecl, checkWithTS, checkDocsExamples, checkDocsExternals, checkNonDocsExternals, checkNpm, unittests,
	linters,
	linterDoobsDoc, linterHtml, linterCss, linterEslintCodeTags, linterEslintScriptTags, linterEslintJsFiles, linterEslintTsFiles,
	NavBar/* , FilesList, HistoryList, NotableChanges, OverviewTable, ResultsTableRow, RunInfo */
};


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
		components: { navbar: NavBar, default: Home },
		name: 'home'
	},
	{
		path: '/runs/:run([0-9]+)',
		components: { navbar: NavBar, default: Run },
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
	components,
	render: h => h( App ),
	router,
	store
} ).$mount( '#app' );

console.log( { app } );
