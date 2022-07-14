import { element, by, $$, $ } from "protractor";
import { BaseActions } from "../base/BaseActions";


export class SignUpPage extends BaseActions {

    public signUpFormStub = $('[dummy-locator="dummy-value"]');


    public async isSignUpFormVisible(): Promise<boolean> {
        return await this.isDisplayed(this.signUpFormStub);
    }

}
