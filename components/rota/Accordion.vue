<template>
<div>
    <common-nodata :condition="resultSearch != undefined && resultSearch.length > 0">
        <template v-slot:content>
            <v-expansion-panels accordion inset>
                <v-expansion-panel
                v-for="(item, indice) in resultSearch"
                :key="indice"
                >
                <v-expansion-panel-header :color="colorByType(item.type, 'header')">{{item.user}} - ({{item.date}})</v-expansion-panel-header>
                <v-expansion-panel-content :color="colorByType(item.type, 'body')">
                    <h4>Object description</h4>
                    <ul>
                        <li v-for="(propValue, indice) in item" :key="indice">
                            <p>{{indice}}: <b>{{propValue}}</b></p>
                        </li>
                    </ul>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </common-nodata>
</div>
</template>
<script>

import { STORE_NAME as ROTA_STORE_NAME, registerRotaStore } from '~/store/rotas/register'
import { mapGetters } from 'vuex'
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
        ...mapGetters(ROTA_STORE_NAME, ['GetRotasLeftJoinUser']),
        ...mapFields(['loading', 'rotasData', 'resultSearch'])
    },
    methods:{
        colorByType: function(type, element){
            let color = 'white'
            if (type == 'morning'){
                color = 'cyan lighten'
            } else if (type == 'afternoon'){
                color = 'light-green lighten'
            } else{
                color = 'white'
            }
            if (color != 'white'){
                if (element == 'header'){
                    color = color + '-4'
                } else if (element == 'body'){
                    color = color + '-5'
                }
            }
            return color
        }
    },
    watch:{
        loading: {
            handler(){
                console.log(this.GetRotasLeftJoinUser)
            },
        }
    },
    created(){
    }
}
</script>