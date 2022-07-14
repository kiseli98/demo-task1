import { $, $$, by, By, element } from "protractor";
import { BaseActions } from "../base/BaseActions";


export class DemoPage extends BaseActions {

    public gripLogo = $('[data-test-component="gripLogo"]');
    public gripInfo = $('.gYNukK');
    public emailInput = $('[name="email"]');
    public passwordInput = $('[name="password"]');
    public errorTooltips = $$('[data-test-component="field__error errorMessage"]');
    public nextBtn = $('[title="Next"]');
    public signUpBtn = $('[title="Sign up"]');
    public LogInBtn = $('[title="Log in"]');
    public sendLinkBtn = $('[title="Send the link"]');
    public formHeader = $('[data-test-component="text text--type-heading1"]');
    public pswdRecoveryMessage = $('[data-test-component="passwordRecoveryPage__submitMessage"]');
    public forgotPasswordBtn = element(by.linkText("Forgot your password?"));
    public backToLoginBtn = element(by.linkText("Back to login"));



    public async logIn(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.waitTillisEnabled(this.nextBtn);
        await this.click(this.nextBtn);
        await this.waitTillisEnabled(this.passwordInput);
        await this.fillPassword(password);
        await this.waitTillisEnabled(this.LogInBtn);
        await this.click(this.LogInBtn);
    }

    public async clickSignUp(): Promise<void> {
        await this.click(this.signUpBtn);
    }

    public async clickSendLink(): Promise<void> {
        await this.click(this.sendLinkBtn);
    }

    public async clickNext(): Promise<void> {
        await this.click(this.nextBtn);
    }

    public async clickLogin(): Promise<void> {
        await this.click(this.LogInBtn);
    }

    public async clickForgotPassword(): Promise<void> {
        await this.click(this.forgotPasswordBtn);
    }

    public async getHeaderText(): Promise<string> {
        return await this.formHeader.getText();
    }

    public async clickBackToLogin(): Promise<void> {
        await this.click(this.backToLoginBtn);
    }

    public async fillEmail(email: string): Promise<void> {
        await this.click(this.emailInput);
        await this.clearWithKeysAndType(this.emailInput, email);
    }

    public async clearEmail(): Promise<void> {
        await this.click(this.emailInput);
        await this.clearWithKeys(this.emailInput);
    }

    public async clearPassword(): Promise<void> {
        await this.click(this.passwordInput);
        await this.clearWithKeys(this.passwordInput);
    }

    public async fillPassword(password: string): Promise<void> {
        await this.sendKeys(this.passwordInput, password);
    }

    public async getEmailTooltipValdiationMessage(): Promise<string> {
        return await this.emailInput.getAttribute("validationMessage");
    }

    public async getErrorMessageText(): Promise<string> {
        return (await this.errorTooltips.filter((el) => this.waitTillisVisible(el)).first().getText()).trim();
    }

    public async isNextButtonEnabled(): Promise<boolean> {
        return (await this.nextBtn.isEnabled());
    }

    public async isLoginButtonEnabled(): Promise<boolean> {
        return (await this.LogInBtn.isEnabled());
    }

    public async isEmailInputEnabled(): Promise<boolean> {
        return (await this.emailInput.isEnabled());
    }

    public async unfocusInputField(): Promise<void> {
        return (await this.formHeader.click());
    }

    public async getEmailInputValue(): Promise<string> {
        return (await this.emailInput.getAttribute("value"));
    }

    public async getRecoveryMessage(): Promise<string> {
        return (await this.pswdRecoveryMessage.getText()).trim();
    }


    public async clickEmailContainer(): Promise<void> {
        try {
            return (await this.emailInput.element(By.xpath("./..")).click());
        } catch (error) {
            return (await this.emailInput.element(By.xpath("./..")).click());
        }
    }

    public async isForgotPassFormDisplayedOk(): Promise<boolean> {
        return (await this.formHeader.isDisplayed()) &&
            (await this.getHeaderText()) == "Password recovery" &&
            (await this.backToLoginBtn.isDisplayed()) &&
            (await this.sendLinkBtn.isDisplayed()) &&
            (await this.sendLinkBtn.isEnabled()) &&
            (await this.emailInput.isDisplayed())
    }
}
