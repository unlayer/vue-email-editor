import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { createRouter, createWebHistory } from 'vue-router';

import Example from './views/Example.vue';

const routes = [
  { path: '/', component: Example },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({});

app.use(router);
app.mount('#app');

export default app;
