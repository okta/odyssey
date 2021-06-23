import "./preview.scss";
import translations from "./translations";
import { IntlProvider } from "react-intl";

export const parameters = {
  controls: {
    expanded: true,
    sort: 'requiredFirst'
  },
  grid: {
    cellSize: 10
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      method: '',
      order: [
        "Welcome",
        [
          "Introduction (README)",
          "Code Style & Conventions",
          "Component Status"
        ],
        "Base",
        "Components",
        "Patterns"
      ]
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ar', title: 'عربى (Arabic)' },
        { value: 'de', title: 'Deutsche (German)' },
        { value: 'en', title: 'English' },
        { value: 'jp', title: '日本語 (Japanese)' }
      ]
    }
  }
};

const setDir = (locale = 'en') => {
  const rtlLocales = ['ar'];
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  document.documentElement.setAttribute('dir', dir);
}

const withLocaleProvider = (Story, context) => {
  const locale = context.globals.locale;
  
  setDir(locale);

  return (
    <IntlProvider locale={locale} messages={translations[locale]}>
      <Story {...context} />
    </IntlProvider>
  )
}

export const decorators = [ withLocaleProvider ];
