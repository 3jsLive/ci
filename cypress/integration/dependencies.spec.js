/// <reference types="Cypress" />

describe( 'CI - Web - Dependencies', () => {

	// Dependencies
	it( 'dependencies/DocsDocsDeps (36524a4c…)', () => {

		cy.visit( '/#/runs/48/dependencies/DocsDocsDeps' );

		const results = [
			{ Line: '86', Message: "File for 'Constant' not found in docs", RuleId: '[page:Constant interpolation]' },
			{ Line: '247', Message: 'Not found', RuleId: '[page:.valueSize value size]' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 84 );

		// error
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/constants/Animation.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Fconstants%2FAnimation.html/i );
		cy.get( '[data-cy=alert-danger]' ).should( 'be.visible' );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/animation/KeyframeTrack.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Fanimation%2FKeyframeTrack.html/i );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * Object.keys( result ).length + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

} );

