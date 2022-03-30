
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

      <!-- <v-list
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

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Entradas</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

      </v-list> -->

      <v-list>
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

        <v-list-group
          v-for="item in itemsExpancion"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
          active-class="white--text"
        >

          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            :prepend-icon="child.icon"
            link
            active-class="white--text"
          >
            <v-list-item-icon>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
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
        { title: 'Categorias', icon: 'mdi-form-select', to: '/category' }
      ],
      itemsExpancion: [
        {
          title: 'Produtos',
          icon: 'mdi-food',
          items: [
            { title: 'Cadastro', active: true, icon: 'mdi-basket-plus-outline', to: '/registration-products' },
            { title: 'Entradas', active: true, icon: 'mdi-cart-plus', to: '/entry-products' }
          ]
        }
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
