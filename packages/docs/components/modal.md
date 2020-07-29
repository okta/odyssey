# Modal

## General guidelines

Modal dialogs are a powerful UI element. They are inserted above the main content and change the context to a special mode that requires user interaction. That is, they disable all other contexts until the user interacts with the modal itself.

With this in mind, modals are a great tool for specific use cases:

<ul>
  <li>
    Important warnings - e.g. an irreversible, destructive action or error
  </li>
  <li>
    Gathering immediate information requisite to continuing the current flow - e.g. "Please enter your password again for security purposes."
  </li>
  <li>
    Confirming or pivoting a course of action when it would lessen the user's required effort - e.g. "These documents will be required - are you sure you want to continue?"
  </li>
  <li>
    Blocking user interaction - e.g. "Please agree to these terms before continuing."
  </li>
</ul>

Here are a few smells for when a modal dialog may be inappropriate:

<ul>
  <li>
    Immediate action is not required
  </li>
  <li>
    The dialog would interrupt a workflow
  </li>
  <li>
    Additional context may be required or helpful
  </li>
  <li>
    The dialog content is long-form
  </li>
</ul>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <button class="ods-button" data-micromodal-trigger="ods-modal-standard">Let me see it already!</button>
  </div>

  ```html
  <div class="ods-modal" id="ods-modal-standard" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title">
        <header class="ods-modal--header">
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
          <h1 class="ods-modal--title" id="ods-modal-standard-title">
            This is a Modal
          </h1>
        </header>
        <main class="ods-modal--content" id="ods-modal-standard-content">
          <p>
            Try hitting the <kbd>tab</kbd> key and notice how the focus stays within the modal itself. Also, <kbd>esc</kbd> to close modal.
          </p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-clear" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button">Continue</button>
        </footer>
      </div>
    </div>
  </div>
  ```
</figure>

## Accessibility

Modal dialogs are notorious for their accessibility issues, but don't worry! We've got your back.

### Accessible attributes

The modal components makes use of several ARIA attributes in order to give assistive technologies (AT) as much information as possible.

<ul>
  <li>
    <code>aria-hidden</code> - This indicates whether or not the modal is visible and should be automatically set to <code>true</code> or <code>false</code> by our companion Javascript.
  </li>
  <li>
    <code>role="dialog"</code> - Until the <code>role</code> element is widely supported, this attribute indicates the semantic status of the modal to the browser. Please use <code>"alertdialog"</code> instead if your modal represents a dangerous action or error.
  </li>
  <li>
    <code>aria-modal="true"</code> - This indicates that the rest of the workflow is stopped while this element is present.
  </li>
  <li>
    <code>aria-labelledby="ods-modal--title-id"</code> - This attribute informs ATs which other element can be treated as the label for this dialog. Please use the unique <code>id</code> associated with the dialog's title.
  </li>
  <li>
    <code>aria-label="Close"</code> - Please use this tag on any <code>button</code> that allows the user to exit the dialog. By default, this is included on the modal's exit "X".
  </li>
</ul>

### Accessible behavior

When a modal dialog is opened, interaction is limited to the new context. While this may seem expected, it can surprise users - and is even worse for users requiring assistive technologies.

For convenience, users can exit the modal in a few ways:

<ul>
  <li>
    Clicking on the overlay
  </li>
  <li>
    Hitting <kbd>ESC</kbd>
  </li>
  <li>
    Clicking or navigating to any element tagged with <code>data-micromodal-close</code>
  </li>
</ul>

For users happy with their new context, we ensure their attention won't be misdirected. Scrolling on the main content becomes locked, and we inform the browser to lock the `tabindex` to the modal context. This way, regardless of input method, a user's interactions are limited to their new scope.

## Further reading

<ul>
  <li>
    <a href="https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/">How To Make Modal Windows Better For Everyone</a> - <cite>Scott O’Hara (2014)</cite>
  </li>
  <li>
    <a href="https://www.scottohara.me/blog/2016/09/07/revised-modal-window.html">Making Modal Windows Better For Everyone, again...</a> - <cite>Scott O'Hara (2016)</cite>
  </li>
  <li>
    <a href="https://www.nngroup.com/articles/modal-nonmodal-dialog/">Modal & Nonmodal Dialogs: When (& When Not) to Use Them</a> - <cite>Therese Fessenden, Nielsen Norman Group (2017)</cite>
  </li>
  <li>
    <a href="https://micromodal.now.sh/">Micromodal.js</a> - JS Documentation
  </li>
</ul>


<!-- The following are the modals shown to the user on the site -->
<div class="ods-modal" id="ods-modal-standard" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-standard-title">
        <header class="ods-modal--header">
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
          <h1 class="ods-modal--title" id="ods-modal-standard-title">
            This is a Modal
          </h1>
        </header>
        <main class="ods-modal--content" id="ods-modal-standard-content">
          <p>
            Try hitting the <kbd>tab</kbd> key and notice how the focus stays within the modal itself. Also, <kbd>esc</kbd> to close modal.
          </p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-clear" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button">Continue</button>
        </footer>
      </div>
    </div>
  </div>
  <div class="ods-modal is-ods-modal-danger  micromodal-slide" id="ods-modal-danger" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="alertdialog" aria-modal="true" aria-labelledby="ods-modal-danger-title">
        <header class="ods-modal--header">
          <h1 class="ods-modal--title" id="ods-modal-danger-title">
            Are you sure you want to delete everything?
          </h1>
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
        </header>
        <main class="ods-modal--content" id="ods-modal-danger-content">
          <p>
            Hold on there, pardner! You're about to delete all of your files. This is an irreversible action that will certainly leave your machine inoperable.
          </p>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-secondary is-ods-button-danger" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button is-ods-button-danger">Delete Everything</button>
        </footer>
      </div>
    </div>
  </div>
  <div class="ods-modal micromodal-slide" id="ods-modal-form" aria-hidden="true">
    <div class="ods-modal--overlay" tabindex="-1" data-micromodal-close>
      <div class="ods-modal--dialog" role="dialog" aria-modal="true" aria-labelledby="ods-modal-form-title">
        <header class="ods-modal--header">
          <h1 class="ods-modal--title" id="ods-modal-form-title">
            Add Identity Provider
          </h1>
          <button class="ods-modal--close" aria-label="Close modal" data-micromodal-close></button>
        </header>
        <main class="ods-modal--content" id="ods-modal-form-content">
          <form class="ods-form" action=".">
            <header class="ods-form--header">
              <h1 class="ods-form--title">Add Identity Provider</h1>
            </header>
            <fieldset class="ods-fieldset">
              <legend class="ods-group-legend">General Settings</legend>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="text" name="idp-name" id="idp-name" autocomplete="off" spellcheck="false" required>
                  <label class="ods-label" for="idp-name">Name</label>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="text" name="idp-protocol" id="idp-protocol" value="SAML" autocomplete="off" spellcheck="false" required readonly>
                  <label class="ods-label" for="idp-protocol">Protocol</label>
                </div>
              </fieldset>
            </fieldset>
            <fieldset class="ods-fieldset">
              <legend class="ods-group-legend">Authentication Settings</legend>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <select class="ods-select-input" name="idp-username" id="idp-username" aria-describedby="idp-username-hint" autocomplete="off" spellcheck="false" required>
                    <option value="un">a username</option>
                  </select>
                  <label class="ods-label" for="idp-username">IdP Username</label>
                  <aside class="ods-field--hint" id="idp-username-hint">
                    Specifies how to construct the subject's username from the SAML assertion using an Okta Expression Language transform of attributes defined in the IdP User Profile.<br>
                    <a href="#">Expression Language Reference</a>
                  </aside>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <input class="checkbox" type="checkbox" name="idp-filter" id="idp-filter" aria-describedby="idp-filter=hint" value="filter-on">
                <label class="checkbox--label" for="idp-filter">Only allow usernames that match a defined RegEx pattern</label>
                <aside class="ods-field--hint" id="idp-filter-hint">
                  Optional regular expression pattern used to filter IdP username to prevent the IdP from authentication unintended or privileged users.
                </aside>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <select class="ods-select-input" name="idp-match" id="idp-match" aria-describedby="idp-match-hint" autocomplete="off" spellcheck="false" required>
                    <option value="un" selected>Okta Username</option>
                  </select>
                  <label class="ods-label" for="idp-match">Match against</label>
                  <aside class="ods-field--hint" id="idp-username-hint">
                    Specifies what attribute(s) of existing users in Okta are compared to the IdP username to determine whether the authentication response is for a new or existing user.
                  </aside>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <legend class="input-legend">If no match is found</legend>
                <input class="radio" type="radio" name="idp-no-match" id="idp-no-match-new" aria-describedby="idp-no-match-hint" value="new" required checked>
                <label class="radio--label" for="idp-no-match-new">Create new user (JIT)</label>
                <input class="radio" type="radio" name="idp-no-match" id="idp-no-match-redirect" aria-describedby="idp-no-match-hint" value="redirect" required>
                <label class="radio--label" for="idp-no-match-redirect">Redirect to Okta sign-in page</label>
                <aside class="ods-field--hint" id="idp-no-match-hint">
                  Specifies the action for authentication responses that do not match an existing user in the Okta organization.
                </aside>
              </fieldset>
            </fieldset>
            <fieldset class="ods-fieldset">
              <legend class="ods-group-legend">JIT Settings</legend>
              <fieldset class="ods-fieldset">
                <legend class="input-legend">Profile Master</legend>
                <input class="checkbox" type="checkbox" name="idp-profile" id="idp-profile" aria-describedby="idp-profile-hint" value="profile-update">
                <label class="checkbox--label" for="idp-profile">Update attributes for existing users</label>
                <aside class="ods-field--hint" id="idp-profile-hint">
                  Determines if the IdP should act as a source of truth for user profile attributes. The IdP must be prioritized with other Profile Masters if the user is assigned to additional apps or directories that are also Profile Masters. See <a href="#">Profile Mastering documentation</a> for more information.
                </aside>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <select class="ods-select-input" name="idp-group" id="idp-group" aria-describedby="idp-group-hint" autocomplete="off" spellcheck="false" required>
                    <option value="none" selected>None</option>
                    <option value="b">Group B</option>
                  </select>
                  <label class="ods-label" for="idp-group">Group Assignment</label>
                  <aside class="ods-field--hint" id="idp-group-hint">
                    Specifies the behavior of group assignments during provisioning.
                  </aside>
                </div>
              </fieldset>
            </fieldset>
            <fieldset class="ods-fieldset">
              <legend class="ods-group-legend">SAML Protocol Settings</legend>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="url" name="idp-uri" id="idp-uri" aria-describedby="idp-uri-hint" autocomplete="off" spellcheck="false" required>
                  <label class="ods-label" for="idp-uri">IdP Issuer URI</label>
                  <aside class="ods-field--hint" id="idp-uri-hint">
                    This value is usually the SAML Metadata EntityID of the IdP EntityDescriptor.
                  </aside>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="url" name="idp-sign-on-url" id="idp-sign-on-url" aria-describedby="idp-sign-on-url-hint" autocomplete="off" spellcheck="false" required>
                  <label class="ods-label" for="idp-sign-on-url">IdP Single Sign-On URL</label>
                  <aside class="ods-field--hint" id="idp-sign-on-url-hint">
                    The binding-specific IdP Authentication Request Protocol endpoint that receives SAML AuthnRequest messages from Okta.
                  </aside>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="file" name="idp-cert" id="idp-cert" aria-describedby="idp-cert-hint" autocomplete="off" spellcheck="false" required>
                  <label class="ods-label" for="idp-cert">IdP Signature Certificate</label>
                  <aside class="ods-field--hint" id="idp-cert-hint">
                    The PEM or DER encoded public key certificate of the Identity Provider used to verify SAML messages and assertion signatures.
                  </aside>
                </div>
              </fieldset>
            </fieldset>
            <fieldset class="ods-fieldst">
              <legend class="ods-group-legend">All the States</legend>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <select id="select-multi" name="state[]" multiple class="ods-select-input">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                  <label class="ods-label" for="fav-dino">Favorite states</label>
                </div>
              </fieldset>
            </fieldset>
          </form>
        </main>
        <footer class="ods-modal--footer">
          <button class="ods-button is-ods-button-secondary" data-micromodal-close aria-label="Close this dialog window">Cancel</button>
          <button class="ods-button">Submit</button>
        </footer>
      </div>
    </div>
  </div>
