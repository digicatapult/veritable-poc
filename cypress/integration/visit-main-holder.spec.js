import env from '../../cypress.env.json'

describe('get react-holder', () => {
  it('visits main page', () => {
    cy.visit(env.holder_url)
    cy.get('body')
  })
})
