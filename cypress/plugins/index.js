/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// default webpack file preprocessor is good for simple cases
// Required to temporarily patch async components, chunking, and inline image loading
const { onFileDefaultPreprocessor } = require( 'cypress-vue-unit-test/dist/preprocessor/webpack' );

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = ( on, config ) => {

	// on( 'task', require( '@cypress/code-coverage/task' ) );
	require( '@cypress/code-coverage/task' )( on, config );

	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	on( 'file:preprocessor', onFileDefaultPreprocessor );

	return config;

};
