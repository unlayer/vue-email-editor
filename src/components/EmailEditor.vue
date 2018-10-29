<template>
  <div class="wrapper">
    <div id="editor"></div>
  </div>
</template>

<script>
export default {
  name: 'EmailEditor',
  props: {
    projectId: Number,
    templateId: Number,
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
      unlayer.init({
        id: 'editor',
        projectId: this.projectId,
        templateId: this.templateId,
        displayMode: 'email',
      });
    },
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

#editor > iframe {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 500px !important;
  display: flex;
  border: 0px;
}
</style>