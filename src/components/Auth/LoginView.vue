<template>
  <v-app>
    <v-main class="d-flex align-center" fluid style="background-color: grey">
      <v-row v-on="verificationProps()" class="justify-center">
        <v-col cols="12" xl="4" lg="5" md="6" sm="8" xs="11">
          <v-card color="indigo lighten-1">
            <v-card-title class="justify-center">
              <span class="text-h5 font-weight-regular white--text">Login</span>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-text-field outlined dense v-model="form.email" type="email" placeholder="Email" dark></v-text-field>
            </v-card-text>
            <v-card-text class="pt-0">
              <v-text-field outlined dense v-model="form.password" type="password" placeholder="Senha" dark></v-text-field>
            </v-card-text>
            <v-col class="pt-0">
              <v-btn block text class="white--text" @click="singIn()">Entrar</v-btn>
              <v-btn block text class="white--text" @click="openRegistration()">Cadastro</v-btn>
            </v-col>
          </v-card>
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

    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',

  data () {
    return {
      snackbar: false,
      text: '',
      timeout: 2000,
      color: '',
      form: {
        email: '',
        password: ''
      }
    }
  },

  props: {
    dadosRegistration: Object
  },

  methods: {
    ...mapActions('userAuth', ['actionUserAuth']),

    verificationProps () {
      if (this.dadosRegistration && this.dadosRegistration.email !== '') {
        this.form.email = this.dadosRegistration.email
      }
    },

    singIn () {
      if (this.form.email === 'marcos@teste.com' && this.form.password === '123') {
        this.actionUserAuth({
          dados: this.form
        })
      } else {
        this.notify('Senha Incorreta!', 'red')
      }
    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    openRegistration () {
      this.$emit('open-registration-event', true)
    }
  }
}
</script>
