# Toast

Toasts are non-disruptive messaging components that appear at the bottom right of the interface to provide quick, at-a-glance feedback on the outcome of an action.

## Anatomy

### Component breakdown
<ol>
    <li>Icon / color: These are mapped to the different types of toasts and shouldn't be mixed.</li>
    <li>Text: Be concise and clear and keep content to three lines max.</li>
    <li>Dismiss: Positioned in a consistent location. Appears regardless of whether toast is user- or self-dismissible.</li>
    <li>Title: Provides quick context; one line max. [Optional]</li>
    <li>Link: Provides a follow-up action, if necessary. [Optional]</li>
</ol>

### Defining characteristics

#### Position

<ul>
    <li>Toasts are always placed at the bottom right corner of the viewport.</li>
    <li>Should always appear on the topmost content layer.</li>
    <li>Margin: Bottom and right - $big-spacing</li>
    <li>Space between toasts: $base-spacing</li>
</ul>

#### Size and shape

<ul>
    <li>The width of a toast is consistent, ensuring multiple toast instances are vertically aligned.</li>
    <li>The height can vary based on content elements.<li>
</ul>

#### Quantity

<ul>
    <li>If multiple actions require toasts within the same timeframe, toasts will appear as stacked.</li>
</ul>

#### Timing

Self-dismissing toast will remain on screen following this logic:<

<ul>
    <li>Show animation: 300 ms</li>
    <li>Show duration</li>
    <ul>
        <li>Min: 2000 ms</li>
        <li>Max: 7000 ms</li>
        <li>Actual: number of characters (including spaces) x 100 ms</li>
    </ul>
    <li>Hide animation: 1000 ms</li>
</ul>

### States
Current states:

#### Success
Check mark with green color.

#### Future states

Warning: TBD
Error: TBD
Info: TBD

### Responsive handling

#### Desktop
Responsive, fixed to the bottom right corner of the viewport.

#### Mobile
Responsive, fixed to the bottom right corner of the viewport.

## Guidelines
<figure class="ods-table--figure">
  <table class="ods-table">
      <thead>
        <tr>
          <th scope="column">Dos</th>
          <th scope="column">Don'ts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
              <ul>
                  <li>Place on the bottom right corner of the viewport right after the relevant action</li>
                  <figure class="illustrative--example">
                      <svg viewBox="0 0 700 467" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="699" height="466" fill="white" stroke="#737D85"/><path opacity="0.4" d="M52 123C52 121.343 53.3431 120 55 120H645C646.657 120 648 121.343 648 123V429C648 430.657 646.657 432 645 432H55C53.3431 432 52 430.657 52 429V123Z" fill="#E4E5E7"/><path opacity="0.4" d="M52 53.436C52 51.7791 53.3431 50.436 55 50.436H645C646.657 50.436 648 51.7791 648 53.436V89.466C648 91.1228 646.657 92.466 645 92.466H55C53.3431 92.466 52 91.1228 52 89.466V53.436Z" fill="#E4E5E7"/><rect x="1" y="1" width="698" height="29.888" fill="#E4E5E7"/><rect x="580" y="419" width="100" height="35" fill="#00D1B3"/></svg>
                  </figure>
                  <li>Stack them vertically with a margin around them</li>
                  <figure class="illustrative--example">
                      <svg viewBox="0 0 700 467" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="699" height="466" fill="white" stroke="#2F3F4A"/><path opacity="0.4" d="M52 123C52 121.343 53.3431 120 55 120H645C646.657 120 648 121.343 648 123V429C648 430.657 646.657 432 645 432H55C53.3431 432 52 430.657 52 429V123Z" fill="#E4E5E7"/><path opacity="0.4" d="M52 53.436C52 51.7791 53.3431 50.436 55 50.436H645C646.657 50.436 648 51.7792 648 53.436V89.466C648 91.1229 646.657 92.466 645 92.466H55C53.3431 92.466 52 91.1229 52 89.466V53.436Z" fill="#E4E5E7"/><rect x="1" y="1" width="698" height="29.888" fill="#E4E5E7"/><rect x="580" y="419" width="100" height="35" fill="#00D1B3"/><rect x="580" y="365" width="100" height="35" fill="#00D1B3"/></svg>
                  </figure>
                  <li>Make the toast self-dismissible following the timing formula</li>
                  <figure class="illustrative--example">
                  </figure>
              </ul>
          </td>
          <td>
              <ul>
                  <li>Place toast on any other location</li>
                  <figure class="illustrative--example">
                      <svg viewBox="0 0 700 467" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="699" height="466" fill="white" stroke="#2F3F4A"/><path opacity="0.4" d="M52 123C52 121.343 53.3431 120 55 120H645C646.657 120 648 121.343 648 123V429C648 430.657 646.657 432 645 432H55C53.3431 432 52 430.657 52 429V123Z" fill="#E4E5E7"/><path opacity="0.4" d="M52 53.436C52 51.7791 53.3431 50.436 55 50.436H645C646.657 50.436 648 51.7791 648 53.436V89.466C648 91.1228 646.657 92.466 645 92.466H55C53.3431 92.466 52 91.1228 52 89.466V53.436Z" fill="#E4E5E7"/><rect x="1" y="1" width="698" height="29.888" fill="#E4E5E7"/><rect x="300" y="42" width="100" height="35" fill="#DD0744"/><rect x="580" y="42" width="100" height="35" fill="#DD0744"/><rect x="300" y="419" width="100" height="35" fill="#DD0744"/><rect x="20" y="42" width="100" height="35" fill="#DD0744"/><rect x="20" y="419" width="100" height="35" fill="#DD0744"/></svg>
                  </figure>
                  <li>Stack toasts on top of each other</li>
                  <figure class="illustrative--example">
                      <svg viewBox="0 0 700 467" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="699" height="466" fill="white" stroke="#2F3F4A"/><path opacity="0.4" d="M52 123C52 121.343 53.3431 120 55 120H645C646.657 120 648 121.343 648 123V429C648 430.657 646.657 432 645 432H55C53.3431 432 52 430.657 52 429V123Z" fill="#E4E5E7"/><path opacity="0.4" d="M52 53.436C52 51.7791 53.3431 50.436 55 50.436H645C646.657 50.436 648 51.7792 648 53.436V89.466C648 91.1229 646.657 92.466 645 92.466H55C53.3431 92.466 52 91.1229 52 89.466V53.436Z" fill="#E4E5E7"/><rect x="2" y="2" width="697" height="29.888" fill="#E4E5E7"/><rect x="580" y="419" width="100" height="35" fill="#DD0744"/><rect x="530.5" y="397.5" width="99" height="34" fill="#DD0744" stroke="#B80047"/><rect x="480.5" y="365.5" width="99" height="34" fill="#DD0744" stroke="#B80047"/></svg>
                  </figure>
              </ul>
          </td>
      </tbody>
  </table>
</figure>

## Reference

### Related components
<ul>
    <li><a href="#">Callouts</a></li>
    <li><a href="#">Banners</a></li>
</ul>

### Further reading
<ul>
    <li><a href="#" target="_blank" rel="noopener">Link #1</a> - <cite>Author (XXXX)</cite></li>
</ul>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <div class="ods-toast--pen">
      <aside class="ods-toast">
        <svg class="ods-toast--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
          <circle class="icon--fill" cx="50" cy="50" r="50"/>
          <path class="icon--stroke" d="M42.997 69c-.917 0-1.834-.39-2.489-1.04L27.146 54.712c-1.31-1.298-1.572-3.507-.393-4.806 1.31-1.559 3.668-1.688 5.109-.26l11.135 11.042h.131l24.76-24.55c1.31-1.3 3.405-1.56 4.846-.39 1.572 1.298 1.703 3.637.262 5.066L45.486 68.09c-.655.65-1.572.909-2.489.909z"/>
        </svg>
        <section class="ods-toast--main">
          <p class="ods-toast-content">
            Okta has been added to your dashboard.
          </p>
        </section>
        <button class="ods-toast--close">
          <svg class="ods-toast--close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path class="icon--stroke" d="M.572 1.184l12.244 12.244M12.816 1.184L.571 13.428"/>
          </svg>
        </button>
      </aside>
      <aside class="ods-toast">
        <svg class="ods-toast--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
          <circle class="icon--fill" cx="50" cy="50" r="50"/>
          <path class="icon--stroke" d="M42.997 69c-.917 0-1.834-.39-2.489-1.04L27.146 54.712c-1.31-1.298-1.572-3.507-.393-4.806 1.31-1.559 3.668-1.688 5.109-.26l11.135 11.042h.131l24.76-24.55c1.31-1.3 3.405-1.56 4.846-.39 1.572 1.298 1.703 3.637.262 5.066L45.486 68.09c-.655.65-1.572.909-2.489.909z"/>
        </svg>
        <section class="ods-toast--main">
          <h1 class="ods-toast--title">
            App Added
          </h1>
          <p class="ods-toast-content">
            Okta has been added to your dashboard.
          </p>
        </section>
        <button class="ods-toast--close">
          <svg class="ods-toast--close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path class="icon--stroke" d="M.572 1.184l12.244 12.244M12.816 1.184L.571 13.428"/>
          </svg>
        </button>
      </aside>
    </div>
  </div>

  ```html
  ```
</figure>
