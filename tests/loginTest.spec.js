import { expect, test } from '@playwright/test'
const { HomePage } = require('../pages/HomePage')
const { LoginPage } = require('../pages/LoginPage')
const { SignupPage } = require('../pages/SignupPage');
const testdata = require('../testdata/products.json');

test("Vaidate the error message when no input is provided for login", async ({ page }) => {

    //create objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.load();
    await homePage.navigateToLoginPage();
    await expect(loginPage.btnLogin).toBeVisible();

    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toBe("Please fill out Username and Password.");
        await dialog.accept();
    });
    await loginPage.btnLogin.click();
});

test("Validate the error message on Signup with existing user details", async ({ page }) => {

    //create objects
    const homePage = new HomePage(page);
    const signUpPage = new SignupPage(page);

    await homePage.load();
    await homePage.lnkSignup.click();

    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toBe("This user already exist.");
        await dialog.accept();
    });

    await signUpPage.signUpToApp(testdata[0].username, "password");
});

test("Login to App with valid credentials", async ({ page }) => {

    //create objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.load();
    await homePage.navigateToLoginPage();
    await loginPage.loginToApp(testdata[0].username, testdata[0].password);
    await loginPage.lnkLogout.waitFor();
    await expect(await homePage.getLoggedInUserName()).toContain(testdata[0].username);
});

