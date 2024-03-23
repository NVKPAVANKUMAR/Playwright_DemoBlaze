import {expect, test} from '@playwright/test'

const {HomePage} = require('../pages/HomePage')
const {LoginPage} = require('../pages/LoginPage')
const {CartPage} = require('../pages/CartPage')
const {PlaceOrderPage} = require('../pages/PlaceOrderPage')
const testdata = require('../testdata/products.json');
const context = require('../utils/context');

test("Place an order", async ({page}) => {

    //create objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const orderPage = new PlaceOrderPage(page);
    const productName = testdata[0].productName;
    const username = testdata[0].username;
    const password = testdata[0].password;

    await homePage.load();
    await homePage.navigateToLoginPage();
    await loginPage.loginToApp(username, password);
    await loginPage.lnkLogout.waitFor();
    await expect(await homePage.getLoggedInUserName()).toContain(username);

    await homePage.selectProduct(productName);
    await homePage.navigateToCartPage();

    await expect(page.url()).toContain("https://www.demoblaze.com/cart.html")
    await cartPage.lblProduct.waitFor();
    await expect(cartPage.verifyProductInCart(productName)).toBeTruthy();
    await cartPage.navigateToOrderDetailsPage();

    await orderPage.lblPlaceOrder.waitFor();
    await orderPage.purchaseOrder();
    expect(await orderPage.orderDetails.textContent()).toContain(context.sharedData.userName);
    expect(await orderPage.orderDetails.textContent()).toContain(context.sharedData.ccNumber)
});