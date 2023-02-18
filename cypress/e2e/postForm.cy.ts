describe('new post form', () => {
  it('shows the new post form', () => {
    cy.visit('http://localhost:3000/posts/new')
      .get('h1').contains('Add')
  })
})

export {}
