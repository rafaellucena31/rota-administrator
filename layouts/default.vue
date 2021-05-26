<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
    <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon></v-icon>
        <v-icon color="blue darken-2">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-list>
      
      <template
      v-for="(item,indice) in menuDataConditional"
      >
        <MenuItem v-if="item.visible && item.items.length == 0" :key="indice"  :itemMenu = "item"></MenuItem>
      </template>
    </v-list> 
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        text
        color="black"
      >
        <v-icon color="black darken-2">mdi-account-circle</v-icon>
        Welcome!, {{userLogged.name}}
      </v-btn>
      <v-btn
        text
        color="pink"
        @click="logoff"
      >
      
        <v-icon color="pink darken-2">mdi-exit-to-app</v-icon>
        Exit
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container :fill-height="layout.fillHeight" :fluid="layout.fluid">
        <nuxt />
      </v-container>
    </v-main>
    
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { registerUserStore } from '~/store/user/register'
import { registerRotaStore } from '~/store/rotas/register'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components:{
  },
  middleware: 'authenticated',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Rota Backend  Administrator'
    }
  },
  computed: {
    ...mapGetters(['menuDataConditional','userLogged', 'layout']),
  },
  methods: {
    ...mapActions(['doLogoffWithClearVuex']),
    logoff(){
      this.doLogoffWithClearVuex()
      this.$router.push({ path: '/login' })
    }
  },
  beforeCreate() {
    registerUserStore(this.$store)
    registerRotaStore(this.$store)
},
}
</script>
