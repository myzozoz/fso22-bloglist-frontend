describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Marcel',
      name: 'Make',
      password: 'marcel',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Marcel')
      cy.get('#password').type('marcel')
      cy.get('#login-button').click()
      cy.contains('Successfully logged in! Welcome Make')
    })

    it.only('fails with wrong credentials', function () {
      cy.get('#username').type('Marcel')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should(
          'contain',
          'Could not log in! Please check username and password.'
        )
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
