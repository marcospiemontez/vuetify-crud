<template>
  <v-container>
    <v-row class="justify-center align-content-center">
      <v-col cols="11">
        <v-data-table
          :headers="headers"
          :items="getProducts"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Cadastro de Produtos</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="modalAddProducts"
                max-width="500px"
              >
                <template v-slot:activator= {on,attrs}>
                  <v-btn
                    color="deep-purple accent-4"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="openModalAddProducts()"
                  >
                    Adicionar Produto
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="d-flex justify-center">
                    <span v-if="controlAddAndEditModal === 'editProduct'" class="text-h5 font-weight-bold"> Editar Produto </span>
                    <span v-else class="text-h5 font-weight-bold"> Novo Produto </span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="pb-0">
                          <v-select
                            v-if="controlAddAndEditModal === 'editProduct'"
                            :items="allCategories"
                            label="Categoria do produto"
                            v-model="dataProducts.categories"
                            multiple
                            clearable
                            chips
                            outlined
                            dense
                            solo
                            flat
                          />
                          <v-select
                            v-else
                            :items="allCategories"
                            label="Categoria do produto"
                            v-model="registrationProduct.categories"
                            multiple
                            clearable
                            chips
                            outlined
                            dense
                            solo
                            flat
                          />
                        </v-col>
                        <v-col
                          cols="12" xl="6" lg="6" md="6" sm="11" xs="11"
                        >
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.code"
                            label="Código do Produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.code"
                            label="Código do Produto"
                          />
                        </v-col>
                        <v-col
                          cols="12" xl="6" lg="6" md="6" sm="11" xs="11"
                        >
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.name"
                            label="Nome do Produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.name"
                            label="Nome do Produto"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.description"
                            label="Descrição do Produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.description"
                            label="Descrição do Produto"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.price"
                            label="Preço unitário"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.price"
                            label="Preço unitário"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.imgUrl"
                            label="Insira a url da imagem do produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.imgUrl"
                            label="Insira a url da imagem do produto"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="deep-purple accent-4"
                      text
                      @click="closeModalAddProducts()"
                    >
                      Fechar
                    </v-btn>
                    <v-btn
                      class="white--text"
                      color="deep-purple accent-4"
                      @click="addProduct()"
                    >
                      {{ controlAddAndEditModal === 'editProduct' ? 'Salvar' : 'Adicionar' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Você tem certeza que deseja deletar este item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeModalDeleteProduct()">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteProductConfirm()">Sim</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              text
              small
              color="black"
              @click="openModalEditProduct(item)"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              text
              small
              color="red"
              @click="openModalDeleteItem(item)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default ({
  name: 'ProductsView',

  data () {
    return {
      text: '',
      color: '',
      timeout: 2500,
      snackbar: false,
      modalAddProducts: false,
      dialogDelete: false,
      dialogEditProduct: false,
      controlAddAndEditModal: '',
      propsProducts: '',

      registrationProduct: {
        name: '',
        description: '',
        price: 0,
        imgUrl: '',
        categories: []
      },

      allCategories: [],
      dataProducts: {},
      indexEditProduct: '',

      headers: [
        { text: 'Código', align: 'start', sortable: false, value: 'code' },
        { text: 'Produto', align: 'start', sortable: false, value: 'name' },
        { text: 'Descrição', align: 'center', value: 'description' },
        { text: 'Preço', align: 'center', value: 'price' },
        { text: 'Link imagem', align: 'center', value: 'imgUrl' },
        { text: 'Ações', value: 'actions', align: 'center', sortable: false }
      ]
    }
  },

  mounted () {
    this.getCategories.forEach(element => {
      this.allCategories.push(element.name)
    })
  },

  computed: {
    ...mapGetters('products', ['getProducts']),
    ...mapGetters('categories', ['getCategories'])
  },

  methods: {
    ...mapActions('products', ['actionAddProducts', 'actionDeleteProduct', 'actionPutProducts']),

    openModalAddProducts () {
      this.controlAddAndEditModal = 'addProduct'
      this.modalAddProducts = true
    },

    closeModalAddProducts () {
      this.modalAddProducts = false
    },

    sendFormProduct () {
      if (this.controlAddAndEditModal === 'addProduct') {
        if (this.registrationProduct.categories.length > 0) {
          if (this.registrationProduct.name !== '') {
            if (this.registrationProduct.description !== '') {
              if (this.registrationProduct.price !== '') {
                if (this.registrationProduct.imgUrl !== '') {
                  this.actionAddProducts({
                    data: this.registrationProduct
                  })
                  this.clearInputs()
                  this.closeModalAddProducts()
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
        } else {
          this.notify('Informe uma categoria para o produto', 'red')
        }
      } else if (this.controlAddAndEditModal === 'editProduct') {
        if (this.dataProducts.categories.length > 0) {
          if (this.dataProducts.name !== '') {
            if (this.dataProducts.description !== '') {
              if (this.dataProducts.price !== '') {
                if (this.dataProducts.imgUrl !== '') {
                  this.actionAddProducts({
                    data: this.dataProducts
                  })
                  this.clearInputs()
                  this.closeModalAddProducts()
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
        } else {
          this.notify('Informe uma categoria para o produto', 'red')
        }
      }
    },

    openModalDeleteItem (item) {
      this.propsProducts = item
      this.dialogDelete = true
    },

    closeModalDeleteProduct () {
      this.dialogDelete = false
    },

    async deleteProductConfirm () {
      if (this.propsProducts !== '') {
        let indexProduct = ''
        await this.getProducts.forEach((element, index) => {
          if (this.propsProducts.name === element.name) {
            indexProduct = index
          }
        })
        this.actionDeleteProduct({
          data: indexProduct
        })
      }
      this.notify('Produto deletado com sucesso!', 'green')
      this.closeModalDeleteProduct()
    },

    async openModalEditProduct (item) {
      this.controlAddAndEditModal = 'editProduct'
      this.dataProducts = item
      await this.getProducts.forEach(async (element, index) => {
        if (this.dataProducts.name === element.name) {
          this.indexEditProduct = await this.$lodash.cloneDeep(index)
        }
      })
      setTimeout(() => {
        this.modalAddProducts = true
      }, 250)
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

    closeModalEditProduct () {
      this.controlAddAndEditModal = ''
      this.modalAddProducts = false
    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    clearInputs () {
      this.registrationProduct = {
        categories: '',
        name: '',
        description: '',
        price: '',
        imgUrl: ''
      }
    }
  }
})
</script>
