describe('get react-issuer', () => {
  it('visits main page', () => {
    cy.visit(Cypress.env('ISSUER_URL'))
    cy.get('body')
  })
})
