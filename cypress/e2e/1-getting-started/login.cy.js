describe('example to-do app', () => {
  beforeEach(() => {
    
    cy.visit('https://id.atlassian.com/signup')
    cy.get('#email').type("eng_asma@live.com")
    cy.get('#signup-submit').should('not.be.disabled')
    cy.get("#signup-submit").click()
    cy.get('#email').type("eng_asma@live.com")
    cy.get("#signup-submit").click()
    cy.get('#password').type("Trello123456")
    cy.get('#login-submit').should('not.be.disabled')
    cy.get('#login-submit').click()
    cy.contains('h3.boards-page-section-header-name', 'YOUR WORKSPACES').should('be.visible')
  })

})