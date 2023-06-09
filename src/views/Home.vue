<script lang="ts">
import { defineComponent } from 'vue'

import { LoginServices } from '../services/LoginServices'
import router from '@/router';

const loginService = new LoginServices()

export default defineComponent({
  setup() {
    return {
      loginService
    }
  },
  methods: {
    sair() {
      loginService.logout()
      router.push({name: 'login'})
    }
  },
});
</script>

<template>
  <div>
    <h1>HOME PAGE</h1>
    <button @click="sair">Sair</button>
  </div>
</template>