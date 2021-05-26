<template>
<v-main>
      <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="7" lg="5">
                <Login />
            </v-col>
          </v-row>
      </v-container>
</v-main>
</template>

<script>
import Login from '@/resources/login/_components/login.vue'
export default {
    layout: 'login',
    components: {
        Login
    },
    head(){
        return{
            title: 'Rota Administrator - Login'
        }
    },
    
    
}
</script>