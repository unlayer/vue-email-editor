<template>
  <div
    v-bind:id="id"
    class="unlayer-editor"
    v-bind:style="{ minHeight: minHeight }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pkg from '../../package.json';
import { loadScript } from './loadScript';
import { EmailEditorProps } from './types';
import { shallowRef } from 'vue';
let lastEditorId = 0;

export default defineComponent({
  name: 'EmailEditor',
  props: {
    editorId: String as () => EmailEditorProps['editorId'],
    minHeight: {
      type: String as () => EmailEditorProps['minHeight'],
      default: '500px',
    },
    options: Object as () => EmailEditorProps['options'],

    /**
     * @Deprecated Props: Use `options.appearance` instead
     */
    appearance: Object as () => EmailEditorProps['appearance'],
     /**
     * @Deprecated Props: Use `options.locale` instead
     */
    locale: String as () => EmailEditorProps['locale'],
     /**
     * @Deprecated Props: Use `options.projectId` instead
     */
    projectId: Number as () => EmailEditorProps['projectId'],
     /**
     * @Deprecated Props: Use `options.tools` instead
     */
    tools: Object as () => EmailEditorProps['tools'],
  },
  computed: {
    id(): string | undefined {
      return this.editorId || `editor-${++lastEditorId}`;
    },
  },
  setup() {
    // shallowRef is used to avoid window.postMessage error
    const editor = shallowRef(null as EmailEditorProps['editor']); // Creates a reactive reference

    return {
      editor, // Makes editor available to the template
    };
  },
  mounted() {
    loadScript(this.loadEditor.bind(this));
  },
  methods: {
    loadEditor() {
      const options = this.options || {};

      if (this.appearance) {
        options.appearance = this.appearance;
      }

      if (this.locale) {
        options.locale = this.locale;
      }

      if (this.projectId) {
        options.projectId = this.projectId;
      }

      if (this.tools) {
        options.tools = this.tools;
      }

      this.editor = unlayer.createEditor({
        ...options,
        id: this.id,
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
    /**
     * @deprecated This method will be removed in the next major release. Use `editor.exportHtml` instead.
     */
     exportHtml(callback: Parameters<EmailEditorProps['exportHtml']>[0]) {
      this.editor?.exportHtml(callback);
    },
    /**
     * @deprecated This method will be removed in the next major release. Use `editor.loadDesign` instead.
     */
    loadDesign(design: Parameters<EmailEditorProps['loadDesign']>[0]) {
      this.editor?.loadDesign(design);
    },
     /**
     * @deprecated This method will be removed in the next major release. Use `editor.saveDesign` instead.
     */
    saveDesign(callback: Parameters<EmailEditorProps['saveDesign']>[0]) {
      this.editor?.saveDesign(callback)
    }
  },
});
</script>

<style scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>
