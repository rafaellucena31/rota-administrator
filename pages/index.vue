<template>
    <v-layout class="pa-2" flex-column>
        <h2 >Home</h2>
        <p>This page is visible for any user athenticated</p>
        <h4>Users in this example: </h4>
        <ul>
            <li>
                Username: <b>master</b>, Password: <b>123</b>
            </li>
            <p>Have all permissions in the system: <b>Rota_List, Rota_Generate, Rota_Get, User_List</b></p>
            <li>
                Username: <b>user</b>, Password: <b>123</b>
            </li>
            <p>Have only these/this permissions/permission: <b>Rota_List</b></p>
        </ul>
        <p>Authentication and authorization are separated into two APIs. Sometimes, the amount of permissions is too large to fit within the token's payload causing an exception on the http server. Perhaps, RBAC (Role Based Access Control) is not enough and we would like more control and customization.</p>

        <p><b>I also did the requested tasks. <v-icon>mdi-emoticon-wink-outline</v-icon></b></p>
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
            title: 'Home'
        }
    },
    methods: {
        ...mapMutations(['setLayout'])
    },
    created(){
        //this.setLayout({fillHeight: true,fluid: true})
    },
}
</script>