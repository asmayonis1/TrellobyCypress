describe('sample trello board with list and cards', () => {
  before(() => {
    
    cy.visit('https://id.atlassian.com/login')
    cy.get('#username').type("eng_asma@live.com")
   
    cy.get('#login-submit > .css-178ag6o').should('not.be.disabled')
    cy.get('#login-submit > .css-178ag6o').click()
    
    cy.get('#login-submit > .css-178ag6o').click()

    cy.get('#password').should('be.visible');
    cy.get('#password').type("Trello123456")
    cy.get('#login-submit').should('not.be.disabled')
    cy.get('#login-submit').click()
   
  })

//create  new list on Board
  it('create new list by API', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });
    cy.wait(3000)
    cy.url().should('include', 'https://start.atlassian.com/')
    cy.get('.sc-cvbbAY').click()
    //cy.contains('h3.boards-page-section-header-name', 'YOUR WORKSPACES').should('be.visible')
    cy.origin('https://trello.com', () => {
      cy.get('a.board-tile[href="/b/8IRYSYFi/new-board"]').click();

      cy.request({
        method: 'POST',
        url: 'https://api.trello.com/1/lists',
        qs: {
          name: 'Automated created list by API',
          idBoard: "64ff73acbc992425f0743852", 
          key: '6393b5cd4f2776ea72822394ee4c41cf',
          token: 'ATTA30d5868e8a3c3095fafb1918d5fdeaf15a08467e64820d1fde79deb242766a58397D23CF'
        }
      }).then((response) => {
        expect(response.status).to.eq(200); 
        const newListId = response.body.id;

      // create new card by ListId api
      cy.request({
          method: 'POST',
          url: 'https://api.trello.com/1/cards',
          qs: {
            name: 'Create a card with api',
            idList: newListId, 
            key: '6393b5cd4f2776ea72822394ee4c41cf',
            token: 'ATTA30d5868e8a3c3095fafb1918d5fdeaf15a08467e64820d1fde79deb242766a58397D23CF'
          }
        }).then((response) => {
          expect(response.status).to.eq(200); 
          const cardId = response.body.id;
      
      //delete card created
      cy.request({
            method: 'DELETE',
            url: `https://api.trello.com/1/cards/${cardId}`,
            qs: {
              key: '6393b5cd4f2776ea72822394ee4c41cf',
              token: 'ATTA30d5868e8a3c3095fafb1918d5fdeaf15a08467e64820d1fde79deb242766a58397D23CF'
            }
          }).then((response) => {
            expect(response.status).to.eq(200);
          });
      
        });

      });
    

});
});


 

});
