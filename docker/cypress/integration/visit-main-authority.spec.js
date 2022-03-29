describe('get react-authority', () => {
  it('visits main page', () => {
    cy.visit(Cypress.env('AUTHORITY_URL'))
    cy.get('body')
  })
})