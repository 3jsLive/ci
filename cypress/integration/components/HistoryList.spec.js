import { mount } from 'cypress-vue-unit-test';
import HistoryList from '../../../src/components/HistoryList.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

const router = new VueRouter();


describe( 'HistoryList component', () => {

	it( 'basic', () => {

		mount( HistoryList, {
			router,
			propsData: {
				history: [
					{
						runId: 1,
						sha: '0011223344556677889900112233445566778899'
					}, {
						runId: - 1,
						sha: '9988776655443322110099887766554433221100'
					}, {
						runId: 5,
						sha: '0000000000000000000000000000000000000000'
					}
				]
			}
		} );

		cy.get( '[data-cy=history-list-base]' ).should( 'be.visible' ).and( 'have.length', 1 );

		cy.get( '[data-cy=history-list-missing]' ).should( 'be.visible' ).and( 'have.length', 1 );

		cy.get( '[data-cy=history-list]' ).within( list => {

			const kids = list.children();

			expect( kids.length ).to.equal( 3 );
			expect( kids[ 0 ] ).to.contain( '0011223344556677889900112233445566778899' ).and.contain( 'Base' ).and.be.visible;
			expect( kids[ 1 ] ).to.contain( '9988776655443322110099887766554433221100' ).and.visible;
			expect( kids[ 2 ] ).to.contain( '0000000000000000000000000000000000000000' ).and.visible;

		} );

		cy.get( '[data-cy=history-list] a' ).should( 'have.length', 2 ).invoke( 'text' ).should( 'match', /\#1\s+\#5/ );

	} );

	it( 'empty', () => {

		mount( HistoryList, {
			router,
			propsData: {}
		} );

		cy.get( '[data-cy=history-list-base]' ).should( 'not.be.visible' );

		cy.get( '[data-cy=history-list-missing]' ).should( 'not.be.visible' );

		cy.get( '[data-cy=history-list]' ).should( 'not.be.visible' );

	} );

} );
