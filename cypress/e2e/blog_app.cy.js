describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'Marcel',
      name: 'Make',
      password: 'marcel',
    })
    cy.createUser({
      username: 'Seconder',
      name: 'Second Person',
      password: 'seconder',
    })
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

    it('fails with wrong credentials', function () {
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Marcel', password: 'marcel' })
    })

    it('A blog can be created', function () {
      cy.contains('create new').click()
      cy.get('#title').type('A nice new blog')
      cy.get('#author').type('Marquez')
      cy.get('#url').type('https://coolbeans.nowhere')
      cy.contains('submit').click()

      cy.contains('Successfully added new blog (A nice new blog by Marquez)')
    })

    describe('When blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A nice new blog',
          author: 'Marquez',
          url: 'https://coobleans.nowhere',
          likes: '1',
        })
        cy.createBlog({
          title: 'Most likes',
          author: 'Marquez',
          url: 'https://coobleans.nowhere',
          likes: '101',
        })
        cy.createBlog({
          title: 'Second most likes',
          author: 'Marquez',
          url: 'https://coobleans.nowhere',
          likes: '100',
        })
      })

      it('Can like a blog', function () {
        cy.contains('A nice new blog').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').should('contain', '1')

        cy.get('@theBlog').get('#likeButton').click()
        cy.get('@theBlog').should('contain', '2')
      })

      it.only('Can remove self owned blog', function () {
        cy.contains('A nice new blog').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('remove').click()

        cy.contains('Successfully removed blog A nice new blog!')
      })

      it('Can not remove somebody elses blog', function () {
        cy.contains('logout').click()
        cy.login({ username: 'Seconder', password: 'seconder' })

        cy.contains('A nice new blog').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').should('not.contain', 'remove')
      })

      it('Blogs load in correct order', function () {
        cy.get('.blog-class').eq(0).contains('Most likes')
        cy.get('.blog-class').eq(1).contains('Second most likes')
      })

      it('Blogs reorder according to likes', function () {
        cy.contains('Second most likes').parent().as('aBlog')
        cy.get('@aBlog').contains('view').click()
        cy.get('@aBlog').should('contain', '100')
        cy.get('@aBlog').get('#likeButton').click()
        cy.get('@aBlog').should('contain', '101')
        cy.get('@aBlog').get('#likeButton').click()
        cy.get('@aBlog').should('contain', '102')

        cy.get('.blog-class').eq(0).contains('Second most likes')
        cy.get('.blog-class').eq(1).contains('Most likes')
      })
    })
  })
})
