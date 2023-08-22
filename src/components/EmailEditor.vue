<template>
  <div
    v-bind:id="id"
    class="unlayer-editor"
    v-bind:style="{ minHeight: minHeight }"
  ></div>
</template>

<script>
import { loadScript } from './loadScript';
import pkg from '../../package.json';

let lastEditorId = 0;

export default {
  name: 'EmailEditor',
  props: {
    editorId: String,
    options: Object,
    projectId: Number,
    tools: Object,
    blocks: Array,
    appearance: Object,
    locale: String,
    displayMode:{
      type: String,
      required: false,
      default: "email"
    },
    minHeight: {
      type: String,
      default: '500px',
    },
  },
  computed: {
    id() {
      return this.editorId || `editor-${++lastEditorId}`;
    },
  },
  mounted() {
    loadScript(this.loadEditor.bind(this));
  },
  methods: {
    loadEditor() {
      const options = this.options || {};

      if (this.projectId) {
        options.projectId = this.projectId;
      }

      if (this.tools) {
        options.tools = this.tools;
      }

      if (this.blocks) {
        options.blocks = this.blocks;
      }

      if (this.appearance) {
        options.appearance = this.appearance;
      }

      if (this.locale) {
        options.locale = this.locale;
      }

      /* global unlayer */
      this.editor = unlayer.createEditor({
        ...options,
        id: this.id,
        displayMode: this.displayMode,
        source: {
          name: pkg.name,
          version: pkg.version,
        },
      });

      this.$emit('load');

      this.editor.addEventListener('editor:ready', () => {
        this.$emit('ready');
      });
    },
    loadDesign(design) {
      this.editor.loadDesign(design);
    },
    saveDesign(callback) {
      this.editor.saveDesign(callback);
    },
    exportHtml(callback) {
      this.editor.exportHtml(callback);
    },
    setBodyValues(values) {
      this.editor.setBodyValues(values);
    },
  },
};
</script>

<style scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>
