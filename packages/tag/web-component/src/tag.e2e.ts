import { setupComponent, setupComponentType } from './utils/test-utils';

async function setup(html: string) : setupComponentType {
  return await setupComponent(html, 'o-tag');
}

describe('o-tag', () => {
  it('generates proper template with required classes', async () => {
    const { page } = await setup(`
      <o-tag>Small</o-tag>
    `);

    const tag = await page.find('o-tag >>> li');
    expect(tag).toHaveClass('ods-tag');
  });
});
