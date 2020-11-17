---
template: plain
title: Help
headline: Need Help?
lead: The Odyssey team is here to help as best we can. Don't hesitate to reach out!
description: The Odyssey team is here to help as best we can. Don't hesitate to reach out!
---

<section class="overview__help">

<Description>

<!-- eslint-disable vue/no-v-html -->
<figure
  aria-hidden="true"
  class="help-icon"
  v-html="require(`!html-loader!../vuepress-theme-odyssey/public/images/icon-slack.svg`)"
></figure>
<!-- eslint-enable vue/no-v-html -->

## Slack

If you’re wondering if we already have a solution for a design or development issue or would like assistance figuring out a problem, reach out to @ds-help in #odyssey.

<div class="has-ods-tooltip">
  <a :href="$site.themeConfig.links.slack" target="_blank" aria-describedby="help-slack">Open Slack</a>
  <aside id="help-slack" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
    Oktanauts-only for now
  </aside>
</div>

</Description>

<Description>

<!-- eslint-enable vue/no-v-html -->

<figure
  aria-hidden="true"
  class="help-icon"
  v-html="require(`!html-loader!../vuepress-theme-odyssey/public/images/icon-github.svg`)"
></figure>

<!-- eslint-disable vue/no-v-html -->

## Github

Code for SCSS, tokens, icons, and the documentation lives in our Odyssey repo. We also do all of our project planning there too.

<div class="has-ods-tooltip">
  <a :href="$site.themeConfig.links.github" target="_blank" aria-describedby="help-slack">Open GitHub</a>
  <aside id="help-slack" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
    Oktanauts-only for now
  </aside>
</div>

</Description>

<Description>

## Office hours

Every week we hold office hours where you can share, chat, and collaborate with the entire Odyssey team. It’s a great way for us to learn and improve, while helping you solve problems for your users.

<div class="has-ods-tooltip">
  <a :href="$site.themeConfig.links.officeHours" target="_blank" aria-describedby="help-oh">Sign up for a time slot</a>
  <aside id="help-oh" class="ods-tooltip is-ods-tooltip-top" role="tooltip">
    Oktanauts-only for now
  </aside>
</div>

</Description>

</section>
