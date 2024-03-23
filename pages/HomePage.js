const {expect} = require('@playwright/test')
/**
@param {import('@playwright/test').Page} page */

exports.HomePage = class HomePage 
{
    constructor(page)
    {
        this.page = page;
        this.iconProdStore = page.locator("#nava");
        this.lnkHome = page.getByRole('link',{name:"Home "});
        this.lnkContact = page.getByRole('link',{name:"Contact"});
        this.lnkLogin = page.locator("#login2");
        this.lnkSignup = page.getByRole('link', { name: 'Sign up' });
        this.productsName = page.locator('div.card-block h4 a');
        this.btnAddToCart = page.locator('.btn.btn-success.btn-lg');
        this.lnkcart = page.locator('#cartur');
        this.lnkUsername = page.locator("#nameofuser");
    }

    async navigateToLoginPage()
    {
        await this.lnkLogin.click();
    }

    async load()
    {
        await this.page.goto("https://www.demoblaze.com/");
        return this;
    }

    async selectProduct(productName)
    {
        const noOfProducts = await this.productsName.count();

        for(let i=0 ; i< noOfProducts; i++)
        {
            if(productName === await this.productsName.nth(i).textContent())
            {
                await this.productsName.nth(i).click();
                break;
            }
        }
        this.page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain("alert");
            expect(dialog.message()).toBe("Product added.");
            await dialog.accept();
        });
        await this.btnAddToCart.click();
    }

    async navigateToCartPage()
    {
        await this.lnkcart.click();
    }

    async getLoggedInUserName()
    {
        //console.log(await this.lnkUsername.textContent());
        return await this.lnkUsername.textContent();
    }
}