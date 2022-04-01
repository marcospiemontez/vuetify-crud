<template>
  <v-container>
    <v-row class="justify-center align-content-center">
      <v-col cols="12">
        <!-- <div class="text-center">
          <v-pagination v-model="page" :length="6"></v-pagination>
        </div> -->
      </v-col>
    </v-row>

    <v-snackbar
      :color="color"
      content-class="text-center text-weight "
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default ({
  data () {
    return {
      text: '',
      color: '',
      timeout: 2500,
      snackbar: false,
      page: 1,
      size: 15
    }
  },

  mounted () {
    this.actionGetProducts({ page: this.page, size: this.size })
    console.log(this.getProducts)
  },

  computed: {
    ...mapGetters('products', ['getProducts'])
  },

  methods: {
    ...mapActions('products', ['actionGetProducts']),

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    }
  }
})
</script>
