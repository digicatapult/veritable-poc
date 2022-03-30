import env from '../../cypress.env.json'

describe('get react-verifier', () => {
  it('visits main page', () => {
    cy.visit(env.verifier_url)
    cy.get('body')
  })
})
