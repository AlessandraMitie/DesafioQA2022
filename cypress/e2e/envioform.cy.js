var faker = require('faker')

var firstName = faker.Name.firstName();
var lastName = faker.Name.lastName();
var email = faker.Internet.email();
var address = faker.Address.streetAddress();

// evitar erros ads
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  describe('envioDeFormulario', () => {
    it('FP-enviar formulario', () => {
        cy.visit('https://demoqa.com/automation-practice-form')
        cy.get('.main-header').should('have.text', 'Practice Form')
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#userEmail').type(email)
        cy.get('.custom-control-label').eq(1).click()
        cy.get('#userNumber'). type('987654321')
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').select('March')
        cy.get('.react-datepicker__year-select').select('1993')
        cy.get('.react-datepicker__month').contains('22').click()
        cy.get('#subjectsContainer').type('a')
        cy.get('.subjects-auto-complete__menu').contains('Arts').click()
        cy.get('#subjectsContainer').type('e')
        cy.get('.subjects-auto-complete__menu').contains('English').click()
        cy.get('#hobbiesWrapper').contains('Music').click()
        cy.get('#uploadPicture').selectFile('cypress/fixtures/rg_frente.png')
        cy.get('#currentAddress').type(address)
        cy.get('#state').type('{downArrow}{enter}')
        cy.get('#city').type('{downArrow}{enter}')
        cy.get('#submit').click({force:true})

        cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form')
        cy.get('.table > tbody > tr').contains('td', firstName + ' ' + lastName)
        cy.get('.table > tbody > tr').contains('td', email)
        cy.get('.table > tbody > tr').contains('td', 'Female')
        cy.get('.table > tbody > tr').contains('td', '987654321')
        cy.get('.table > tbody > tr').contains('td', '22 March,1993')
        cy.get('.table > tbody > tr').contains('td', 'Arts, English')
        cy.get('.table > tbody > tr').contains('td', 'Music')
        cy.get('.table > tbody > tr').contains('td', 'rg_frente.png')
        cy.get('.table > tbody > tr').contains('td', address)
        cy.get('.table > tbody > tr').contains('td', 'Uttar Pradesh Lucknow')
        cy.get('#closeLargeModal').click({force:true})
    })
  })



  describe('selecaoGrid', () => {
    it('FP-selecionar Grids', () => {
      cy.visit('https://demoqa.com/selectable')
      cy.get('#demo-tab-grid').click()
      cy.contains('li', 'Two').click()
      cy.contains('li', 'Five').click()
      cy.contains('li', 'Seven').click()
    })
  })


//https://github.com/4teamwork/cypress-drag-drop
  describe('Drag and Drop', () => {

    it('FP-drag and Drop', () => {
      cy.visit('https://demoqa.com/droppable')
      cy.get('#draggable').drag('#droppable', {force:true})
      cy.get('#droppable').contains('Dropped!')
    })
    
  })