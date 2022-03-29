describe('get react-holder', () => {
  it('visits main page', () => {
    cy.visit(Cypress.env('HOLDER_URL'))
    cy.get('body')
  })
})
