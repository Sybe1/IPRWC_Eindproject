describe('test', () => {

  it('should not login when combination username/password doesnt exist', () => {
    cy.intercept("POST", 'http://localhost:8080//auth/authenticate', {
      statusCode: 403
    });

    cy.visit('/login');


    cy.url().should('includes', '');
    cy.get('#username').type('sybe')
    cy.get('#password').type('sybeAerts')
    cy.get('#submitButton').click();

    cy.url().should('not.include', 'home')
  })

  it('should login when combination username/password is correct', () =>{
    cy.intercept("POST", 'http://localhost:8080/api/v1/auth/authenticate', {
      statusCode: 200
    });

    cy.visit('/login');
    cy.url().should('includes', '');
    cy.get('#username').type('11')
    cy.get('#password').type('11')

    cy.get('#submitButton').click();

    cy.url().should('include', 'home')
  })
})
