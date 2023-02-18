describe('posts', () => {
  it('shows the posts page', () => {
    cy.visit('http://localhost:3000/posts')
  })
})