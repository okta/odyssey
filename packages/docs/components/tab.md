---
template: component
title: Tab
tabs:
  - label: 'Legacy docs'
    id: 'nimatron-all'
---

::: slot nimatron-all

# Tab

Tabs are a navigational component used to organize content by grouping similar information on the same page. They allow content to be viewed without having to navigate away from that page or route.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <OdsTabs label="User profile options" :active="tabs.active" :tablist="tabs.tablist" :id="tabs.id">
      <template slot="tab-applications"><p>Tabpanel: Applications</p></template>
      <template slot="tab-groups"><p>Tabpanel: Groups</p></template>
      <template slot="tab-profile"><p>Tabpanel: Profile</p></template>
      <template slot="tab-devices"><p>Tabpanel: Devices</p></template>
      <template slot="tab-omm"><p>Tabpanel: OMM</p></template>
    </OdsTabs>
  </div>

```html
<div id="user-profile-tabs" class="ods-tabs" label="User profile options">
  <div role="tablist" aria-label="" class="ods-tabs--tablist">
    <button role="tab" id="tab-applications" aria-selected="true" tabindex="0" aria-controls="tab-applications-tabpanel" class="ods-tabs--tab">
      Applications
    </button>
    <button role="tab" id="tab-groups" tabindex="-1" aria-controls="tab-groups-tabpanel" class="ods-tabs--tab">
      Groups
    </button>
    <button role="tab" id="tab-profile" tabindex="-1" aria-controls="tab-profile-tabpanel" class="ods-tabs--tab">
      Profile
    </button>
    <button role="tab" id="tab-devices" tabindex="-1" aria-controls="tab-devices-tabpanel" class="ods-tabs--tab">
      Devices
    </button>
    <button role="tab" id="tab-omm" tabindex="-1" aria-controls="tab-omm-tabpanel" class="ods-tabs--tab">
      OMM
    </button>
  </div>
  <div class="ods-tabs--tabpanel">
    <div role="tabpanel" id="tab-applications-tabpanel" aria-labelledby="tab-applications" tabindex="0">
      <p>Tabpanel: Applications</p>
    </div>
    <div role="tabpanel" id="tab-groups-tabpanel" aria-labelledby="tab-groups" hidden="hidden" tabindex="0">
      <p>Tabpanel: Groups</p>
    </div>
    <div role="tabpanel" id="tab-profile-tabpanel" aria-labelledby="tab-profile" hidden="hidden" tabindex="0">
      <p>Tabpanel: Profile</p>
    </div>
    <div role="tabpanel" id="tab-devices-tabpanel" aria-labelledby="tab-devices" hidden="hidden" tabindex="0">
      <p>Tabpanel: Devices</p>
    </div>
    <div role="tabpanel" id="tab-omm-tabpanel" aria-labelledby="tab-omm" hidden="hidden" tabindex="0">
      <p>Tabpanel: OMM</p>
    </div>
  </div>
</div>
```
</figure>

## Usage

### Do

- Place tabs as high as possible in your main content area.
- Use tabs to allow users to switch quickly between related pieces of information.

### Don't

- Use tabs without tabpanels.
- Use tabs as navigation. Meaning they don’t take you from place to place. Rather, they are meant for context switching related to the page.
- Nest tabs within a tabpanel. Tabs should live as high up in the main content area hierarchy as possible.
- Have more than 8 tabs in a tablist.
- Add an icon to a tab. Icons should be reserved for very specific things. It can be hard to maintain consistency with use of icons as it pertains to their semantic meanings and meaning to Okta. Without an established icon repo, it’s best to not use them for now.

## Switching tabs

The JS included here is for demo purposes only. For those implementing the Tab component from scratch, be sure to implement the behavior as follows:

1. Set the select tab button's `aria-selected` attribute to `true`. If a different tab was previously selected, that tab button's `aria-selected` attribute must be set to `false`.
2. The tabpanel corresponding to the tab button is shown. This is done by removing the `hidden` attribute on the tabpanel. If a different tabpanel was previously visible, the `hidden` attribute is applied to it.


## Accessibility

### Keyboard support
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
        id: 'user-profile-tabs',
        active: "tab-applications",
        tablist: [
          { id: "tab-applications", label: 'Applications' },
          { id: "tab-groups", label: 'Groups' },
          { id: "tab-profile", label: 'Profile' },
          { id: "tab-devices", label: 'Devices' },
          { id: "tab-omm", label: 'OMM' }
        ]
      }
    }
  }
}
</script>

:::
