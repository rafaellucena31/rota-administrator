<template>
    <div v-if="CheckPermission(PermissionsComputed.Rota_List)">
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
        <rota-generate></rota-generate>
        <rota-filter></rota-filter>
        <v-card class="mt-4">
            <v-tabs
            v-model="tab"
            color="blue"
            right
            >
                <v-tab href="#accordion"><v-icon dark center class="mr-1">mdi-select-group</v-icon></v-tab>
                <v-tab href="#calendar"><v-icon dark center class="mr-1">mdi-calendar-month</v-icon></v-tab>
                <v-tabs-items :value="tab" class="">
                    <v-tab-item
                    value="accordion"
                    >
                        <v-container fluid>
                        <v-row>
                            <v-col
                            cols="12"
                            >
                                <rota-accordion></rota-accordion>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item
                    value="calendar"
                    >
                        <v-container fluid>
                        <v-row>
                            <v-col                            
                            cols="12"
                            >
                                <rota-calendar></rota-calendar>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </v-card>
    </div>
</template>
<script>

import { registerRotaStore } from '~/store/rotas/register'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import {Permissions, searchPermissionEnum} from '~/resources/helpers/ACL'

const { mapFields } = createHelpers({
  getterType: 'RotaStore/getField',
  mutationType: 'RotaStore/updateField'
})

export default {
    beforeCreate() {
        registerRotaStore(this.$store)
    },
    computed:{
        ...mapGetters(['userLogged']),
        ...mapFields(['loading', 'snackbar', 'timeout', 'colorSnackbar', 'textSnackbar', 'tab']),
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
        if (!searchPermissionEnum(this.userLogged.Permissions, Permissions.Rota_List)){
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