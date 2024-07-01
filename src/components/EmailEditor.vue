<template>
  <div
    v-bind:id="id"
    class="unlayer-editor"
    v-bind:style="{ minHeight: minHeight }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import pkg from '../../package.json';
import { loadScript } from './loadScript';
import { EmailEditorProps } from './types';
let lastEditorId = 0;

export default defineComponent({
  name: 'EmailEditor',
  props: {
    appearance: Object as PropType<EmailEditorProps['appearance']>,
    displayMode: String as PropType<EmailEditorProps['displayMode']>,
    editorId: String as PropType<EmailEditorProps['editorId']>,
    locale: String as PropType<EmailEditorProps['locale']>,
    projectId: Number as PropType<EmailEditorProps['projectId']>,
    tools: Object as PropType<EmailEditorProps['tools']>,
    minHeight: {
      type: String as PropType<EmailEditorProps['minHeight']>,
      default: '500px',
    }
  },
  data() {
    return {
      editor: null as EmailEditorProps['editor'],
      options: Object as EmailEditorProps['options'],
    };
  },
  computed: {
    id(): string | undefined {
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
        displayMode: this.displayMode || 'email',
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
    loadDesign(design: any) {
      this.editor?.loadDesign(design);
    },
    saveDesign(callback: any) {
      this.editor?.saveDesign(callback);
    },
    exportHtml(callback: any) {
      this.editor?.exportHtml(callback);
    },
  },
});
</script>

<style scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>
