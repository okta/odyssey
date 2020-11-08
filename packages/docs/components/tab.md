---
template: component
id: component-tab
title: Tab
description: Tabs are a navigational component used to organize content by grouping similar information on the same page.
lead: Navigation component used to organize content by grouping similar information on the same page. They allow content to be viewed without having to navigate away from that page or route.
tabs:
  - label: 'Overview'
    id: 'overview'
  - label: 'HTML & SCSS'
    id: 'html-scss'
links:
  - icon: github
    label: View source
    href: https://github.com/okta/odyssey/blob/master/packages/odyssey/src/scss/components/_tab.scss
  - icon: figma
    label: View designs
    href: https://www.figma.com/file/fz2Agv32E0RNaJ5cKVUe2i/Tab?node-id=519%3A0
---

::: slot overview

## Anatomy


<Anatomy img="/images/anatomy-tab.svg" />

## Behavior

<Description>

Users interact with Tab as they would a button, the main difference is the outcome. By default, the first tab from the left is active and the associated content 
displayed in the tab panel. Upon selecting a different tab, the tab indicator appears on the selected tab. The tab panel will then update to show the new content. 

Additionally, the tab element is keyboard-navigable (See [Accessibility: Keyboard Support](#keyboard-support))

</Description>

<Visual layout="wide" variant="content-full" fade>
  <template>
    <h1 class="is-sample-unimportant">NASA's Mars Missions</h1>
    <p class="is-sample-unimportant">To date, NASA has had 49 missions involving rovers, orbiters and other spacecraft.</p>
    <OdsTabs label="User profile options" :active="tabs.active" :tablist="tabs.tablist" :id="tabs.id">
      <template slot="tab-orbiter">
        <figure class="ods-table--figure is-sample-unimportant">
          <figcaption class="ods-table--figcaption">
            Orbiter Missions
          </figcaption>
          <table class="ods-table">
            <caption>When implementing this component you should consider the following keyboard behaviors.</caption>
            <thead>
              <tr>
                <th scope="column">Spacecraft</th>
                <th scope="column">Launch vehicle</th>
                <th scope="column">Launch date</th>
                <th scope="column">Orbit insertion</th>
                <th scope="column">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">2001 Mars Odyssey</th>
                <td>Delta II</td>
                <td class="is-ods-table-date">4/7/01</td>
                <td class="is-ods-table-date">10/24/01</td>
                <td>
                  <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
                    <dt class="ods-status--label">
                      Result
                    </dt>
                    <dd class="ods-status--value">
                      Still operating
                    </dd>
                  </dl>
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </template>
      <template slot="tab-atmospheric">
        <figure class="ods-table--figure is-sample-unimportant">
          <figcaption class="ods-table--figcaption">
            Atmospheric Missions
          </figcaption>
          <table class="ods-table">
            <caption>When implementing this component you should consider the following keyboard behaviors.</caption>
            <thead>
              <tr>
                <th scope="column">Mission type</th>
                <th scope="column">Launched</th>
                <th scope="column">Landing</th>
                <th scope="column">Mission duration</th>
                <th scope="column">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">2001 Mars Odyssey</th>
                <td>Delta II</td>
                <td class="is-ods-table-date">4/7/01</td>
                <td class="is-ods-table-date">10/24/01</td>
                <td>
                  <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
                    <dt class="ods-status--label">
                      Result
                    </dt>
                    <dd class="ods-status--value">
                      Still operating
                    </dd>
                  </dl>
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </template>
      <template slot="tab-lander">
        <figure class="ods-table--figure is-sample-unimportant">
          <figcaption class="ods-table--figcaption">
            Lander Missions
          </figcaption>
          <table class="ods-table">
            <caption>When implementing this component you should consider the following keyboard behaviors.</caption>
            <thead>
              <tr>
                <th scope="column">Mission type</th>
                <th scope="column">Launched</th>
                <th scope="column">Landing</th>
                <th scope="column">Mission duration</th>
                <th scope="column">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">2001 Mars Odyssey</th>
                <td>Delta II</td>
                <td class="is-ods-table-date">4/7/01</td>
                <td class="is-ods-table-date">10/24/01</td>
                <td>
                  <dl class="ods-status is-ods-status-success is-ods-status-label-hidden">
                    <dt class="ods-status--label">
                      Result
                    </dt>
                    <dd class="ods-status--value">
                      Still operating
                    </dd>
                  </dl>
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </template>
    </OdsTabs>
  </template>
</Visual>

## Usage

<Description>

Tabs were created to shorten long pages. Before you use these, we’d recommend laying 
out all of the content on your page out first. From there figure out common themes and 
see what could be grouped together. Those themes should become your Tabs.

</Description>

### Relate to the page title

<Description>

Tabs are NOT navigation. Meaning they don’t take you from place to place. Rather, they are meant for context switching related to the page.

</Description>

<Visual variant="positive">Positive</Visual>
<Visual variant="negative">Negative</Visual>

### Position above major content

<Description>

Tabs are best used at the top of the page or situated above the content it’s related to. This will help establish hierarchy.

</Description>

<Visual variant="positive">Positive</Visual>
<Visual variant="negative">Negative</Visual>

### Don't stack tabs

<Description>

In fact, it’s really impossible to do because we include the tab panel with the tabs themselves. We’re calling this out to designers because the component doesn’t include the tab panel and shouldn’t be presented to an engineer.

keuyUltimately this is bad practice because is will result in overloading users with information and reduce comprehension.

</Description>

<Visual variant="negative">Negative</Visual>

## Content Guidelines

<Description>

- Don't from using tabs without tabpanels.
- Don't have more than 8 tabs in a tablist.
- Don't Add an icon to a tab. Icons should be reserved for very specific things. It can be hard to maintain consistency with use of icons as it pertains to their semantic meanings and meaning to Okta.

</Description>

## Accessibility

### Keyboard Support

<figure class="ods-table--figure">
  <table class="ods-table">
    <caption>When implementing this component you should consider the following keyboard behaviors.</caption>
    <thead>
      <tr>
        <th scope="column">Key</th>
        <th scope="column">Behavior</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" rowspan="2"><kbd>Tab</kbd></th>
        <td>When focus moves in to <code>tablist</code> the focus is placed on the first <code>tab</code> element.</td>
      </tr>
      <tr>
        <td>Unlike the right arrow key, if you tab past the last element, the tab focus continues down the page as normal. In this case, it should set focus in to the active <code>tabpanel</code></td>
      </tr>
      <tr>
        <td><kbd>Enter</kbd> <kbd>Space</kbd></td>
        <td>When focus is placed on a tab, the corresponding <code>tabpanel</code> is activated/displayed.</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2"><kbd>Right Arrow</kbd></th>
        <td>When focus is within the <code>tablist</code> the next tab is selected.</td>
      </tr>
      <tr>
        <td>If the last tab is focused the focus is moved to the first tab.</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2"><kbd>Left Arrow</kbd></th>
        <td>When focus is within the <code>tablist</code> the previous tab is selected.</td>
      </tr>
      <tr>
        <td>If the first tab is focused the focus is moved to the last tab.</td>
      </tr>
      <tr>
        <td><kbd>Home</kbd></td>
        <td>If a tab has focus, the focus is moved to the first tab.</td>
      </tr>
      <tr>
        <td><kbd>End</kbd></td>
        <td>If a tab has focus, the focus is moved to the last tab.</td>
      </tr>
    </tbody>
  </table>
</figure>

<script>
export default {
  data () {
    return {
      tabs: {
        id: 'example-0',
        active: "tab-orbiter",
        tablist: [
          { id: "tab-orbiter", label: 'Orbiter' },
          { id: "tab-atmospheric", label: 'Atmospheric' },
          { id: "tab-lander", label: 'Lander' }
        ]
      }
    }
  }
}
</script>

## References

### Further Reading

- [Tabs Design Pattern in WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)

:::

::: slot html-scss

## Switching tabs

<Description>

The JS included in the `@okta/odyssey` package is for demo purposes only. For those implementing the Tab component from scratch, be sure to implement the behavior as follows:

1. Set the select tab button's aria-selected attribute to true. If a different tab was previously selected, that tab button's aria-selected attribute must be set to false.
2. The tabpanel corresponding to the tab button is shown. This is done by removing the hidden attribute on the tabpanel. If a different tabpanel was previously visible, the hidden attribute is applied to it.

</Description>

:::
