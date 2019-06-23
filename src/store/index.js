import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store( {
	state: {
		runInfo: {},
		history: {},
		overview: {},
		gitData: {},
		tests: {},
		quickInfo: {},
		currentRunId: 0
	},
	mutations: {

		setCurrentRunId( state, runId ) {

			if ( state )
				state.currentRunId = runId;

		},

		...[ 'runInfo', 'overview', 'history', 'tests', 'quickInfo' ].map( name => name + 'Store' ).reduce( ( all, name ) => {

			all[ name ] = ( state, payload ) => genericStore( state, payload );
			return all;

		}, {} )

	},
	getters: {

		runInfo: state => genericGet( state, 'runInfo' ),
		overview: state => genericGet( state, 'overview' ),
		history: state => genericGet( state, 'history' ),
		tests: state => genericGet( state, 'tests' ),
		quickInfo: state => genericGet( state, 'quickInfo' )

	},
	actions: {

		async pullRunData( { getters, dispatch } ) {

			if ( ! getters.runInfo )
				dispatch( 'genericAction', { target: 'runInfo' } );

			if ( ! getters.overview )
				dispatch( 'genericAction', { target: 'overview' } );

			if ( ! getters.history )
				dispatch( 'genericAction', { target: 'history' } );

			if ( ! getters.runTests )
				dispatch( 'genericAction', { target: 'tests' } );

			if ( ! getters.quickInfo )
				dispatch( 'genericAction', { target: 'quickInfo' } );

		},

		async genericAction( { commit, state }, { target } ) {

			if ( ! state )
				console.error( 'genericAction', target, 'no state' );
			else
				commit( target + 'Store', { runId: state.currentRunId, target, [ target ]: await genericPull( state.currentRunId, target ) } );

		}

	},
	modules: {
		// cart,
		// products
	},
	strict: debug/* ,
  plugins: debug ? [createLogger()] : [] */
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

			console.log( 'async genericPull', { runId, target, data } );

			return data;

		} )
		.catch( err => console.error( target, 'request:', err ) );

}


function genericGet( state, target ) {

	if ( ! state ) {

		console.error( 'genericGet', target, 'no state' );

	} else {

		if ( typeof state[ target ][ state.currentRunId ] !== 'undefined' )
			return state[ target ][ state.currentRunId ];
		else
			console.error( 'genericGet', target, state.currentRunId, 'not found', JSON.stringify( state[ target ] ) );

	}

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
