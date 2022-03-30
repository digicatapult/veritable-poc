import env from '../../cypress.env.json'

describe('get react-issuer', () => {
  it('visits main page', () => {
    cy.visit(env.issuer_url)
    cy.get('body')
  })
})
