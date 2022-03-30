<template>
  <div>
    <v-row class="justify-center align-content-center">
      <v-col cols="10">
        <v-card>
          <v-card-title class="d-flex justify-center">
            <span class="text-h5 font-weight-bold"> Novo Produto </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" xl="3" lg="3" md="3" sm="11" xs="11">
                <v-text-field
                  outlined
                  dense
                  v-model="registrationProduct.name"
                  label="Nome do produto"
                />
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="4" sm="11" xs="11">
                <v-text-field
                  outlined
                  dense
                  v-model="registrationProduct.description"
                  label="Descrição do produto"
                />
              </v-col>
              <v-col cols="12" xl="2" lg="2" md="2" sm="11" xs="11">
                <v-text-field
                  outlined
                  dense
                  v-model="registrationProduct.price"
                  label="Preço un."
                />
              </v-col>
              <v-col cols="12" xl="3" lg="3" md="3" sm="11" xs="11">
                <v-text-field
                  outlined
                  dense
                  v-model="registrationProduct.imgUrl"
                  label="Insira uma url para Imagem"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" xl="3" lg="3" md="3" sm="11" xs="11">
                <span class="text-h6">Categorias</span>
              <v-card class="mt-1">
                <v-card-subtitle v-for="(item, index) in allCategories" :key="index">
                  <p
                    @click="item.selected ? removeCategory(index) : addCategory(index)"
                    style="cursor:pointer"
                    :class="item.selected ? 'text-right ma-0 green--text' : 'ma-0'"
                  >
                    {{ item.name }}
                  </p>
                </v-card-subtitle>
              </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="sendFormProduct()" color="deep-purple accent-3">
              <span class="d-flex white--text">Adicionar</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="justify-center mt-10">
      <v-col cols="10">
        <v-data-table
          v-model="productsActive"
          :headers="headers"
          :items="productRegistrationDay"
          :single-select="singleSelect"
          item-key="name"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Itens cadastrados hoje</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
            </v-toolbar>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default ({
  name: 'RegistrationProducts',

  data () {
    return {
      text: '',
      color: '',
      timeout: 2500,
      snackbar: false,
      modalAddProducts: false,
      dialogActiveProduct: false,
      singleSelect: false,

      registrationProduct: {
        name: '',
        description: '',
        price: 0,
        imgUrl: '',
        discontinued: true,
        categories: []
      },

      allCategories: [],
      productRegistrationDay: [],
      productsActive: [],

      headers: [
        { text: 'Produto', align: 'left', value: 'name', sortable: false },
        { text: 'Descrição', align: 'left', value: 'description', sortable: false },
        { text: 'Preço un.', align: 'left', value: 'price', sortable: false },
        { text: 'Ações', align: 'center', value: 'actions', sortable: false }
      ]
    }
  },

  mounted () {
    this.getCategories.forEach(element => {
      this.allCategories.push({
        name: element.name,
        selected: false
      })
    })
  },

  computed: {
    ...mapGetters('products', ['getProducts']),
    ...mapGetters('categories', ['getCategories'])
  },

  methods: {
    ...mapActions('products', ['actionAddProducts', 'actionDeleteProduct', 'actionPutProducts']),

    sendFormProduct () {
      if (this.registrationProduct.name !== '') {
        if (this.registrationProduct.description !== '') {
          if (this.registrationProduct.price !== '') {
            if (this.registrationProduct.imgUrl !== '') {
              this.allCategories.forEach(element => {
                if (element.selected === true) {
                  this.registrationProduct.categories.push(element)
                }
              })
              this.actionAddProducts({
                data: this.registrationProduct
              })
              this.productRegistrationDay.push(this.registrationProduct)
              this.clearInputs()
              this.notify('Produto cadastrado com sucesso!', 'green')
            } else {
              this.notify('Preencha a quantidade', 'red')
            }
          } else {
            this.notify('Preencha a data de vencimento', 'red')
          }
        } else {
          this.notify('Preencha a data da compra', 'red')
        }
      } else {
        this.notify('Preencha o nome do produto', 'red')
      }
    },

    saveEditProduct () {
      if (this.dataProducts !== '') {
        this.actionPutProducts({
          data: this.dataProducts,
          index: this.indexEditProduct
        })
      }
      this.notify('Produto Atualizado com Sucesso!', 'green')
      this.closeModalEditProduct()
    },

    addCategory (index) {
      this.allCategories[index].selected = true
      this.notify('Categoria ' + this.allCategories[index].name + ' selecionada com sucesso!', 'green')
    },

    removeCategory (index) {
      this.allCategories[index].selected = false
    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    clearInputs () {
      this.registrationProduct = {
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        categories: []
      }
      this.allCategories.forEach(element => {
        if (element.selected === true) {
          element.selected = false
        }
      })
    }
  }
})
</script>
