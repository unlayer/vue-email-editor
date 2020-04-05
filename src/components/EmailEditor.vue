<template>
  <div id="editor" v-bind:style="{ minHeight: minHeight }"></div>
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
    unlayerScript.setAttribute('src', '//editor.unlayer.com/embed.js?2');
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
      this.editor = unlayer.createEditor({
        ...options,
        id: 'editor',
        displayMode: 'email',
      });

      this.$emit('load');
    },
    loadDesign(design) {
      this.editor.loadDesign(design);
    },
    saveDesign(callback) {
      this.editor.saveDesign(callback);
    },
    exportHtml(callback) {
      this.editor.exportHtml(callback);
    }
  },
}
</script>

<style scoped>
#editor {
  flex: 1;
  display: flex;
}
</style>