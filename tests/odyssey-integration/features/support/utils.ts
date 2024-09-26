
import KitchenSinkPage from '../pageobjects/kitchenSink.page';
import FormPage from '../pageobjects/form.page';

export const getPageForPageName = (pageName: string) => {
  switch (pageName) {
    case KitchenSinkPage.pageName:
      return KitchenSinkPage;
    case FormPage.pageName:
      return FormPage;
    default:
      throw new Error(`Could not find page for name "${pageName}"`);
  }
};
