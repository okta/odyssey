<template>
  <figure class="nimatron--example">
    <div class="nimatron--rendered">
      <slot></slot>
    </div>
    <prism language="html">{{ code }}</prism>
  </figure>
</template>

<script>
import Prism from 'vue-prism-component'

function process(str) {
    let div = document.createElement('div');
    div.innerHTML = str.trim();

    return format(div, 0).innerHTML;
}

function format(node, level) {
    let indentBefore = new Array(level++ + 1).join('  '),
        indentAfter  = new Array(level - 1).join('  '),
        textNode;

    for (let i = 0; i < node.children.length; i++) {

        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}

export default {
  name: 'Example',
  data() {
    return {
      code: '<div><h1>Hi</h1></div>'
    }
  },
  components: {
    Prism
  },
  mounted() {
    this.code = process(this.$el.getElementsByClassName("nimatron--rendered")[0].innerHTML)
  },
}
</script>
