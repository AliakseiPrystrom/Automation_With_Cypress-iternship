import Chance from "chance";
class ProductPage {

    get productBuyButtonLocation() {
        return cy.xpath('//div[@data-test="pdp-bar"]/descendant::button');
    }

    buyButtonClick() {
        this.productBuyButtonLocation.click({
            force: true
        });
    }

    chooseSelectedColor(selectedColor) {
        cy.xpath(`//*[text()="${selectedColor}"]/ancestor::div[@data-test-product-card]/descendant::span[text()='Add To Cart']`).click();
    }

    getColorAndChoose(product) {
        const chance = new Chance();
        let selectedColor = (product.colors.length > 1) ? chance.pickone(product.colors) : product.colors[0];
        cy.log(`THEN User choose color: ${selectedColor}`);
        if (product.colors.length > 1) {
            this.chooseSelectedColor(selectedColor);
            cy.log(`AND availabe color ony: ${selectedColor}`);
        }
    }

}

export default new ProductPage();