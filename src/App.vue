<template>
  <div id="app">
    <div class="container">
      <div id="bar">
        <h1>Vue Email Editor (Demo)</h1>

        <button v-on:click="saveDesign">Save Design</button>
        <button v-on:click="exportHtml">Export HTML</button>
      </div>

      <EmailEditor ref="editor" :projectId="1" v-on:load="editorLoaded" />
    </div>
  </div>
</template>

<script>
import EmailEditor from './components/EmailEditor.vue'
import sample from './sample.json';

export default {
  name: 'app',
  components: {
    EmailEditor
  },
  methods: {
    editorLoaded() {
      this.$refs.editor.loadDesign(sample);
    },
    saveDesign() {
      this.$refs.editor.saveDesign(
        (design) => {
          console.log('saveDesign', design);
        }
      )
    },
    exportHtml() {
      this.$refs.editor.exportHtml(
        (data) => {
          console.log('exportHtml', data);
        }
      )
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

#app {
  height: 100%;
}

#app .container {
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
