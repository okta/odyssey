# Switch
> A switch is any control which presents two mutually exclusive options or states. - <cite><a href='https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/Firefox_OS_apps/Building_blocks/1.x/Switch'>MDN</a></cite>

<figure class="ods-table--figure">
  <table class="ods-table">
    <thead>
      <tr>
        <th scope="column">Use</th>
        <th scope="column">Don't use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <ul>
            <li>For applying instantaneous actions</li>
            <li>For changing the state(enable/disable) a feature or service in settings</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>When requiring users to press a submit button. Use either checkboxes or radio buttons instead</li>
            <li>For applying a batch of settings</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</figure>

## States

### Enabled
<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <figure class="ods-switch--figure">
      <span class="ods-switch--label" id="switch-oktaverify">Okta Verify</span>
      <button type="button" role="switch" aria-checked="true" class="ods-switch" aria-labelledby="switch-oktaverify">
        <span class="ods-switch--dial"></span>
        <span class="ods-switch--dial"></span>
      </button>
    </figure>
  </div>

  ```html
  <figure class="ods-switch--figure">
    <span class="ods-switch--label" id="switch-oktaverify">Okta Verify</span>
    <button type="button" role="switch" aria-checked="true" class="ods-switch" aria-labelledby="switch-oktaverify">
      <span class="ods-switch--dial"></span>
      <span class="ods-switch--dial"></span>
    </button>
  </figure>
  ```
</figure>

### Disabled
When a switch is disabled, make sure there is context in the page explaining why it's disabled. If there is no content in the page, use a <a href="../components/tooltip.html">tootltip</a> to give more context.
<figure class="nimatron--example">
  <div class="nimatron--rendered">
  <figure class="ods-switch--figure">
    <span class="ods-switch--label" id="switch-disabled-example">Disabled example</span>
    <button type="button" role="switch" aria-checked="false" class="ods-switch" aria-labelledby="switch-disabled-example" disabled>
      <span class="ods-switch--dial"></span>
      <span class="ods-switch--dial"></span>
    </button>
  </figure>
  </div>

  ```html
  <figure class="ods-switch--figure">
    <span class="ods-switch--label" id="switch-disabled-example">Disabled example</span>
    <button type="button" role="switch" aria-checked="false" class="ods-switch" aria-labelledby="switch-disabled-example" disabled>
      <span class="ods-switch--dial"></span>
      <span class="ods-switch--dial"></span>
    </button>
  </figure>
  ```
</figure>

## Accessibility

A switch is an interactive control and therefore it must be focusable and keyboard accessible. The user should be able to toggle the switch with the [space] key.

We use a `button` with the `switch` role instead of a checkbox. It functions identical to a checkbox role, instead of reading "checked" / "unchecked", the `switch` role is read "on" / "off" via `aria-checked`.

The `aria-checked` attribute is required with either `true` or `false` values. `true` represents "on"; `false` represents "off". When the user clicks on the `switch`, a click event is fired, which changes the state of the `switch`. The handler also changes the value of the `aria-checked` attribute from `true` to `false` and the other way around.

## Further reading

<ul>
    <li>
        <a href="https://scottaohara.github.io/aria-switch-button/">Accessible Styled Form Controls</a> - <cite>Scott O'Hara (2018)</cite>
    </li>
    <li>
        <a href="https://inclusive-components.design/toggle-button/">Toggle buttons</a> - <cite>Heydon Pickering (2017)</cite>
  </li>
</ul>

<script>
document.querySelectorAll(".switch").forEach(function(theSwitch) {
  theSwitch.addEventListener("click", handleClickEvent, false);
});

function handleClickEvent(evt) {
  let el = evt.target;
  if (el.classList.contains('switch--dial')) {
    el = el.parentNode;
  }
 
  if (el.getAttribute("aria-checked") == "true") {
      el.setAttribute("aria-checked", "false");
  } else {
      el.setAttribute("aria-checked", "true");
  }
}
</script>
