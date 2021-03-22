
describe('Create new Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  
  it('contains virtual wallet', () => {
    cy.get('h3').contains('Virtual Wallet')
    cy.get('div').contains('Criar uma conta').click({ force: true })
    cy.get('div').contains('Usuário').click({ force: true }).type('name')
  })
})
