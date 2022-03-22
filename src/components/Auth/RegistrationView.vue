<template>
  <v-app>
    <v-main class="d-flex align-center" fluid style="background-color: grey">
      <v-row class="justify-center">
        <v-col cols="12" xl="6" lg="6" md="8" sm="11" xs="10">
          <v-card color="indigo lighten-1 px-5 mx-2">
            <v-card-title class="justify-center">
              <span class="text-h5 font-weight-regular white--text">Cadastro</span>
            </v-card-title>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field outlined dense v-model="form.name" type="text" placeholder="Nome" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field outlined dense v-model="form.lastName" placeholder="Sobrenome" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field outlined dense v-model="form.cpf" placeholder="CPF" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field outlined dense v-model="form.age" placeholder="Idade" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field outlined dense v-model="form.birthdate" placeholder="Data Nascimento" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field outlined dense v-model="form.email" type="email" placeholder="E-mail" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field
                  v-model="form.password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  placeholder="Senha"
                  outlined
                  dense
                  @click:append="show1 = !show1"
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
                  dark
                />
              </v-col>
            </v-row>
            <v-row
              class="py-5"
              align="center"
              justify="space-between"
            >
              <v-spacer />
              <v-btn dark text @click="backLogin()" >Voltar</v-btn>
              <v-spacer />
              <v-btn dark @click="registrationUser()" >Cadastrar</v-btn>
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
                  }
                } else {
                  this.notify('Senha obrigatória')
                }
              } else {
                this.notify('Email obrigatório')
              }
            } else {
              this.notify('Data de Nascimento obrigatório')
            }
          } else {
            this.notify('Idade obrigatória')
          }
        } else {
          this.notify('CPF obrigatório')
        }
      } else {
        this.notify('Nome e Sobrenome são obrigatórios')
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
    }
  }
})
</script>
