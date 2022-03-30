import env from '../../cypress.env.json'

describe('get react-authority', () => {
  it('visits main page', () => {
    cy.visit(env.authority_url)
    cy.get('body')
  })
})
