<template>
    <div>
        <v-combobox 
        :disabled="firstloading"
        :items="usersData"
        v-model="userselected"
        multiple
        item-value="userId"
        item-text="user"
        label="Select users"
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              <v-avatar
                class="accent white--text"
                left
                v-text="data.item.user.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ data.item.user }}
            </v-chip>
          </template>
        </v-combobox>
        <v-btn v-if="CheckPermission(PermissionsComputed.Rota_List)"
          :loading="firstloading || loading"
          :disabled="firstloading || loading"
          color="success"
          class="white--text"
          @click="GetRotaData"
        >
          
          <v-icon
            left
            dark
          >
            mdi-cloud-upload
          </v-icon>
          Get Data!
        </v-btn>
        <v-btn v-if="CheckPermission(PermissionsComputed.Rota_Generate)"
          :loading="firstloading || loading"
          :disabled="firstloading || loading"
          color="primary"
          class="white--text"
          @click="showdialog = true"
        >
          
          <v-icon
            left
            dark
          >
            mdi-plus-thick
          </v-icon>
          Generate new Rota...
        </v-btn>
    </div>
</template>

<script>

import {Permissions, searchPermissionEnum} from '~/resources/helpers/ACL'

import { STORE_NAME as ROTA_STORE_NAME, registerRotaStore } from '~/store/rotas/register'
import { mapGetters, mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

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
        ...mapFields(['firstloading','loading', 'usersData', 'userselected', 'showdialog']),
        PermissionsComputed: {
          get: function(){
            return Permissions
          }
        }
    },
    methods:{
        ...mapActions(ROTA_STORE_NAME, ['loadUserData', 'loadRotaData']),
        GetRotaData: function(){
          this.loadRotaData()
        },
        CheckPermission(permission){
          debugger
          return searchPermissionEnum(this.userLogged.Permissions, permission);
        },
    },
    created(){
      this.firstloading = true
        this.loadUserData()
    }
}
</script>