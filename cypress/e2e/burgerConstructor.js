describe('BurgerConstructor', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); // Предполагается, что путь к BurgerConstructor это 'http://localhost:3000/'
    });

    it('should display selected bun and ingredients', () => {
        cy.get('[data-test="current-bun"]').should('exist'); // Проверка наличия текущей булки
        cy.get('[data-test="ingredient"]').should('have.length.gt', 0); // Проверка наличия ингредиентов
        cy.get('[data-test="ingredient-button]').first().click();
    });

    it('should calculate and display total price', () => {
        cy.get('[data-test="total-price"]').should('exist'); // Проверка наличия общей цены
    });

    it('should navigate to login page when "Order" button is clicked without being logged in', () => {
        cy.get('[data-test="order-button"]').click();
        cy.url().should('include', '/login'); // Предполагается, что URL содержит '/login'
    });

    it('should open order details modal when "Order" button is clicked and user is logged in', () => {
        // В этом тесте мы можем имитировать успешный вход пользователя
        // используя моки или стабы, так как Cypress не предназначен для тестирования Redux-состояния.
        cy.visit('http://localhost:3000', {
            onBeforeLoad: (win) => {
                win.localStorage.setItem('user', JSON.stringify({ isLoggedIn: true }));
            },
        });

        cy.get('[data-test="order-button"]').click();
        cy.get('[data-test="order-details-modal"]').should('be.visible');
    });
});