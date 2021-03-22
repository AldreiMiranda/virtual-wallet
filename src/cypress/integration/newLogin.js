
describe('Create new Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  
  it('contains virtual wallet', () => {
    cy.title().should('contain', 'Virtual Wallet')
  })
})
