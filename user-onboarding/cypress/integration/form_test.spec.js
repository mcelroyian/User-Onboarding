import { v4 as uuid } from 'uuid'

const url = 'http://localhost:3000/'
const name = uuid().slice(0,7)
const email = `${name}@me.com`
const password = uuid().slice(0,10)

//Test User List form
describe("User List Form", () => {

    it('Can navigate to the site', () => {
        cy.visit(url)
    })
    
    
    // it('Can add user', () => {
    //     cy.get('input[name="name"]')
    //         .type(name)
    //         .should('have.value', name)

    //     cy.get('input[name="email"]')
    //         .type(email)
    //         .should('have.value', email)
        
    //     cy.get('input[name="password"]')
    //         .type(password)
    //         .should('have.value', password)

    //     cy.get('input[name="termsAgree"]')
    //         .check()
    //         .should('have.checked')

    //     cy.contains('Submit')
    //         .click()

    //     cy.get('.App')
    //         .contains(name)
    //         .contains(email)
    //         .contains(password)
    //         .contains('true')
    // })

    it('disallows submit with empty content', () => {

        cy.contains('Submit')
            .should('be.disabled')

        cy.get('input[name="email"]')
            .type('a')
            .should('have.value', 'a')

        cy.get('.errors')
            .contains('A valid email address is required')

    })



})