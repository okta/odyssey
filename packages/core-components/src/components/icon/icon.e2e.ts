import { setupComponent, setupComponentType, performAccessibilityCheck } from '../../utils/test-utils';

async function setup(html: string) : setupComponentType {
  return await setupComponent(html, 'o-icon');
}

describe('o-icon', () => {
  describe('Props', () => {
    describe('defaults', () => {
      it('defaults to size=small', async () => {
        const { el } = await setup('<o-icon name="info"></o-icon>');
        expect(el).toMatchSnapshot();
      });
    });

    describe('name', () => {
      it('uses name to generate the className', async () => {
        const { el } = await setup('<o-icon name="warning"></o-icon>');
        expect(el).toMatchSnapshot();
      });
    });

    describe('size', () => {
      it('can be "x-small"', async () => {
        const { el } = await setup('<o-icon name="info" size="x-small"></o-icon>');
        expect(el).toMatchSnapshot();
      });
      it('can be "small"', async () => {
        const { el } = await setup('<o-icon name="info" size="small"></o-icon>');
        expect(el).toMatchSnapshot();
      });
      it('can be "medium"', async () => {
        const { el } = await setup('<o-icon name="info" size="medium"></o-icon>');
        expect(el).toMatchSnapshot();
      });
      it('can be "large"', async () => {
        const { el } = await setup('<o-icon name="info" size="large"></o-icon>');
        expect(el).toMatchSnapshot();
      });
      it('can be "x-large"', async () => {
        const { el } = await setup('<o-icon name="info" size="x-large"></o-icon>');
        expect(el).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      const html = '<o-icon name="warning"></o-icon>';
      await performAccessibilityCheck(html, 'o-icon');
    });
  });
});


