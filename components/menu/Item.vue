<template>
        <v-list-item
          :nuxt="true"
          :to="itemMenu.action"
          :key="$attrs.chave"
          router
          
        >
          <v-list-item-action v-if="itemMenu.icon">
            <v-icon>{{ itemMenu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="itemMenu.title" />
          </v-list-item-content>
        </v-list-item>
</template>
<script>
export default {
    inheritAttrs: true,
    props: ['itemMenu'],
    created() {
        
    }
}
</script>