import { mount } from 'cypress-vue-unit-test';
import FilesList from '../../../src/components/FilesList.vue';

// define count get and set helpers
// const setCount = value => Cypress.vue.$store.commit( 'set', value );
// const getCurrentFile = () => Cypress.vue.$store.state.route.query.filename;

import store from './store';
import router from './FileList.router';

import { sync } from 'vuex-router-sync';
sync( store, router );

describe( 'FilesList component', () => {

	it( 'basic', () => {

		mount( FilesList, {
			store,
			propsData: {
				files: {
					'docs/foo.html': { hide: false, name: 'docs/bar.html', decoration: { class: 'bg-danger text-white', text: 'baz' } },
					'a/asd.html': { hide: true, name: 'a/asd.html', decoration: { class: 'bg-danger text-white', text: 'asd' } },
					'path/file.html': { hide: false, name: 'path/file.html', decoration: { class: 'bg-warning', text: '42' } },
					'major/error.html': { hide: false, name: 'major/error.html', decoration: { class: 'bg-warning', text: '23' }, error: true }
				}
			},
			stylesheets: [
				"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
			]
		} );

		cy.get( '[data-cy=filter]' ).should( 'be.visible' ).and( 'have.length', 1 );

		cy.get( '[data-cy=files-list]' ).should( 'be.visible' ).and( 'have.length', 1 );

		cy.get( '[data-cy=files-list-item]' ).should( 'not.contain', 'asd.html' );
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 3 ).then( items => {

			expect( items[ 0 ] ).to.contain( 'docs/bar.html' ).and.contain( 'baz' ).and.be.visible.and.not.have.class( 'bg-danger' );
			expect( items[ 1 ] ).to.contain( 'path/file.html' ).and.contain( '42' ).and.be.visible.and.not.have.class( 'bg-danger' );
			expect( items[ 2 ] ).to.contain( 'major/error.html' ).and.be.visible.and.have.class( 'bg-danger' ).and.not.contain( '23' );

		} );

	} );

	it( 'no/empty files list', () => {

		mount( FilesList, {
			store,
			propsData: {},
			stylesheets: [
				"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
			]
		} );

		cy.get( '[data-cy=filter]' ).should( 'have.length', 1 ).and( 'be.visible' );

		cy.get( '[data-cy=files-list]' ).should( 'have.length', 1 ).and( 'not.be.visible' ).and( 'have.text', '' );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 0 ).and( 'not.be.visible' );

	} );

	it( 'clicking', () => {

		mount( FilesList, {
			store,
			router,
			propsData: {
				files: {
					'docs/foo.html': { hide: false, name: 'docs/bar.html', decoration: { class: 'bg-danger text-white', text: 'baz' } }
				}
			},
			stylesheets: [
				"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
			]
		} );

		cy.get( '[data-cy=files-list]' ).should( 'be.visible' ).and( 'have.length', 1 );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 1 ).click().then( el => {

			expect( Cypress.vue.$route.query ).to.eql( { filename: 'docs/bar.html' } );
			expect( el ).to.have.class( 'active' );

		} );

	} );

	it( 'filter query', () => {

		mount( FilesList, {
			store,
			router,
			propsData: {
				files: {
					'docs/aaa.html': { hide: false, name: 'docs/aaa.html', decoration: { class: 'bg-danger text-white', text: '1' } },
					'docs/bbb.html': { hide: false, name: 'docs/bbb.html', decoration: { class: 'bg-danger text-white', text: '1' } },
					'docs/ccc.html': { hide: false, name: 'docs/ccc.html', decoration: { class: 'bg-danger text-white', text: '1' } },
					'docs/ddd.html': { hide: false, name: 'docs/ddd.html', decoration: { class: 'bg-danger text-white', text: '1' } },
					'docs/aeaf.html': { hide: false, name: 'docs/aeaf.html', decoration: { class: 'bg-danger text-white', text: '1' } },
				}
			},
			stylesheets: [
				"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
			]
		} );

		cy.get( '[data-cy=files-list]' ).should( 'be.visible' );

		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 5 );

		cy.get( '[data-cy=filter]' ).type( 'a' );
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 2 );
		cy.get( '[data-cy=files-list-item-text]' ).should( 'contain.text', 'a' );

		cy.get( '[data-cy=filter]' ).type( 'a' );
		cy.get( '[data-cy=files-list-item]' ).should( 'have.length', 1 );
		cy.get( '[data-cy=files-list-item-text]' ).should( 'contain.text', 'aa' );

	} );

} );
