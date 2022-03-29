describe('get react-verifier', () => {
  it('visits main page', () => {
    cy.visit(Cypress.env('VERIFIER_URL'))
    cy.get('body')
  })
})