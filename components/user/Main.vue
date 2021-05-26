<template>
    <div v-if="CheckPermission(PermissionsComputed.User_List)">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="yellow darken-2"
        ></v-progress-linear>
        <v-snackbar v-model="snackbar" :timeout="timeout" bottom :color="colorSnackbar">
            {{ textSnackbar }}
            <template v-slot:action="{ attrs }">
                <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        <user-filter></user-filter>
        <v-card class="mt-4">
            <v-container fluid>
                <v-row>
                    <v-col                            
                    cols="12"
                    >
                        <user-datagrid></user-datagrid>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>
<script>

import {Permissions, searchPermissionEnum} from '~/resources/helpers/ACL'
import { STORE_NAME as USER_STORE_NAME, registerUserStore } from '~/store/user/register'
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: `${USER_STORE_NAME}/getField`,
  mutationType: `${USER_STORE_NAME}/updateField`
})

export default {
    beforeCreate() {
        registerUserStore(this.$store)
    },
    computed:{
        ...mapGetters(['userLogged']),
        ...mapFields(['loading', 'snackbar', 'timeout', 'colorSnackbar', 'textSnackbar']),
        PermissionsComputed: {
          get: function(){
            return Permissions
          }
        }

    },
    methods:{
        CheckPermission(permission){
            return searchPermissionEnum(this.userLogged.Permissions, permission);
        }
    },
    created(){
        if (!searchPermissionEnum(this.userLogged.Permissions, Permissions.User_List)){
            this.$router.push({ path: '/' })
        }
    }
}
</script>
<style>
.heightFull{
    height: calc(100vh - 370px);
}
</style>