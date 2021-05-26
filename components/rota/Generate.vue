<template>
    <v-dialog
      v-model="showdialog"
      persistent
      max-width="600px"
    >
    <v-card>
        <v-card-title>
          <span class="headline">Generate new rota</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        >
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dataSelected"
                                label="Select Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="dataSelected"
                            @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>                
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            :disabled="dataSelected == undefined"
            @click="createNewRota"
          >
            Generate
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="showdialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { STORE_NAME as ROTA_STORE_NAME, registerRotaStore } from '~/store/rotas/register'
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'RotaStore/getField',
  mutationType: 'RotaStore/updateField'
})

export default {
    data: () => ({
      menu: false,
    }),
    beforeCreate() {
        registerRotaStore(this.$store)
    },
    computed:{
        ...mapFields(['dataSelected', 'showdialog'])
    },
    methods:{
        ...mapActions(ROTA_STORE_NAME, ['generateNewRota']),
        createNewRota(){
            this.showdialog = false
            this.generateNewRota()
        }
    },
    created(){
    }    
}
</script>