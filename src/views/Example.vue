<template>
  <div id="example">
    <div class="container">
      <div id="bar">
        <h1>Vue Email Editor (Demo)</h1>

        <button v-on:click="saveDesign">Save Design</button>
        <button v-on:click="exportHtml">Export HTML</button>
      </div>

      <EmailEditor ref="emailEditor" v-on:load="editorLoaded" v-on:ready="editorReady" :options="options" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EmailEditor } from '../vue-email-editor';
import sample from '../data/sample.json';

type EmailEditorInstance = InstanceType<typeof EmailEditor>;
export default defineComponent({
  name: 'exampleView',
  components: {
    EmailEditor
  },
  data() {
    return {
    emailEditor: null as EmailEditorInstance | null,
    options: {
      appearance: {
        theme: 'modern_light',
      },
      version: 'latest',
    }
  }
},
  mounted() {
    // Assign the ref with a type assertion
    this.emailEditor = this.$refs.emailEditor as EmailEditorInstance;
  },
  methods: {
    // called when the editor is created
    editorLoaded() {
      this?.emailEditor?.editor?.loadDesign(sample)
    },
    // called when the editor has finished loading
    editorReady() {
      console.log('editorReady');
    },
    saveDesign() {
      this.emailEditor?.editor?.saveDesign(
        (design: any) => {
          console.log('saveDesign', design);
        }
      )
    },
    exportHtml() {
      this?.emailEditor?.editor?.exportHtml(
        (data: any) => {
          console.log('exportHtml', data);
        }
      )
    }
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

#app, #example {
  height: 100%;
}

#example .container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

#bar {
  flex: 1;
  background-color: #40B883;
  color: #FFF;
  padding: 10px;
  display: flex;
  max-height: 40px;
}

#bar h1 {
  flex: 1;
  font-size: 16px;
  text-align: left;
}

#bar button {
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #000;
  color: #FFF;
  border: 0px;
  max-width: 150px;
  cursor: pointer;
}
</style>
