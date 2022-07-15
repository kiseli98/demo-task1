import { browser } from "protractor";
import { DemoPage } from "../pages/DemoPage";
import { HomePage } from "../pages/HomePage";
import { SignUpPage } from "../pages/SignUpPage";
import * as testData from "../test-data/testData.json";
const fetch = require('node-fetch');
const demoPage = new DemoPage();
const signUpPage = new SignUpPage();
const homePage = new HomePage();

const baseUrl = "https://demo-v2.grip.tools";

declare const allure: any;

describe("Demo Grip - Login feature", () => {

    beforeAll(async () => {
        await browser.waitForAngularEnabled(false);
        await browser.manage().window().maximize()
        await browser.manage().timeouts().implicitlyWait(5000)
    })
    beforeEach(async () => {
        await allure.createStep("Given The User navigates to the login page", async () => {
            await browser.get(baseUrl + "/login")
        })();
    })
    afterEach(async () => {
        await browser.executeScript('window.localStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
    })


    it("TC01 - To check that all elements are present on the page", async () => {
        await allure.createStep("Then the user is able to see Grip logo", async () => {
            expect(await demoPage.gripLogo.isDisplayed()).toBe(true);
        })();
        await allure.createStep("Then the user is able to see Grip description", async () => {
            expect(await demoPage.gripLogo.isDisplayed()).toBe(true);
        })();
        await allure.createStep("Then the user is able to see form header", async () => {
            expect(await demoPage.formHeader.isDisplayed()).toBe(true);
            expect(await demoPage.formHeader.getText()).toEqual("Log in");
        })();
        await allure.createStep("Then the user is able to see Sign Up button", async () => {
            expect(await demoPage.signUpBtn.isDisplayed()).toBe(true);
        })();
        await allure.createStep("Then the user is able to see Next button", async () => {
            expect(await demoPage.nextBtn.isDisplayed()).toBe(true);
        })();
    })


    it("TC02 - To check that email input is focused by default", async () => {
        await allure.createStep("Then Email input field is focused", async () => {
            await demoPage.waitTillisEnabled(demoPage.emailInput);
            expect(demoPage.emailInput.getWebElement().getAttribute("name"))
                .toEqual(browser.driver.switchTo().activeElement().getAttribute("name"));
        })();
    })


    it("TC03 - To check that user is able to Sign Up", async () => {
        await allure.createStep("When The user clicks on Sign Up button", async () => {
            await demoPage.clickSignUp();
        })();
        await allure.createStep("Then The user is able to see Sign Up form", async () => {
            expect(await signUpPage.isSignUpFormVisible()).toBe(true);
        })();
    })


    it("TC04 - To check that email should be formed correctly", async () => {
        await allure.createStep("When The user fills email with a random string", async () => {
            await demoPage.fillEmail(testData.login.emailString);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The user should see valid error message", async () => {
            var message = "Invalid email address";
            expect(await demoPage.getErrorMessageText()).toEqual(message);
        })();
        await allure.createStep("And The user should see valid tooltip", async () => {
            var message = "Please include an '@' in the email address. '" + testData.login.emailString + "' is missing an '@'.";
            expect(await demoPage.getEmailTooltipValdiationMessage()).toEqual(message);
        })();
        await allure.createStep("And The next button should be disabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(false);
        })();

        await allure.createStep("When The user fills email with a malformed email", async () => {
            await demoPage.fillEmail(testData.login.malformedEmail1);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The user should see valid error message", async () => {
            var message = "Invalid email address";
            expect(await demoPage.getErrorMessageText()).toEqual(message);
        })();
        await allure.createStep("And The user should see valid tooltip", async () => {
            var message = "Please enter a part following '@'. '" + testData.login.malformedEmail1 + "' is incomplete.";
            expect(await demoPage.getEmailTooltipValdiationMessage()).toEqual(message);
        })();
        await allure.createStep("And The next button should be disabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(false);
        })();
        await allure.createStep("When The user fills email with a malformed email", async () => {
            await demoPage.fillEmail(testData.login.malformedEmail2);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The user should see valid error message", async () => {
            var message = "Invalid email address";
            expect(await demoPage.getErrorMessageText()).toEqual(message);
        })();
        await allure.createStep("And The next button should be disabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(false);
        })();
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
    })


    it("TC05 - To check that user not be able is to login without password", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
        })();
        await allure.createStep("Then The log in button should be disabled", async () => {
            expect(await demoPage.isLoginButtonEnabled()).toBe(false);
        })();
        await allure.createStep("When The user fills password with a valid password", async () => {
            await demoPage.fillPassword(testData.login.password);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The log in button should be enabled", async () => {
            expect(await demoPage.isLoginButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clears password input", async () => {
            await demoPage.clearPassword();
        })();
        await allure.createStep("Then The log in button should be disabled", async () => {
            expect(await demoPage.isLoginButtonEnabled()).toBe(false);
        })();
        await allure.createStep("And The user should see valid error message", async () => {
            var message = "Password is required";
            expect(await demoPage.getErrorMessageText()).toEqual(message);
        })();
    })


    it("TC06 - To check that email input should be disabled after filling", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
        })();
        await allure.createStep("Then email input should be disabled", async () => {
            expect(await demoPage.isEmailInputEnabled()).toBe(false);
        })();
    })

    it("TC07 - To check that email input value is persistent", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("And the user clicks on email input", async () => {
            await demoPage.clickEmailContainer();
        })();
        await allure.createStep("Then the user should see that email persists", async () => {
            expect(await demoPage.getEmailInputValue()).toEqual(testData.login.email);
        })();
    })

    it("TC08 - To check that user is not able to login with wrong password", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("When The user fills password with wrong password", async () => {
            await demoPage.fillPassword(testData.login.wrongPassword);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The log in button should be enabled", async () => {
            expect(await demoPage.isLoginButtonEnabled()).toBe(true);
        })();
        await allure.createStep("And the user clicks on log in btn", async () => {
            await demoPage.clickLogin();
        })();
        await allure.createStep("And The user should see valid error message", async () => {
            var message = "Invalid email or password";
            expect(await demoPage.getErrorMessageText()).toEqual(message);
        })();
        await allure.createStep("Then The log in button should be disabled", async () => {
            expect(await demoPage.isLoginButtonEnabled()).toBe(false);
        })();

    })


    it("TC09 - To check that user should be able to login with valid credentials", async () => {
        await allure.createStep("When The user logs in with valid credentials", async () => {
            await demoPage.logIn(testData.login.email, testData.login.password);
        })();
        await allure.createStep("Then The Home Page should be visible", async () => {
            expect(await homePage.waitTillPageIsReady()).toBe(true);
        })();

    })


    it("TC10 - To check that 'forgot password' link is available", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("Then the user should see 'forgot password' link", async () => {
            expect(await demoPage.forgotPasswordBtn.isDisplayed()).toBe(true);
        })();
    })

    it("TC11 - To check that 'forgot password' form is displayed correctly", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("And the user clicks 'forgot password' link", async () => {
            await demoPage.clickForgotPassword();
        })();
        await allure.createStep("Then The form should be properly displayed", async () => {
            expect(await demoPage.isForgotPassFormDisplayedOk()).toBe(true);
        })();
        await allure.createStep("When The user clears email input", async () => {
            await demoPage.clearEmail();
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The send link btn should be disabled", async () => {
            expect(await demoPage.sendLinkBtn.isEnabled()).toBe(false);
        })();
        await allure.createStep("And The user should see valid error message", async () => {
            var message = "Invalid email address";
            expect(await demoPage.getErrorMessageText()).toEqual(message);
        })();
    })


    it("TC12 - To check that 'forgot password' form remembers user email", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("And the user clicks 'forgot password' link", async () => {
            await demoPage.clickForgotPassword();
        })();
        await allure.createStep("Then The form persist user email", async () => {
            expect(await demoPage.getEmailInputValue()).toEqual(testData.login.email);
        })();
    })


    it("TC13 - To check that user email persists after navigating back to login", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("And the user clicks 'forgot password' link", async () => {
            await demoPage.clickForgotPassword();
        })();
        await allure.createStep("And The user returns back to login", async () => {
            await demoPage.clickBackToLogin();
        })();
        await allure.createStep("Then The form persist user email", async () => {
            expect(await demoPage.getEmailInputValue()).toEqual(testData.login.email);
        })();
    })

    it("TC14 - To check that user can send the link for password recovery", async () => {
        await allure.createStep("When The user fills email with a valid email", async () => {
            await demoPage.fillEmail(testData.login.email);
            await demoPage.unfocusInputField();
        })();
        await allure.createStep("Then The next button should be enabled", async () => {
            expect(await demoPage.isNextButtonEnabled()).toBe(true);
        })();
        await allure.createStep("When The user clicks next btn", async () => {
            await demoPage.clickNext();
            await demoPage.waitTillisVisible(demoPage.passwordInput);
        })();
        await allure.createStep("And the user clicks 'forgot password' link", async () => {
            await demoPage.clickForgotPassword();
        })();
        await allure.createStep("And The user clicks on Send Link", async () => {
            await demoPage.waitTillisEnabled(demoPage.sendLinkBtn);
            await demoPage.clickSendLink();
        })();
        await allure.createStep("Then The user should see recovery message", async () => {
            var message = "If we find a corresponding account to the email you have specified," +
                "we will send you a password reset email shortly.Please note that the password reset" +
                "link expires within a few hours and do make sure your spam folder in case you don't" +
                "receive the email shortly.Thank you."
            expect(await demoPage.getEmailInputValue()).toEqual(testData.login.email);
        })();
    })


    it("TC15 API - To check that user is not able to login with wrong password", async () => {
        let reposne: Response;
        let payload = {
            email: testData.login.email,
            password: testData.login.wrongPassword
        };

        await allure.createStep("When The user logs in with invalid credentials", async () => {
            reposne = await fetch(baseUrl + '/api/v3/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        })();
        await allure.createStep("Then The user should not be authorized", async () => {
            expect(reposne.status).toEqual(401);
        })();
    });


    it("TC16 API - To check that user should be able to login with valid credentials", async () => {
        let reposne: Response;
        let payload = {
            email: testData.login.email,
            password: testData.login.password
        };

        await allure.createStep("When The user logs in with valid credentials", async () => {
            reposne = await fetch(baseUrl + '/api/v3/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        })();
        await allure.createStep("Then The user should be authorized", async () => {
            expect(reposne.status).toEqual(200);
        })();
    });

})


// it("TC01 ", async () => {
//     await allure.createStep("Sign up", async () => {
//         await attachScreenshot('1');
//     })();
// })

async function attachScreenshot(filename: string) {
    let png = await browser.takeScreenshot();
    await allure.createAttachment(filename, new Buffer(png, 'base64'));
}
