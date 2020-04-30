# Tab

Tabs are a navigational component used to organize content by grouping similar information on the same page. They allow content to be viewed without having to navigate away from that page or route.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <div class="ods-tabs" id="example-0" style="
      --ods-tabs-indicator-width: 99px;
      --ods-tabs-indicator-pos-x: 0;
    ">
      <div class="ods-tabs--tablist" role="tablist" aria-label="">
        <button class="ods-tabs--tab" id="tablistitem-0-0" role="tab" aria-selected="true" aria-controls="tab-0-0">Agents</button>
        <button class="ods-tabs--tab" id="tablistitem-0-1" role="tab" aria-selected="false" aria-controls="tab-0-1">People</button>
        <button class="ods-tabs--tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-2">Settings</button>
        <button class="ods-tabs--tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-3">Import</button>
      </div>
      <div class="ods-tabs--tabpanel">
        <div id="tab-0-0" tabindex="0" role="tabpanel" aria-labelledby="tablistit-0-0">
          <p>Tab Panel 0: Agents</p>
        </div>
        <div id="tab-0-1" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-0-1" hidden="">
          <p>Tab Panel 1: People</p>
        </div>
        <div id="tab-0-2" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-0-2" hidden="">
          <p>Tab Panel 2: Settings</p>
        </div>
        <div id="tab-0-3" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-0-3" hidden="">
          <p>Tab Panel 3: Import</p>
        </div>
      </div>
    </div>
  </div>

```html
    <div class="ods-tabs" id="example-0" style="
      --ods-tabs-indicator-width: 99px;
      --ods-tabs-indicator-pos-x: 0;
    ">
      <div class="ods-tabs--tablist" role="tablist" aria-label="">
        <button class="ods-tabs--tab" id="tablistitem-0-0" role="tab" aria-selected="true" aria-controls="tab-0-0">Agents</button>
        <button class="ods-tabs--tab" id="tablistitem-0-1" role="tab" aria-selected="false" aria-controls="tab-0-1">People</button>
        <button class="ods-tabs--tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-2">Settings</button>
        <button class="ods-tabs--tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-3">Import</button>
      </div>
      <div class="ods-tabs--tabpanel">
        <div id="tab-0-0" tabindex="0" role="tabpanel" aria-labelledby="tablistit-0-0">
          <p>Tab Panel 0: Agents</p>
        </div>
        <div id="tab-0-1" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-0-1" hidden="">
          <p>Tab Panel 1: People</p>
        </div>
        <div id="tab-0-2" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-0-2" hidden="">
          <p>Tab Panel 2: Settings</p>
        </div>
        <div id="tab-0-3" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-0-3" hidden="">
          <p>Tab Panel 3: Import</p>
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

<!-- ## Anatomy

### Tablist
The tablist is the parent element that houses tabs. It provides no style in and of itself.

### Tab
The tab is the element in which the user clicks to change to the corresponding tabpanel.

### Tab indicator
The tab indicator is a pseudo-element used to indicate the active tab. Its position changes by calculating the left offset, as well as the width of the active tab element. (See [Switching Tabs](#switching-tabs))

### Tabpanel
A tabpanel is a simple container element. For each tab, there is an associated tab panel which contains the content associated with that tab. -->

## Switching tabs

The JS included here is for demo purposes only. For those implementing the Tab component from scratch, be sure to implement the behavior as follows:

1. Update the CSS custom properties to animate the Tab indicator correctly. (See [CSS custom properties](#css-custom-properties))
2. Set the select tab button's `aria-selected` attribute to `true`. If a different tab was previously selected, that tab button's `aria-selected` attribute must be set to `false`.
3. The tabpanel corresponding to the tab button is shown. This is done by removing the `hidden` attribute on the tabpanel. If a different tabpanel was previously visible, the `hidden` attribute is applied to it.

### CSS custom properties
The tab indicator's left position and width are changed by updating CSS custom properties on the `.ods-tabs` element. The custom properties are as follow:

<figure class="ods-table--figure">
  <table class="ods-table">
    <caption>Odyssey takes care to ensure apropriate keyboard navigation for the tab component.</caption>
    <thead>
      <tr>
        <th scope="column">CSS variable</th>
        <th scope="column">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>--ods-tabs-indicator-width</code></td>
        <td>The width of the tab indicator</td>
      </tr>
      <tr>
        <td><code>--ods-tabs-indicator-pos-x</code></td>
        <td>The position of the tab indicator along the x-axis</td>
      </tr>
    </tbody>
  </table>
</figure>

<p style="margin: 1.5rem 0">In the following example, you can see the tab indicator position is on the second element:</p>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <div class="ods-tabs" id="example-1" style="
      --ods-tabs-indicator-width:97px;
      --ods-tabs-indicator-pos-x:103px;
    ">
      <div class="ods-tabs--tablist" role="tablist" aria-label="">
        <button class="ods-tabs--tab" id="tablistitem-1-0" role="tab" aria-selected="false" aria-controls="tab-1-0">Agents</button>
        <button class="ods-tabs--tab" id="tablistitem-1-1" role="tab" aria-selected="true" aria-controls="tab-1-1">People</button>
        <button class="ods-tabs--tab" id="tablistitem-1-2" role="tab" aria-selected="false" aria-controls="tab-1-2">Settings</button>
        <button class="ods-tabs--tab" id="tablistitem-1-2" role="tab" aria-selected="false" aria-controls="tab-1-3">Import</button>
      </div>
      <div class="ods-tabs--tabpanel">
        <div id="tab-1-0" tabindex="0" role="tabpanel" aria-labelledby="tablistit-1-0" hidden="">
          <p>Tab Panel 0: Agents</p>
        </div>
        <div id="tab-1-1" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-1-1">
          <p>Tab Panel 1: People</p>
        </div>
        <div id="tab-1-2" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-1-2" hidden="">
          <p>Tab Panel 2: Settings</p>
        </div>
        <div id="tab-1-3" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-1-3" hidden="">
          <p>Tab Panel 3: Import</p>
        </div>
      </div>
    </div>
  </div>

```html
<div class="ods-tabs" id="example-1" style="
  --ods-tabs-indicator-width:97px;
  --ods-tabs-indicator-pos-x:103px;
">
  <div class="ods-tabs--tablist" role="tablist" aria-label="">
    <button class="ods-tabs--tab" id="tablistitem-1-0" role="tab" aria-selected="false" aria-controls="tab-1-0">Agents</button>
    <button class="ods-tabs--tab" id="tablistitem-1-1" role="tab" aria-selected="true" aria-controls="tab-1-1">People</button>
    <button class="ods-tabs--tab" id="tablistitem-1-2" role="tab" aria-selected="false" aria-controls="tab-1-2">Settings</button>
    <button class="ods-tabs--tab" id="tablistitem-1-2" role="tab" aria-selected="false" aria-controls="tab-1-3">Import</button>
  </div>
  <div class="ods-tabs--tabpanel">
    <div id="tab-1-0" tabindex="0" role="tabpanel" aria-labelledby="tablistit-1-0" hidden="">
      <p>Tab Panel 0: Agents</p>
    </div>
    <div id="tab-1-1" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-1-1">
      <p>Tab Panel 1: People</p>
    </div>
    <div id="tab-1-2" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-1-2" hidden="">
      <p>Tab Panel 2: Settings</p>
    </div>
    <div id="tab-1-3" tabindex="0" role="tabpanel" aria-labelledby="tablistitem-1-3" hidden="">
      <p>Tab Panel 3: Import</p>
    </div>
  </div>
</div>
```
</figure>

<!-- 
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
</figure> -->

<script>
// TODO: Set active tab on load
class Tab {
    constructor (element) {
      this.element = document.querySelectorAll(element)[0]
      this.selectedTabProperties = {
        index: 0,
        width: 0,
        posX: 0
      }
      this.init()
    }
    
    init () {
      const element = this.element
      element.addEventListener('click', (event) => {
        const target = event.target
        const isButton = target.tagName === 'BUTTON'
        const hasRole = target.hasAttribute('role')
        const isTab = isButton && hasRole

        if (isTab) {
          this.updateTabs(event)
        }
      });
    }
    // TODO: This method is too damn big. Consider breaking it up a bit.
    updateTabs (event) {
      const element = this.element
      // New Tabs
      const newTabElement = event.target
      const newTabIndex = [...newTabElement.parentElement.children].indexOf(newTabElement)
      const newTabWidth = newTabElement.offsetWidth
      const newPosX = newTabElement.offsetLeft
      
      // Old Tabs
      const oldTabIndex = this.selectedTabProperties.index
      const oldTabElement = [...newTabElement.parentNode.children][oldTabIndex]
      
      // New/Old TabPanels
      const oldTabPanelElement = [...element.querySelectorAll('.ods-tabs--tabpanel')[0].children][oldTabIndex]
      const newTabPanelElement = [...element.querySelectorAll('.ods-tabs--tabpanel')[0].children][newTabIndex]

      // Update aria-selected attributes
      oldTabElement.setAttribute('aria-selected', 'false')
      newTabElement.setAttribute('aria-selected', 'true')

      // Update Tab Custom Properties     
      element.style.setProperty('--ods-tabs-indicator-width', `${newTabWidth}px`);
      element.style.setProperty('--ods-tabs-indicator-pos-x', `${newPosX}px`);
      
      // Show/Hide tab panels
      oldTabPanelElement.setAttribute('hidden', '')
      newTabPanelElement.removeAttribute('hidden')

      // Update class tab props for future use
      this.selectedTabProperties = {
        index: newTabIndex,
        width: newTabWidth,
        posX: newPosX
      }
    }
  }

  new Tab('#example-0')
</script>
