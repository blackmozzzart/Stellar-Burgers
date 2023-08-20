import '@4tw/cypress-drag-drop';

describe('Constructor is available', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); // Перейти на страницу с компонентом Burger Constructor
    });

    it('should show ingredient modal window', () => {
        cy.get('[data-test="ingredient"]').first().click();

        cy.get('[data-test="modal-overlay"]').as('modal');

        cy.get('@modal').contains('Детали ингредиента');
        cy.get('@modal').find('[data-test="modal-close"]').click();
    });

    it('should add new ingredient to constructor with dnd', () => {
        cy.get('[data-test="ingredient"]').as('ingredients');
        cy.get('[data-test="drop-area"]').as('constructor');

        cy.get('@ingredients').eq(8).drag('@constructor');
        cy.get('@ingredients').eq(2).drag('@constructor');
        cy.get('@ingredients').eq(9).drag('@constructor');
        cy.get('@ingredients').eq(3).drag('@constructor');
        cy.get('@ingredients').eq(4).drag('@constructor');
        cy.get('@ingredients').eq(1).drag('@constructor');
    });

    it('should create a new order', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://norma.nomoreparties.space/api/orders',
        }).as('orderRequest');

        cy.intercept({
            method: 'POST',
            url: 'https://norma.nomoreparties.space/api/auth/login',
        }).as('loginRequest');

        cy.get('[data-test="ingredient"]').as('ingredients');
        cy.get('[data-test="drop-area"]').as('constructor');
        cy.get('[data-test="checkout"]').as('checkout');

        cy.get('@ingredients').eq(0).drag('@constructor');
        cy.get('@ingredients').eq(8).drag('@constructor');
        cy.get('@ingredients').eq(2).drag('@constructor');
        cy.get('@ingredients').eq(9).drag('@constructor');

        cy.get('@checkout').click();

        cy.get('[name="e-mail"]').as('email');
        cy.get('[name="password"]').as('password');
        cy.get('[data-test="button-login"]').as('login');

        cy.get('@email').type('test@example.com');
        cy.get('@password').type('107143');

        cy.get('@login').click();
        cy.wait('@loginRequest');

        cy.get('@checkout').click();
        cy.wait('@orderRequest').its('response.statusCode').should('equal', 200)

        cy.get('[data-test="modal-overlay"]').as('modal');
        cy.get('[data-test="order-number"]').should('be.visible');
        cy.get('@modal').find('[data-test="modal-close"]').click();
    });
});