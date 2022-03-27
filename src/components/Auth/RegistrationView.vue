<template>
  <v-app>
    <v-main class="d-flex align-center" fluid style="background-color: grey">
      <v-row class="justify-center">
        <v-col cols="12" xl="6" lg="6" md="8" sm="11" xs="10">
          <v-card color="indigo lighten-1 px-5 mx-2">
            <v-card-title class="justify-center">
              <span class="text-h5 font-weight-regular white--text">Cadastro</span>
            </v-card-title>
            <v-form>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field outlined dense v-model="form.name" type="text" placeholder="Nome" ref="name" dark />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field outlined dense v-model="form.lastName" placeholder="Sobrenome" dark />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field
                    outlined
                    dense
                    v-model="form.cpf"
                    placeholder="CPF"
                    ref="cpf"
                    dark
                    v-mask="'###.###.###-##'"
                    :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório', validarCPF]"
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field outlined dense v-model="form.age" type="number" placeholder="Idade" ref="age" dark />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field outlined dense v-model="form.birthdate" v-mask="'##/##/####'" placeholder="Data Nascimento" ref="birthdate" dark />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field outlined dense v-model="form.email" type="email" placeholder="E-mail" ref="email" dark />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field
                    v-model="form.password"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    placeholder="Senha"
                    outlined
                    dense
                    ref="password"
                    dark
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                  <v-text-field
                    v-model="form.checkPassword"
                    :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    placeholder="Senha"
                    outlined
                    dense
                    @click:append="show2 = !show2"
                    ref="checkPassword"
                    dark
                  />
                </v-col>
              </v-row>
            </v-form>
            <v-row
              class="py-5"
              align="center"
              justify="space-between"
            >
              <v-spacer />
              <v-btn dark text @click="backLogin()" >Voltar</v-btn>
              <v-spacer />
              <v-btn class="white--text" color="deep-purple accent-4" @click="registrationUser()" >Cadastrar</v-btn>
              <v-spacer />
            </v-row>
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

export default ({
  name: 'RegistrationView',
  data () {
    return {
      show1: false,
      show2: false,
      snackbar: false,
      text: '',
      timeout: 2500,
      color: '',
      form: {
        name: '',
        lastName: '',
        cpf: '',
        age: '',
        birthdate: '',
        email: '',
        password: '',
        checkPassword: ''
      }
    }
  },

  mounted () {
    console.log('entrou!')
  },

  methods: {
    ...mapActions('userAuth', ['actionRegistrationUser']),
    registrationUser () {
      if (this.form.name !== '' && this.lastName !== '') {
        if (this.form.cpf !== '') {
          if (this.form.age !== '') {
            if (this.form.birthdate !== '') {
              if (this.form.email !== '') {
                if (this.form.password !== '') {
                  if (this.form.password === this.form.checkPassword) {
                    this.actionRegistrationUser({
                      dados: this.form
                    })
                    this.$emit('return-data-login', { button: 'registration', email: this.form.email })
                    this.clearInputs()
                    this.notify('Cadastro Concluido com Sucesso!', 'green')
                  } else {
                    this.notify('As senhas DEVEM ser iguais')
                    this.$refs.checkPassword.focus()
                  }
                } else {
                  this.notify('Senha obrigatória')
                  this.$refs.password.focus()
                }
              } else {
                this.notify('Email obrigatório')
                this.$refs.email.focus()
              }
            } else {
              this.notify('Data de Nascimento obrigatório')
              this.$refs.birthdate.focus()
            }
          } else {
            this.notify('Idade obrigatória')
            this.$refs.age.focus()
          }
        } else {
          this.notify('CPF obrigatório')
          this.$refs.cpf.focus()
        }
      } else {
        this.notify('Nome e Sobrenome são obrigatórios')
        this.$refs.name.focus()
      }
    },

    backLogin () {
      this.$emit('return-data-login', { button: 'back', email: '' })
    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    clearInputs () {
      this.form = {}
    },

    validarCPF (cpf) {
      let add
      let rev
      cpf = cpf.replace(/\.|-/g, '')
      if (cpf === '') return 'CPF inválido!'
      // Elimina CPFs invalidos conhecidos
      if (
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
      ) {
        return 'CPF inválido!'
      }
      // Valida 1o digito
      add = 0
      for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
      rev = 11 - (add % 11)
      if (rev === 10 || rev === 11) rev = 0
      if (rev !== parseInt(cpf.charAt(9))) return 'CPF inválido!'
      // Valida 2o digito
      add = 0
      for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
      rev = 11 - (add % 11)
      if (rev === 10 || rev === 11) rev = 0
      if (rev !== parseInt(cpf.charAt(10))) return 'CPF inválido!'
      return true
    }
  }
})
</script>
