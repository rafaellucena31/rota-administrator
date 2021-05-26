<template>
    <div>
        <h3>Click in the button to list Users Data from API</h3>
        <v-btn v-if="CheckPermission(PermissionsComputed.User_List)"
          :loading="firstloading || loading"
          :disabled="firstloading || loading"
          color="success"
          class="white--text"
          @click="GetUserData"
        >
          <v-icon
            left
            dark
          >
            mdi-cloud-upload
          </v-icon>
          Get Data!
        </v-btn>
    </div>
</template>

<script>

import {Permissions, searchPermissionEnum} from '~/resources/helpers/ACL'

import { STORE_NAME as USER_STORE_NAME, registerUserStore } from '~/store/user/register'
import { mapGetters, mapActions } from 'vuex'
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
        ...mapFields(['firstloading','loading']),
        PermissionsComputed: {
          get: function(){
            return Permissions
          }
        }
    },
    methods:{
        ...mapActions(USER_STORE_NAME, ['loadUserData']),
        GetUserData: function(){
          this.loadUserData()
        },
        CheckPermission(permission){
            debugger
            return searchPermissionEnum(this.userLogged.Permissions, permission);
        },
    }
}
</script>