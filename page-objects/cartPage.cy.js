class CartPage {

    get productQuantityLocation() {
        return cy.xpath(`//button[@data-selected-quantity="${Cypress.env('testQuantityValue')}"]`);
    }

    get productQuantityDropdownForChangeValue() {
        return cy.get('select');
    }

    get productNameAndColorLocation() {
        return cy.xpath('//*[@data-test-lineitem-title]');
    }

    get productPriceLocation() {
        return cy.xpath('//p[@data-test-line-item-price]');
    }

    get productTotalPriceLocation() {
        return cy.xpath('//span[@data-test-price-subtotal]');
    }

    get removeCartButtonLocation() {
        return cy.xpath('//span[text()="Remove"]');
    }

    get removeAllLocation(){
        return cy.xpath('//button[@data-test-remove-btn]');
    }

    getTotalPrice() {
        return new Cypress.Promise(resolve => {
            this.productTotalPriceLocation.then(element => {
                resolve(element.text().replace('$', ''));
            });
        });
    }

    getColor() {
        return new Cypress.Promise(resolve => {
            this.productNameAndColorLocation.then(element => {
                resolve(element.text());
            });
        });
    }

    checkName(name) {
        let isCheck = false;
        let names = [];
        return new Cypress.Promise(resolve => {
            this.productNameAndColorLocation.each(element => {
                let arr = element.text().trim().split(" ");
                let counter = 0;
                arr.forEach((element, index) => {
                    if (name.includes(element)) {
                        counter++;
                    }
                });
                if (counter == arr.length - 1 || counter == arr.length) { //!!! Could be not useful. For now it resolve issue but need to do better.
                    isCheck = true;
                    resolve(isCheck);
                }
            });
        });
    }

    checkPrice(currentPrice) {
        return new Cypress.Promise(resolve => {
            this.productPriceLocation.then(element => {
                resolve(element.text().includes(currentPrice) || element.text == currentPrice);
            });
        });
    }

    getQuantity(productsCount) {
        return new Cypress.Promise(resolve => {
            const arr = [];
            let path = `select[data-test-qty-dd="${i}"]`;

            for (let i = 1; i < productsCount.length + 1; i++) {
                cy.get(path).invoke('text').then(e => arr.push(e));
            }
            resolve(arr);
        });


    }

    clearCart() {
        this.removeCartButtonLocation.click({
            force: true
        });
    }

    removeAll(){
        this.removeAllLocation.each(element=>element.click());
    }
    
    checkTotalAndOrderPrice(array, total) {
        return new Cypress.Promise(resolve => {
            let sum = array.reduce((accum, price) => accum += +price);
            resolve(sum == total.replace('$', ''));
        });
    }
}

export default new CartPage();

