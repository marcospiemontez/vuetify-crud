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
                <template v-slot:activator= {on}>
                  <v-btn
                    color="deep-purple accent-4"
                    dark
                    class="mb-2"
                    v-on="on"
                    @click="openModalAddProducts()"
                  >
                    Adicionar Produto
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-center">
                    <span class="text-h5 font-weight-bold"> Novo Produto </span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12" xl="6" lg="6" md="6" sm="11" xs="11"
                        >
                          <v-text-field
                            outlined
                            dense
                            v-model="registrationProduct.nameProduct"
                            label="Nome do Produto"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            outlined
                            dense
                            v-model="registrationProduct.purchaseDate"
                            label="Data da Compra"
                            v-mask="'##/##/####'"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            outlined
                            dense
                            v-model="registrationProduct.dueDate"
                            label="Data do Vencimento"
                            v-mask="'##/##/####'"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
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
                      @click="addProduct()"
                    >
                      Adicionar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeModalDeleteProduct()">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteProductConfirm()">OK</v-btn>
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
              @click="editItem(item)"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              text
              small
              color="red"
              @click="deleteItem(item)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default ({
  name: 'ProductsView',

  data: () => ({
    modalAddProducts: false,
    dialogDelete: false,
    dialogEditProduct: false,
    registrationProduct: {
      nameProduct: '',
      purchaseDate: '',
      dueDate: '',
      inventory: ''
    },

    headers: [
      { text: 'Produto', align: 'start', sortable: false, value: 'nameProduct' },
      { text: 'Data Compra', align: 'center', value: 'purchaseDate' },
      { text: 'Data Vencimento', align: 'center', value: 'dueDate' },
      { text: 'Estoque', align: 'center', value: 'inventory' },
      { text: 'Ações', value: 'actions', align: 'center', sortable: false }
    ]
  }),

  computed: {
    ...mapGetters('products', ['getProducts'])
  },

  methods: {
    ...mapActions('products', ['actionAddProducts']),

    openModalAddProducts () {
      this.modalAddProducts = true
    },

    closeModalAddProducts () {
      this.modalAddProducts = false
    },

    async addProduct () {
      if (this.registrationProduct.nameProduct !== '') {
        if (this.registrationProduct.purchaseDate !== '') {
          if (this.registrationProduct.dueDate !== '') {
            if (this.registrationProduct.inventory !== '') {
              await this.actionAddProducts({
                data: this.registrationProduct
              })
              this.clearInputs()
              this.closeModalAddProducts()
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

    closeModalDeleteProduct () {

    },

    deleteProductConfirm () {

    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    clearInputs () {
      this.registrationProduct = {}
    }
  }
})
</script>
