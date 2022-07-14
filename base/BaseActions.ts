import { browser, element, ElementFinder, Key, ProtractorBy, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";

export class BaseActions {

    private ec: ProtractorExpectedConditions = browser.ExpectedConditions;
    private timeOut = 10000;

    public async click(element: ElementFinder): Promise<void> {
        await browser.wait(this.ec.elementToBeClickable(element), this.timeOut,
            "Failed to click the element");
        await element.click();
    }

    public async hover(element: ElementFinder): Promise<void> {
        if (await element.isDisplayed()) {
            await browser.actions()
                .mouseMove(await element.getWebElement()).perform();
        } else {
            throw new Error("Cannot hover invisible element");
        }
    }

    public async mouseHoverAndClick(element: ElementFinder): Promise<void> {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .click()
            .perform();
    }

    public async isDisplayed(element: ElementFinder): Promise<boolean> {
        try {
            await element.isDisplayed();
            return true;
        } catch (error) {
            console.log(error.name);
            return false;
        } 
    }

    public async isEnabled(element: ElementFinder): Promise<boolean> {
        try {
            await element.isEnabled();
            return true;
        } catch (error) {
            console.log(error.name);
            return false;
        } 
    }

    public async isPresent(by: ProtractorBy): Promise<boolean> {
        return (await element.all(by)).length > 0;
    }

    public async getText(element: ElementFinder): Promise<string> {
        return element.getText();
    }


    public async sendKeys(element: ElementFinder, testData: string): Promise<void> {
        await this.waitTillisVisible(element);
        await element.sendKeys(testData);
    }

    public async clearAndType(element: ElementFinder, testData: string): Promise<void> {
        await this.waitTillisVisible(element);
        await element.clear()
        await element.sendKeys(testData);
    }

    public async clearWithKeysAndType(element: ElementFinder, testData: string): Promise<void> {
        await this.waitTillisVisible(element);
        await this.clearWithKeys(element);
        await element.sendKeys(testData);
    }

    public async clearWithKeys(element: ElementFinder): Promise<void> {
        await element.sendKeys(Key.chord(Key.CONTROL, 'a'));
        await element.sendKeys(Key.DELETE);
    }

  

    public async assertText(element: ElementFinder, expectedText: string): Promise<void>  {
        await this.waitTillisVisible(element);
        let actualText = await element.getText();
        expect(actualText.trim()).toBe(expectedText);
    }

    public async waitTillisVisible(element: ElementFinder): Promise<boolean> {
        try{
            await browser.wait(this.ec.visibilityOf(element), this.timeOut,
            "Element is not visible");
            return true;
        } catch (error) {
            console.log(error.name);
            return false;
        } 
    }

    public async waitTillIsGone(element: ElementFinder): Promise<boolean> {
        try{
            await browser.wait(this.ec.invisibilityOf(element), this.timeOut,
            "Element is still visible");
            return true;
        } catch (error) {
            console.log(error.name);
            return false;
        } 
    }

    public async waitTillisEnabled(element: ElementFinder): Promise<boolean> {
        try{
            await browser.wait(this.ec.elementToBeClickable(element), this.timeOut,
            "Element is not enabled");
            return true;
        } catch (error) {
            console.log(error.name);
            return false;
        } 
    }


    public async expectToBeDisplayed(element: ElementFinder): Promise<void>  {
        await this.waitTillisVisible(element);
        expect(await element.isDisplayed()).toBe(true);
    }

    public async typeAndEnter(element: ElementFinder, testData: string): Promise<void>  {
        await this.waitTillisVisible(element);
        await element.clear();
        await element.sendKeys(testData, protractor.Key.ENTER)
    }


    public async moveToElement(element: ElementFinder): Promise<void>  {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .perform();
    }

    public async getActiveElement(): Promise<ElementFinder>  {
        return await browser.switchTo().activeElement
    }


}