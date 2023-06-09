import { createRouter, createWebHistory } from 'vue-router'

import LoginViewVue from '@/views/LoginView.vue'
import HomeVue from '@/views/Home.vue'
import CadastroVue from '@/views/Cadastro.vue'

import { useAccessTokenStore } from '@/stores/accessToken';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeVue,
      meta: { rotaPrivada: true }
    },
    {
      path: '/',
      name: 'login',
      component: LoginViewVue,
      props: true
    },
    {
      path: '/usercreate',
      name: 'cadastro',
      component: CadastroVue
    },
  ]
})

router.beforeEach((to, from) => {
  const store = useAccessTokenStore();
  if (to.name !== 'login' && to.meta.rotaPrivada && !store.estaAutenticado) {
    return { name: 'login' }
  } else if (to.name === 'cadastro' && store.estaAutenticado) {
    return { name: 'home' }
  }
});

export default router
