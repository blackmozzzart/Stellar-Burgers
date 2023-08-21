// describe('BurgerIngredients', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000/'); // Предполагается, что путь к BurgerIngredients это 'http://localhost:3000/'
//     });

//     it('should display ingredient categories and tabs', () => {
//         cy.get('[data-test="tab"]').should('have.length', 3); // Проверка количества вкладок
//         cy.get('[data-test="tab"]').contains('Булки');
//         cy.get('[data-test="tab"]').contains('Соусы');
//         cy.get('[data-test="tab"]').contains('Начинки');
//     });

//     it('should display ingredients within categories', () => {
//         cy.get('[data-test="ingredient-category"]').should('have.length', 3); // Проверка количества категорий
//         cy.get('[data-test="ingredient-category"]').first().within(() => {
//             cy.get('[data-test="ingredient"]').should('have.length.gt', 0); // Проверка наличия ингредиентов в первой категории
//         });
//     });

//     it('should navigate to ingredient details page when an ingredient is clicked', () => {
//         cy.get('[data-test="ingredient"]').first().click();
//         cy.url().should('include', '/ingredients'); // Предполагается, что URL содержит '/ingredients'
//     });
// });
