import {expect, test} from '@playwright/test'

const {HomePage} = require('../pages/HomePage')
const {LoginPage} = require('../pages/LoginPage')
const {CartPage} = require('../pages/CartPage')
const {PlaceOrderPage} = require('../pages/PlaceOrderPage')
const productData = JSON.parse(JSON.stringify(require('../testdata/products.json')));
const context = require('../utils/context');
test.describe("Place orders for different products", ()=>
{
    for(const product of productData)
    {
        test(`Place an order for ${product.productName}`, async ({page}) => 
        {
            //create objects
            const homePage = new HomePage(page);
            const loginPage = new LoginPage(page);
            const cartPage = new CartPage(page);
            const orderPage = new PlaceOrderPage(page);
           
            await homePage.load();
            await homePage.navigateToLoginPage();
            await loginPage.loginToApp(product.username, product.password);
            await loginPage.lnkLogout.waitFor();
            await expect(await homePage.getLoggedInUserName()).toContain("Test_DemoBlaze");
        
            await homePage.selectProduct(product.productName);
            await homePage.navigateToCartPage();
        
            await expect(page.url()).toContain("https://www.demoblaze.com/cart.html")
            await cartPage.lblProduct.waitFor();
            await expect(cartPage.verifyProductInCart(product.productName)).toBeTruthy();
            await cartPage.navigateToOrderDetailsPage();
        
            await orderPage.lblPlaceOrder.waitFor();
            await orderPage.purchaseOrder();
            expect(await orderPage.orderDetails.textContent()).toContain(context.sharedData.userName);
            expect(await orderPage.orderDetails.textContent()).toContain(context.sharedData.ccNumber)
        });
    }
});