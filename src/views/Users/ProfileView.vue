<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="11">
        <v-card color="indigo lighten-1 px-5 mx-2">
          <v-card-title class="justify-center">
            <span class="text-h5 font-weight-regular white--text">Cadastro</span>
          </v-card-title>
          <v-form>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field :readonly="permissionEdit" outlined dense v-model="formProfile.name" type="text" placeholder="Nome" ref="name" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field :readonly="permissionEdit" outlined dense v-model="formProfile.lastName" placeholder="Sobrenome" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field
                  :readonly="permissionEdit"
                  outlined
                  dense
                  v-model="formProfile.cpf"
                  placeholder="CPF"
                  ref="cpf"
                  dark
                  v-mask="'###.###.###-##'"
                  :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório', ValidateCpf]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field :readonly="permissionEdit" outlined dense v-model="formProfile.age" type="number" placeholder="Idade" ref="age" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field :readonly="permissionEdit" outlined dense v-model="formProfile.birthdate" v-mask="'##/##/####'" placeholder="Data Nascimento" ref="birthdate" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field :readonly="permissionEdit" outlined dense v-model="formProfile.email" type="email" placeholder="E-mail" ref="email" dark></v-text-field>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                <v-text-field
                  :readonly="permissionEdit"
                  v-model="formProfile.password"
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
                  :readonly="permissionEdit"
                  v-model="formProfile.checkPassword"
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
            <v-btn dark text @click="permissionEditInputs()" >Editar</v-btn>
            <v-spacer />
            <v-btn class="white--text" color="deep-purple accent-3" @click="updateDataUsers()" >Salvar</v-btn>
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
  </v-container>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default ({
  name: 'ProfileView',

  data () {
    return {
      show1: false,
      show2: false,
      snackbar: false,
      color: '',
      timeout: 2500,
      text: '',
      permissionEdit: true,

      formProfile: {}
    }
  },

  async mounted () {
    this.formProfile = await this.$lodash.cloneDeep(this.getUser)
  },

  computed: {
    ...mapGetters('userAuth', ['getUser', 'getUsers'])
  },

  methods: {
    ...mapActions('userAuth', ['actionPutDataUser']),

    permissionEditInputs () {
      if (this.permissionEdit === true) {
        this.permissionEdit = false
        this.$refs.name.focus()
      } else {
        this.permissionEdit = true
      }
    },

    ValidateCpf (cpf) {
      let add
      let rev
      cpf = cpf?.replace(/\.|-/g, '')
      if (cpf === '') return 'CPF inválido!'
      // Elimina CPFs invalidos conhecidos
      if (
        cpf?.length !== 11 ||
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
    },

    async updateDataUsers () {
      if (this.formProfile.name !== '' && this.formProfile.lastName !== '') {
        if (this.formProfile.cpf !== '') {
          if (this.formProfile.birthdate !== '') {
            if (this.formProfile.email !== '') {
              if (this.formProfile.password !== '') {
                if (this.formProfile.password === this.formProfile.checkPassword) {
                  await this.actionPutDataUser({
                    dados: this.formProfile
                  })
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
          this.notify('CPF obrigatório')
          this.$refs.cpf.focus()
        }
      } else {
        this.notify('Nome e Sobrenome são obrigatórios')
        this.$refs.name.focus()
      }
    },

    clearInputs () {
      this.formProfile = {}
    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    }
  }
})
</script>
