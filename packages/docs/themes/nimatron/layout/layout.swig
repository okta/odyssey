<!doctype html>
<html lang="{{ page.lang }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">

  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ config.title }}</title>
  <meta name="description" content="">

  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link id="nimsheet" rel="stylesheet" href="/css/nimatron.css">
</head>
<body>
  <div class="nimatron">
    <header class="nimatron--header">
      <h1 class="nimatron--header-title">
        <a href="{{ config.root }}">
          Nim, the Okta Design System
          <svg class="nimatron--header-logo" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 400 134.7" aria-labelledby="okta-logo--header">
            <title id="okta-logo--header">the okta logo</title>
            <path d="M50.3 33.8C22.5 33.8 0 56.3 0 84.1s22.5 50.3 50.3 50.3 50.3-22.5 50.3-50.3-22.5-50.3-50.3-50.3zm0 75.5c-13.9 0-25.2-11.3-25.2-25.2s11.3-25.2 25.2-25.2 25.2 11.3 25.2 25.2-11.3 25.2-25.2 25.2zM138.7 101c0-4 4.8-5.9 7.6-3.1 12.6 12.8 33.4 34.8 33.5 34.9.3.3.6.8 1.8 1.2.5.2 1.3.2 2.2.2h22.7c4.1 0 5.3-4.7 3.4-7.1l-37.6-38.5-2-2c-4.3-5.1-3.8-7.1 1.1-12.3L201.2 41c1.9-2.4.7-7-3.5-7h-20.6c-.8 0-1.4 0-2 .2-1.2.4-1.7.8-2 1.2-.1.1-16.6 17.9-26.8 28.8-2.8 3-7.8 1-7.8-3.1V4c0-2.9-2.4-4-4.3-4h-16.8c-2.9 0-4.3 1.9-4.3 3.6v126.6c0 2.9 2.4 3.7 4.4 3.7h16.8c2.6 0 4.3-1.9 4.3-3.8V101zM275.9 129.6l-1.8-16.8c-.2-2.3-2.4-3.9-4.7-3.5-1.3.2-2.6.3-3.9.3-13.4 0-24.3-10.5-25.1-23.8v-22c0-2.7 2-4.9 4.7-4.9h22.5c1.6 0 4-1.4 4-4.3V38.7c0-3.1-2-4.7-3.8-4.7h-22.7c-2.6 0-4.7-1.9-4.8-4.5V4c0-1.6-1.2-4-4.3-4h-16.7c-2.1 0-4.1 1.3-4.1 3.9v81.9c.7 27.2 23 48.9 50.3 48.9 2.3 0 4.5-.2 6.7-.5 2.4-.3 4-2.3 3.7-4.6z" class="st0"/>
            <g>
              <path d="M397.1 108.5c-14.2 0-16.4-5.1-16.4-24.2V38.2c0-1.6-1.2-4.3-4.4-4.3h-16.8c-2.1 0-4.4 1.7-4.4 4.3v2.1c-7.3-4.2-15.8-6.6-24.8-6.6-27.8 0-50.3 22.5-50.3 50.3 0 27.8 22.5 50.3 50.3 50.3 12.5 0 23.9-4.6 32.7-12.1 4.7 7.2 12.3 12 24.2 12.1 2 0 12.8.4 12.8-4.7v-17.9c0-1.5-1.2-3.2-2.9-3.2zm-66.7.8c-13.9 0-25.2-11.3-25.2-25.2 0-13.9 11.3-25.2 25.2-25.2 13.9 0 25.2 11.3 25.2 25.2-.1 13.9-11.4 25.2-25.2 25.2z" class="st0"/>
            </g>
          </svg>
        </a>
      </h1>
      <nav class="nimatron--nav">
        {% for heading, list in site.data.nav %}
          <section class="nimatron--nav-section">
            <h1 class="nimatron--nav-heading">{{ heading }}</h1>
            <ul class="nimatron--nav-list">
              {% for name, link in list %}
                <li class="nimatron--nav-item">
                  <a href="{{ link }}">{{ name }}</a>
                </li>
              {% endfor %}
            </ul>
          </section>
        {% endfor %}
      </nav>
    </header>
    <main class="nimatron--main">
      <article class="nimatron--article">
        {{ body }}
      </article>
      <nav class="nimatron--toc">
        <section class="nimatron--toc-fixed">
          <h1 class="nimatron--toc-title">Contents</h1>
          {{ tocf(page.content, {list_number: false, class: 'nimatron--toc-list'}) }}
        </section>
        <div class="nimatron--toc-space-holder" aria-hidden>
          {{ tocf(page.content, {list_number: false, class: 'nimatron--toc-list'}) }}
        </div>
      </nav>
    </main>
  </div>
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
                  <input class="ods-text-input" type="text" name="idp-name" id="idp-name"  autocomplete="off" spellcheck="false" required>
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
                  <select class="ods-select-input" name="idp-username" id="idp-username" aria-describedby="idp-username-hint"  autocomplete="off" spellcheck="false" required>
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
                  <select class="ods-select-input" name="idp-match" id="idp-match" aria-describedby="idp-match-hint"  autocomplete="off" spellcheck="false" required>
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
                  <select class="ods-select-input" name="idp-group" id="idp-group" aria-describedby="idp-group-hint"  autocomplete="off" spellcheck="false" required>
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
                  <input class="ods-text-input" type="url" name="idp-uri" id="idp-uri" aria-describedby="idp-uri-hint"  autocomplete="off" spellcheck="false" required>
                  <label class="ods-label" for="idp-uri">IdP Issuer URI</label>
                  <aside class="ods-field--hint" id="idp-uri-hint">
                    This value is usually the SAML Metadata EntityID of the IdP EntityDescriptor.
                  </aside>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="url" name="idp-sign-on-url" id="idp-sign-on-url" aria-describedby="idp-sign-on-url-hint"  autocomplete="off" spellcheck="false" required>
                  <label class="ods-label" for="idp-sign-on-url">IdP Single Sign-On URL</label>
                  <aside class="ods-field--hint" id="idp-sign-on-url-hint">
                    The binding-specific IdP Authentication Request Protocol endpoint that receives SAML AuthnRequest messages from Okta.
                  </aside>
                </div>
              </fieldset>
              <fieldset class="ods-fieldset">
                <div class="ods-fieldset-flex">
                  <input class="ods-text-input" type="file" name="idp-cert" id="idp-cert" aria-describedby="idp-cert-hint"  autocomplete="off" spellcheck="false" required>
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
  {{ js('js/nim.js') }}
  {{ js('js/vendor/prism.js') }}
  {{ js('js/vendor/prism-scss.js') }}
  {{ js('js/vendor/micromodal.min.js') }}
  <script>
    MicroModal.init({
      awaitCloseAnimation: true,
      disableScroll: true,
      disableFocus: true
    });
  </script>
  {{ js('js/vendor/choices.min.js') }}
  <script>
    var selectExamples = document.querySelectorAll('[data-js-choices]');
    for (i = 0; i < selectExamples.length; ++i) {
      var element = selectExamples[i];
      new Choices(element, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
        classNames: {
          containerOuter: 'ods-select',
          containerInner: 'ods-select--inner',
          input: 'ods-select--input',
          inputCloned: 'ods-select--input--cloned',
          list: 'ods-select--list',
          listItems: 'ods-select--list--multiple',
          listSingle: 'ods-select--list--single',
          listDropdown: 'ods-select--list--dropdown',
          item: 'ods-select--item',
          itemSelectable: 'ods-select--item--selectable',
          itemDisabled: 'ods-select--item--disabled',
          itemChoice: 'ods-select--item--choice',
          placeholder: 'ods-select--placeholder',
          group: 'ods-select--group',
          groupHeading: 'ods-select--heading',
          button: 'ods-select--button',
          activeState: 'is-ods-select-active',
          focusState: 'is-ods-select-focused',
          openState: 'is-ods-select-open',
          disabledState: 'is-ods-select-disabled',
          highlightedState: 'is-ods-select-highlighted',
          selectedState: 'is-ods-select-selected',
          flippedState: 'is-ods-select-flipped',
          loadingState: 'is-ods-select-loading',
          noResults: 'has-no-ods-select-results',
          noChoices: 'has-no-ods-select-choices'
        },
      });
    }
  </script>
  </body>
</html>
