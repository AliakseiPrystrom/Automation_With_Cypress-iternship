/// <reference types="cypress" />

import AccessoriesPage from "../../../page-objects/accessoriesPage.cy";
import SearchResultPage from "../../../page-objects/searchResultPage.cy";
import ProductPage from "../../../page-objects/ProductPage.cy";
import CartPage from "../../../page-objects/cartPage.cy";
import productData from "../../fixtures/product.json";
import Chance from "chance";

describe(' User is able to add single and multiple color product to the cart', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
    });

    productData.forEach((currentProduct) => { // <----Data Provider realization
        it(`Current product is: ${currentProduct.name}`, () => {
            const chance = new Chance();
            AccessoriesPage.open();
            cy.log('GIVEN User is at Accessories page');
            AccessoriesPage.performSearch(currentProduct.name);
            cy.log(`WHEN User selects the product with ${currentProduct.name}`);
            cy.log('AND Data product is presented in the card');
            SearchResultPage.getPrice().then(price => cy.wrap(price).as('priceValue'));
            SearchResultPage.checkAndGoToProductPage(currentProduct.attribute);
            cy.log(`THEN User click on card and go to product page`);
            ProductPage.buyButtonClick();
            cy.get('@priceValue').then(price => {
                const chance = new Chance();
                let selectedColor = (currentProduct.colors.length > 1) ? chance.pickone(currentProduct.colors) : currentProduct.colors[0];
                cy.log(`THEN User choose color: ${selectedColor}`);
                if (currentProduct.colors.length > 1) {
                    ProductPage.chooseSelectedColor(selectedColor);
                    cy.log(`AND availabe color ony: ${selectedColor}`);
                }
                CartPage.productQuantityLocation.should('be.visible');
                cy.log(`AND product quantity is OK`);
                CartPage.checkPrice(price).then(checkPrice => cy.wrap(checkPrice).as('priceValue'));
                CartPage.checkName(currentProduct.name).then(checkName => cy.wrap(checkName).as('NameValue'));
                CartPage.getColor().then(checkColor => cy.wrap(checkColor).as('colorValue'));
                cy.get('@priceValue').should('be.true');
                cy.log(`AND The price of product is equal to the selected one ${price}`);
                cy.get('@NameValue').should('be.true');
                cy.log('AND The name of product is equal to the selected one');
                if (currentProduct.length == 1) {
                    cy.log(`AND Only ${selectedColor} is available.`);
                } else {
                    cy.get('@colorValue').then(colorValue => {
                        colorValue.includes(`${selectedColor}`);
                    });
                    cy.log(`AND selected color: ${selectedColor} is match.`);
                }
                CartPage.clearCart();
            });
        });
    });
});