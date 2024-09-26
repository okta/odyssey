// /pageobjects/FormPage.ts

import { ChainablePromiseElement } from 'webdriverio';
import Page from './page';
import { $ } from '@wdio/globals';

class FormPage extends Page {
    get pageName(): string {
        return 'form';
    }

    /**
     * Define selectors using getter methods
     */
    public get firstNameInput(): ChainablePromiseElement {
        return $('#first-name'); // Replace with the actual selector
    }

    public get lastNameInput(): ChainablePromiseElement {
        return $('#last-name'); // Replace with the actual selector
    }

    public get emailInput(): ChainablePromiseElement {
        return $('#email'); // Replace with the actual selector
    }

    public get submitButton(): ChainablePromiseElement {
        return $('button[type="submit"]'); // Replace with the actual selector
    }

    public get successMessage(): ChainablePromiseElement {
        return $('.success-message'); // Replace with the actual selector
    }

    /**
     * Define page actions
     */
    public open() {
        return super.open(this.pageName);
    }

    public async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.waitForDisplayed({ timeout: 5000 });
        await this.firstNameInput.setValue(firstName);
    }

    public async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput.waitForDisplayed({ timeout: 5000 });
        await this.lastNameInput.setValue(lastName);
    }

    public async fillEmail(email: string): Promise<void> {
        await this.emailInput.waitForDisplayed({ timeout: 5000 });
        await this.emailInput.setValue(email);
    }

    public async submitForm(): Promise<void> {
        await this.submitButton.waitForClickable({ timeout: 5000 });
        await this.submitButton.click();
    }

    public async getSuccessMessage(): Promise<string> {
        await this.successMessage.waitForDisplayed({ timeout: 5000 });
        return await this.successMessage.getText();
    }
}

export default new FormPage();
