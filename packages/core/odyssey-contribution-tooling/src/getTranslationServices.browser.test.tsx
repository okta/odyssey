import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

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

  const renderServices = () =>
    getTranslationServices({
      namespace: "test-app",
      defaultLanguageCode: "en",
      resources: testResources,
    });

  const createTestComponent = (
    useTranslation: UseTranslation<"test-app", (typeof testResources)["en"]>,
  ) =>
    function TestComponent() {
      const [t, i18n] = useTranslation();
      return (
        <div>
          <h1>{t("greeting", { friends: "FRIENDS" })}</h1>
          <h2>{t("farewell")}</h2>
          <p>Current language: {i18n.language}</p>
        </div>
      );
    };

  test("renders `children` and uses the default translations", async () => {
    const { TranslationProvider: OdysseyTranslationProvider, useTranslation } =
      renderServices();
    const TestComponent = createTestComponent(useTranslation);

    await render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    // check if the English text is rendered by default
    await expect
      .element(page.getByRole("heading", { name: "Hello World FRIENDS" }))
      .toBeVisible();
  });

  test("switches languages when the `languageCode` prop changes", async () => {
    const { TranslationProvider: OdysseyTranslationProvider, useTranslation } =
      renderServices();
    const TestComponent = createTestComponent(useTranslation);

    const { rerender } = await render(
      <OdysseyTranslationProvider languageCode="en">
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Hello World FRIENDS" }))
      .toBeVisible();

    // rerender the component with a new language prop
    await rerender(
      <OdysseyTranslationProvider languageCode="fr">
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    // wait for the content to update and check for the French text
    await expect
      .element(page.getByRole("heading", { name: "Bonjour le monde FRIENDS" }))
      .toBeVisible();
    await expect.element(page.getByText("Current language: fr")).toBeVisible();
  });

  test("applies translation overrides to one of the known languages", async () => {
    const { TranslationProvider: OdysseyTranslationProvider, useTranslation } =
      renderServices();
    const TestComponent = createTestComponent(useTranslation);

    await render(
      <OdysseyTranslationProvider
        translationOverrides={{ en: { greeting: "Hello Overridden!" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Hello Overridden!" }))
      .toBeVisible();
  });

  test("a provider without overrides mounted after one with overrides unmounts", async () => {
    const { TranslationProvider: OdysseyTranslationProvider, useTranslation } =
      renderServices();
    const TestComponent = createTestComponent(useTranslation);

    const { unmount } = await render(
      <OdysseyTranslationProvider
        translationOverrides={{ en: { greeting: "Hello Overridden!" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    // the override lands in an effect, so the first paint can still be the default
    await expect
      .element(page.getByRole("heading", { name: "Hello Overridden!" }))
      .toBeVisible();

    await unmount();

    await render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Hello World FRIENDS" }))
      .toBeVisible();
  });

  test("an inner provider with overrides unmounts under an outer provider with its own", async () => {
    const {
      i18n: i18nInstance,
      TranslationProvider: OdysseyTranslationProvider,
      useTranslation,
    } = renderServices();
    const TestComponent = createTestComponent(useTranslation);

    const outerOverrides = { en: { greeting: "Outer greeting {{friends}}" } };
    const innerOverrides = { en: { farewell: "Inner farewell" } };

    const { rerender } = await render(
      <OdysseyTranslationProvider translationOverrides={outerOverrides}>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Outer greeting FRIENDS" }))
      .toBeVisible();

    await rerender(
      <OdysseyTranslationProvider translationOverrides={outerOverrides}>
        <OdysseyTranslationProvider translationOverrides={innerOverrides}>
          <TestComponent />
        </OdysseyTranslationProvider>
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Inner farewell" }))
      .toBeVisible();

    await rerender(
      <OdysseyTranslationProvider translationOverrides={outerOverrides}>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    expect(i18nInstance.getResourceBundle("en", "test-app")).toStrictEqual({
      greeting: "Outer greeting {{friends}}",
      farewell: "Goodbye",
    });
    await expect
      .element(page.getByRole("heading", { name: "Outer greeting FRIENDS" }))
      .toBeVisible();
  });

  test("a bundle the consumer added directly outlives an unrelated provider's unmount", async () => {
    const {
      i18n: i18nInstance,
      TranslationProvider: OdysseyTranslationProvider,
      useTranslation,
    } = renderServices();
    const TestComponent = createTestComponent(useTranslation);

    i18nInstance.addResourceBundle(
      "en",
      "test-app",
      { farewell: "Consumer farewell" },
      true,
      true,
    );

    const { unmount } = await render(
      <OdysseyTranslationProvider
        translationOverrides={{ en: { greeting: "Provider greeting" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Provider greeting" }))
      .toBeVisible();

    await unmount();

    await render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Hello World FRIENDS" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("heading", { name: "Consumer farewell" }))
      .toBeVisible();
  });

  test("an override for a language the resources do not cover unmounts", async () => {
    const {
      i18n: i18nInstance,
      TranslationProvider: OdysseyTranslationProvider,
      useTranslation,
    } = renderServices();
    const TestComponent = createTestComponent(useTranslation);

    const { unmount } = await render(
      <OdysseyTranslationProvider<"custom">
        translationOverrides={{ custom: { greeting: "Custom greeting" } }}
      >
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Hello World FRIENDS" }))
      .toBeVisible();

    await unmount();

    expect(i18nInstance.options.ns).toStrictEqual(["test-app"]);
    expect(
      i18nInstance.getResource("custom", "test-app", "greeting"),
    ).toBeUndefined();

    await render(
      <OdysseyTranslationProvider>
        <TestComponent />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Hello World FRIENDS" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("heading", { name: "Goodbye" }))
      .toBeVisible();
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

    const createComponentWithNestedContributions = (
      useTranslation: UseTranslation<"test-app", (typeof testResources)["en"]>,
    ) =>
      function ComponentWithNestedContributions() {
        const { t } = useTranslation();
        return (
          <div>
            <h1>{t("greeting", { friends: "PARENT" })}</h1>
            <ContributionsPackageComponent />
          </div>
        );
      };

    test("the appropriate translation bundle is used for each component", async () => {
      const {
        TranslationProvider: OdysseyTranslationProvider,
        useTranslation,
      } = renderServices();
      const ComponentWithNestedContributions =
        createComponentWithNestedContributions(useTranslation);

      await render(
        <OdysseyTranslationProvider>
          <ContributionsPackageOdysseyTranslationProvider>
            <ComponentWithNestedContributions />
          </ContributionsPackageOdysseyTranslationProvider>
        </OdysseyTranslationProvider>,
      );

      // we are correctly using top level odyssey translation provider text
      await expect
        .element(page.getByRole("heading", { name: "Hello World PARENT" }))
        .toBeVisible();

      // we are correctly using the nested odyssey translation provider text
      await expect
        .element(
          page.getByRole("heading", { name: "I am the nested greeting" }),
        )
        .toBeVisible();
      await expect
        .element(
          page.getByRole("heading", {
            name: "I am only available in the nested translations - placeholder text one, placeholder text two",
          }),
        )
        .toBeVisible();
    });
  });
});
