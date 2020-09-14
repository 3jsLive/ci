/// <reference types="Cypress" />

describe( 'CI - Web - Linters', () => {

	// Linters
	it( 'linters/DoobsDoc (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/DoobsDoc' );

		const results = [
			{ Line: '50', Level: 'warning', Message: 'trailing space after title (assuming everything else is fine)', RuleId: 'trailing-space-after-title' },
			{ Line: '51', Level: 'warning', Message: 'trailing space after title (assuming everything else is fine)', RuleId: 'trailing-space-after-title' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 64 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/audio/AudioAnalyser.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Faudio%2FAudioAnalyser.html/i );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintCodeTags (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/ESLintCodeTags' );

		const results = [
			{ Line: '26', Type: '1', Message: "'width' is not defined.", RuleId: 'no-undef' },
			{ Line: '26', Type: '1', Message: "'height' is not defined.", RuleId: 'no-undef' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 143 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/cameras/PerspectiveCamera.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Fcameras%2FPerspectiveCamera.html/i );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintScriptTags (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/ESLintScriptTags' );

		const results = [
			{ Line: '42', Type: '1', Message: "'texture' is defined but never used.", RuleId: 'no-unused-vars' },
			{ Line: '100', Type: '2', Message: "Multiple spaces found before '// set materia...'.", RuleId: 'no-multi-spaces' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 19 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/webgl_materials_physical_transparency.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fwebgl_materials_physical_transparency.html/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintJsFiles (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/ESLintJsFiles' );

		const results = [
			{ Line: '1464', Type: '1', Message: "'Zlib' is not defined.", RuleId: 'no-undef' },
			{ Line: '1491', Type: '1', Message: "'Zlib' is not defined.", RuleId: 'no-undef' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 46 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/js/loaders/EXRLoader.js' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fjs%2Floaders%2FEXRLoader.js/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintTsFiles (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/ESLintTsFiles' );

		const results = [
			{ Line: '21', Type: '1', Message: "'FullScreenQuad' is defined but never used.", RuleId: '@typescript-eslint/no-unused-vars' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 3 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/jsm/postprocessing/Pass.d.ts' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fjsm%2Fpostprocessing%2FPass.d.ts/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/HTMLLint (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/HTMLLint' );

		const results = [
			{ Line: '102', Type: 'error', Message: "Special characters must be escaped : [ < ].", RuleId: 'spec-char-escape' },
			{ Line: '102', Type: 'error', Message: "Special characters must be escaped : [ > ].", RuleId: 'spec-char-escape' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 33 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/examples/en/exporters/GLTFExporter.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fexamples%2Fen%2Fexporters%2FGLTFExporter.html/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/StyleLint (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/StyleLint' );

		const results = [
			{ Line: '11', Type: 'error', Message: `Unexpected shorthand "background" after "background-color" (declaration-block-no-shorthand-property-overrides)`, RuleId: 'declaration-block-no-shorthand-property-overrides' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 4 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/css3d_molecules.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fcss3d_molecules.html/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/glslang (36524a4c…)', () => {

		cy.visit( '/#/runs/48/linters/glslang' );

		// TODO:

		throw new Error( "TODO" );

	} );

	it( 'linters/DoobsDoc (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/DoobsDoc' );

		const results = [
			{ Line: '50', Level: 'warning', Message: 'trailing space after title (assuming everything else is fine)', RuleId: 'trailing-space-after-title' },
			{ Line: '51', Level: 'warning', Message: 'trailing space after title (assuming everything else is fine)', RuleId: 'trailing-space-after-title' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 64 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/audio/AudioAnalyser.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Faudio%2FAudioAnalyser.html/i );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintCodeTags (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/ESLintCodeTags' );

		const results = [
			{ Line: '26', Type: '1', Message: "'width' is not defined.", RuleId: 'no-undef' },
			{ Line: '26', Type: '1', Message: "'height' is not defined.", RuleId: 'no-undef' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 143 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/api/en/cameras/PerspectiveCamera.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fapi%2Fen%2Fcameras%2FPerspectiveCamera.html/i );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintScriptTags (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/ESLintScriptTags' );

		const results = [
			{ Line: '42', Type: '1', Message: "'texture' is defined but never used.", RuleId: 'no-unused-vars' },
			{ Line: '100', Type: '2', Message: "Multiple spaces found before '// set materia...'.", RuleId: 'no-multi-spaces' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 19 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/webgl_materials_physical_transparency.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fwebgl_materials_physical_transparency.html/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintJsFiles (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/ESLintJsFiles' );

		const results = [
			{ Line: '1464', Type: '1', Message: "'Zlib' is not defined.", RuleId: 'no-undef' },
			{ Line: '1491', Type: '1', Message: "'Zlib' is not defined.", RuleId: 'no-undef' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 46 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/js/loaders/EXRLoader.js' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fjs%2Floaders%2FEXRLoader.js/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/ESLintTsFiles (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/ESLintTsFiles' );

		const results = [
			{ Line: '21', Type: '1', Message: "'FullScreenQuad' is defined but never used.", RuleId: '@typescript-eslint/no-unused-vars' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 3 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/jsm/postprocessing/Pass.d.ts' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fjsm%2Fpostprocessing%2FPass.d.ts/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/HTMLLint (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/HTMLLint' );

		const results = [
			{ Line: '102', Type: 'error', Message: "Special characters must be escaped : [ < ].", RuleId: 'spec-char-escape' },
			{ Line: '102', Type: 'error', Message: "Special characters must be escaped : [ > ].", RuleId: 'spec-char-escape' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 33 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'docs/examples/en/exporters/GLTFExporter.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /docs%2Fexamples%2Fen%2Fexporters%2FGLTFExporter.html/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/StyleLint (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/StyleLint' );

		const results = [
			{ Line: '11', Type: 'error', Message: `Unexpected shorthand "background" after "background-color" (declaration-block-no-shorthand-property-overrides)`, RuleId: 'declaration-block-no-shorthand-property-overrides' }
		];

		cy.get( '[data-cy=results-table] tbody tr' ).as( 'results-table-rows' );

		// files list
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 4 );

		// data
		cy.get( '[data-cy=files-list-item]' ).contains( 'examples/css3d_molecules.html' ).should( 'have.length', 1 ).click();
		cy.url().should( 'match', /examples%2Fcss3d_molecules.html/ );
		cy.get( '[data-cy=alert-danger]' ).should( 'not.be.visible' );

		cy.get( '@results-table-rows' ).should( 'have.length', results.length );
		cy.get( '@results-table-rows' ).should( 'be.visible' );

		results.forEach( ( result, idxRow ) => {

			Object.values( result ).forEach( ( val, idxCol ) => {

				cy.get( '@results-table-rows' ).find( 'td' ).eq( idxRow * 4 + idxCol ).should( 'have.text', val );

			} );

		} );

	} );

	it( 'linters/glslang (1908f394……)', () => {

		cy.visit( '/#/runs/49/linters/glslang' );

		// TODO:

		throw new Error( "TODO" );

	} );

} );

