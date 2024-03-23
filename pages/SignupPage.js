/**

@param {import('@playwright/test').Page} Page */

exports.SignupPage = class SignupPage 
{
    constructor(page)
    {
        this.page = page;
        this.txtUsername = page.locator("#sign-username");
        this.txtPassword = page.locator("#sign-password");
        this.btnSingnUp = page.getByRole('button',{name:"Sign up"});
        this.btnClose = page.getByRole('button',{name:"Close"});
    }

    async enterUsername(username)
    {
        await this.txtUsername.fill(username);
    }

    async enterPassword(password)
    {
        await this.txtPassword.fill(password);
    }

    async clickSignUp()
    {
        await this.btnSingnUp.click()
    }

    async signUpToApp(username, password)
    {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.btnSingnUp.click();
    }
}