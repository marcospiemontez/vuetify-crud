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
              <v-toolbar-title>Entradas de Produtos</v-toolbar-title>
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
                    color="deep-purple accent-3"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
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
                        <v-col
                          cols="12" xl="6" lg="6" md="6" sm="11" xs="11"
                        >
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            dense
                            v-model="dataProducts.code"
                            label="Código do produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="entryProducts.name"
                            label="Código do produto"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            outlined
                            readonly
                            dense
                            v-model="dataProducts.name"
                            label="Nome do produto"
                          />
                          <v-text-field
                            v-else
                            outlined
                            readonly
                            dense
                            v-model="entryProducts.name"
                            label="Nome do produto"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            dense
                            outlined
                            readonly
                            v-model="dataProducts.quantity"
                            label="Quantidade Entrada"
                          />
                          <v-text-field
                            v-else
                            dense
                            outlined
                            readonly
                            v-model="entryProducts.quantity"
                            label="Quantidade Entrada"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            dense
                            outlined
                            readonly
                            v-model="dataProducts.price"
                            label="Preço unitário"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="entryProducts.price"
                            label="Preço unitário"
                          />
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                          <v-text-field
                            v-if="controlAddAndEditModal === 'editProduct'"
                            dense
                            outlined
                            readonly
                            v-model="dataProducts.priceTotal"
                            label="Valor total"
                          />
                          <v-text-field
                            v-else
                            outlined
                            dense
                            v-model="entryProducts.priceTotal"
                            label="Valor total"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="deep-purple accent-3"
                      text
                      @click="closeModalAddProducts()"
                    >
                      Fechar
                    </v-btn>
                    <v-btn
                      class="white--text"
                      color="deep-purple accent-3"
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
export default ({
  name: 'EntryProducts',

  data () {
    return {
      text: '',
      color: '',
      timeout: 2500,
      snackbar: false,
      controlAddAndEditModal: '',

      entryProducts: {
        code: ''
      },

      headers: [
        { text: 'Código', align: 'start', sortable: false, value: 'code' },
        { text: 'Produto', align: 'center', value: 'name' },
        { text: 'Estoque', align: 'center', value: 'inventory' },
        { text: 'Preço un.', align: 'center', value: 'price' },
        { text: 'Total', align: 'center', value: 'total' },
        { text: 'Ações', value: 'actions', align: 'center', sortable: false }
      ]
    }
  },

  mounted () {},

  computed: {},

  methods: {
    openModalAddProducts () {},

    closeModalAddProducts () {},

    sendFormProduct () {},

    openModalDeleteItem (item) {},

    closeModalDeleteProduct () {},

    async deleteProductConfirm () {},

    async openModalEditProduct (item) {},

    saveEditProduct () {},

    closeModalEditProduct () {},

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    clearInputs () {}
  }
})
</script>
