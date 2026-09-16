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

  let i18nInstance: ReturnType<typeof getTranslationServices>["i18n"];
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
    i18nInstance = services.i18n;
    OdysseyTranslationProvider = services.TranslationProvider;
    useTranslation = services.useTranslation;
  });

  const TestComponent = () => {
    const [t, i18n] = useTranslation();
    return (
      <div>
        <h1>{t("greeting", { friends: "FRIENDS" })}</h1>
        <h2>{t("farewell")}</h2>
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

  test("a provider without overrides mounted after one with overrides unmounts", async () => {
    const { unmount } = render(
      <OdysseyTranslationProvider
        translationOverrides={{ en: { greeting: "Hello Overridden!" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    // the override lands in an effect, so the first paint can still be the default
    expect(
      await screen.findByRole("heading", { name: "Hello Overridden!" }),
    ).toBeVisible();

    unmount();

    render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Hello World FRIENDS" }),
      ).toBeVisible();
    });
  });

  test("an inner provider with overrides unmounts under an outer provider with its own", async () => {
    const outerOverrides = { en: { greeting: "Outer greeting {{friends}}" } };
    const innerOverrides = { en: { farewell: "Inner farewell" } };

    const { rerender } = render(
      <OdysseyTranslationProvider translationOverrides={outerOverrides}>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Outer greeting FRIENDS" }),
    ).toBeVisible();

    rerender(
      <OdysseyTranslationProvider translationOverrides={outerOverrides}>
        <OdysseyTranslationProvider translationOverrides={innerOverrides}>
          <TestComponent />
        </OdysseyTranslationProvider>
      </OdysseyTranslationProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Inner farewell" }),
    ).toBeVisible();

    rerender(
      <OdysseyTranslationProvider translationOverrides={outerOverrides}>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(i18nInstance.getResourceBundle("en", "test-app")).toStrictEqual({
      greeting: "Outer greeting {{friends}}",
      farewell: "Goodbye",
    });
    expect(
      screen.getByRole("heading", { name: "Outer greeting FRIENDS" }),
    ).toBeVisible();
  });

  test("a bundle the consumer added directly outlives an unrelated provider's unmount", async () => {
    i18nInstance.addResourceBundle(
      "en",
      "test-app",
      { farewell: "Consumer farewell" },
      true,
      true,
    );

    const { unmount } = render(
      <OdysseyTranslationProvider
        translationOverrides={{ en: { greeting: "Provider greeting" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Provider greeting" }),
    ).toBeVisible();

    unmount();

    render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Hello World FRIENDS" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Consumer farewell" }),
    ).toBeVisible();
  });

  test("an override for a language the resources do not cover unmounts", async () => {
    const { unmount } = render(
      <OdysseyTranslationProvider<"custom">
        translationOverrides={{ custom: { greeting: "Custom greeting" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Hello World FRIENDS" }),
    ).toBeVisible();

    unmount();

    expect(i18nInstance.options.ns).toStrictEqual(["test-app"]);
    expect(
      i18nInstance.getResource("custom", "test-app", "greeting"),
    ).toBeUndefined();

    render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Hello World FRIENDS" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Goodbye" })).toBeVisible();
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
