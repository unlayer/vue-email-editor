<template>
  <div class="wrapper">
    <div id="editor" v-bind:style="{ minHeight: minHeight }"></div>
  </div>
</template>

<script>
export default {
  name: 'EmailEditor',
  props: {
    options: Object,
    projectId: Number,
    tools: Object,
    appearance: Object,
    locale: String,
    minHeight: {
      type: String,
      default: '500px',
    },
  },
  created() {
    const unlayerScript = document.createElement('script');
    unlayerScript.setAttribute('src', '//editor.unlayer.com/embed.js');
    unlayerScript.onload = () => {
      this.loadEditor();
    };
    document.head.appendChild(unlayerScript);
  },
  mounted() {
  },
  methods: {
    loadEditor() {
      const options = this.options || {};

      if (this.projectId) {
        options.projectId = this.projectId
      }

      if (this.tools) {
        options.tools = this.tools
      }
      
      if (this.appearance) {
        options.appearance = this.appearance
      }

      if (this.locale) {
        options.locale = this.locale
      }

      /* global unlayer */
      unlayer.init({
        ...options,
        id: 'editor',
        displayMode: 'email',
      });

      this.$emit('load');
    },
    loadDesign(design) {
      unlayer.loadDesign(design);
    },
    saveDesign(callback) {
      unlayer.saveDesign(callback);
    },
    exportHtml(callback) {
      unlayer.exportHtml(callback);
    }
  },
}
</script>

<style scoped>
.wrapper {
  flex: 1;
  display: flex;
}

#editor {
  flex: 1;
  display: flex;
}
</style>