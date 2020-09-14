import Vue from 'vue';


import './scss/bootstrap.scss';
import * as BootstrapNative from 'bootstrap.native';
Vue.prototype.$BSN = BootstrapNative;


// import App from './App.vue';
const App = () => import( /* webpackChunkName: "App" */ './App.vue' );


import VueRouter from 'vue-router';
import store from './store';
import { sync } from 'vuex-router-sync';


import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
Vue.use( VueVirtualScroller );


// checks
const pageDocsDecl = () => import( /* webpackChunkName: "pageDocsDecl" */ './pages/checks/DocsDecl.vue' );
const pageSrcDecl = () => import( /* webpackChunkName: "pageSrcDecl" */ './pages/checks/SrcDecl.vue' );
const pageObjDecl = () => import( /* webpackChunkName: "pageObjDecl" */ './pages/checks/ObjDecl.vue' );
const pageTSCompiler = () => import( /* webpackChunkName: "pageTSCompiler" */ './pages/checks/TSCompiler.vue' );
const pageDocsExamples = () => import( /* webpackChunkName: "pageDocsExamples" */ './pages/checks/DocsExamples.vue' );
const pageDocsExternals = () => import( /* webpackChunkName: "pageDocsExternals" */ './pages/checks/DocsExternals.vue' );
const pageNonDocsExternals = () => import( /* webpackChunkName: "pageNonDocsExternals" */ './pages/checks/NonDocsExternals.vue' );
const pageUnitTests = () => import( /* webpackChunkName: "pageUnitTests" */ './pages/checks/UnitTests.vue' );
const pageCompSrcExp = () => import( /* webpackChunkName: "pageCompSrcExp" */ './pages/checks/CompSrcExp.vue' );
const pageCompExmplsExp = () => import( /* webpackChunkName: "pageCompExmplsExp" */ './pages/checks/CompExmplsExp.vue' );
const pageLawVsReality = () => import( /* webpackChunkName: "pageLawVsReality" */ './pages/checks/LawVsReality.vue' );

// const FilesAndResults = () => import( /* webpackChunkName: "FilesAndResults" */ './pages/FilesAndResults.vue' );

// linters
// const linters = () => import( /* webpackChunkName: "linters" */ './linters.vue' );
const pageDoobsDoc = () => import( /* webpackChunkName: "pageDoobsDoc" */ './pages/linters/DoobsDoc.vue' );
const pageHTMLLint = () => import( /* webpackChunkName: "pageHTMLLint" */ './pages/linters/HTMLLint.vue' );
const pageStyleLint = () => import( /* webpackChunkName: "pageStyleLint" */ './pages/linters/StyleLint.vue' );
const pageESLintCodeTags = () => import( /* webpackChunkName: "pageESLintCodeTags" */ './pages/linters/ESLintCodeTags.vue' );
const pageESLintScriptTags = () => import( /* webpackChunkName: "pageESLintScriptTags" */ './pages/linters/ESLintScriptTags.vue' );
const pageESLintJsFiles = () => import( /* webpackChunkName: "pageESLintJsFiles" */ './pages/linters/ESLintJsFiles.vue' );
const pageESLintTsFiles = () => import( /* webpackChunkName: "pageESLintTsFiles" */ './pages/linters/ESLintTsFiles.vue' );

// notifiers
// const checkNpm = () => import( /* webpackChunkName: "checkNpm" */ './pages/notifiers/CheckNPM.vue' );

// dependencies
const pageDocsDocsDeps = () => import( /* webpackChunkName: "pageDocsDocsDeps" */ './pages/dependencies/DocsDocsDeps.vue' );

// profiling
const pageProfStats = () => import( /* webpackChunkName: "pageProfStats" */ './pages/profiling/ProfStats.vue' );
const pageProfConsole = () => import( /* webpackChunkName: "pageProfConsole" */ './pages/profiling/ProfConsole.vue' );

// type search
const pageTypesearchSearch = () => import( /* webpackChunkName: "pageTypesearchSearch" */ './pages/typesearch/Search.vue' );

// debug
const pageDebugRun = () => import( /* webpackChunkName: "pageDebugRun" */ './pages/debug/Run.vue' );

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
	Run, Home, NavBar,

	/* checks */
	pageDocsDecl,
	pageSrcDecl,
	pageObjDecl,
	pageTSCompiler,
	pageLawVsReality,
	pageDocsExamples,
	pageDocsExternals,
	pageNonDocsExternals,
	pageUnitTests,
	pageCompSrcExp,
	pageCompExmplsExp,

	/* linters */
	pageDoobsDoc,
	pageHTMLLint,
	pageStyleLint,
	pageESLintCodeTags,
	pageESLintScriptTags,
	pageESLintJsFiles,
	pageESLintTsFiles,

	/* profiling */
	pageProfConsole,
	pageProfStats,

	/* typesearch */
	pageTypesearchSearch,

	/* debug */
	pageDebugRun
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
		name: 'Home',
		meta: { skipAll: true }
	},
	{
		path: '/runs/:run([0-9]+)',
		components: { navbar: NavBar, default: Run },
		name: 'Run',
		props: {
			navbar: propsRun,
			default: propsRun
		},
		meta: { skip: true }
	},
	/* {
		path: '/runs/:run([0-9]+)/linters',
		components: { navbar: NavBar, default: linters },
		name: 'lintersSummary',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		},
		meta: { skip: true },

	}, */
	{
		path: '/runs/:run([0-9]+)/linters/DoobsDoc',
		components: { navbar: NavBar, default: pageDoobsDoc },
		name: 'DoobsDoc',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/HTMLLint',
		components: { navbar: NavBar, default: pageHTMLLint },
		name: 'HTMLLint',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/StyleLint',
		components: { navbar: NavBar, default: pageStyleLint },
		name: 'StyleLint',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintCodeTags',
		components: { navbar: NavBar, default: pageESLintCodeTags },
		name: 'ESLintCodeTags',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintJsFiles',
		components: { navbar: NavBar, default: pageESLintJsFiles },
		name: 'ESLintJsFiles',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintTsFiles',
		components: { navbar: NavBar, default: pageESLintTsFiles },
		name: 'ESLintTsFiles',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/linters/ESLintScriptTags',
		components: { navbar: NavBar, default: pageESLintScriptTags },
		name: 'ESLintScriptTags',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	}, {
		path: '/runs/:run([0-9]+)/checks/DocsExamples',
		components: { navbar: NavBar, default: pageDocsExamples },
		name: 'DocsExamples',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/DocsExternals',
		components: { navbar: NavBar, default: pageDocsExternals },
		name: 'DocsExternals',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/NonDocsExternals',
		components: { navbar: NavBar, default: pageNonDocsExternals },
		name: 'NonDocsExternals',
		props: {
			navbar: propsRun,
			default: propsRun
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/TSCompiler',
		components: { navbar: NavBar, default: pageTSCompiler },
		name: 'TSCompiler',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/DocsDecl',
		components: { navbar: NavBar, default: pageDocsDecl },
		name: 'DocsDecl',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/ObjDecl',
		components: { navbar: NavBar, default: pageObjDecl },
		name: 'ObjDecl',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/SrcDecl',
		components: { navbar: NavBar, default: pageSrcDecl },
		name: 'SrcDecl',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/UnitTests',
		components: { navbar: NavBar, default: pageUnitTests },
		name: 'UnitTests',
		props: propsRun
	},
	{
		path: '/runs/:run([0-9]+)/checks/CompSrcExp',
		components: { navbar: NavBar, default: pageCompSrcExp },
		name: 'CompSrcExp',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/CompExmplsExp',
		components: { navbar: NavBar, default: pageCompExmplsExp },
		name: 'CompExmplsExp',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/checks/LawVsReality',
		components: { navbar: NavBar, default: pageLawVsReality },
		name: 'LawVsReality',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/dependencies/DocsDocsDeps',
		components: { navbar: NavBar, default: pageDocsDocsDeps },
		name: 'DocsDocsDeps',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		// debug
		path: '/runs/:run([0-9]+)/profiling/ProfStats',
		components: { navbar: NavBar, default: pageProfStats },
		name: 'ProfStats',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		path: '/runs/:run([0-9]+)/profiling/ProfConsole',
		components: { navbar: NavBar, default: pageProfConsole },
		name: 'ProfConsole',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	{
		// debug
		path: '/runs/:run([0-9]+)/typesearch/TypesearchSearch',
		components: { navbar: NavBar, default: pageTypesearchSearch },
		name: 'TypesearchSearch',
		props: {
			navbar: propsRunFilename,
			default: propsRunFilename
		}
	},
	// {
	// 	path: '/runs/:run([0-9]+)/debug/Run',
	// 	components: { navbar: NavBar, default: pageDebugRun },
	// 	name: 'DebugRun',
	// 	props: propsRun,
	// 	meta: { skip: true }
	// },
	// {
	// 	path: '/runs/:run([0-9]+)/list/:test',
	// 	components: { navbar: NavBar, default: list},
	// 	name: 'list',
	// 	props: ( route ) => ( { run: Number.parseInt( route.params.run ), test: route.params.test } )
	// },


	/* {
		// test route
		path: '/linters.vue', //([a-f0-9A-F]+)
		components: { navbar: NavBar, default: linters },
		name: 'linters',
		props: ( route ) => ( { revision1: route.params.firstRev } ),
		meta: { skip: true }
	},
	{
		// test route
		path: '/FilesAndResults.vue', //([a-f0-9A-F]+)
		components: { navbar: NavBar, default: FilesAndResults },
		name: 'FilesAndResults',
		props: ( route ) => ( { revision1: route.params.firstRev } ),
		meta: { skip: true }
	},
	{
		path: '/checkNpm/:firstRev?/:secondRev?',
		components: { navbar: NavBar, default: checkNpm },
		name: 'checkNpm',
		props: ( route ) => ( { revision1: route.params.firstRev, revision2: route.params.secondRev } )
	} */

];

Vue.use( VueRouter );

const router = new VueRouter( {
	linkActiveClass: 'active',
	routes
} );


/* const unsync =  */sync( store, router );

export default router;


Vue.prototype.$eventBus = new Vue();

// FIXME: ugly prototype pollution
Vue.prototype.$workerToDescription = {
	checks: {
		'CompExmplsExp': 'Compare exported symbols (Examples)',
		'CompSrcExp': 'Compare exported symbols (src)',
		'DocsDecl': 'Docs vs. Declaration',
		'DocsExamples': 'Scan Docs for broken example links',
		'DocsExternals': 'Scan Docs for broken external links',
		'NonDocsExternals': 'Scan Non-Docs for broken external links',
		'ObjDecl': 'Objects vs. Declaration',
		'ScanCompletion': 'Orphaned pages',
		'SrcDecl': 'Source vs. Declaration',
		'TSCompiler': 'Test with TypeScript compiler',
		'UnitTests': 'Unit Tests (browser)',
		'LawVsReality': 'Declared vs. encountered parameters'
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
		'SrcSrcDeps': 'Dependencies between source files',
		'RuntimeDeps': 'Dependencies of examples'
	},
	debug: {
		'Run': 'Debug current run'
	}
};

Vue.prototype.$workerToDescription[ '_all' ] = Object.values( Vue.prototype.$workerToDescription )
	.reduce( ( all, workers ) => ( { ...all, ...workers } ), {} );


// TODO: do we really want to use highcarts? (size!)
import hc from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";

import boost from "highcharts/modules/boost";
boost( hc );

import histogram from "highcharts/modules/histogram-bellcurve";
histogram( hc );

import sankey from "highcharts/modules/sankey";
sankey( hc );

import dependencyWheel from "highcharts/modules/dependency-wheel";
dependencyWheel( hc );

import heatmap from "highcharts/modules/heatmap";
heatmap( hc );

import treemap from "highcharts/modules/treemap";
treemap( hc );

Vue.use( HighchartsVue );

const app = new Vue( {
	components,
	render: h => h( App ),
	router,
	store
} ).$mount( '#app' );


console.log( { app } );
