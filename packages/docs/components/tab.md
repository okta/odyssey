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


<Anatomy img="images/anatomy-tab.svg" />

## Behavior

<Description>

Users interact with Tab as they would a button, the main difference is the outcome. By default, the first tab from the left is active and the associated content displayed in the tab panel. Upon selecting a different tab, the tab indicator appears on the selected tab. The tab panel will then update to show the new content. 

Additionally, the tab element is keyboard-navigable (See [Accessibility: Keyboard Support](#keyboard-support))

</Description>

<Visual layout="wide" content="full" fade>
  <template>
    <header>
      <h1>Terrestrial Planets</h1>
      <p>Terrestrial planets are planets that are composed primarily of silicate rocks or metals.</p>
    </header>
    <OdsTabs aria-label="Types of terrestrial planets" :active="tabsPlanets.active" :tablist="tabsPlanets.tablist" id="example-1">
      <template slot="tab-mercury">
        <blockquote class="is-sample-unimportant">
          <p>Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets in the Solar System.</p>
        </blockquote>
      </template>
      <template slot="tab-venus">
        <blockquote class="is-sample-unimportant">
          <p>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the second-brightest natural object in the night sky after the Moon, Venus can cast shadows and can be, on rare occasion, visible to the naked eye in broad daylight.</p>
        </blockquote>
      </template>
      <template slot="tab-earth">
        <blockquote class="is-sample-unimportant">
          <p>Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land consisting of continents and islands.</p>
        </blockquote>
      </template>
      <template slot="tab-mars">
        <blockquote class="is-sample-unimportant">
          <p>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".</p>
        </blockquote>
      </template>
    </OdsTabs>
  </template>
</Visual>

## Usage

<Description>

Tabs were created to shorten long pages. Before you use these, we’d recommend laying 
out all of the content on your page out first. From there, figure out common themes and 
see what could be grouped together. Those themes should become your Tabs.

</Description>

### Relate to the page title

<Description>

Tabs are not navigation. Meaning they don’t take you from place to place. Rather, they are meant for context switching related to the page.

</Description>

<Visual variant="positive" content="no-end" class="is-tab-small-sample">
  <header>
    <h2>Terrestrial Planets</h2>
    <p>Terrestrial planets are planets that are composed primarily of silicate rocks or metals.</p>
  </header>
  <OdsTabs aria-label="Types of terrestrial planets" :active="tabsPlanets.active" :tablist="tabsPlanets.tablist" id="example-2"></OdsTabs>
</Visual>

<Visual variant="negative" content="no-end" class="is-tab-small-sample">
  <header>
    <h2>Terrestrial Planets</h2>
    <p>Terrestrial planets are planets that are composed primarily of silicate rocks or metals.</p>
  </header>
  <OdsTabs aria-label="Famous constellations" :active="tabsConstellations.active" :tablist="tabsConstellations.tablist" id="example-3"></OdsTabs>
</Visual>

### Position above major content

<Description>

Tabs are best used at the top of the page or situated above the content it’s related to. This will help establish hierarchy.

</Description>


<Visual variant="positive" content="no-end" class="is-tab-small-sample">
  <header>
    <h2>Missions</h2>
    <p>There have been 49 missions involving various types of spacecraft.</p>
  </header>
  <OdsTabs aria-label="Missions by type" :active="tabs.active" :tablist="tabs.tablist" id="example-4"></OdsTabs>
</Visual>

<Visual variant="negative"  content="no-end" class="is-tab-small-sample">
  <OdsTabs aria-label="Missions by type" :active="tabs.active" :tablist="tabs.tablist" id="example-5">
  <template slot="tab-orbiter">
    <header>
      <h2>Missions</h2>
      <p>There have been 8 missions involving orbiters.</p>
    </header>
  </template>
  <template slot="tab-atmospheric">
    <header>
      <h2>Missions</h2>
      <p>There have been 12 missions involving atmospheric vehicles.</p>
    </header>
  </template>
  <template slot="tab-lander">
    <header>
      <h2>Missions</h2>
      <p>There have been 4 missions involving lander vehicles.</p>
    </header>
  </template>
  </OdsTabs>
</Visual>

### Don't stack tabs

<Description>

Use Tab sparingly. Limit the Tab component to one per page, and refrain from including a second set of Tabs within a tabpanel.

</Description>

<Visual variant="negative" class="is-tab-stacked-example" content="no-end">
  <OdsTabs aria-label="Missions by type" :active="tabs.active" :tablist="tabs.tablist" :id="tabs.id"></OdsTabs>
  <OdsTabs aria-label="Missions by year" :active="tabsYears.active" :tablist="tabsYears.tablist" id="example-6"></OdsTabs>
</Visual>

## Content Guidelines

<Description>

- Refrain from using tabs without tabpanels.
- Don't have more than 8 tabs in a tablist.
- Don't add an icon to a tab. Icons should be reserved for very specific things. It can be hard to maintain consistency with use of icons as it pertains to their semantic meanings and meaning to Okta.

</Description>

## Accessibility

### Keyboard Support

<Description>

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

</Description>

## References

### Further Reading

- [Tabs Design Pattern in WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)

:::

::: slot html-scss


## Basic example

<figure class="docs-example">
  <div class="docs-example--rendered">
    <OdsTabs aria-label="Describes the purpose of this set of tabs" :active="tabsPlain.active" :tablist="tabsPlain.tablist" id="example">
      <template slot="tab-1">
        <p>Tabpanel 1 content&hellip;</p>
      </template>
      <template slot="tab-2">
        <p>Tabpanel 2 content&hellip;</p>
      </template>
      <template slot="tab-3">
        <p>Tabpanel 3 content&hellip;</p>
      </template>
    </OdsTabs>
  </div>

  ```html
  <div id="example" class="ods-tabs" aria-label="Describes the purpose of this set of tabs">
    <div role="tablist" aria-label="label" class="ods-tabs--tablist">
      <button id="tab-1" role="tab" tabindex="0" aria-controls="tab-1-tabpanel" class="ods-tabs--tab" aria-selected="true">Tab 1</button>
      <button id="tab-2" role="tab" tabindex="-1" aria-controls="tab-2-tabpanel" class="ods-tabs--tab">Tab 2</button>
      <button id="tab-3" role="tab" tabindex="-1" aria-controls="tab-3-tabpanel" class="ods-tabs--tab">Tab 3</button>
    </div>
    <div class="ods-tabs--tabpanel">
        <div id="tab-1-tabpanel" role="tabpanel" aria-labelledby="tab-1" tabindex="0">
          <p>Tabpanel 1 content…</p>
        </div>
        <div id="tab-2-tabpanel" role="tabpanel" aria-labelledby="tab-2" tabindex="0" hidden="hidden">
          <p>Tabpanel 2 content…</p>
        </div>
        <div id="tab-3-tabpanel" role="tabpanel" aria-labelledby="tab-3" tabindex="0" hidden="hidden">
          <p>Tabpanel 3 content…</p>
        </div>
    </div>
  </div>
  ```

</figure>

## Switching tabs

<Description>

The JS included in the `@okta/odyssey` package is for demo purposes only. For those implementing the Tab component from scratch, be sure to implement the behavior as follows:

1. Set the select tab button's aria-selected attribute to true. If a different tab was previously selected, that tab button's aria-selected attribute must be set to false.
2. The tabpanel corresponding to the tab button is shown. This is done by removing the hidden attribute on the tabpanel. If a different tabpanel was previously visible, the hidden attribute is applied to it.

</Description>

:::


<script>
export default {
  data () {
    return {
      tabs: {
        active: "tab-orbiter",
        tablist: [
          { id: "tab-orbiter", label: 'Orbiter' },
          { id: "tab-atmospheric", label: 'Atmospheric' },
          { id: "tab-lander", label: 'Lander' }
        ]
      },
      tabsYears: {
        active: "tab-1990s",
        tablist: [
          { id: "tab-1990s", label: '1990s' },
          { id: "tab-2000s", label: '2000s' },
          { id: "tab-2010s", label: '2010s' }
        ]
      },
      tabsPlanets: {
        active: "tab-mercury",
        tablist: [
          { id: "tab-mercury", label: 'Mercury' },
          { id: "tab-venus", label: 'Venus' },
          { id: "tab-earth", label: 'Earth' },
          { id: "tab-mars", label: 'Mars' }
        ]
      },
      tabsConstellations: {
        active: "tab-aquarius",
        tablist: [
          { id: "tab-aquarius", label: 'Aquarius' },
          { id: "tab-leo", label: 'Leo' },
          { id: "tab-pisces", label: 'Pisces' }
        ]
      },
      tabsPlain: {
        active: "tab-1",
        tablist: [
          { id: "tab-1", label: 'Tab 1' },
          { id: "tab-2", label: 'Tab 2' },
          { id: "tab-3", label: 'Tab 3' }
        ]
      }
    }
  }
}
</script>
