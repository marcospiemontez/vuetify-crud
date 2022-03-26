<template>
  <v-container>
    <v-row class="justify-center align-content-center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="getProducts"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Tabela de Produtos</v-toolbar-title>
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
                  <v-card-title class="text-center">
                    <span v-if="controlAddAndEditModal === 'editProduct'" class="text-h5 font-weight-bold"> Editar Produto </span>
                    <span v-else class="text-h5 font-weight-bold"> Novo Produto </span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12" xl="6" lg="6" md="6" sm="11" xs="11"
                        >
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.nameProduct"
                            label="Nome do Produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.nameProduct"
                            label="Nome do Produto"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.purchaseDate"
                            label="Data da Compra"
                            v-mask="'##/##/####'"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.purchaseDate"
                            label="Data da Compra"
                            v-mask="'##/##/####'"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.dueDate"
                            label="Data do Vencimento"
                            v-mask="'##/##/####'"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="registrationProduct.dueDate"
                            label="Data do Vencimento"
                            v-mask="'##/##/####'"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            type="number"
                            v-model="dataProducts.inventory"
                            label="Quantidade comprada"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            type="number"
                            v-model="registrationProduct.inventory"
                            label="Quantidade comprada"
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
                      @click="controlAddAndEditModal === 'editProduct' ? saveEditProduct() : addProduct()"
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
        nameProduct: '',
        purchaseDate: '',
        dueDate: '',
        inventory: ''
      },
      dataProducts: {},
      indexEditProduct: '',
      headers: [
        { text: 'Produto', align: 'start', sortable: false, value: 'nameProduct' },
        { text: 'Data Compra', align: 'center', value: 'purchaseDate' },
        { text: 'Data Vencimento', align: 'center', value: 'dueDate' },
        { text: 'Estoque', align: 'center', value: 'inventory' },
        { text: 'Ações', value: 'actions', align: 'center', sortable: false }
      ]

    }
  },

  computed: {
    ...mapGetters('products', ['getProducts'])
  },

  methods: {
    ...mapActions('products', ['actionAddProducts', 'actionDeleteProducts', 'actionPutProducts']),

    openModalAddProducts () {
      this.controlAddAndEditModal = 'addProduct'
      this.modalAddProducts = true
    },

    closeModalAddProducts () {
      this.modalAddProducts = false
    },

    addProduct () {
      if (this.registrationProduct.nameProduct !== '') {
        if (this.registrationProduct.purchaseDate !== '') {
          if (this.registrationProduct.dueDate !== '') {
            if (this.registrationProduct.inventory !== '') {
              if (this.controlAddAndEditModal === 'editProduct') {
                this.actionPutProducts({
                  data: this.dataProducts
                })
                this.clearInputs()
                this.closeModalAddProducts()
                this.notify('Produto editado com sucesso!', 'green')
              } else {
                this.actionAddProducts({
                  data: this.registrationProduct
                })
                this.clearInputs()
                this.closeModalAddProducts()
                this.notify('Produto cadastrado com sucesso!', 'green')
              }
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
          if (this.propsProducts.nameProduct === element.nameProduct) {
            indexProduct = index
          }
        })
        this.actionDeleteProducts({
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
        if (this.dataProducts.nameProduct === element.nameProduct) {
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
        nameProduct: '',
        purchaseDate: '',
        dueDate: '',
        inventory: ''
      }
    }
  }
})
</script>
