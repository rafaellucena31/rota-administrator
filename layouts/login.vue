<template>
<v-app class="background">
    <v-main>
        <v-container fluid fill-height>
            <nuxt />
        </v-container>
    </v-main>
</v-app>
</template>
<style scoped>
html, body {
    height:100%;
} 
.background {
    background-color: white;
    background-image: url("/road.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: right top;
}
</style>
<script>
import { registerUserStore } from '~/store/user/register'
import { registerRotaStore } from '~/store/rotas/register'
export default {
    beforeCreate() {
        registerUserStore(this.$store)
        registerRotaStore(this.$store)
    },
}
</script>