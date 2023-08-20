// describe('service is available', () => {
//     it('should be available on localhost:3000', () => {
//         cy.visit('http://localhost:3000');
//     });
// });

// describe('constructor is available', () => {
//     it('should be available on localhost:3000', () => {
//         cy.visit('http://localhost:3000')
//     })
// });

// it('should show ingredient modal window', () => {
//     cy.get('[ingredientItem]').first().click()
//     cy.get('[id="modal"]').as("modal")
//     cy.get('@modal').contains("Детали ингредиента")
//     cy.get('modal').find('[id="modal-close"]').click()
// });


// describe('Burger Constructor', () => {
//     beforeEach(() => {
//       cy.visit('/'); // Перейти на страницу с компонентом Burger Constructor
//     });

//     it('should add an ingredient', () => {
//       cy.get('[data-test="ingredient-button"]').first().click(); // Нажать на кнопку добавления ингредиента
//       cy.get('[data-test="ingredient-list"]').should('have.length', 1); // Проверить, что ингредиент был добавлен
//     });

//     it('should remove an ingredient', () => {
//       // Предварительно добавьте ингредиент
//       cy.get('[data-test="ingredient-button"]').first().click();
//       cy.get('[data-test="ingredient-list"]').should('have.length', 1);

//       cy.get('[data-test="remove-button"]').first().click(); // Нажать на кнопку удаления ингредиента
//       cy.get('[data-test="ingredient-list"]').should('have.length', 0); // Проверить, что ингредиент был удален
//     });

//     it('should move an ingredient', () => {
//       // Предварительно добавьте несколько ингредиентов
//       cy.get('[data-test="ingredient-button"]').eq(0).click();
//       cy.get('[data-test="ingredient-button"]').eq(1).click();
//       cy.get('[data-test="ingredient-list"]').should('have.length', 2);

//       cy.get('[data-test="move-button"]').first().drag('[data-test="move-button"]').last(); // Перетащить ингредиент
//       cy.get('[data-test="ingredient-list"]').first().should('contain', 'second ingredient'); // Проверить, что ингредиент был перемещен
//     });

//     it('should set a burger bun', () => {
//       cy.get('[data-test="bun-select"]').select('Sesame Bun'); // Выбрать булочку
//       cy.get('[data-test="selected-bun"]').should('contain', 'Sesame Bun'); // Проверить, что выбрана правильная булочка
//     });

//     it('should clear the burger constructor', () => {
//       // Предварительно добавьте ингредиенты
//       cy.get('[data-test="ingredient-button"]').first().click();
//       cy.get('[data-test="ingredient-list"]').should('have.length', 1);

//       cy.get('[data-test="clear-button"]').click(); // Нажать на кнопку очистки
//       cy.get('[data-test="ingredient-list"]').should('have.length', 0); // Проверить, что конструктор очищен
//     });
//   });

// Замените селекторы [data-test="..."] на реальные селекторы из вашего приложения.

// Эти тесты позволят вам проверить функциональность компонента Burger Constructor, взаимодействуя с пользовательским интерфейсом вашего приложения через браузер.



describe('BurgerIngredients', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/'); // Предполагается, что путь к BurgerIngredients это 'http://localhost:3000/'
    });

    it('should display ingredient categories and tabs', () => {
        cy.get('[data-test="tab"]').should('have.length', 3); // Проверка количества вкладок
        cy.get('[data-test="tab"]').contains('Булки');
        cy.get('[data-test="tab"]').contains('Соусы');
        cy.get('[data-test="tab"]').contains('Начинки');
    });

    it('should display ingredients within categories', () => {
        cy.get('[data-test="ingredient-category"]').should('have.length', 3); // Проверка количества категорий
        cy.get('[data-test="ingredient-category"]').first().within(() => {
            cy.get('[data-test="ingredient"]').should('have.length.gt', 0); // Проверка наличия ингредиентов в первой категории
        });
    });

    it('should navigate to ingredient details page when an ingredient is clicked', () => {
        cy.get('[data-test="ingredient"]').first().click();
        cy.url().should('include', '/ingredients'); // Предполагается, что URL содержит '/ingredients'
    });
});


// В коде использованы атрибуты data - test, которые вы можете добавить к соответствующим элементам в вашем коде компонентов для облегчения выбора элементов Cypress.
// Перед выполнением этих тестов убедитесь, что пути / и / constructor соответствуют вашей реализации маршрутов для компонентов BurgerIngredients и BurgerConstructor.