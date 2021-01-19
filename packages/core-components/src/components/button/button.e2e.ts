import { setupComponent, setupComponentType, performAccessibilityCheck } from '../../utils/test-utils';

async function setup(html: string) : setupComponentType {
  return await setupComponent(html, 'o-button');
}

describe('o-button', () => {
  describe('type', () => {
    it('renders a primary button by default', async () => {
      const { page } = await setup('<o-button>Primary (default)</o-button>');
      expect(await page.find('o-button >>> [data-se=button]')).not.toHaveClass('is-ods-button-secondary');
      expect(await page.find('o-button >>> [data-se=icon]')).toBeFalsy();
    });
    it('renders a secondary button', async () => {
      const { page } = await setup('<o-button type="secondary"></o-button>');
      expect(await page.find('o-button >>> [data-se=button]')).toHaveClass('is-ods-button-secondary');
    });
    it('renders a danger button', async () => {
      const { page } = await setup('<o-button type="danger"></o-button>');
      expect(await page.find('o-button >>> [data-se=button]')).toHaveClass('is-ods-button-danger');
    });
    it('renders a clear button', async () => {
      const { page } = await setup('<o-button type="clear"></o-button>');
      expect(await page.find('o-button >>> [data-se=button]')).toHaveClass('is-ods-button-clear');
    });
    it('renders an overlay button', async () => {
      const { page } = await setup('<o-button type="overlay"></o-button>');
      expect(await page.find('o-button >>> [data-se=button]')).toHaveClass('is-ods-button-overlay');
    });
    it('renders a primary button by default with icon', async () => {
      const { page } = await setup('<o-button icon="info"></o-button>');
      expect(await page.find('o-button >>> [data-se=icon]')).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('renders a disabled button', async () => {
      const { page } = await setup('<o-button disabled></o-button>');
      expect(await page.find('o-button >>> [data-se=button]')).toHaveAttribute('disabled');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      const html = '<o-button>Primary</o-button>';
      await performAccessibilityCheck(html, 'o-button');
    });
  });
});
