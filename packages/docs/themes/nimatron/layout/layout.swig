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
