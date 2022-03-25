<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
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
            <template v-slot:activator>
              <v-btn
                color="deep-purple accent-4"
                dark
                class="mb-2"
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
                        v-model="editedItem.name"
                        label="Nome do Produto"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.calories"
                        label="Data da Compra"
                        v-mask="'##/##/####'"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                      <v-text-field
                        outlined
                        dense
                        v-model="editedItem.fat"
                        label="Data do Vencimento"
                        v-mask="'##/##/####'"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="11" xs="11">
                      <v-text-field
                        outlined
                        dense
                        type="number"
                        v-model="editedItem.carbs"
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
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- v-slot:item.actions="{ item }" -->
      <template>
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

export default ({
  name: 'ProductsView',

  data: () => ({
    modalAddProducts: false,
    dialogDelete: false,
    editedItem: {
      nameProduct: '',
      purchaseDate: 0,
      dueDate: 0,
      inventory: 0
    },

    headers: [
      { text: 'Produto', align: 'start', sortable: false, value: 'nameProduct' },
      { text: 'Data Compra', value: 'purchaseDate' },
      { text: 'Data Vencimento', value: 'dueDate' },
      { text: 'Estoque', value: 'inventory' },
      { text: 'Ações', value: 'actions', sortable: false }
    ],

    desserts: []
  }),

  methods: {
    openModalAddProducts () {
      this.modalAddProducts = true
    },

    closeModalAddProducts () {
      this.modalAddProducts = false
    },

    addProduct () {}
  }
})
</script>
