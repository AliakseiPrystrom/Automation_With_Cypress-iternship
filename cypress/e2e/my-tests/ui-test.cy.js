import AccessoriesPage from "../../../page-objects/accessoriesPage.cy";
import SearchResultPage from "../../../page-objects/searchResultPage.cy";

describe('ui test', () => {
    before(() => {
        cy.fixture('product').then(data => {
            cy.wrap(data).as('productData');
        });
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
// returning false here prevents Cypress from
// failing the test
        return false
    });
    it('', () => {
        cy.get('@productData').then((productData) => {
            AccessoriesPage.open();
            AccessoriesPage.performSearch(productData[0].name);
            SearchResultPage.checkResult(productData[0].attribute);
        });
    });
});
