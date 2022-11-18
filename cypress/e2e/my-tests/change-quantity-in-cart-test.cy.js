/// <reference types="cypress" />

import CartPage from "../../../page-objects/cartPage.cy";
import AddToCartStep from "./add-to-cart-step.cy";
import productData from "../../fixtures/product.json";
import Chance from "chance";

describe('Add product data to the cart', () => {
    before(() => {
        let userStory = [];
        productData.forEach((currentProduct) => {
            AddToCartStep.addToCart(currentProduct);
            cy.get('@priceValue').then((price) => {
                userStory.push({
                    name: `${currentProduct.name}`,
                    price: price
                });
            });
            cy.wrap(userStory).as('story');
        });
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
    });

    it('User story: User is able to change the quantity of products in the card', () => {
        cy.visit(`${Cypress.env('cartUrl')}`);
        let productsPriceList = [];
        cy.get('@story').then((story) => {
            story.forEach(element => {
                productsPriceList.push(+element.price.replace('$', ''));
            });

            CartPage.getTotalPrice().then(totalPrice => {
                cy.wrap(totalPrice).as('totalPrice');
                CartPage.checkTotalAndOrderPrice(productsPriceList, totalPrice).then(result => cy.wrap(result).as('priceValue'));
            });

            let productNames = [];
            story.forEach((element, index) => {
                productNames.push(CartPage.checkName(element.name).then(result => cy.wrap(result).as(`Product name № ${index}`)));
            });

            productNames.forEach((element, index) => {
                cy.get(`@Product name № ${index}`).should('be.true');
            });

            cy.get('@priceValue').should('be.true');

            function changeQuantity() {
                const chance = new Chance();
                let currentCounts = [];
                for (let i = 1; i < story.length + 1; i++) {
                    let path = `select[data-test-qty-dd="${i}"]`;
                    let arrValues = [];
                    cy.get(path).find('option').invoke('text').then(capacityCounts => {
                        for (var i = 0; i < capacityCounts.length; i++) {
                            if (+capacityCounts.charAt(i) > 1) {
                                arrValues.push(+capacityCounts.charAt(i));
                            }
                        }
                        currentCounts.push(arrValues);
                    });
                }
                cy.wrap(currentCounts).as('currentCounts');
                cy.get('@currentCounts').then(productsValuesArrays => {
                    for (let i = 1; i < productsValuesArrays.length + 1; i++) {
                        let path = `select[data-test-qty-dd="${i}"]`;
                        if (productsValuesArrays[i - 1].length >= 1) {
                            let valueForSelect = chance.pickone(productsValuesArrays[i - 1]);
                            cy.get(path).select(valueForSelect);
                        }
                    }
                });
            }
            changeQuantity();
            cy.wait(2000);
            CartPage.getTotalPrice().then(finalTotalPrice => {
                cy.get('@totalPrice').should('not.eq', finalTotalPrice);
            });

        });

    });
    after(() => {
        CartPage.removeAll();
    });
});
