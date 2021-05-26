<template>
<div>
    <common-nodata :condition="resultSearch != undefined && resultSearch.length > 0">
        <template v-slot:content>
            <v-sheet
            tile
            height="54"
            class="d-flex"
            >
            <v-btn
                icon
                class="ma-2"
                @click="$refs.calendar.prev()"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
                v-model="type"
                :items="types"
                dense
                outlined
                hide-details
                class="ma-2"
                label="type"
            ></v-select>
            <v-select
                v-model="mode"
                :items="modes"
                dense
                outlined
                hide-details
                label="event-overlap-mode"
                class="ma-2"
            ></v-select>
            <v-select
                v-model="weekday"
                :items="weekdays"
                dense
                outlined
                hide-details
                label="weekdays"
                class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn
                icon
                class="ma-2"
                @click="$refs.calendar.next()"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="value"
                    :weekdays="weekday"
                    :type="type"
                    :events="calendarData"
                    :event-overlap-mode="mode"
                    :event-overlap-threshold="30"
                    :event-color="getEventColor"
                ></v-calendar>
            </v-sheet>
        </template>
    </common-nodata>
</div>
</template>
<script>

import { STORE_NAME as ROTA_STORE_NAME, registerRotaStore } from '~/store/rotas/register'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'RotaStore/getField',
  mutationType: 'RotaStore/updateField'
})

export default {
    data: () => ({
        type: 'month',
        types: ['month', 'week', 'day', '4day'],
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
            { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
            { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
            { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
            { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: '',
        events: [],
    }),
    beforeCreate() {
        registerRotaStore(this.$store)
    },
    computed:{
        ...mapFields(['loading', 'resultSearch']),
        calendarData: function() {
            let valueNum = undefined
            let retorno = []
            if (this.resultSearch != undefined && this.resultSearch.length > 0){
                for(let i = 0; i < this.resultSearch.length; i++){
                    let calendarDict = {
                        name: this.resultSearch[i].user,
                        start: Date.parse(this.resultSearch[i].date),
                        end: Date.parse(this.resultSearch[i].date),
                        color: this.colorByType(this.resultSearch[i].type),
                        timed: false,
                    }
                    if (valueNum == undefined){
                        valueNum = calendarDict.start
                    }
                    else if (calendarDict.start < valueNum) {
                        valueNum = calendarDict.start
                    }
                    retorno.push(calendarDict)
                }
                debugger
                let valueTemp = new Date(valueNum).toISOString();
                valueTemp = valueTemp.substring(0,8)+'01'
                if (this.value == undefined || this.value == ''){
                    this.value = valueTemp
                }
                
            }
            return retorno
        }
    },
    methods:{
        colorByType: function(type){
            let color = 'white'
            if (type == 'morning'){
                color = 'cyan'
            } else if (type == 'afternoon'){
                color = 'green'
            } else{
                color = 'white'
            }
            
            return color
        },
        getEventColor (event) {
            return event.color
        },
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

<style scoped>
.heightFull{
    height: calc(100vh - 370px);
}
</style>