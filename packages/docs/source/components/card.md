# Card

Cards are used to group media, copy, and actions together when representing an object in a set.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <article class="ods-card is-ods-card-action">
      <header class="ods-card--header">
        <figure class="ods-card--header-icon">
          <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
            <title id="svg-title">The Okta logo</title>
            <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
        </figure>
        <section class="ods-card--header-main">
          <h1 class="ods-card--title">
            Okta
          </h1>
          <section class="ods-card--meta">
            Updated 5 days ago
          </section>
        </section>
      </header>
      <section class="ods-card--main">
        <p>
          "I do not wish to make a mystery," said he, laughing. "The matter was perfectly simple. You, of course, saw that everyone in the street was an accomplice. They were all engaged for the evening."
        </p>
      </section>
      <footer class="ods-card--footer">
        <section class="ods-card--actions">
          <button class="ods-button is-ods-button-danger is-ods-button-secondary">
            Hide
          </button>
          <button class="ods-button">
            Enable
          </button>
        </section>
      </footer>
    </article>
  </div>

  ```html
  <article class="ods-card is-ods-card-action">
    <header class="ods-card--header">
      <figure class="ods-card--header-icon">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
          <title id="svg-title">The Okta logo</title>
          <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
      </figure>
      <section class="ods-card--header-main">
        <h1 class="ods-card--title">
          The Big Dog
        </h1>
        <section class="ods-card--meta">
          Label / Time / Something
        </section>
      </section>
      <svg class="ods-card--kebab" width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="#737D85"/><circle cx="2" cy="10" r="2" fill="#737D85"/><circle cx="2" cy="18" r="2" fill="#737D85"/></svg>
    </header>
    <section class="ods-card--main">
      <p>
        "I do not wish to make a mystery," said he, laughing. "The matter was perfectly simple. You, of course, saw that everyone in the street was an accomplice. They were all engaged for the evening."
      </p>
    </section>
    <footer class="ods-card--footer">
      <section class="ods-card--actions">
        <button class="ods-button is-ods-button-danger is-ods-button-secondary">
          Hide
        </button>
        <button class="ods-button">
          Enable
        </button>
      </section>
    </footer>
  </article>
  ```
</figure>

## Anatomy

Cards can be used for a wide range of purposes and content types, so we've design them to be modular. Cards are composed of up to 4 distinct sections. In top-to-bottom stacked order, these sections are:

<ul>
  <li>
    Featured Media
  </li>
  <li>
    Header
  </li>
  <li>
    Main
  </li>
  <li>
    Footer
  </li>
</ul>

A card may be assembled from no fewer than 2 of these sections.

### Featured media

The featured media section can be used to showcase full bleed images or video. If your card employs a data visualization, consider including it in the main content area instead. It will benefit from context provided by the header or surrounding prose.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <article class="ods-card is-ods-card-action">
      <figure class="ods-card--media">
        <img class="ods-card--media-image" src="http://placekitten.com/335/190">
      </figure>
      <header class="ods-card--header">
        <section class="ods-card--header-main">
          <h1 class="ods-card--title">
            Featured Media
          </h1>
        </section>
      </header>
      <section class="ods-card--main">
        <p>
          The Featured Media content area above contains a randomly selected photo of a kitten.
        </p>
      </section>
    </article>
  </div>

  ```html
  <article class="ods-card is-ods-card-action">
    <figure class="ods-card--media">
      <img class="ods-card--media-image" src="http://placekitten.com/300/128">
    </figure>
    <header class="ods-card--header">
      <figure class="ods-card--header-icon">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
          <title id="svg-title">The Okta logo</title>
          <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
      </figure>
      <section class="ods-card--header-main">
        <h1 class="ods-card--title">
          The Big Dog
        </h1>
        <section class="ods-card--meta">
          Label / Time / Something
        </section>
      </section>
    </header>
  </article>
  ```
</figure>

### Header

The card header, like that of an article, provides context for the card. Headers can be made of up an icon, a title, or supporting metadata such as labels, subheadings, or timestamps.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <article class="ods-card is-ods-card-action">
      <header class="ods-card--header">
        <figure class="ods-card--header-icon">
          <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
            <title id="svg-title">The Okta logo</title>
            <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
        </figure>
        <section class="ods-card--header-main">
          <h1 class="ods-card--title">
            A Helpful Heading
          </h1>
          <section class="ods-card--meta">
            Last updated 11 February 2019
          </section>
        </section>
      </header>
      <section class="ods-card--main">
        <p>
          The content area above me, the Header, contains an icon, title, and some supporting meta data. I'm the freeform Main content area.
        </p>
      </section>
    </article>
  </div>

  ```html
  <article class="ods-card is-ods-card-action">
    <header class="ods-card--header">
      <figure class="ods-card--header-icon">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
          <title id="svg-title">The Okta logo</title>
          <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
      </figure>
      <section class="ods-card--header-main">
        <h1 class="ods-card--title">
          A Helpful Heading
        </h1>
        <section class="ods-card--meta">
          Last updated 11 February 2019
        </section>
      </section>
    </header>
    <section class="ods-card--main">
      <p>
        The content area above me, the Header, contains an identifying icon, title, and some supporting meta data. I'm the freeform Main content area.
      </p>
    </section>
  </article>
  ```
</figure>

### Main

The main content area provides a freeform space for card content. When employing prose, keep it short and strong - less than two paragraphs.

Media - photos, images, or data visualizations - inserted into this content area will share the same padding as the card itself. Do not employ the featured media section if you plan to include media here.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <article class="ods-card is-ods-card-action">
      <header class="ods-card--header">
        <section class="ods-card--header-main">
          <h1 class="ods-card--title">
            The Main Content Is Below
          </h1>
        </section>
      </header>
      <section class="ods-card--main">
        <p>
          This is a freeform content area. You can employ <strong>rich formatting</strong> of <em>various kinds</em>. You may include <a href="#">links</a>, but aim to keep your interaction points limited.
        </p>
      </section>
    </article>
  </div>

  ```html
  <article class="ods-card is-ods-card-action">
    <header class="ods-card--header">
      <section class="ods-card--header-main">
        <h1 class="ods-card--title">
          The Main Content Is Below
        </h1>
      </section>
    </header>
    <section class="ods-card--main">
      <p>
        This is a freeform content area. You can employ <strong>rich formatting</strong> of <em>various kinds</em>. You may wish to include <a href="#">a link</a>, but try to keep your interaction points limited.
      </p>
    </section>
  </article>
  ```
</figure>

### Footer

The contains the primary and (if needed) secondary actions for the card. If the action submits data or happens in-page, use a button. If the card's action will take the user to another location, use a link.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <article class="ods-card is-ods-card-action">
      <section class="ods-card--main">
        <p>
          This card includes a main content area in order to give context to the actions below. If you click "Activate", the Okturian Candidate Program will begin.
        </p>
      </section>
      <footer class="ods-card--footer">
        <section class="ods-card--actions">
          <button class="ods-button is-ods-button-danger is-ods-button-secondary">
            Reset
          </button>
          <button class="ods-button">
            Activate
          </button>
        </section>
      </footer>
    </article>
  </div>

  ```html
    <article class="ods-card is-ods-card-action">
      <section class="ods-card--main">
        <p>
          This card includes a main content area in order to give context to the actions below. If you click "Activate", the Okturian Candidate Program will begin.
        </p>
      </section>
      <footer class="ods-card--footer">
        <section class="ods-card--actions">
          <button class="ods-button is-ods-button-danger is-ods-button-secondary">
            Reset
          </button>
          <button class="ods-button">
            Activate
          </button>
        </section>
      </footer>
    </article>
  ```
</figure>

## States

While cards do not have semantic states by default, your use case may require them. For example, to indicate that an app is misconfigured or a product is on sale.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <article class="ods-card is-ods-card-error" aria-describedby="card-error">
      <section class="ods-card--state" id="card-error">
        Configuration Error
      </section>
      <header class="ods-card--header">
        <figure class="ods-card--header-icon">
          <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
            <title id="svg-title">The Okta logo</title>
            <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
        </figure>
        <section class="ods-card--header-main">
          <h1 class="ods-card--title">
            Atko CRM
          </h1>
          <section class="ods-card--meta">
            Added to catalog: 19 January 2018
          </section>
        </section>
      </header>
      <footer class="ods-card--footer">
        <section class="ods-card--actions">
          <button class="ods-button is-ods-button-danger is-ods-button-secondary">
            Disable
          </button>
          <button class="ods-button">
            Reconfigure
          </button>
        </section>
      </footer>
    </article>
  </div>

  ```html
  <article class="ods-card is-ods-card-error" aria-describedby="card-error">
    <section class="ods-card--state" id="card-error">
      Configuration Error
    </section>
    <header class="ods-card--header">
      <figure class="ods-card--header-icon">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
          <title id="svg-title">The Okta logo</title>
          <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
      </figure>
      <section class="ods-card--header-main">
        <h1 class="ods-card--title">
          Atko CRM
        </h1>
        <section class="ods-card--meta">
          Added to catalog: 19 January 2018
        </section>
      </section>
    </header>
    <footer class="ods-card--footer">
      <section class="ods-card--actions">
        <button class="ods-button is-ods-button-danger is-ods-button-secondary">
          Disable
        </button>
        <button class="ods-button">
          Reconfigure
        </button>
      </section>
    </footer>
  </article>
  ```
</figure>

### State accessibility

When indicating a card's state, remember that color is not an effective affordance for all users. Be sure to use a label that clearly communicates the state. You should also utilize the `aria-describedby` to inform assistive technologies of the relationship between `.card` and `.card--state`.

## Variants

### Clickable Cards

In addition to the examples above, cards may also be "clickable". Clickable cards are intended to represent a single action and are themselves an interaction point.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <a href="#" class="ods-card is-ods-card-action is-ods-card-clickable">
      <header class="ods-card--header">
        <figure class="ods-card--header-icon">
          <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
            <title id="svg-title">The Okta logo</title>
            <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
        </figure>
        <section class="ods-card--header-main">
          <h1 class="ods-card--title">
            The Latest News Story
          </h1>
          <section class="ods-card--meta">
            Label / Time / Something
          </section>
        </section>
      </header>
      <section class="ods-card--main">
        <p>
          "I do not wish to make a mystery," said he, laughing. "The matter was perfectly simple. You, of course, saw that everyone in the street was an accomplice. They were all engaged for the evening."
        </p>
      </section>
      <footer class="ods-card--footer">
        <section class="ods-card--actions">
          <span class="ods-card--link">Read this story</span>
        </section>
      </footer>
    </a>
  </div>

  ```html
  <a href="#" class="ods-card is-ods-card-action is-ods-card-clickable">
    <header class="ods-card--header">
      <figure class="ods-card--header-icon">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labeledby="svg-title">
          <title id="svg-title">The Okta logo</title>
          <path d="M37.5 25c0 6.904-5.596 12.5-12.5 12.5S12.5 31.904 12.5 25 18.096 12.5 25 12.5 37.5 18.096 37.5 25zM0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0 0 11.193 0 25z" fill="#05F"/></svg>
      </figure>
      <section class="ods-card--header-main">
        <h1 class="ods-card--title">
          The Latest News Story
        </h1>
        <section class="ods-card--meta">
          Label / Time / Something
        </section>
      </section>
    </header>
    <section class="ods-card--main">
      <p>
        "I do not wish to make a mystery," said he, laughing. "The matter was perfectly simple. You, of course, saw that everyone in the street was an accomplice. They were all engaged for the evening."
      </p>
    </section>
    <footer class="ods-card--footer">
      <section class="ods-card--actions">
        <span class="ods-card--link">Read this story</span>
      </section>
    </footer>
  </a>
  ```
</figure>

Remember that because clickable cards are themselves interactive, they may not contain any other interactive elements. To better indicate the action that will occur when the card is clicked, include a `.card--link` in the footer as seen above.
