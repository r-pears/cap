describe('homepage', () => {
  it('shows the homepage', () => {
    cy.visit('http://localhost:3000/')
      .get('h1').contains('Welcome')

  })
})