// /steps/form.steps.ts

import { Given, When, Then } from '@wdio/cucumber-framework';
import FormPage from '../pageobjects/form.page';
import { expect } from '@wdio/globals'

When('I fill in the first name with {string}', async (firstName: string) => {
    await FormPage.fillFirstName(firstName);
});

When('I fill in the last name with {string}', async (lastName: string) => {
    await FormPage.fillLastName(lastName);
});

When('I fill in the email with {string}', async (email: string) => {
    await FormPage.fillEmail(email);
});

When('I submit the form', async () => {
    await FormPage.submitForm();
});

Then('I should see a success message saying {string}', async (message: string) => {
    const successText = await FormPage.getSuccessMessage();
    await expect(successText).to.equal(message);
});
