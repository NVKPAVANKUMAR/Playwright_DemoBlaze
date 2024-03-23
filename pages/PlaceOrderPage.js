const faker = require('faker');
const context = require('../utils/context');
exports.PlaceOrderPage = class PlaceOrderPage {
    /**
     * @param {import('playwright').Page} page
     */

    constructor(page) {
        this.page = page;
        this.lblPlaceOrder = page.locator("#orderModalLabel");
        this.lblTotalPrice = page.locator("#totalm");
        this.txtName = page.locator("#name");
        this.txtCountry = page.locator("#country");
        this.txtCity = page.locator("#city");
        this.txtCreditCard = page.locator("#card");
        this.txtMonth = page.locator("#month");
        this.txtYear = page.locator("#year");
        this.btnPurchase = page.getByRole('button', {name: "Purchase"});

        this.lblSuccessMsg = page.locator("body > div.sweet-alert.showSweetAlert.visible > h2")
        this.orderDetails = page.locator("p.lead.text-muted");
    }

    async purchaseOrder() {
        const userName = faker.name.findName();
        await this.txtName.fill(userName);
        context.sharedData.userName = userName;
        const country = faker.address.country();
        await this.txtCountry.fill(country);
        context.sharedData.country = country;
        const city = faker.address.city();
        await this.txtCity.fill(city);
        context.sharedData.city = city;
        const ccNumber = faker.finance.creditCardNumber();
        await this.txtCreditCard.fill(ccNumber);
        context.sharedData.ccNumber = ccNumber;
        const month = new Date().toLocaleDateString('en',{ month: 'short'}); 
        await this.txtMonth.fill(month);
        context.sharedData.month = month;
        const year = faker.date.future().getFullYear();
        await this.txtYear.fill(JSON.stringify(year));
        context.sharedData.year = year;
        await this.btnPurchase.click();
        // console.log(await this.lblSuccessMsg.textContent());
        // console.log(await this.orderDetails.textContent());
    }
}