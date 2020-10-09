<template>
  <article class="docs-main--content">
    <header class="docs-doc-header">
      <div>
        <h1 class="docs-doc-header--title">{{ $page.frontmatter.headline }}</h1>
        <p class="docs-doc-header--lead">{{ $page.frontmatter.lead }}</p>
      </div>
    </header>
    <hr />
    <Content />
  </article>
</template>

<script>
export default {
  name: "DocsTemplatePlain"
};
</script>
