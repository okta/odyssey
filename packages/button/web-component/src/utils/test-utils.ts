import { AxePuppeteer } from 'axe-puppeteer';
import { toHaveNoViolations } from 'jest-axe';
import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

export type setupComponentType = Promise<{page: E2EPage, el: E2EElement}>;

export const setupComponent = async function(html: string, selector: string) : setupComponentType {
  const page = await newE2EPage({ html });
  const el = await page.find(selector);
  return {
    page, el
  };
}

/**
 * Performs a11y component validation based on the following tags:
 *    - WCAG 2.0 A && AA
 *    - Section 508
 * @param html
 * @param selector
 */
export const performAccessibilityCheck = async function(html: string, selector: string) {
  const { page } = await setupComponent(html, selector);
  // @ts-ignore
  const results = await new AxePuppeteer(page)
    .include(selector)
    .withTags(['wcag2a', 'wcag2aa', 'section508'])
    .analyze();
  expect(results).toHaveNoViolations();
}

// Jest matcher utils
expect.extend(toHaveNoViolations);

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveNoViolations(): R
    }
  }
}
