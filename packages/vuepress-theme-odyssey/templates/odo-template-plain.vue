<template>
  <article class="odo-main--content">
    <header class="odo-doc-header">
      <div>
        <h1 class="odo-doc-header--title">{{$page.frontmatter.headline}}</h1>
        <p class="odo-doc-header--lead">{{$page.frontmatter.lead}}</p>
      </div>
    </header>
    <hr />
    <Content />
  </article>
</template>

<script>
export default {
  name: 'odo-template-plain'
}
</script>
