<script lang="ts">
import { defineComponent } from 'vue'
import InputPublico from '../components/InputPublico.vue'
import iconeLogin from '../assets/imagens/login.svg'
import iconeSenha from '../assets/imagens/senha.svg'
import { LoginServices } from '@/services/LoginServices'
import router from '@/router';

const loginService = new LoginServices()

export default defineComponent({
  setup() {
    return {
      iconeLogin,
      iconeSenha,
      loginService
    }
  },
  data() {
    return {
      login: '',
      senha: '',
      loading: false,
      erro: '',
    }
  },
  methods: {
    async efetuarLogin() {
      try {
        if (!this.login && !this.login.trim() && 
            !this.senha && !this.senha.trim()) {
          this.erro = 'Favor preencher os dados corretamente'
          return
        }
        this.loading = true
        await loginService.login({email: this.login, senha: this.senha})
        router.push({name: 'home'})
      } catch (e: any) {
        console.log(e)
        if (e?.response?.data?.error){
          this.erro = e.response.data.error;
        } else {
          this.erro = 'Não foi possível efetuar o login, tente novamente!';
        }
      }
      this.loading = false
    },
    setLogin(v:any) {
      this.login = v
    },
    setSenha(v:any) {
      this.senha = v
    }
  },
  computed: {
    buttonText() {
      return this.loading ? '... Carregando' : 'Login'
    },
  },
  components: {InputPublico}
})
</script>
<template>

  <div class="container-publico">

    <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
    <form action="">
      <p v-if="erro" class="error">{{ erro }}</p>
      <p v-if="$route.query.cadastroComSucesso" class="sucesso">Cadastro Efetuado com sucesso, faça o login!</p>

      <InputPublico :icone="iconeLogin" tipo="text" alt="email"  placeholder="Email" 
        :modelValue="login" @setInput="setLogin"/>
      <InputPublico :icone="iconeSenha" tipo="password" alt="senha"  placeholder="Senha" 
        :modelValue="senha" @setInput="setSenha" />
      <button @click.enter.prevent="efetuarLogin" :disabled="loading">{{ buttonText }}</button>
      <div class="link">
        <p>Não possui uma conta?</p>
        <RouterLink to="usercreate">Faça seu cadastro agora!</RouterLink>
      </div>
    </form>
  </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss" />