**Playwright + JavScript Automation Framework for Web Automation**

Skeleton framework for web automation using Playwright and JavaScript. This framework is designed to be used as a starting point for new projects. This is not a complete framework.

It has examples of how to use Playwright to automate web tests. It also includes examples of how to use Playwright's Page Object Model (POM) pattern.


**Libraries used:**
- [Playwright](https://playwright.dev/) - Browser and API Automation
- [JavaScript](https://javascript.info/js) - Programming Language
- [Prettier](https://prettier.io/) - Code Formatting

**Commands:**

- `npm install` - Install dependencies
- `npm run test` - Run all tests

**Allure Reporting:**
Steps to configure Allure Reporting
1. Install npm i allure-playwright
2. Install Allure command line npm i allure-commandline
3. Add reporter: [["line"], ["allure-playwright"]];
OR
['allure-playwright', {outputFolder: 'my-allure-results'}],
4. To Generate the allure report
   allure generate my-allure-results -o allure-report --clean
5. To open the Allure report allure open allure-report
