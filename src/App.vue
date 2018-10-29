<template>
  <div id="app">
    <div class="container">
      <EmailEditor :projectId="1" :templateId="59" />
    </div>
  </div>
</template>

<script>
import EmailEditor from './components/EmailEditor.vue'

export default {
  name: 'app',
  components: {
    EmailEditor
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
</style>
