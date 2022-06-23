import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import Example from './views/Example.vue';
import DesignList from './views/DesignList.vue';
import DesignEdit from './views/DesignEdit.vue';

const routes = [
  { path: '/', component: Example },
  { path: '/dashboard', component: DesignList },
  { path: '/dashboard/new', component: DesignEdit },
  { path: '/dashboard/edit/:designId', component: DesignEdit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({});

app.use(router);
app.mount('#app');

export default app;
