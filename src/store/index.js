import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const stateProperties = [ 'runInfo', 'overview', 'tests', 'quickInfo', 'sparkline', 'backstory' ];

import API_URL from '@/src/environments/environment';


export default new Vuex.Store( {
	// TODO: switch to non-objects, we shouldn't cache multiple runs (should we?)
	state: {
		runInfo: {},
		overview: {},
		backstory: {},
		gitData: {},
		tests: {},
		quickInfo: {},
		sparkline: {},
		testData: {}
	},
	mutations: {

		...stateProperties.map( name => name + 'Store' ).reduce( ( all, name ) => {

			all[ name ] = ( state, payload ) => genericStore( state, payload );
			return all;

		}, {} ),

		'testDataStore'( state, payload ) {

			genericStoreTestData( state, payload );

		}/* ,

		'runInfoStore'( state, payload ) {

			genericStoreRunInfo( state, payload );

		} */

	},
	getters: {

		// runInfo: ( state/* , getters */ ) => ( runId ) => getRunInfo( state, runId ),
		runInfo: ( state, getters ) => ( runId ) => genericGet( state, getters, 'runInfo', runId ),
		overview: ( state, getters ) => ( runId ) => genericGet( state, getters, 'overview', runId ),
		history: ( state, getters ) => ( runId ) => genericGet( state, getters, 'history', runId ),
		tests: ( state, getters ) => ( runId ) => genericGet( state, getters, 'tests', runId ),
		quickInfo: ( state, getters ) => ( runId ) => genericGet( state, getters, 'quickInfo', runId ),
		sparkline: ( state, getters ) => ( runId ) => genericGet( state, getters, 'sparkline', runId ),
		backstory: ( state, getters ) => ( runId ) => genericGet( state, getters, 'backstory', runId ),

		testData: ( state, getters ) => ( runId, test ) => genericGetTestData( state, getters, runId, test ),

		currentRunId: state => state.route.params.run,
		currentFile: state => state.route.query.filename || '',
		currentTest: state => state.route.name || ''

	},
	actions: {

		pullRunData( { getters, dispatch, state }, { runId: forcedRunId } ) {

			// do we have a custom runId instead of currentRunId?
			const runId = forcedRunId || getters.currentRunId;

			console.log( 'pullRunData with', runId );

			// push all actions into an array
			const promises = stateProperties.reduce( ( all, target ) => {

				if ( typeof state[ target ][ runId ] === 'undefined' ) {

					console.log( 'dispatch genericPullAction', target, runId );
					all.push( dispatch( 'genericPullAction', { target, runId } ) );

				} else {

					console.log( target, runId, 'already exists', state[ target ][ runId ] );

				}

				return all;

			}, [] );

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


		async pullRunInfo( { state, getters, dispatch }, { runId: forcedRunId } ) {

			const runId = forcedRunId || getters.currentRunId;
			console.log( 'pullRunInfo with', runId );

			if ( typeof state.runInfo[ runId ] === 'undefined' ) {

				return await dispatch( 'genericPullAction', { target: 'runInfo', runId } );

			} else {

				return state.runInfo[ runId ];

			}

		},


		async pullTestData( { state, getters, dispatch }, { runId: forcedRunId, currentTest: forcedTest } ) {

			const runId = forcedRunId || getters.currentRunId;
			const currentTest = forcedTest || getters.currentTest;

			console.log( 'pullTestData with', runId, currentTest );

			if ( ! state.testData[ currentTest ] || ! state.testData[ currentTest ][ runId ] ) {

				return await dispatch( 'genericShowFileAction', { runId, currentTest } );

			} else {

				return state.testData[ currentTest ][ runId ];

			}

		},


		async genericShowFileAction( { commit, state, getters }, { runId: forcedRunId, currentTest: forcedTest } ) {

			const runId = forcedRunId || getters.currentRunId;
			const currentTest = forcedTest || getters.currentTest;

			console.log( 'genericShowFileAction with', runId, currentTest );

			if ( ! state )
				console.error( 'genericShowFileAction', currentTest, 'no state' );
			else {

				console.log( 'committing...', currentTest, getters.runInfo( runId ).sha, 'from', JSON.stringify( state ) );

				const data = await genericShowFile( currentTest, getters.runInfo( runId ).sha );

				commit( 'testDataStore', {
					runId: runId,
					target: currentTest,
					[ currentTest ]: data
				} );

				return data;

			}

		}

	}
} );


function genericPull( runId, target ) {

	let url;
	if ( target === 'runInfo' )
		url = `${API_URL}/runInfo/${runId}`;
	else
		url = `${API_URL}/runInfo/${runId}/${target}`;

	return fetch( url )
		.then( res => res.json() )
		.then( data => {

			// console.log( 'async genericPull', target, { runId, data } );

			return data;

		} )
		.catch( err => console.error( target, 'request:', err ) );

}


async function genericShowFile( test, sha ) {

	const url = `${API_URL}/${test}/showFile/${sha}`;

	return await fetch( url )
		.then( res => res.json() )
		.then( data => {

			// console.log( 'async genericShowFile', test, sha );

			return data;

		} )
		.catch( err => console.error( test, 'request:', err, sha ) );

}


function genericGet( state, getters, target, forcedRunId ) {

	const runId = forcedRunId || getters.currentRunId;

	console.log( 'genericGet', target, runId );

	if ( ! state ) {

		console.error( 'genericGet', target, 'no state' );

	} else {

		if ( typeof state[ target ] !== 'undefined' && typeof state[ target ][ runId ] !== 'undefined' ) {

			console.log( target, 'cached' );
			return state[ target ][ runId ];

		} else
		// console.error( 'genericGet', target, getters.currentRunId, 'not found', JSON.stringify( state[ target ] ) );
			console.warn( 'genericGet', target, runId, 'not found', JSON.stringify( state[ target ] ) );

	}

	return false;

}


/* function getRunInfo( state, runId ) {

	console.log( 'getRunInfo', runId );

	if ( ! state ) {

		console.error( 'getRunInfo', runId, 'no state' );

	} else {

		if ( typeof state.runInfo !== 'undefined' && typeof state.runInfo[ runId ] !== 'undefined' ) {

			console.log( runId, 'cached' );
			return state.runInfo[ runId ];

		} else
			console.warn( 'getRunInfo', runId, 'not found', JSON.stringify( state.runInfo ) );

	}

	return false;

} */


function genericGetTestData( state, getters, runId, currentTest ) {

	if ( ! state ) {

		console.error( 'genericGetTestData', currentTest, 'no state' );

	} else {

		if ( typeof state[ 'testData' ][ currentTest ] !== 'undefined' ) {

			if ( typeof state[ 'testData' ][ currentTest ][ runId ] !== 'undefined' ) {

				console.log( 'genericGetTestData return', state[ 'testData' ][ currentTest ][ runId ] );

				return state[ 'testData' ][ currentTest ][ runId ];

			} else {

				console.log( 'test known, but no data loaded', currentTest, runId );

			}

		} else {

			console.warn( 'genericGetTestData', currentTest, runId, 'not found', JSON.stringify( state[ 'testData' ] ) );

		}

	}

	return false;

}


function genericStore( state, payload ) {

	if ( ! state ) {

		console.error( 'genericStore', payload.target, 'no state' );

	} else if ( ! payload || ! payload.runId || ! payload.target || ! payload[ payload.target ] ) {

		console.error( 'genericStore: no payload/invalid payload', payload );

	} else {

		// console.log( 'genericStore', { payload: JSON.stringify( payload ), raw: payload } );
		Vue.set( state[ payload.target ], payload.runId, payload[ payload.target ] );

	}

}


function genericStoreTestData( state, payload ) {

	if ( ! state ) {

		console.error( 'genericStoreTestData', payload.target, 'no state' );

	} else if ( ! payload || ! payload.runId || ! payload.target || ! payload[ payload.target ] ) {

		console.error( 'genericStoreTestData: no payload or invalid payload', payload );

	} else {

		// console.log( 'genericStoreTestData', { payload: JSON.stringify( payload ), raw: payload } );
		state[ 'testData' ][ payload.target ] = {};
		Vue.set( state[ 'testData' ][ payload.target ], payload.runId, payload[ payload.target ] );

	}

}

/* function genericStoreRunInfo( state, payload ) {

	if ( ! state ) {

		console.error( 'genericStoreRunInfo', payload.runId, 'no state' );

	} else if ( ! payload || ! payload.runId || ! payload.data ) {

		console.error( 'genericStoreRunInfo: no payload or invalid payload', payload );

	} else {

		Vue.set( state.runInfo, payload.runId, payload.data );

	}

} */
