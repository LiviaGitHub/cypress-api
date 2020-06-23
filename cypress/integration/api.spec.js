/// <reference types="Cypress" />

describe('REST API Test with cypress', () => {
    it('Validate Headers', () =>{
        cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })
})
    
it('Check 200 status and body', () => {
    cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
    cy.get('@pokemon').its('status').should('equal', 200)
    cy.get('@pokemon').its('body').should('include', { name: 'pikachu'})
})

//test only this
it.only('Check negative status', () => {
    cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/1000', 
        //ignore the error
        failOnStatusCode: false, }).as('pokemon')
    cy.get('@pokemon').its('status').should('equal', 404)
})