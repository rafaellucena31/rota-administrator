<template>
    <v-layout flex-column>
        <div class="pa-2">
            <h2>Manage Users</h2>
            <user-main></user-main>
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
            title: 'Users'
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