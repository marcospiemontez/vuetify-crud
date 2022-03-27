
<template>
  <v-app style="background-color: #272727">
    <v-navigation-drawer
      class="deep-purple accent-4"
      dark
      v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Modelo de Treino
          </v-list-item-title>
          <v-list-item-subtitle>
            Vamos la!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template>
        <div class="pa-2 mt-5">
          <v-btn block @click="logout()">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app dark class="deep-purple accent-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title >Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main class="px-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Perfil', icon: 'mdi-view-dashboard', to: '/profile' },
        { title: 'Categorias', icon: 'mdi-form-select', to: '/category' },
        { title: 'Produtos', icon: 'mdi-food', to: '/products' }
      ]
    }
  },

  computed: {
    ...mapGetters('userAuth', ['getUser'])
  },

  methods: {
    ...mapActions('userAuth', ['actionSignOutUser']),

    logout () {
      this.actionSignOutUser()
      this.$router.push({ path: '/' })
    }
  }
}
</script>
