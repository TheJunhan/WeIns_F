// https://docs.cypress.io/api/introduction/api.html

describe('Login card', () => {
  it('find login card and test click', () => {
    cy.visit('/')
    cy.get("#signinForm_button_login").should('be.visible').click().should('be.visible')
  })

  it('find registerdiv and test',()=>{
    cy.get("#signinForm_button_signup > span").should("be.visible").click().should('not.exist')
    cy.url().should('include','/signup')
    cy.get(".el-button").should('be.visible');
  })

  it('input phone and passward to log in',()=>{
    cy.visit('/')
    cy.get("#signinForm_input_phone").type("18796700152");
    cy.get("#signinForm_input_password").type("12345678");
    cy.get(".el-card__body > .extern > .login > .btn > #signinForm_button_login").should('be.visible').click();
    cy.get(".el-card__body > .extern > .login > .btn > #signinForm_button_login").should("not.exist")

  })

})


describe("homepage",()=>{
  it("topnav",()=>{
    cy.get("#float > [data-v-858ff1a0=\"\"] > .container").should("be.visible");
    cy.get(".container > .nav").should("be.visible");
    cy.get(".searchbar > .el-button").should('be.visible').click();
    cy.get(':nth-child(5) > .el-dropdown > .el-dropdown-link > .el-icon-arrow-down').should("be.visible").click();
    cy.get("#person > .el-dropdown-menu__item").should("be.visible").click().should('not.exist');
    cy.url().should('include','/person');
    cy.get(":nth-child(1) > a > .el-dropdown-link").click();
    cy.url().should('include','/home');

  })

  it("side",()=>{
    cy.get("#\\32  > span").should('be.visible').click();
    cy.get("#\\33  > span").should('be.visible').click();
    cy.get("#\\34  > span").should('be.visible').click();
    cy.get("#\\35  > span").should('be.visible').click();
    cy.get("#\\36  > span").should('be.visible').click();
  })

  it("release",()=>{
    cy.get("#dropdown_release > .el-dropdown-link").click().contains('公开');
    cy.get("#dropdownmenu_release2").click();
    cy.get(".el-textarea__inner").type("my first blog");
    cy.get("#dropdown_release > .el-dropdown-link").click().contains('粉丝');
    cy.get("#dropdownmenu_release3").click();
  })


  it("blog",()=>{
    cy.get(":nth-child(1) > [data-v-303869ee=\"\"] > .el-card > .el-card__body > .blog > .container > .header > .el-row > .el-col-3 > :nth-child(1) > .el-dropdown > #custom-send-btn").contains("选项");
    cy.get("li > .img").click();
    cy.get(".el-image__inner").should('be.visible');
    cy.get("[style=\"z-index: 2009;\"]").click('topRight');
    cy.get(':nth-child(4) > [data-v-303869ee=""] > .el-card > .el-card__body > .blog > .footer > .el-row > :nth-child(4) > div > .el-button > .el-icon-star-off').should('be.visible').click();
    cy.get(":nth-child(1) > [data-v-303869ee=\"\"] > .el-card > .el-card__body > .blog > .footer > .el-row > :nth-child(2) > .el-button").click();
    cy.get("[style=\"z-index: 2011;\"] > .el-dialog > .el-dialog__body").should('be.visible');
    cy.get("[style=\"z-index: 2011;\"]").click('topRight');

  })
})


describe("person page",()=>{
  it("come to person",()=>{
    cy.get(':nth-child(5) > .el-dropdown > .el-dropdown-link > .el-icon-arrow-down').should("be.visible").click();
    cy.get("#person > .el-dropdown-menu__item").should("be.visible").click();
    cy.url().should('include',"/person");
  })

  it('check the unit',()=>{
    cy.get('.text1').contains('poker')
    cy.get('.extern > .el-card > .el-card__body > .card > :nth-child(1)').contains("关注").click();
    cy.get(':nth-child(1) > .el-button > span').contains('0');
    cy.get('.header').contains('我的关注');

    cy.get('.extern > .el-card > .el-card__body > .card > :nth-child(2)').contains('粉丝').click();
    cy.get(':nth-child(2) > .el-button > span').contains('0');
    cy.get('.header').contains('我的粉丝');


    cy.get('[style="text-align: center;"]').contains('动态').click();
    cy.get('[style="text-align: center;"] > .el-button > span').contains('6');
    cy.get('.my-blog > :nth-child(1)').should('be.visible');

  })

  it('edit',()=>{
    cy.get('.card > .btn > .el-button > span').contains('编辑个人资料').click();
    cy.get('.basic-info > .el-form > :nth-child(1) > .el-form-item__content > div > .span-text').contains('poker');
    cy.get('.basic-header-btn > .el-button').contains('编辑').click().contains('保存');

    cy.get(":nth-child(1) > .el-form-item__content > :nth-child(1) > .el-input > .el-input__inner").should('have.value','poker').clear().type('poker2');
    cy.get('.basic-info > .el-form > :nth-child(1) > .el-form-item__content > :nth-child(1) > span').should('be.visible').contains('该用户重复或格式不正确');
    cy.get(":nth-child(1) > .el-form-item__content > :nth-child(1) > .el-input > .el-input__inner").clear().type('pokerr');
    cy.get(':nth-child(1) > .el-dropdown > .el-dropdown-link').click();
    cy.get('#nan').click();
    cy.get('.basic-header-btn > .el-button').contains('保存').click();
    cy.get('.basic-info > .el-form > :nth-child(2) > .el-form-item__content > div > .span-text').contains('男');

    cy.get('.basic-header-btn > .el-button').contains('编辑').click().contains('保存');


    cy.get(":nth-child(1) > .el-form-item__content > :nth-child(1) > .el-input > .el-input__inner").should('have.value','pokerr').clear().type('poker');
    cy.get(':nth-child(1) > .el-dropdown > .el-dropdown-link').click();
    cy.get('#nv').click();
    cy.get('.basic-header-btn > .el-button').contains('保存').click().contains('编辑');
    cy.get('.basic-info > .el-form > :nth-child(2) > .el-form-item__content > div > .span-text').contains('女');


    cy.get('.contact-header-btn > .el-button').contains('编辑').click().contains('保存');
    cy.get(':nth-child(2) > .el-form-item__content > :nth-child(1) > .el-input > .el-input__inner').should('have.value','18796700152').clear().type('18796700100');
    cy.get('.contact-header-btn > .el-button').contains('保存').click().contains('编辑').click().contains('保存');
    cy.get(':nth-child(2) > .el-form-item__content > :nth-child(1) > .el-input > .el-input__inner').should('have.value','18796700100').clear().type('18796700152');
    cy.get('.contact-header-btn > .el-button').contains('保存').click();



  })
})