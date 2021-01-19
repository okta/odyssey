COMPONENTS
==========

This is a high level overview around how we build web components. For more specific information, dig into the documentation READMEs for the [core.component packages](#packages).

**Table of Contents**

<!-- TOC -->

- [Packages](#packages)
- [Framework](#framework)
- [Components](#components)
    - [What's in a web component?](#whats-in-a-web-component)
    - [Directory and file structure](#directory-and-file-structure)
    - [General workflow when building a component](#general-workflow-when-building-a-component)
- [Commands](#commands)
    - [Playground](#playground)
    - [Tests](#tests)
- [Interfaces](#interfaces)
- [Stories](#stories)
    - [Accessibility Guidelines](#accessibility-guidelines)
        - [Rules](#rules)
    - [Tips and best practices](#tips-and-best-practices)
- [Resources](#resources)

<!-- /TOC -->

## Packages

| Package | Description |
| -- | -- |
| [@okta/core.components](README.md) | Web components built using the new [design system](https://design-docs.trexcloud.com/). |

## Framework

[Stencil](https://stenciljs.com/docs/introduction/) is the framework we use to build web components. Components are written in [TypeScript](https://www.typescriptlang.org/index.html), which among other things gives us type guarantees when compiling our code. Styles are written with [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html). For testing we use Stencil's [built-in helpers](https://stenciljs.com/docs/testing-overview), where currently we test components with their [end-to-end test framework](https://stenciljs.com/docs/end-to-end-testing). These tests are powered by [Jest](https://jestjs.io/) and [Puppeteer](https://pptr.dev/). For the development playground, we use [Storybook](https://storybook.js.org/).

## Components

### What's in a web component?

The main driver for building web components is to create an encapsulation layer around our design system:
- It should be easy to upgrade for minor design revisions and major redesigns. In the ideal case when there are no breaking changes in the web component contract, this becomes a version bump in downstream applications.
- It should support all downstream application cases:
  - Javascript-first apps, whether they use Courage or some other framework (like React, with ScaleFT).
  - Static or HTML-first apps, which includes our legacy JSP pages and the marketing/documentation sites.

As such, the scope for web components is limited - just the html template, sass, and basic behavioral javascript to support component use cases. While Stencil does have framework support for building full-blown applications and could be used to replace Courage entirely, this is not a goal for this first phase in deploying web components.

### Directory and file structure

In the component package, the `src/components` directory has separate folders for each component. If a component name has multiple words, the name is dash-cased, i.e. `text-input`.

A typical component will have these files:
```bash
src/components/
  my-component/           # Separate folder for each component
    __snapshots__/        # Auto-generated snapshot directory from Jest
    my-component.e2e.ts   # End-to-end test file
    my-component.scss     # Sass stylesheet
    my-component.tsx      # Main component file
```

Component interfaces and stories are defined in separate folders:

```bash
  src/interfaces/components/
    my-component.d.ts
  .storybook/stories/components/
    my-component.stories.js

```

You can read more about how these work in [interfaces](README.md#interfaces) and [stories](README.md#stories).

### General workflow when building a component

This is the general workflow you'll typically follow when building a new component.

1. Build the component first, following the [Design System Guidelines](https://design-docs.trexcloud.com/) for the component.
    - It's important to start with the Design System docs - there may be naming conventions or variations that differ from what we had before with Courage.
    - Reference the Courage component if it exists. Create a contract (props, types, methods) with a signature that supports for variations or types given in the Design System.
      - If the Design System is missing a variation or use case, file a JIRA on the [Design System Board](https://oktainc.atlassian.net/secure/RapidBoard.jspa?rapidView=614&projectKey=UX&view=planning.nodetail). For now it's okay to not have feature parity between the two systems, so you don't need to wait for them to address the issue before continuing to build the component.
    - If you haven't worked with Stencil before, checkout [their docs](https://stenciljs.com/docs/introduction). If you're pressed for time, these are the more relevant ones - [Overview](https://stenciljs.com/docs/introduction), [My First Component](https://stenciljs.com/docs/my-first-component), [Component Lifecyle](https://stenciljs.com/docs/component-lifecycle), [Decorators](https://stenciljs.com/docs/decorators), [Events](https://stenciljs.com/docs/events), and [Using JSX](https://stenciljs.com/docs/templating-jsx).
    - To see your component in action in the playground, you'll need to [write a Storybook story](https://storybook.js.org/basics/writing-stories/). Stories live in the [.storybook](.storybook) folder - read more about how to do this [here](README.md#stories).
    - Write end-to-end tests for the component. To learn more about how to do this, checkout [Stencil's end-to-end testing guide](https://stenciljs.com/docs/end-to-end-testing).

2. Once you've built the component, create the interface in interfaces.component and use it in your new component to lock the contract down. You can read more about how to do this [here](README.md#interfaces).

CORE.COMPONENTS
==================

The **core.components** package is a [stencil component library](../../../../scripts/build-profiles/stencil-component/README.md) that builds web components around [the new design system](https://design-docs.trexcloud.com/). For general information on building web components, checkout the [component documentation](../README.md).

## Commands

### Playground

If you're in the root okta-ui directory, you can use the global runner to bootstrap the components playground:

```bash
[okta-ui]$ yarn start components
```

If you've navigated to the `core/components` directory, you can run it directly:

```bash
[components]$ yarn start
```

In both cases, it will start up a [Storybook playground](https://storybook.js.org/) on http://localhost:9002.

### Tests

Run tests with `yarn e2e` in the `core/components` directory. This uses Jest under the hood, so you can use any of their [CLI options](https://jestjs.io/docs/en/cli.html):

```bash
# Run all tests
[components]$ yarn e2e

# Run only o-button tests
[components]$ yarn e2e -t o-button
```

## Interfaces

Use [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) to validate [Stencil props](https://stenciljs.com/docs/decorators/#prop-decorator) and the types these props expect if they're more complicated than the built-in types. Component interfaces are defined in the [interfaces/components](interfaces/components) directory.

For example, the Button component has a `type` prop that is a String that can only be one of four values - *primary*, *secondary*, *danger*, or *danger-secondary*. This is defined as a new type `ButtonTypes` in [button.d.ts](interfaces/components/button.d.ts):

```typescript
export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'danger-secondary';
```

This and the other props are then exported as the main `ButtonInterface`:

```typescript
export interface ButtonInterface extends ComponentInterface {
  type: ButtonTypes;
  disabled: boolean;
  href: string;
  icon: string;
}
```

Which can then be used by the component:

```typescript
import { Component, Prop } from '@stencil/core';
import { ButtonTypes, ButtonInterface } from '../../interfaces';

@Component({ tag: 'o-button' })
export class Button implements ButtonInterface {
  @Prop() type: ButtonTypes = 'primary';
  @Prop() disabled: boolean;
  @Prop() href: string;
  @Prop() icon: string;
}
```

## Stories

The component package uses [Storybook](https://storybook.js.org/) to run their playgrounds, and share the same [stories](https://storybook.js.org/basics/writing-stories/) to render their views. This is possible because their components have the same interface - although the components will look different and have different implementations, they should satisfy the same use cases.

Stories live in the [.storybook/stories/components](.storybook/stories/components) directory. The build system is setup to automatically use a new story in component package once they've been created or once an existing story has been updated.

### Accessibility Guidelines

Web components are designed with [WCAG 2.0 Level A & AA Rules](https://www.w3.org/TR/WCAG20/) and [508 Standards](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines) in mind. In an attempt to validate our compliance, we leverage [axe](https://www.deque.com/axe/)'s open source tooling to find common issues.

To test your component, import in the `performAccessibilityCheck` helper method:

```ts
import { performAccessibilityCheck } from '../../utils/test-utils';

describe('o-button', () => {
  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      const html = '<o-button>Primary (default)</o-button>';
      await performAccessibilityCheck(html, 'o-button');
    });
  });
});
```

#### Rules

At this time only WCAG 2.0 Level A && AA and Section 508 rules are applied to our components. To see what which rules are enforced, please check out: [WCAG 2.0 Level A && AA Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules).

### Tips and best practices

- It's important to spend some time upfront thinking about the web component contract - props, the values they expect, and any JS methods that can be invoked on the component. Everything internal to the component is easy to change and upgrade from, but breaking changes in the contract require changes in all downstream applications.
- Composition over inheritance. Stencil doesn't currently support component inheritance, so you'll need to think about how to compose components instead. More info on their thoughts [here](https://github.com/ionic-team/stencil/issues/172#issuecomment-332549861), or in general about slots [here](https://stenciljs.com/docs/templating-jsx#slots).
- A good reference for thinking about component contracts is to look at existing HTML elements - at the end of the day, building web components is the same as adding new, custom elements to the page. The mechanisms around composition, attributes, and eventing should feel very similar to working with standard HTML elements.
- Another good reference is the [Ionic Core framework](https://github.com/ionic-team/ionic/tree/master/core). Ionic is the team that is building Stencil, and they're building Stencil components into Ionic. They'll have many answers to your questions in their core framework source code.

## Resources

- [MDN Web Component Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Stencil Documentation](https://stenciljs.com/docs/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [Puppeteer Documentation](https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md)
- [Storybook Documentation](https://storybook.js.org/basics/introduction/)
