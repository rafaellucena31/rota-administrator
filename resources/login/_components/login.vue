<template>
<v-card class="eleveation-12">
    <v-snackbar v-model="snackbar" :timeout="timeout" bottom :color="colorSnackbar">
      {{ textSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-toolbar dark color="primary">
        <v-toolbar-title class="flex text-center">::Amazing Rota Administrator Login::</v-toolbar-title>
            <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="yellow"
        height="4"
        value="3"
        striped
    ></v-progress-linear>
    </v-toolbar>
    
    <div class="d-flex justify-center">
        <v-img src="rota.png" contains max-width="200"></v-img>
    </div>
    
    <v-card-text>
        <v-form>
            <v-text-field
            autocomplete="off"
            label="Username"
            name="username"
            prepend-icon="mdi-account"
            type="text"
            v-model="credential.username"
        ></v-text-field>
        <v-text-field
            autocomplete="off"
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="credential.password"
        ></v-text-field>
        
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="clickButtonLogin" :disabled="loading" >Login</v-btn>
    </v-card-actions>
</v-card>
</template>
<script>
import loginStoreRegister from '../_store/register'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'loginStore/getField',
  mutationType: 'loginStore/updateField'
})

export default {
    data: function() {
        return {
            credential: {
                username: 'master',
                password: '123'
            },
            loading: false,
            
        }
    },
    computed:{
        ...mapFields(['colorSnackbar', 'snackbar', 'timeout', 'textSnackbar']),
        ...mapGetters('loginStore', ['credentialUser']),
        ...mapGetters('loginStore', ['loginSucess']),
        ...mapGetters(['userLogged'])
    },
    beforeCreate(){
        loginStoreRegister(this.$store)
    },
    created() {
    },
    methods: {
        ...mapMutations('loginStore',['saveCredentialUser', 'saveLoginSuccess']),
        ...mapActions('loginStore',['doAuthentication']),
        clickButtonLogin: async function(event) {
            this.loading = true
            this.saveCredentialUser(this.credential)
            await this.doAuthentication()
            this.loading = false
        }
    },
    watch: {
        loginSucess: function(newValue){
            if(newValue){
                this.saveLoginSuccess({status: false})
                this.$router.push({ path: '/' })
            }
        }
    }
}
</script>