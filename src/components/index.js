import Vue from 'vue';
import EmailEditor from './EmailEditor.vue';

const Components = {
  EmailEditor,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export { EmailEditor };
export default Components;
