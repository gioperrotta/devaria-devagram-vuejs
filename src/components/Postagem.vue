<script lang="ts">
    import { defineComponent } from 'vue'
    import Avatar from './Avatar.vue'

    import imgCurtir from '../assets/imagens/curtir.svg';
    import imgCurtiu from '../assets/imagens/curtiu.svg';
    import imgComentario from '../assets/imagens/comentario.svg';
    import imgComentarioAtivo from '../assets/imagens/comentario-ativo.svg';
    import { FeedServices } from '@/services/FeedServices';
import router from '@/router';

    const feedServices = new FeedServices();
    const MAX_DESCRICAO = 90;
    
    export default defineComponent({
    setup(){
        return {
            loggedUserId : localStorage.getItem(`_id`),
            loggedAvatar : localStorage.getItem(`avatar`) ?? '',
            loggedName : localStorage.getItem(`nome`) ?? '',
            MAX_DESCRICAO
        }
    },
    props: {
        post: null
    },
    data(){
        return {
            showComentario : false,
            comentarioMsg : '',
            showDescricaoFull : false
        }
    },
    methods: {
        navegarParaPerfil() {
             router.push("/feed/" + this.post?.userId);
        },
        async tooglCurtir(){
            try{
                await feedServices.togglCurtir(this.post?._id);
                const index = this.post?.likes?.findIndex((e:String) => e === this.loggedUserId);
                if(index != -1){
                    this.post?.likes?.splice(index, 1);
                }else{
                    this.post?.likes?.push(this.loggedUserId);
                }
            }catch(e){
                console.log(e);
            }
        },
        toggleComentario(){
            this.showComentario = !this.showComentario;
        },
        async enviarComentario(){
            try{
                if(!this.comentarioMsg || !this.comentarioMsg.trim()){
                    return;
                }

                await feedServices.enviarComentario(this.post?._id, this.comentarioMsg);

                this.post?.comentarios?.push({
                    usuarioId : this.loggedUserId,
                    nome: this.loggedName,
                    comentario: this.comentarioMsg
                });

                this.comentarioMsg = '';
                this.showComentario = false;
            }catch(e){
                console.log(e);
            }
        },
        togglDescricaoFull(){
            this.showDescricaoFull = !this.showDescricaoFull;
        }
    },
    components: { Avatar },
    computed: {
        obterIconeCurtir(){
            if(this.post?.likes && this.post?.likes.findIndex((e : String) => e === this.loggedUserId) != -1){
                return imgCurtiu
            }
            return imgCurtir
        },
        obterIconeComentario(){
            return this.showComentario ? imgComentarioAtivo : imgComentario;
        },
        exibirDescricao(){
            if(this.showDescricaoFull){
                return this.post?.descricao;
            }
            return this.post?.descricao?.length > MAX_DESCRICAO ? this.post?.descricao?.substring(0, MAX_DESCRICAO) + '...' : this.post?.descricao;
        }
    }
});
</script>
<template>
    <div class="container-postagem">
        <div @click="navegarParaPerfil">
            <section class="cabecalho">
                <Avatar :imagem="post?.user?.avatar"/>
                <strong>{{post?.user?.nome}}</strong>
            </section>
        </div>

        <div class="foto">
            <img :src="post?.foto" alt="Imagem da publicação"/>
        </div>

        <div class="rodape">
            <div class="acoes">
                <img :src="obterIconeCurtir" alt="Icone curtir" class="feedIcone" @click="tooglCurtir"/>
                <img :src="obterIconeComentario" alt="Icone comentar" class="feedIcone"
                    @click="toggleComentario"/>
                <span class="curtidas">
                    Curtido por <strong>{{post?.likes?.length}}</strong> pessoa{{post?.likes?.length !== 1 ? 's' : ''}}
                </span>
            </div>

            <div class="descricao">
                <strong>{{post?.usuario?.nome}}</strong>
                <p>
                    {{exibirDescricao}}
                    <span v-if="post?.descricao.length > MAX_DESCRICAO && !showDescricaoFull"
                        @click="togglDescricaoFull" class="mais">
                        mais
                    </span>
                </p>
            </div>

            <div class="comentarios">
                <div v-for="(comentario, index) in post?.comentarios" :key="index">
                    <strong>{{comentario.nome}}</strong>
                    <p>{{comentario.comentario}}</p>
                </div>
            </div>
        </div>

        <div class="container-comentario" v-if="showComentario">
            <Avatar alt="imagem do usuário logado" :imagem="loggedAvatar" />
            <input type="text" v-model="comentarioMsg" placeholder="Adicione um comentário..." @keyup.enter="enviarComentario"/>
            <button type="button" @click="enviarComentario">
                Publicar
            </button>
        </div>
    </div>
</template>

<style lang="scss" src="@/assets/styles/postagem.scss" />