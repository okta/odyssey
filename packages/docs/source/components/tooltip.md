# Tooltip

A contextual pop-up that provides a label for or description of an element.

## Usage

Tooltips should be employed to help users understand unknown or unfamiliar objects or states that aren't described by the visible UI.

Good tooltips provide info only when needed, require minimal user effort to trigger, are easily discoverable, and reduce screen clutter.

### Use When

#### A control doesn't have a text label

Tooltips should be employed for all controls that rely solely on iconography for communicating meaning.

This is especially important for distinguishing between visually or contextually similar elements, or when employing rarely-used features or features with variant interpretations.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-label">
        &#9998;
      </button>
      <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Edit
      </aside>
    </span>
  </div>

  ```html
  <span class="has-ods-tooltip">
    <button class="ods-button" aria-describedby="edit-label">
      <svg>...</svg>
    </button>
    <aside id="edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
      Edit
    </aside>
  </span>
  ```
</figure>

#### An element benefits from supplemental information

This may be the case for disabled controls or inline content like abbreviations.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <span class="has-ods-tooltip sample--tip">
      <button class="ods-button" aria-describedby="download-description" disabled>
        Download
      </button>
      <aside id="download-description" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        Downloads are disabled during an import.
      </aside>
    </span>
  </div>

  ```html
  <span class="has-ods-tooltip">
    <button class="ods-button" aria-describedby="download-description" disabled>
      Download
    </button>
    <aside id="download-description" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
      Downloads are disabled during an import.
    </aside>
  </span>
  ```
</figure>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      The reintroduction of
      <span class="has-ods-tooltip">
        <abbr tabindex="0" aria-describedby="pups-tip">PUPS</abbr>
        <span id="pups-tip" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
          Puppy Uniform Protection and Safety Act
        </span>
      </span>
      helps keep our furry friends safe.
    </p>
  </div>

  ```html
  <p>
    The reintroduction of
    <span class="has-ods-tooltip">
      <abbr tabindex="0" aria-describedby="pups-tip">PUPS</abbr>
      <span id="pups-tip" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Puppy Uniform Protection and Safety Act
      </span>
    </span>
    helps keep our furry friends safe.
  </p>
  ```
</figure>

### Don't use

#### When users need to interact with the content

Tooltips are transient by design, which makes them a bad candidate for interactive content. Do not include links, buttons, or other controls within a tooltip.

<figure class="nimatron--example">
  <div class="nimatron--rendered is-example-disallowed">
    <span class="has-ods-tooltip sample--tip">
      <button class="ods-button" aria-describedby="download-description-link" disabled>
        Download
      </button>
      <aside id="download-description-link" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        Find out why by <a href="#">visiting the docs</a>.
      </aside>
    </span>
  </div>
</figure>

#### If rich content or imagery is required

Tooltips are intended to provide short, clear descriptions. If your content requires rich formatting or imagery, users may have difficulty parsing them in this form factor.

<figure class="nimatron--example">
  <div class="nimatron--rendered is-example-disallowed">
    <span class="has-ods-tooltip sample--tip">
      <button class="ods-button" aria-describedby="download-description-image" disabled>
        Download
      </button>
      <aside id="download-description-image" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        <img src="https://media.giphy.com/media/uOAXDA7ZeJJzW/giphy.gif" alt="An animated gif of an animated gif of Newman wagging his finger." style="width: 150px;">
      </aside>
    </span>
  </div>
</figure>

## Content

### Succinct

Tooltips should contain short, descriptive text. A single sentence or even a sentence fragment is ideal.

The content should be new information. Tooltips should not repeat copy from visible UI.

### Static

Tooltips should contain static content. Users don't expect, and are unlikely to notice, dynamic changes to tooltip contents.

<strong>Exception:</strong> Tooltips may contain dynamic content if:

* The tooltip is present at all times during the content change <em>and</em>...
* The tooltip is reporting real-time change (e.g. "Copy" changes to "Copied!" on a click-to-copy button)

## Position

When positioning a tooltip, ensure:

* The tooltip is paired with the element being described.
* You anticipate responsive web design concerns.
* Placement doesn't interfere with the object of interest or relevant information.
* The tooltip is always visible when activated, not cropped or off-page.

The following positional classes are available:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-top">Top</abbr>
      <aside id="tip-top" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        A top tip.
      </aside>
    </span>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-right">Right</abbr>
      <aside id="tip-right" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
        A right-hand tip.
      </aside>
    </span>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-bottom">Bottom</abbr>
      <aside id="tip-bottom" class="ods-tooltip is-ods-tooltip-bottom" role="tooltip">
        A bottom tip.
      </aside>
    </span>
    <span class="has-ods-tooltip sample--tip">
      <abbr tabindex="0" aria-describedby="tip-left">Left</abbr>
      <aside id="tip-left" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
        A left-hand tip.
      </aside>
    </span>
  </div>

  ```html
  <span class="has-ods-tooltip">
    <abbr tabindex="0" aria-describedby="tip-top">Top</abbr>
    <aside id="tip-top" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
      A top tip.
    </aside>
  </span>
  <span class="has-ods-tooltip">
    <abbr tabindex="0" aria-describedby="tip-right">Right</abbr>
    <aside id="tip-right" class="ods-tooltip is-ods-tooltip-right" role="tooltip">
      A right-hand tip.
    </aside>
  </span>
  <span class="has-ods-tooltip">
    <abbr tabindex="0" aria-describedby="tip-bottom">Bottom</abbr>
    <aside id="tip-bottom" class="ods-tooltip is-ods-tooltip-bottom" role="tooltip">
      A bottom tip.
    </aside>
  </span>
  <span class="has-ods-tooltip">
    <abbr tabindex="0" aria-describedby="tip-left">Left</abbr>
    <aside id="tip-left" class="ods-tooltip is-ods-tooltip-left" role="tooltip">
      A left-hand tip.
    </aside>
  </span>
  ```
</figure>

## Behavior

Tooltips activate on `:hover` or `:focus`.

In the case of `:hover` or `:focus`, tooltips support being triggered both by the shared parent container (`.has-ods-tip`) or the paired sibling. If you are describing an element that already supports the `:focus` state, no additional work is necessary.

If you would like the tooltip to trigger via the parent container or a non-interactive element like `<abbr>` or a disabled `<button>`, include the `tabindex="0"` attribute on the parent or sibling:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      The reintroduction of
      <span class="has-ods-tooltip">
        <abbr tabindex="0" aria-describedby="pups-tip-2">PUPS</abbr>
        <span id="pups-tip-2" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
          Puppy Uniform Protection and Safety Act
        </span>
      </span>
      helps keep our furry friends safe.
    </p>
  </div>

  ```html
  <p>
    The reintroduction of
    <span class="has-ods-tooltip">
      <abbr tabindex="0" aria-describedby="pups-tip">PUPS</abbr>
      <span id="pups-tip" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Puppy Uniform Protection and Safety Act
      </span>
    </span>
    helps keep our furry friends safe.
  </p>
  ```
</figure>

This will ensure that the tooltip is accessible via keyboard navigation or other assistive technology.

Tooltips are hidden when losing `:hover` or `:focus`. In order to maintain parity with the browser's tooltip behavior, they will not disappear automatically.

The cursor displayed when hovering a tooltipped item will be determined by the item itself, not the tip.

## Responsive considerations

With few exceptions, `:focus` and `:hover` interactions are typically unavailable on touchscreen devices, or trigger `:active` at the same time. (Android's <a href="https://material.io/design/interaction/gestures.html#types-of-gestures">long press action gesture</a> is one such exception.) This means tooltips on controls may be completely invisible for users of these devices.

Because no single touchscreen solution satisfies all tooltip usage types, consider fallback alternatives on a case-by-case basis.

When possible, provide inline text that becomes visible on touchscreen devices. Otherwise, a fixed-position fallback has been provided for mobile devices. Your mileage may vary.


## Accessibility

* The paired element should utilize `aria-describedby` to create a hard association with the tooltip.
* The tooltip itself should utilize the `role='tooltip'` attribute to distinguish it from other popups.
* Per <a href="https://www.w3.org/TR/wai-aria-1.1/#tooltip">ARIA guidelines</a>, our tooltips triggered by :hover and :focus employ a short delay (1s) before animating.

### Tooltip as a label

When using tooltips as a label, no further considerations are necessary. Assistive technologies will read the following as "Edit".

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="access-edit-label">
        &#9998;
      </button>
      <aside id="access-edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        Edit
      </aside>
    </span>
  </div>

  ```html
  <span class="has-ods-tooltip">
    <button class="ods-button" aria-describedby="access-edit-label">
      <svg>...</svg>
    </button>
    <aside id="access-edit-label" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
      Edit
    </aside>
  </span>
  ```
</figure>

### Tooltip as a description

When using tooltips to provide additional information, ensure that the element also includes a visually hidden, accessible label. Assistive technologies will read the following as "Edit. View and manage this profile."

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <span class="has-ods-tooltip">
      <button class="ods-button" aria-describedby="edit-description">
        &#9998;
        <span class="u-visually-hidden">Edit</span>
      </button>
      <aside id="edit-description" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
        View and manage this profile.
      </aside>
    </span>
  </div>

  ```html
  <span class="has-ods-tooltip">
    <button class="ods-button" aria-describedby="edit-description">
      <svg>...</svg>
      <span class="u-visually-hidden">
        Edit
      </span>
    </button>
    <aside id="edit-description" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
      View and manage this profile.
    </aside>
  </span>
  ```
</figure>
