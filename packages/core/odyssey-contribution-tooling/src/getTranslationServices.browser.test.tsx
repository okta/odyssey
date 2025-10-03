import { render, screen, waitFor } from "@testing-library/react";

import type { UseTranslation } from "./getTranslationServices.js";

import { getTranslationServices } from "./getTranslationServices.js";

describe(getTranslationServices.name, () => {
  const en = {
    greeting: "Hello World {{friends}}",
    farewell: "Goodbye",
  } as const;
  const fr = { greeting: "Bonjour le monde {{friends}}" } as const;
  const testResources = {
    en,
    fr,
  } as const;

  let OdysseyTranslationProvider: ReturnType<
    typeof getTranslationServices
  >["TranslationProvider"];
  let useTranslation: UseTranslation<"test-app", (typeof testResources)["en"]>;

  // create a fresh instance of the translation services before each test
  beforeEach(() => {
    const services = getTranslationServices({
      namespace: "test-app",
      defaultLanguageCode: "en",
      resources: testResources,
    });
    OdysseyTranslationProvider = services.TranslationProvider;
    useTranslation = services.useTranslation;
  });

  const TestComponent = () => {
    const [t, i18n] = useTranslation();
    return (
      <div>
        <h1>{t("greeting", { friends: "FRIENDS" })}</h1>
        <p>Current language: {i18n.language}</p>
      </div>
    );
  };

  test("renders `children` and uses the default translations", () => {
    render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    // check if the English text is rendered by default
    expect(
      screen.getByRole("heading", { name: "Hello World FRIENDS" }),
    ).toBeInTheDocument();
  });

  test("switches languages when the `languageCode` prop changes", async () => {
    const { rerender } = render(
      <OdysseyTranslationProvider languageCode="en">
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Hello World FRIENDS" }),
    ).toBeInTheDocument();

    // rerender the component with a new language prop
    rerender(
      <OdysseyTranslationProvider languageCode="fr">
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    // wait for the content to update and check for the French text
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Bonjour le monde FRIENDS" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Current language: fr")).toBeInTheDocument();
    });
  });

  test("applies translation overrides to one of the known languages", () => {
    render(
      <OdysseyTranslationProvider
        translationOverrides={{ en: { greeting: "Hello Overridden!" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Hello Overridden!" }),
    ).toBeInTheDocument();
  });

  describe("when components are nested", () => {
    const contributionsPackageResources = {
      en: {
        greeting: "I am the nested greeting",
        farewell: "I am the nested goodbye",
        withPlaceholders:
          "I am only available in the nested translations - {{placeholder1}}, {{placeholder2}}",
      },
    } as const;

    const {
      TranslationProvider: ContributionsPackageOdysseyTranslationProvider,
      useTranslation: useContributionsPackageTranslation,
      Trans: ContributionsPackageTrans,
    } = getTranslationServices({
      namespace: "nested-app",
      defaultLanguageCode: "en",
      resources: contributionsPackageResources,
    });

    const ContributionsPackageComponent = () => {
      const { t } = useContributionsPackageTranslation();
      return (
        <section>
          <h2>{t("greeting")}</h2>
          <h2>
            <ContributionsPackageTrans
              i18nKey="withPlaceholders"
              values={{
                placeholder1: "placeholder text one",
                placeholder2: "placeholder text two",
              }}
            />
          </h2>
        </section>
      );
    };

    const ComponentWithNestedContributions = () => {
      const { t } = useTranslation();
      return (
        <div>
          <h1>{t("greeting", { friends: "PARENT" })}</h1>
          <ContributionsPackageComponent />
        </div>
      );
    };

    test("the appropriate translation bundle is used for each component", async () => {
      render(
        <OdysseyTranslationProvider>
          <ContributionsPackageOdysseyTranslationProvider>
            <ComponentWithNestedContributions />
          </ContributionsPackageOdysseyTranslationProvider>
        </OdysseyTranslationProvider>,
      );

      await waitFor(() => {
        // we are correctly using top level odyssey translation provider text
        expect(
          screen.getByRole("heading", { name: "Hello World PARENT" }),
        ).toBeInTheDocument();

        // we are correctly using the nested odyssey translation provider text
        expect(
          screen.getByRole("heading", { name: "I am the nested greeting" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", {
            name: "I am only available in the nested translations - placeholder text one, placeholder text two",
          }),
        ).toBeInTheDocument();
      });
    });
  });
});
