class SearchResultPage {

    get productPrice() {
        return cy.xpath('//*[@class="is-price"]');
    }

    checkResult(productAttribute) {
        return cy.get(`[href="/product/${productAttribute}`).should('exist');
    }

    goToProductPage(productAttribute) {
        cy.get(`[href="/product/${productAttribute}`).click();
    }

    checkAndGoToProductPage(productAttribute) {
        this.checkResult(productAttribute);
        this.goToProductPage(productAttribute);
    }

    getPrice() {
        let price;
        return new Cypress.Promise(resolve => {
            this.productPrice.each(element => price = element.text())
                .then(() => {
                    resolve(price);
                });
        });

    }

    getPriceWithOutChoise() {
        let price;
        return new Cypress.Promise(resolve => {
            this.productPriceWithOutChoise.then(element => {
                price = element.text();
                resolve(price);
            });
        });
    }

}

export default new SearchResultPage();