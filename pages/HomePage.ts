import { element, by, $$, $ } from "protractor";
import { BaseActions } from "../base/BaseActions";


export class HomePage extends BaseActions {

    public someHomePageElement = $('[dummy-locator="dummy-value"]');


    public async waitTillPageIsReady(): Promise<boolean> {
        return await this.waitTillisVisible(this.someHomePageElement);
    }

}
