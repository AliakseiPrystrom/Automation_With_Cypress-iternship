class AccessoriesPage {
    get searchIcon() {
        return cy.get('[aria-label="Search the Google store"]');
    }

    open() {
        cy.visit(`${Cypress.env('baseStoreUrl')}`);
    }

    get searchInput() {
        return cy.get('[role="search"]');
    }

    performSearch(productToSearch) {
        this.searchIcon.click();
        this.searchInput.type(`${productToSearch} {enter}`);
    }
}

export default new AccessoriesPage();