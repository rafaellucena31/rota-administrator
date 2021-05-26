<template>
    <div>
        <common-nodata :condition="resultSearch != undefined && resultSearch.length > 0">
            <template v-slot:content>
                <v-data-table
                    :headers="headers"
                    :items="resultSearch"
                    :items-per-page="5"
                    :search="search"
                    :sort-by="['user']"
                    :sort-desc="[false]"
                    item-key="userId"
                    class="elevation-1"
                >
                <template v-slot:top>
                    <v-text-field
                        v-model="search"
                        label="Search"
                        class="mx-4"
                    ></v-text-field>
                </template>
                </v-data-table>
            </template>
        </common-nodata>
    </div>
</template>

<script>
import { STORE_NAME as USER_STORE_NAME, registerUserStore } from '~/store/user/register'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: `${USER_STORE_NAME}/getField`,
  mutationType: `${USER_STORE_NAME}/updateField`
})

export default {
    data () {
      return {
        search: '',
      }
    },
    beforeCreate() {
        registerUserStore(this.$store)
    },
    computed:{
        ...mapFields(['headers','resultSearch'])
    }
}
</script>