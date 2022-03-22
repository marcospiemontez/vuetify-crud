<template>
  <v-main>
    <div v-if="openLogin">
      <login-view :dadosRegistration="returnData" v-on:open-registration-event="openRegistrationEvent($event)" ref="LoginView" />
    </div>

    <div v-if="openRegistration">
      <registration-view v-on:return-data-login="receiveDataRegistration($event)" ref="RegistrationView" />
    </div>
  </v-main>
</template>

<script>
import LoginView from '../components/Auth/LoginView.vue'
import RegistrationView from '../components/Auth/RegistrationView.vue'

export default {
  components: { LoginView, RegistrationView },
  data () {
    return {
      openLogin: true,
      openRegistration: false,

      returnData: {
        email: ''
      }
    }
  },

  methods: {
    openRegistrationEvent (event) {
      this.openLogin = false
      this.openRegistration = event
    },

    receiveDataRegistration (event) {
      console.log('Dados retornados!', event)
      if (event.button === 'back') {
        this.openLogin = true
        this.openRegistration = false
      } else if (event.button === 'registration') {
        this.returnData.email = event
        this.openLogin = true
        this.openRegistration = false
      }
    }
  }
}
</script>
