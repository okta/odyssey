// Import necessary modules
import { $, browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';
import Page from './page';

class KitchenSinkPage extends Page {
  /**
   * Define constant
   */

  get pageName(): string {
    return 'kitchen-sink';
  }

  /**
   * Define selectors using getter methods
   */

  // Header Title
  public get headerTitle(): ChainablePromiseElement {
    return $('h4=Table title');
  }

  // Page Description
  public get pageDescription(): ChainablePromiseElement {
    return $('p=Optional brief description about the page');
  }

  // Documentation Link
  public get documentationLink(): ChainablePromiseElement {
    return $('a=Documentation');
  }

  // Buttons
  public get moreActionsButton(): ChainablePromiseElement {
    return $('button=More actions');
  }

  public get openDialogButton(): ChainablePromiseElement {
    return $('button=Open dialog');
  }

  public get openOverlayDrawerButton(): ChainablePromiseElement {
    return $('button=Open overlay drawer');
  }

  // Dialog
  public get dialog(): ChainablePromiseElement {
    return $('div[role="dialog"]');
  }

  // Search Input
  public get searchInput(): ChainablePromiseElement {
    return $('input[type="search"]');
  }

  // Table
  public get table(): ChainablePromiseElement {
    return $('table');
  }

  /**
   * Methods to encapsulate automation code
   */

  // Navigate to the Kitchen Sink page
  public open() {
    return super.open(this.pageName);
  }

  // Click the "More actions" button
  public async clickMoreActionsButton(): Promise<void> {
    await this.moreActionsButton.waitForClickable({ timeout: 10000 });
    await this.moreActionsButton.click();
  }

  // Click the "Open dialog" button
  public async clickOpenDialogButton(): Promise<void> {
    await this.openDialogButton.waitForClickable({ timeout: 10000 });
    await this.openDialogButton.click();
  }

  // Click the "Open overlay drawer" button
  public async clickOpenOverlayDrawerButton(): Promise<void> {
    await this.openOverlayDrawerButton.waitForClickable({ timeout: 10000 });
    await this.openOverlayDrawerButton.click();
  }

  // Wait for the dialog to be displayed
  public async waitForDialogToOpen(): Promise<void> {
    await this.dialog.waitForDisplayed({ timeout: 10000 });
  }

  // Enter text into the search input
  public async enterSearchText(text: string): Promise<void> {
    await this.searchInput.waitForDisplayed({ timeout: 10000 });
    await this.searchInput.setValue(text);
  }
}

export default new KitchenSinkPage();
