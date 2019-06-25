import Vue from 'vue';
import Vuex from 'vuex';
import router from '../App.js';

Vue.use( Vuex );

export default new Vuex.Store( {
	// TODO: switch to non-objects, we shouldn't cache multiple runs (should we?)
	state: {
		runInfo: {},
		history: {},
		overview: {},
		gitData: {},
		tests: {},
		quickInfo: {},
		sparkline: {},
		testData: {}
	},
	mutations: {

		...[ 'runInfo', 'overview', 'history', 'tests', 'quickInfo', 'sparkline' ].map( name => name + 'Store' ).reduce( ( all, name ) => {

			all[ name ] = ( state, payload ) => genericStore( state, payload );
			return all;

		}, {} ),

		'testDataStore'( state, payload ) {

			genericStoreTestData( state, payload );

		}

	},
	getters: {

		runInfo: ( state, getters ) => genericGet( state, getters, 'runInfo' ),
		overview: ( state, getters ) => genericGet( state, getters, 'overview' ),
		history: ( state, getters ) => genericGet( state, getters, 'history' ),
		tests: ( state, getters ) => genericGet( state, getters, 'tests' ),
		quickInfo: ( state, getters ) => genericGet( state, getters, 'quickInfo' ),
		sparkline: ( state, getters ) => genericGet( state, getters, 'sparkline' ),

		testData: ( state, getters ) => genericGetTestData( state, getters ),

		currentRunId: state => state.route.params.run,
		currentFile: state => state.route.query.filename || '',
		currentTest: state => state.route.name || ''

	},
	actions: {

		pullRunData( { getters, dispatch }, payload ) {

			const runId = ( payload && payload.runId ) ? payload.runId : false;
			console.log( ( runId ) ? 'runId override working: ' + runId : 'no runId supplied' );

			let promises = [];

			if ( ! getters.runInfo )
				promises.push( dispatch( 'genericPullAction', { target: 'runInfo', runId: runId || false } ) );

			if ( ! getters.overview )
				promises.push( dispatch( 'genericPullAction', { target: 'overview', runId: runId || false } ) );

			if ( ! getters.history )
				promises.push( dispatch( 'genericPullAction', { target: 'history', runId: runId || false } ) );

			if ( ! getters.tests )
				promises.push( dispatch( 'genericPullAction', { target: 'tests', runId: runId || false } ) );

			if ( ! getters.quickInfo )
				promises.push( dispatch( 'genericPullAction', { target: 'quickInfo', runId: runId || false } ) );

			if ( ! getters.sparkline )
				promises.push( dispatch( 'genericPullAction', { target: 'sparkline', runId: runId || false } ) );

			return Promise.all( promises );

		},

		// TODO: same as above, create a FactoryFunction and not a generic one so we can have named helpers?
		async genericPullAction( { commit, state, getters }, { target, runId: forcedRunId } ) {

			const runId = forcedRunId || getters.currentRunId;

			console.log( ( forcedRunId ) ? 'runId override in effect: ' + forcedRunId : 'no override in effect' );

			if ( ! state )
				console.error( 'genericPullAction', target, 'no state' );
			else
				await commit( target + 'Store', { runId: runId, target, [ target ]: await genericPull( runId, target ) } );

		},

		async pullTestData( { getters, dispatch }, { runId: forcedRunId } ) {

			if ( ! getters.testData ) {

				const runId = forcedRunId || getters.currentRunId;
				console.log( ( forcedRunId ) ? 'runId override activated: ' + forcedRunId : 'no override activated' );
				return await dispatch( 'genericShowFileAction', { runId } );

			} else {

				return getters.testData;

			}

		},

		async genericShowFileAction( { commit, state, getters }, { runId: forcedRunId } ) {

			console.log( '------------------------------------------', getters.runInfo.sha );

			const runId = forcedRunId || getters.currentRunId;

			console.log( ( forcedRunId ) ? 'runId override functionado: ' + forcedRunId : 'no sé :(' );

			if ( ! state )
				console.error( 'genericShowFileAction', getters.currentTest, 'no state' );
			else {

				console.log( 'committing...', getters.currentTest, getters.runInfo.sha, 'from', JSON.stringify( state ) );

				const data = await genericShowFile( getters.currentTest, getters.runInfo.sha );

				commit( 'testDataStore', {
					runId: runId,
					target: getters.currentTest,
					[ getters.currentTest ]: data
				} );

				return data;

			}

		},

		// actions to update route asynchronously
		// TODO: do we actually need these?
		routerPush( _, arg ) {

			router.push( arg );

		},

		routerGo( _, arg ) {

			router.go( arg );

		}

	},
	modules: {
		// cart,
		// products
	},
	// strict: debug,
//   plugins: debug ? [createLogger()] : []
} );


function genericPull( runId, target ) {

	let url;
	if ( target === 'runInfo' )
		url = `/api/runInfo/${runId}`;
	else if ( target === 'history' )
		return GoPullHistory( runId );
	else
		url = `/api/runInfo/${runId}/${target}`;

	return fetch( url )
		.then( res => res.json() )
		.then( data => {

			// console.log( 'async genericPull', target, { runId, data } );

			return data;

		} )
		.catch( err => console.error( target, 'request:', err ) );

}


async function genericShowFile( test, sha ) {

	const url = `/api/${test}/showFile/${sha}`;

	return await fetch( url )
		.then( res => res.json() )
		.then( data => {

			console.log( 'async genericShowFile', test, sha );

			return data;

		} )
		.catch( err => console.error( test, 'request:', err, sha ) );

}


function genericGet( state, getters, target ) {

	if ( ! state ) {

		console.error( 'genericGet', target, 'no state' );

	} else {

		if ( typeof state[ target ] !== 'undefined' && typeof state[ target ][ getters.currentRunId ] !== 'undefined' ) {

			return state[ target ][ getters.currentRunId ];

		} else
		// console.error( 'genericGet', target, getters.currentRunId, 'not found', JSON.stringify( state[ target ] ) );
			console.warn( 'genericGet', target, getters.currentRunId, 'not found', JSON.stringify( state[ target ] ) );

	}

	return false;

}


function genericGetTestData( state, getters ) {

	if ( ! state ) {

		console.error( 'genericGetTestData', getters.currentTest, 'no state' );

	} else {

		if ( typeof state[ 'testData' ][ getters.currentTest ] !== 'undefined' ) {

			if ( typeof state[ 'testData' ][ getters.currentTest ][ getters.currentRunId ] !== 'undefined' ) {

				console.log( 'genericGetTestData return', state[ 'testData' ][ getters.currentTest ][ getters.currentRunId ] );

				return state[ 'testData' ][ getters.currentTest ][ getters.currentRunId ];

			} else {

				console.log( 'test known, but no data loaded', getters.currentTest, getters.currentRunId );

			}

		} else {

			console.warn( 'genericGetTestData', getters.currentTest, getters.currentRunId, 'not found', JSON.stringify( state[ 'testData' ] ) );

		}

	}

	console.log( '>>>', getters.currentTest, getters.currentRunId );

	return false;

}


function genericStore( state, payload ) {

	if ( ! state ) {

		console.error( 'genericStore', payload.target, 'no state' );

	} else if ( ! payload || ! payload.runId || ! payload.target || ! payload[ payload.target ] ) {

		console.error( 'genericStore: no payload/invalid payload', payload );

	} else {

		console.log( 'genericStore', { payload: JSON.stringify( payload ), raw: payload } );
		Vue.set( state[ payload.target ], payload.runId, payload[ payload.target ] );

	}

}


function genericStoreTestData( state, payload ) {

	if ( ! state ) {

		console.error( 'genericStoreTestData', payload.target, 'no state' );

	} else if ( ! payload || ! payload.runId || ! payload.target || ! payload[ payload.target ] ) {

		console.error( 'genericStoreTestData: no payload or invalid payload', payload );

	} else {

		console.log( 'genericStoreTestData', { payload: JSON.stringify( payload ), raw: payload } );
		state[ 'testData' ][ payload.target ] = {};
		Vue.set( state[ 'testData' ][ payload.target ], payload.runId, payload[ payload.target ] );

	}

}


function GoPullHistory( runId ) {

	return fetch( `/api/runInfo/${runId}/backstory` )
		.then( res => res.json() )
		.then( backstory => {

			return fetch( `/api/runInfo/${runId}/overview?backstory` )
				.then( res => res.json() )
				.then( overviewHistories => {

					return backstory.map( ( { runId, sha } ) => {

						const runResults = Object.keys( overviewHistories ).reduce( ( all, testname ) => {

							all[ testname ] = { result: overviewHistories[ testname ][ runId ] };
							return all;

						}, {} );

						return { name: runId, runId, sha, overviewJson: JSON.stringify( runResults ) };

					} );

				} )
				.catch( err => console.error( 'runInfo/overview?backstory request:', err ) );

		} )
		.catch( err => console.error( 'runInfo/backstory request:', err ) );

}
