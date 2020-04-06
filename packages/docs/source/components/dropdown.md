# Dropdown

<aside class="ods-callout is-ods-callout-warning" aria-live="polite">
  <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
    <path class="icon--fill" fill="#2F3F4A" d="M97.186 73.579L60.63 11.364C58.23 7.414 54.083 5 49.5 5c-4.583 0-8.73 2.414-11.13 6.364L1.814 73.58c-2.4 3.95-2.4 8.887-.109 12.838C4.105 90.585 8.252 93 12.835 93h73.33c4.582 0 8.838-2.414 11.13-6.584 2.291-3.95 2.291-8.887-.11-12.837z"/>
    <path fill="#fff" d="M49 28c-1.645 0-3 1.566-3 3.466v28.067C46 61.434 47.355 63 49 63s3-1.566 3-3.467V31.466c0-1.9-1.355-3.466-3-3.466z"/>
    <ellipse cx="49" cy="73" fill="#fff" rx="4" ry="3"/>
  </svg>
  <div class="ods-callout--content">
    <p>
      This component has only been approved for use in conjunction with the <a href="/components/navigation.html">Navigation</a> and <a href="/components/top-bar.html">Top bar</a> components.
    </p>
    <p>
      Support for other uses (e.g. dropdown buttons) is planned but not currently supported.
    </p>
    <p>
      This component is currently <strong>not</strong> responsive.
    </p>
  </div>
</aside>

A navigational element that creates more real estate to house additional navigation or action items, providing users with a quick way to get to where they want to go.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <nav class="ods-navigation" role="navigation">
      <ul class="ods-navigation--list">
        <li class="ods-navigation--item has-ods-dropdown">
          <a class="ods-navigation--link" href="#">Dashboard (Hover Me)</a>
          <nav class="ods-dropdown" aria-label="submenu">
            <header class="ods-dropdown--header">
              <p class="ods-dropdown--desc">
                Fusce vitae tempus purus. Proin congue purus eget justo elementum, et aliquet tortor cursus.
              </p>
              <a class="ods-dropdown--header-link" href="#">Visit your dashboard</a>
            </header>
            <section class="ods-dropdown--main">
              <ul class="ods-dropdown--list">
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Tasks
                    <p class="ods-dropdown--desc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Agents
                    <p class="ods-dropdown--desc">
                      Nulla non congue sem.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Notifications
                    <p class="ods-dropdown--desc">
                      Aliquam sodales blandit sagittis.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Getting Started
                    <p class="ods-dropdown--desc">
                      Duis quis luctus ipsum.
                    </p>
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </li>
      </ul>
    </nav>
  </div>

  ```html
  <nav class="ods-navigation" role="navigation">
    <ul class="ods-navigation--list">
      <li class="ods-navigation--item has-ods-dropdown">
        <a class="ods-navigation--link" href="#">Dashboard</a>
        <nav class="ods-dropdown" aria-label="submenu">
          <header class="ods-dropdown--header">
            <p class="ods-dropdown--desc">
              Fusce vitae tempus purus. Proin congue purus eget justo elementum, et aliquet tortor cursus.
            </p>
            <a class="ods-dropdown--header-link" href="#">Visit your dashboard</a>
          </header>
          <section class="ods-dropdown--main">
            <ul class="ods-dropdown--list">
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Tasks
                  <p class="ods-dropdown--desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Agents
                  <p class="ods-dropdown--desc">
                    Nulla non congue sem.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Notifications
                  <p class="ods-dropdown--desc">
                    Aliquam sodales blandit sagittis.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Getting Started
                  <p class="ods-dropdown--desc">
                    Duis quis luctus ipsum.
                  </p>
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </li>
    </ul>
  </nav>
  ```
</figure>

## Dropdown anatomy

Dropdowns offer a variety of optional parts that may be combined to provide the level of detail your use requires.

All dropdowns need to be paired with a triggering element that displays the `.dropdown` container. They will necessarily contain links and may include an optional header.

The examples below are for anatomical reference only and do not necessarily represent viable uses.

### Trigger &amp; Container

The simplest possible dropdown requires a triggering element, dropdown container, and some content. The dropdown is triggered when any parent with the `.has-ods-dropdown` class is hovered or gains focus.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <nav class="ods-navigation" role="navigation">
      <ul class="ods-navigation--list">
        <li class="ods-navigation--item has-ods-dropdown">
          <span class="ods-navigation--category" tabindex="0">
            Directory
          </span>
          <nav class="ods-dropdown" aria-label="submenu">
            <section class="ods-dropdown--main">
              <ul class="ods-dropdown--list">
                <li class="ods-dropdown--item">
                  Revealed!
                </li>
              </ul>
            </section>
          </nav>
        </li>
      </ul>
    </nav>
  </div>

  ```html
  <nav class="ods-navigation" role="navigation">
    <ul class="ods-navigation--list">
      <li class="ods-navigation--item has-ods-dropdown">
        <span class="ods-navigation--category" tabindex="0">
          Directory
        </span>
        <nav class="ods-dropdown" aria-label="submenu">
          <section class="ods-dropdown--main">
            <ul class="ods-dropdown--list">
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Tasks
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </li>
    </ul>
  </nav>
  ```
</figure>

### Header

Dropdowns may include a header to provide additional context. If the associated element (e.g. Navigation item) is a link, you should include a link to the same location beneath your description.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <nav class="ods-navigation" role="navigation">
      <ul class="ods-navigation--list">
        <li class="ods-navigation--item has-ods-dropdown">
          <a class="ods-navigation--link" href="#">Dashboard (Hover Me)</a>
          <nav class="ods-dropdown" aria-label="submenu">
            <header class="ods-dropdown--header">
              <p class="ods-dropdown--desc">
                Fusce vitae tempus purus. Proin congue purus eget justo elementum, et aliquet tortor cursus.
              </p>
              <a class="ods-dropdown--header-link" href="#">Visit your dashboard</a>
            </header>
          </nav>
        </li>
      </ul>
    </nav>
  </div>

  ```html
  <nav class="ods-navigation" role="navigation">
    <ul class="ods-navigation--list">
      <li class="ods-navigation--item has-ods-dropdown">
        <a class="ods-navigation--link" href="#">Dashboard (Hover Me)</a>
        <nav class="ods-dropdown" aria-label="submenu">
          <header class="ods-dropdown--header">
            <p class="ods-dropdown--desc">
              Fusce vitae tempus purus. Proin congue purus eget justo elementum, et aliquet tortor cursus.
            </p>
            <a class="ods-dropdown--header-link" href="#">Visit your dashboard</a>
          </header>
        </nav>
      </li>
    </ul>
  </nav>
  ```
</figure>

### Dropdown items

The bulk of dropdown content will be its items. In the case of navigational dropdowns, these will always be links.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <nav class="ods-navigation" role="navigation">
      <ul class="ods-navigation--list">
        <li class="ods-navigation--item has-ods-dropdown">
          <a class="ods-navigation--link" href="#">Dashboard (Hover Me)</a>
          <nav class="ods-dropdown" aria-label="submenu">
            <section class="ods-dropdown--main">
              <ul class="ods-dropdown--list">
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Tasks
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Agents
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Notifications
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Getting Started
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </li>
      </ul>
    </nav>
  </div>

  ```html
  <nav class="ods-navigation" role="navigation">
    <ul class="ods-navigation--list">
      <li class="ods-navigation--item has-ods-dropdown">
        <a class="ods-navigation--link" href="#">Dashboard (Hover Me)</a>
        <nav class="ods-dropdown" aria-label="submenu">
          <section class="ods-dropdown--main">
            <ul class="ods-dropdown--list">
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Tasks
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Agents
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Notifications
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Getting Started
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </li>
    </ul>
  </nav>
  ```
</figure>

These items may also include descriptions to provide additional hinting. Keep your descriptions succinct - a fragment or short sentence at most. Description text is treated as an additional hotspot for pointers and will be included in read-aloud text for screen readers.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <nav class="ods-navigation" role="navigation">
      <ul class="ods-navigation--list">
        <li class="ods-navigation--item has-ods-dropdown">
          <a class="ods-navigation--link" href="#">Dashboard (Hover Me)</a>
          <nav class="ods-dropdown" aria-label="submenu">
            <section class="ods-dropdown--main">
              <ul class="ods-dropdown--list">
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Tasks
                    <p class="ods-dropdown--desc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Agents
                    <p class="ods-dropdown--desc">
                      Nulla non congue sem.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Notifications
                    <p class="ods-dropdown--desc">
                      Aliquam sodales blandit sagittis.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">Getting Started
                    <p class="ods-dropdown--desc">
                      Duis quis luctus ipsum.
                    </p>
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </li>
      </ul>
    </nav>
  </div>

  ```html
  <nav class="ods-navigation" role="navigation">
    <ul class="ods-navigation--list">
      <li class="ods-navigation--item has-ods-dropdown">
        <a class="ods-navigation--link" href="#">Dashboard</a>
        <nav class="ods-dropdown" aria-label="submenu">
          <header class="ods-dropdown--header">
            <p class="ods-dropdown--desc">
              Fusce vitae tempus purus. Proin congue purus eget justo elementum, et aliquet tortor cursus.
            </p>
            <a class="ods-dropdown--header-link" href="#">Visit your dashboard</a>
          </header>
          <section class="ods-dropdown--main">
            <ul class="ods-dropdown--list">
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Tasks
                  <p class="ods-dropdown--desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Agents
                  <p class="ods-dropdown--desc">
                    Nulla non congue sem.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Notifications
                  <p class="ods-dropdown--desc">
                    Aliquam sodales blandit sagittis.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">Getting Started
                  <p class="ods-dropdown--desc">
                    Duis quis luctus ipsum.
                  </p>
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </li>
    </ul>
  </nav>
  ```
</figure>

When utilizing item descriptions, you should aim to limit your item count to five or fewer. If your IA requires more items than that, you can utilize an extra large container by adding a second `.dropdown--main` section.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <nav class="ods-navigation" role="navigation">
      <ul class="ods-navigation--list">
        <li class="ods-navigation--item has-ods-dropdown">
          <span class="ods-navigation--category" tabindex="0">
            Security
          </span>
          <nav class="ods-dropdown" aria-label="submenu">
            <header class="ods-dropdown--header">
              <p class="ods-dropdown--desc">
                Morbi euismod elit finibus dolor eleifend vestibulum. Aliquam nisi enim, lacinia non feugiat nec, efficitur nec nibh.
              </p>
            </header>
            <section class="ods-dropdown--main">
              <ul class="ods-dropdown--list">
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    General
                    <p class="ods-dropdown--desc">
                      Mauris ut justo sollicitudin, vulputate mauris ac, maximus massa.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Authentication
                    <p class="ods-dropdown--desc">
                      Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Multifactor
                    <p class="ods-dropdown--desc">
                      Nunc a iaculis ipsum, nec dignissim est.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Identity Providers
                    <p class="ods-dropdown--desc">
                      Suspendisse ultrices, metus nec mollis pharetra, mi massa facilisis dui, at dignissim turpis lacus sit amet velit.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Delegated Authentication
                    <p class="ods-dropdown--desc">
                      Donec rutrum augue risus.
                    </p>
                  </a>
                </li>
              </ul>
              <ul class="ods-dropdown--list">
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Networks
                    <p class="ods-dropdown--desc">
                      Ut at accumsan lectus.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    Administrators
                    <p class="ods-dropdown--desc">
                      Aliquam congue consectetur lacus.
                    </p>
                  </a>
                </li>
                <li class="ods-dropdown--item">
                  <a class="ods-dropdown--link" href="#">
                    API
                    <p class="ods-dropdown--desc">
                      Maecenas congue ante vel vulputate pulvinar.
                    </p>
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </li>
      </ul>
    </nav>
  </div>

  ```html
  <nav class="ods-navigation" role="navigation">
    <ul class="ods-navigation--list">
      <li class="ods-navigation--item has-ods-dropdown">
        <span class="ods-navigation--category" tabindex="0">
          Security
        </span>
        <nav class="ods-dropdown" aria-label="submenu">
          <header class="ods-dropdown--header">
            <p class="ods-dropdown--desc">
              Morbi euismod elit finibus dolor eleifend vestibulum. Aliquam nisi enim, lacinia non feugiat nec, efficitur nec nibh.
            </p>
          </header>
          <section class="ods-dropdown--main">
            <ul class="ods-dropdown--list">
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  General
                  <p class="ods-dropdown--desc">
                    Mauris ut justo sollicitudin, vulputate mauris ac, maximus massa.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Authentication
                  <p class="ods-dropdown--desc">
                    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Multifactor
                  <p class="ods-dropdown--desc">
                    Nunc a iaculis ipsum, nec dignissim est.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Identity Providers
                  <p class="ods-dropdown--desc">
                    Suspendisse ultrices, metus nec mollis pharetra, mi massa facilisis dui, at dignissim turpis lacus sit amet velit.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Delegated Authentication
                  <p class="ods-dropdown--desc">
                    Donec rutrum augue risus.
                  </p>
                </a>
              </li>
            </ul>
            <ul class="ods-dropdown--list">
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Networks
                  <p class="ods-dropdown--desc">
                    Ut at accumsan lectus.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  Administrators
                  <p class="ods-dropdown--desc">
                    Aliquam congue consectetur lacus.
                  </p>
                </a>
              </li>
              <li class="ods-dropdown--item">
                <a class="ods-dropdown--link" href="#">
                  API
                  <p class="ods-dropdown--desc">
                    Maecenas congue ante vel vulputate pulvinar.
                  </p>
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </li>
    </ul>
  </nav>
  ```
</figure>

## Guidelines

### Do

<ul>
  <li>
    Prefer dropdowns over truncated navigation
  </li>
  <li>
    Keep your heading and item names distinct
  </li>
</ul>

### Don't

<ul>
  <li>
    Duplicate heading links as dropdown items
  </li>
</ul>

### UI text

When naming dropdown items and writing descriptions, try to be as succint and clear as possible. Remember that assistive technologies will read out the dropdown link and description. While context is important, long item descriptions may be frustrating.

## Accessibility

### ARIA

Every dropdown container should utilize `aria-label='submenu'` to indicate that the user is in a second level of hierarchy.

### Tab index

Any dropdown trigger that is not a link should utilize `tabindex='0'` to ensure that the dropdown can be triggered by a `:focus` state. While the dropdown items are accessible to screen readers whether or not the menu is visible, sighted users should be able to trigger display via the keyboard.

## References

### Related components

<ul>
  <li>
    <a href="/components/navigation.html">Navigation</a>
  </li>
  <li>
    <a href="/components/top-bar.html">Top Bar</a>
  </li>
</ul>
