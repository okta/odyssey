# Callout

Callouts are an inline messaging component that communicate in a non-blocking way. Use callouts to provide additional context that can't be provided by the relevant component.

If you can, rely on the related component to communicate its messaging before you use a callout. If messaging pertains to more than one component or a component can't communicate its own messaging, use a callout.

## Usage & Variants

Unlike most components, there is no "default" variant for Callouts. You can select from Warning, Error, Help, and Pending variants.

### Warning

This variant is useful when the user's current course of action may be problematic.

Because this variant may be inserted during an async process, be sure to use `aria-live="polite"` to indicate a less aggressive alert level for warnings.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside class="ods-callout is-ods-callout-warning" aria-live="polite">
      <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <path class="icon--fill" fill="#2F3F4A" d="M97.186 73.579L60.63 11.364C58.23 7.414 54.083 5 49.5 5c-4.583 0-8.73 2.414-11.13 6.364L1.814 73.58c-2.4 3.95-2.4 8.887-.109 12.838C4.105 90.585 8.252 93 12.835 93h73.33c4.582 0 8.838-2.414 11.13-6.584 2.291-3.95 2.291-8.887-.11-12.837z"/>
        <path fill="#fff" d="M49 28c-1.645 0-3 1.566-3 3.466v28.067C46 61.434 47.355 63 49 63s3-1.566 3-3.467V31.466c0-1.9-1.355-3.466-3-3.466z"/>
        <ellipse cx="49" cy="73" fill="#fff" rx="4" ry="3"/>
      </svg>
      <div class="ods-callout--content">
        <p>
          The default email template is automatically provided in all Okta-supported languages. If you edit the template, Okta will not send the default email to end users, and you will need to add templates in multiple languages manually.
        </p>
      </div>
    </aside>
  </div>

  ```html
  <aside class="ods-callout is-ods-callout-warning" aria-live="polite">
    <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path class="icon--fill" fill="#2F3F4A" d="M97.186 73.579L60.63 11.364C58.23 7.414 54.083 5 49.5 5c-4.583 0-8.73 2.414-11.13 6.364L1.814 73.58c-2.4 3.95-2.4 8.887-.109 12.838C4.105 90.585 8.252 93 12.835 93h73.33c4.582 0 8.838-2.414 11.13-6.584 2.291-3.95 2.291-8.887-.11-12.837z"/>
      <path fill="#fff" d="M49 28c-1.645 0-3 1.566-3 3.466v28.067C46 61.434 47.355 63 49 63s3-1.566 3-3.467V31.466c0-1.9-1.355-3.466-3-3.466z"/>
      <ellipse cx="49" cy="73" fill="#fff" rx="4" ry="3"/>
    </svg>
    <div class="ods-callout--content">
      <p>
        The default email template is automatically provided in all Okta-supported languages. If you edit the template, Okta will not send the default email to end users, and you will need to add templates in multiple languages manually.
      </p>
    </div>
  </aside>
  ```
</figure>

### Error

This variant can be used to alert the user that an error has occurred.

In order to indicate the severity of this Callout to assistive technology, please utilize the `role="alert"` attribute.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside class="ods-callout is-ods-callout-error" role="alert">
      <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <path class="icon--fill" fill="#2F3F4A" d="M99.267 28.233l-27.5-27.5A2.475 2.475 0 0 0 70 0H30c-.667 0-1.3.261-1.767.733l-27.5 27.5A2.484 2.484 0 0 0 0 30v40c0 .661.261 1.3.733 1.767l27.5 27.5c.467.472 1.1.733 1.767.733h40c.667 0 1.3-.261 1.767-.733l27.5-27.5A2.484 2.484 0 0 0 100 70V30c0-.661-.261-1.3-.733-1.767z"/>
        <rect width="5.882" height="57.843" x="27.451" y="31.61" fill="#fff" rx="2.941" transform="rotate(-45 27.451 31.61)"/>
        <rect width="5.882" height="57.843" x="31.61" y="72.512" fill="#fff" rx="2.941" transform="rotate(-135 31.61 72.512)"/>
      </svg>
      <div class="ods-callout--content">
        <p>
          Please review the form to correct the following errors:
        </p>
        <ul>
          <li>Current Password is incorrect.</li>
        </ul>
      </div>
    </aside>
  </div>

  ```html
  <aside class="ods-callout is-ods-callout-error" role="alert">
    <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path class="icon--fill" fill="#2F3F4A" d="M99.267 28.233l-27.5-27.5A2.475 2.475 0 0 0 70 0H30c-.667 0-1.3.261-1.767.733l-27.5 27.5A2.484 2.484 0 0 0 0 30v40c0 .661.261 1.3.733 1.767l27.5 27.5c.467.472 1.1.733 1.767.733h40c.667 0 1.3-.261 1.767-.733l27.5-27.5A2.484 2.484 0 0 0 100 70V30c0-.661-.261-1.3-.733-1.767z"/>
      <rect width="5.882" height="57.843" x="27.451" y="31.61" fill="#fff" rx="2.941" transform="rotate(-45 27.451 31.61)"/>
      <rect width="5.882" height="57.843" x="31.61" y="72.512" fill="#fff" rx="2.941" transform="rotate(-135 31.61 72.512)"/>
    </svg>
    <div class="ods-callout--content">
      <p>
        Please review the form to correct the following errors:
      </p>
      <ul>
        <li>Current Password is incorrect.</li>
      </ul>
    </div>
  </aside>
  ```
</figure>

### Help

A Help callout should be one that guides the user toward external, additional information that assists them. Since these callouts are directly actionable, they should contain a clear interactive element.

If the Help callout refers the user to external documentation, please use a link. If the content is in-page, a button is appropriate.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside class="ods-callout is-ods-callout-help">
      <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <circle class="icon--fill" cx="50" cy="50" r="50" fill="#2F3F4A"/>
        <path fill="#fff" d="M49.278 65.192c-.67 0-1.313-.243-1.788-.676a2.21 2.21 0 0 1-.74-1.632V52.207c0-.257.055-.51.163-.747.107-.237.265-.452.463-.633.199-.181.435-.325.694-.423.26-.098.538-.149.818-.149 2.853.034 5.614-.915 7.733-2.66 2.118-1.743 3.437-4.153 3.693-6.746.193-2.57-.698-5.112-2.491-7.102-1.794-1.99-4.353-3.28-7.154-3.604-2.8-.324-5.631.341-7.912 1.86-2.28 1.52-3.839 3.777-4.355 6.31-.111.522-.42.992-.87 1.33-.45.336-1.016.52-1.6.516-.37 0-.737-.074-1.073-.217a2.52 2.52 0 0 1-.872-.612 2.247 2.247 0 0 1-.506-.891 2.116 2.116 0 0 1-.044-1.003c.547-2.648 1.88-5.109 3.854-7.113 1.974-2.004 4.513-3.474 7.34-4.251a17.604 17.604 0 0 1 8.691-.154c2.858.677 5.458 2.056 7.516 3.989 2.057 1.933 3.494 4.344 4.152 6.97a13.487 13.487 0 0 1-.417 7.926c-.932 2.557-2.615 4.832-4.867 6.575-2.25 1.744-4.984 2.89-7.9 3.312v8.194a2.21 2.21 0 0 1-.74 1.632 2.657 2.657 0 0 1-1.788.676z"/>
        <circle cx="49" cy="74.394" r="4" fill="#fff" transform="rotate(-180 49 74.394)"/>
      </svg>
      <div class="ods-callout--content">
        <h1 class="ods-callout--title">
          Learn about Universal Directory
        </h1>
        <p>
          Universal Directory allows you to store employee, partner, and customer profiles in Okta, generating a user-based, single source of truth. Using Profile Editor, you can extend and customize user and app-specific profiles, as well as transform and map attributes between profiles. All of these features provide robust provisioning support.
        </p>
        <a href="#">View Documentation</a>
      </div>
    </aside>
  </div>

  ```html
  <aside class="ods-callout is-ods-callout-help">
    <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <circle class="icon--fill" cx="50" cy="50" r="50" fill="#2F3F4A"/>
      <path fill="#fff" d="M49.278 65.192c-.67 0-1.313-.243-1.788-.676a2.21 2.21 0 0 1-.74-1.632V52.207c0-.257.055-.51.163-.747.107-.237.265-.452.463-.633.199-.181.435-.325.694-.423.26-.098.538-.149.818-.149 2.853.034 5.614-.915 7.733-2.66 2.118-1.743 3.437-4.153 3.693-6.746.193-2.57-.698-5.112-2.491-7.102-1.794-1.99-4.353-3.28-7.154-3.604-2.8-.324-5.631.341-7.912 1.86-2.28 1.52-3.839 3.777-4.355 6.31-.111.522-.42.992-.87 1.33-.45.336-1.016.52-1.6.516-.37 0-.737-.074-1.073-.217a2.52 2.52 0 0 1-.872-.612 2.247 2.247 0 0 1-.506-.891 2.116 2.116 0 0 1-.044-1.003c.547-2.648 1.88-5.109 3.854-7.113 1.974-2.004 4.513-3.474 7.34-4.251a17.604 17.604 0 0 1 8.691-.154c2.858.677 5.458 2.056 7.516 3.989 2.057 1.933 3.494 4.344 4.152 6.97a13.487 13.487 0 0 1-.417 7.926c-.932 2.557-2.615 4.832-4.867 6.575-2.25 1.744-4.984 2.89-7.9 3.312v8.194a2.21 2.21 0 0 1-.74 1.632 2.657 2.657 0 0 1-1.788.676z"/>
      <circle cx="49" cy="74.394" r="4" fill="#fff" transform="rotate(-180 49 74.394)"/>
    </svg>
    <div class="ods-callout--content">
      <h1 class="ods-callout--title">
        Learn about Universal Directory
      </h1>
      <p>
        Universal Directory allows you to store employee, partner, and customer profiles in Okta, generating a user-based, single source of truth. Using Profile Editor, you can extend and customize user and app-specific profiles, as well as transform and map attributes between profiles. All of these features provide robust provisioning support.
      </p>
      <a href="#">View Documentation</a>
    </div>
  </aside>
  ```
</figure>

### Pending

This variant is useful for indicating that a process, UI component, or system is in a transient state.

As with Warning, be sure to use `aria-live="polite"` to indicate a less aggressive alert level for pending states.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <aside class="ods-callout is-ods-callout-pending" aria-live="polite">
      <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
        <circle class="icon--fill" cx="50" cy="50" r="50" fill="#2F3F4A"/>
        <path fill="#fff" d="M51.862 25.892a2.603 2.603 0 0 1 4.44 1.84v26.793a2.603 2.603 0 0 1-2.557 2.603c-.226.054-.459.082-.692.082H28a3.008 3.008 0 0 1-3-3 3.009 3.009 0 0 1 3.004-3H51.1V27.733c0-.69.274-1.352.762-1.84z"/>
      </svg>
      <div class="ods-callout--content">
        <h1 class="ods-callout--title">
          Data cleanup in progress
        </h1>
        <p>
          Okta is preparing your schema to add 4 attributes.
        </p>
        <p>
          Estimated time remaining: <time>02:23:19</time>
        </p>
      </div>
    </aside>
  </div>

  ```html
  <aside class="ods-callout is-ods-callout-pending" aria-live="polite">
    <svg class="ods-callout--icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <circle class="icon--fill" cx="50" cy="50" r="50" fill="#2F3F4A"/>
      <path fill="#fff" d="M51.862 25.892a2.603 2.603 0 0 1 4.44 1.84v26.793a2.603 2.603 0 0 1-2.557 2.603c-.226.054-.459.082-.692.082H28a3.008 3.008 0 0 1-3-3 3.009 3.009 0 0 1 3.004-3H51.1V27.733c0-.69.274-1.352.762-1.84z"/>
    </svg>
    <div class="ods-callout--content">
      <h1 class="ods-callout--title">
        Data cleanup in progress
      </h1>
      <p>
        Okta is preparing your schema to add 4 attributes.
      </p>
      <p>
        Estimated time remaining: <time>02:23:19</time>
      </p>
    </div>
  </aside>
  ```
</figure>

## Accessibility

The color and iconography used for each variant of Callout should be treated as additional messaging affordances. Regardless of its type, the content of your callout should clearly and concisely communicate its information to the user.

For stronger context setting in more complicated Callouts, adding a `.callout--title` may be helpful.

### ARIA Live & Alert Roles

As noted above, `role="alert"` prompts a user of assistive technology to take immediate action regarding a change in the UI. Reserve the use of this attribute to errors or urgent, time-sensitive warnings.

Ex: "You will be logged out if you do not take any action in the next 10 minutes."

As a guideline, reserve `role="alert"` for Errors and `aria-live="polite"` for async Warnings and Pending Callouts.
