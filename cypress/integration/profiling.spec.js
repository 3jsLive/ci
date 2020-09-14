/// <reference types="Cypress" />

describe( 'CI - Web - Profiling', () => {

	// Dependencies
	it( 'profiling/ProfConsole (36524a4c…)', () => {

		cy.visit( '/#/runs/48/profiling/ProfConsole' );

		const results = [
			{ Number: '0', Type: 'console', Severity: 'warning', Location: 'HOST/build/three.module.js:16123:12', Message: 'THREE.WebGLRenderer: EXT_frag_depth extension not supported.' },
			{ Number: '1', Type: 'console', Severity: 'warning', Location: 'HOST/build/three.module.js:16123:12', Message: 'THREE.WebGLRenderer: EXT_shader_texture_lod extension not supported.' },
			{ Number: '2', Type: 'console', Severity: 'error', Location: 'HOST/favicon.ico:0:0', Message: 'Failed to load resource: the server responded with a status of 404 (File not found)' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 324 );

		// error
		// cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/constants/Animation.html' ).should( 'have.length', 1 ).click();
		// cy.url().should( 'match', /docs%2Fapi%2Fen%2Fconstants%2FAnimation.html/i );
		// cy.get( '[data-cy=alert-danger]' ).should( 'be.visible' );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/misc_controls_transform.html' ).should( 'have.length', 1 ).click();
		cy.hash().should( 'contain', 'examples%2Fmisc_controls_transform.html' );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * Object.keys( result ).length + idxCol ).should( 'have.text', val );

			} );

		} );

	} );


	it( 'profiling/ProfConsole (1908f394……)', () => {

		cy.visit( '/#/runs/49/profiling/ProfConsole' );

		const resultsFromBase = [
			{ Number: '0', Type: 'console', Severity: 'warning', Location: 'HOST/build/three.module.js:16123:12', Message: 'THREE.WebGLRenderer: EXT_frag_depth extension not supported.' },
			{ Number: '1', Type: 'console', Severity: 'warning', Location: 'HOST/build/three.module.js:16123:12', Message: 'THREE.WebGLRenderer: EXT_shader_texture_lod extension not supported.' },
			{ Number: '2', Type: 'console', Severity: 'error', Location: 'HOST/favicon.ico:0:0', Message: 'Failed to load resource: the server responded with a status of 404 (File not found)' }
		];

		const resultsNew = [
			{ Number: '0', Type: 'console', Severity: 'error', Location: 'HOST/favicon.ico:0:0', Message: 'Failed to load resource: the server responded with a status of 404 (File not found)' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 325 );

		// error
		// cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/constants/Animation.html' ).should( 'have.length', 1 ).click();
		// cy.url().should( 'match', /docs%2Fapi%2Fen%2Fconstants%2FAnimation.html/i );
		// cy.get( '[data-cy=alert-danger]' ).should( 'be.visible' );


		// old data we "inherited" from base
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/misc_controls_transform.html' ).should( 'have.length', 1 ).click();
		cy.hash().should( 'contain', 'examples%2Fmisc_controls_transform.html' );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', resultsFromBase.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		resultsFromBase.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * Object.keys( result ).length + idxCol ).should( 'have.text', val );

			} );

		} );


		// new data from our current run
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/webgl_loader_mmd_audio.html' ).should( 'have.length', 1 ).click();
		cy.hash().should( 'contain', 'examples%2Fwebgl_loader_mmd_audio.html' );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', resultsNew.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		resultsNew.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * Object.keys( result ).length + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

} );

