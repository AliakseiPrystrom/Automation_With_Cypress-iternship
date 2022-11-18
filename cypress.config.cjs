 const {defineConfig} = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1280,
    viewportHeight: 1024,
    projectId: 'yni96d',
    e2e: {
        baseUrl: 'https://reqres.in',
        env: {
            testQuantityValue: '1',
            cartUrl: 'https://store.google.com/us/cart?hl=en-US',
            baseStoreUrl: 'https://store.google.com/us',
            baseCurrencyUrl: 'https://www.xe.com',
            baseProductsResponse: 'https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1665647073',
            accessoriesEndPoint : 'collection/accessories_wall',
        },
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
