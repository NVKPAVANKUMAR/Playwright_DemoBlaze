exports.CartPage = class CartPage {
    /**
     * @param {import('playwright').Page} page
     */

    constructor(page) {
        this.page = page;
        this.lblProduct = page.locator("div[class='col-lg-8'] h2");
        this.tblProducts = page.locator("#tbodyid");
        this.lblProductName = page.locator("#tbodyid tr td:nth-child(2)");
        this.tblRows = page.locator("#tbodyid tr");
        this.btnPlaceOrder = page.locator("button[data-target='#orderModal']");
    }

    async verifyProductInCart(productName) {
        const numberOfRows = await this.tblRows.count();

        //Loop through the rows in table and find the desired product
        for (let i = 0; i < numberOfRows; i++) {
          //  console.log(await this.lblProductName.nth(i).textContent());

            if (productName === await this.lblProductName.nth(i).textContent()) {
                return true;
            }
        }
    }

    async navigateToOrderDetailsPage() {
        await this.btnPlaceOrder.click();
    }
}