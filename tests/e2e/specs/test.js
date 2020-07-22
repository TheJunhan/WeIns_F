// https://docs.cypress.io/api/introduction/api.html

describe('Login card', () => {
  it('find login card and test click', () => {
    cy.visit('/')
    cy.get("#signinForm_button_login").should('be.visible').click().should('be.visible')
  })

  it('input phone and passward to log in',()=>{
    cy.get("#signinForm_input_phone").type("18796700152");
    cy.get("#signinForm_input_password").type("12345678");
    cy.get("#signinForm_button_login").should('be.visible').click();
    cy.get("#signinForm_button_login").should("not.exist")

  })
  it('find registerdiv and test',()=>{

  })
})
