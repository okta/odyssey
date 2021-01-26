import { setupComponent, setupComponentType, performAccessibilityCheck } from './utils/test-utils';

async function setup(html: string) : setupComponentType {
  return await setupComponent(html, 'ods-button');
}

describe('ods-button', () => {
  describe('type', () => {
    it('renders a primary button by default', async () => {
      const { page } = await setup('<ods-button>Primary (default)</ods-button>');
      expect(await page.find('ods-button >>> [data-se=button]')).not.toHaveClass('is-ods-button-secondary');
      expect(await page.find('ods-button >>> [data-se=icon]')).toBeFalsy();
    });
    it('renders a secondary button', async () => {
      const { page } = await setup('<ods-button type="secondary"></ods-button>');
      expect(await page.find('ods-button >>> [data-se=button]')).toHaveClass('is-ods-button-secondary');
    });
    it('renders a danger button', async () => {
      const { page } = await setup('<ods-button type="danger"></ods-button>');
      expect(await page.find('ods-button >>> [data-se=button]')).toHaveClass('is-ods-button-danger');
    });
    it('renders a clear button', async () => {
      const { page } = await setup('<ods-button type="clear"></ods-button>');
      expect(await page.find('ods-button >>> [data-se=button]')).toHaveClass('is-ods-button-clear');
    });
    it('renders an overlay button', async () => {
      const { page } = await setup('<ods-button type="overlay"></ods-button>');
      expect(await page.find('ods-button >>> [data-se=button]')).toHaveClass('is-ods-button-overlay');
    });
  });

  describe('disabled', () => {
    it('renders a disabled button', async () => {
      const { page } = await setup('<ods-button disabled></ods-button>');
      expect(await page.find('ods-button >>> [data-se=button]')).toHaveAttribute('disabled');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      const html = '<ods-button>Primary</ods-button>';
      await performAccessibilityCheck(html, 'ods-button');
    });
  });
});
