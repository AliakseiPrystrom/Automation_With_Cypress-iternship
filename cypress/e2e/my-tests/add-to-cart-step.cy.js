import AccessoriesPage from "../../../page-objects/accessoriesPage.cy";
import SearchResultPage from "../../../page-objects/searchResultPage.cy";
import ProductPage from "../../../page-objects/ProductPage.cy";
class AddToCartStep {

    addToCart(product) {
        AccessoriesPage.open();
        cy.log('GIVEN User is at Accessories page');
        AccessoriesPage.performSearch(product.name);
        cy.log(`WHEN User selects the product with ${product.name}`);
        cy.log('AND Data product is presented in the card');
        SearchResultPage.getPrice().then(price => cy.wrap(price).as('priceValue'));
        SearchResultPage.checkAndGoToProductPage(product.attribute);
        cy.log(`THEN User click on card and go to product page`);
        ProductPage.buyButtonClick();
        ProductPage.getColorAndChoose(product);
        cy.wait(1000);
    }
}

export default new AddToCartStep();