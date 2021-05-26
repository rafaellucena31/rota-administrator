<template>
    <v-layout flex-column>
        <div class="pa-2">
            <h2>Manage Rotas</h2>
            <rota-main></rota-main>
        </div>
    </v-layout>
</template>
<script>

import { mapMutations } from 'vuex'
export default {
    middleware: 'authenticated',
    components:{
    },
    head(){
        return{
            title: 'Manage Rotas'
        }
    },
    methods: {
        ...mapMutations(['setLayout'])
    },
    created(){
        this.setLayout({fillHeight: true,fluid: true})
    }

}
</script>