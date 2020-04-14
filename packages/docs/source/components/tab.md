# Tab

Tabs are a navigational component used to organize content by grouping similar information on the same page. They allow content to be viewed without having to navigate away from that page or route.

## Usage
<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <div class="ods-tabs" id="example-0">
      <div class="ods-tablist" role="tablist" aria-label="">
        <button class="ods-tab" id="tablistitem-0-0" role="tab" aria-selected="false" aria-controls="tab-0-0">Agents</button>
        <button class="ods-tab" id="tablistitem-0-1" role="tab" aria-selected="false" aria-controls="tab-0-1">People</button>
        <button class="ods-tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-2">Settings</button>
        <button class="ods-tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-3">Import</button>
      </div>
      <div class="ods-tabpanel">
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
</figure>

```html
    <div class="ods-tabs" id="example-0">
      <div class="ods-tablist" role="tablist" aria-label="">
        <button class="ods-tab" id="tablistitem-0-0" role="tab" aria-selected="false" aria-controls="tab-0-0">
          Agents
        </button>
        <button class="ods-tab" id="tablistitem-0-1" role="tab" aria-selected="false" aria-controls="tab-0-1">
          People
        </button>
        <button class="ods-tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-2">
          Settings
        </button>
        <button class="ods-tab" id="tablistitem-0-2" role="tab" aria-selected="false" aria-controls="tab-0-3">
          Import
        </button>
      </div>
      <div class="ods-tabpanel">
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
```
## Anatomy

### Tablist
The tablist is the element in which tabs are contained. It provides no style in and of itself.

### Tab
The tab is the element in which the user clicks to change to the corresponding tabpanel.

### Tab indicator
The tab indicator is a pseudo element which is used to indicate the active tab. It's position should be changed by calculating the left offset, as well as width of the active tab element.

### Tabpanel
A tabpanel is an simple container element. For each tab, there is an associated tab panel which contains the content associated with that tab.

## Accessibility

### Keyboard support
<figure class="ods-table--figure">
  <table class="ods-table">
    <caption>Odyssey takes care to ensure apropriate keyboard navigation for the tab component.</caption>
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
        <td>When focus is in to <code>tablist</code> focus moves in to the active <code>tabpanel</code>.</td>
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


## Content Guidelines

### Do

- Place tabs as high as possible in your main content area.
- Use tabs to allow users to switch quickly between related pieces of information.

### Don't

- Use tabs without tabpanels.
- Use tabs as navigation. Meaning they don’t take you from place to place. Rather, they are meant for context switching related to the page.
- Nest tabs within a tabpanel. Tabs should live as high up in the main content area hierarchy as possible.

<!-- ## Responsive Design -->

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
      const oldTabPanelElement = [...element.querySelectorAll('.ods-tabpanel')[0].children][oldTabIndex]
      const newTabPanelElement = [...element.querySelectorAll('.ods-tabpanel')[0].children][newTabIndex]

      // Update aria-selected attributes
      oldTabElement.setAttribute('aria-selected', 'false')
      newTabElement.setAttribute('aria-selected', 'true')
  
      // Update Tab Custom Properties     
      element.style.setProperty('--ods-indicator-width', `${newTabWidth}px`);
      element.style.setProperty('--ods-indicator-pos-x', `${newPosX}px`);
      
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
  new Tab('#example-1')
  new Tab('#example-2')
</script>
