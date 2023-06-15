import { createRouter, createWebHistory } from 'vue-router'

import LoginViewVue from '@/views/LoginView.vue'
import HomeVue from '@/views/Home.vue'
import UsuarioVue from '@/views/Usuario.vue'
import CadastroVue from '@/views/Cadastro.vue'
import PerfilVue from '@/views/Perfil.vue'
import EditarVue from '@/views/Editar.vue'
import PublicacaoVue from '@/views/Publicacao.vue'

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
    {
      path: '/feed/:id',
      name: 'usuario',
      component: UsuarioVue,
      meta: { rotaPrivada: true }
    },
    {
      path: '/feed',
      name: 'perfil',
      component: PerfilVue,
      meta: { rotaPrivada: true }
    },
    {
      path: '/editar',
      name: 'editar',
      component: EditarVue,
      meta: { rotaPrivada: true }
    },
    {
      path: '/publicacao',
      name: 'publicacao',
      component: PublicacaoVue,
      meta: { rotaPrivada: true }
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
