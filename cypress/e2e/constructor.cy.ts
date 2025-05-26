const buns = '[data-cy=buns]';
const mains = '[data-cy=mains]';
const sauces = '[data-cy=sauces]';
const ingredientsList = '[data-cy=burger-ingredient]';
const constructor = '[data-cy=constructor]';
const bunTop = '[data-cy=constructor-bun-top]';
const bunBottom = '[data-cy=constructor-bun-bottom]';
const constructorIngredients = '[data-cy=constructor-ingredients]';
const constructorTotal = '[data-cy=constructor-total]';
const orderNumber = '[data-cy=order-number]';
const modal = '[data-cy=modal]';
const overlay = '[data-cy=modal-overlay]';

describe('добавление ингредиента из списка в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1280, 720);
    cy.visit('/');
  });

  it('добавление булки в конструктор', () => {
    cy.get(buns).contains('Добавить').click();
    cy.get(bunTop).should('contain', 'Краторная булка N-200i');
    cy.get(bunBottom).should('contain', 'Краторная булка N-200i');
  });

  it('добавление начинки в конструктор', () => {
    cy.get(mains).contains('Добавить').click();
    cy.get(sauces).contains('Добавить').click();
    cy.get(constructorIngredients)
      .as('ingredients')
      .should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('@ingredients').should('contain', 'Соус Spicy-X');
  });
});

describe('взаимодействие с модальным окном (детали ингредиента)', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1280, 720);
    cy.visit('/');
  });

  it('открытие модального окна (детали ингредиента)', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get(modal).as('modal').should('contain', 'Детали ингредиента');
    cy.get('@modal').should('contain', 'Флюоресцентная булка R2-D3');
  });

  it('закрытие модального окна (детали ингредиента), клик на кнопку на экране', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get(modal).should('contain', 'Детали ингредиента');
    cy.get(`${modal} button`).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрытие модального окна (детали ингредиента), клику на оверлей', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get(modal).should('contain', 'Детали ингредиента');
    cy.get(overlay).click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('процесс создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );

    cy.viewport(1280, 720);
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('создание заказа', () => {
    cy.get(buns).contains('Добавить').click();
    cy.get(ingredientsList)
      .as('ingredients')
      .eq(6)
      .contains('Добавить')
      .click();
    cy.get('@ingredients').eq(4).contains('Добавить').click();
    cy.get(sauces).contains('Добавить').click();
    cy.get(mains).contains('Добавить').click();

    cy.get(`${constructorTotal} button`).click();

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get(`${modal} ${orderNumber}`).as('modal').should('contain', '59592');
    cy.get(`${modal} button`).click();
    cy.get('@modal').should('not.exist');

    cy.get(constructor)
      .as('constructor')
      .should('not.contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('not.contain', 'Сыр с астероидной плесенью');
    cy.get('@constructor').should(
      'not.contain',
      'Хрустящие минеральные кольца'
    );
    cy.get('@constructor').should('not.contain', 'Соус Spicy-X');
    cy.get('@constructor').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get(constructorIngredients).should('contain', 'Выберите начинку');
  });
});