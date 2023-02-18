describe('navigation', () => {
  it('make sure navigation works', () => {
    cy.visit('http://localhost:3000/')
      .get('h1').contains('Welcome')
      .get('[data-cy=nav-posts]').click()
  })
})

export { }
