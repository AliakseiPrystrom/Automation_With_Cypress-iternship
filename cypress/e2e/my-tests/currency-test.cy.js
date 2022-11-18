import Chance from "chance";

describe('Currency test', () => {
    before(() => {
        const chance = new Chance();
        cy.fixture('currency').then(data => {
            cy.wrap(data).as('currencyData');
        });
    });

    it('USD to CAD', () => {
        cy.get('@currencyData').then((currencyData) => {

            cy.visit(`${Cypress.env('baseCurrencyUrl')}`);

            cy.get('[id="midmarketFromCurrency"]').click();
            let listCurrencyFrom = cy.xpath('//ul[@id="midmarketFromCurrency-listbox"]/*');

            cy.get('[id="midmarketToCurrency"]').click();
            let listCurrencyTo = cy.xpath('//ul[@id="midmarketToCurrency-listbox"]/*');

            let submitBtn = cy.get('[type="submit"]');

            let count = 0;

            function chooseTestCurrencyFrom(tesData) {
                listCurrencyFrom.each(($element, index, $list) => {
                    if ($element.text().includes(tesData)) {
                        cy.log('Going to convert FROM ---> ' + $element.text());
                        $element.trigger('click');
                    }
                });

            }

            function chooseTestCurrencyTo() {
                listCurrencyFrom.each(($element, index, $list) => {
                    count++;
                });
                listCurrencyTo.each(($element, index, $list) => {
                    if ($element.index() === chance.integer({min: 1, max: count})) {
                        cy.log('Going to convert INTO ---> ' + $element.text());
                        $element.trigger('click');
                        return false;
                    }
                });
            }

            chooseTestCurrencyFrom(currencyData.base);
            chooseTestCurrencyTo();
            submitBtn.click();

            cy.get('[class="result__BigRate-sc-1bsijpp-1 iGrAod"]')
                .invoke('text')
                .then((text) => {
                    let actualValue = text.split(' ')[0];
                    expect(currencyData.rates[0].rate).to.eq(actualValue);
                });

        });
    });
});