<template>
  <v-container>
    <v-row class="justify-center align-content-center">
      <v-col cols="11">
        <v-data-table
          :headers="dessertHeaders"
          :items="getCategories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Tabela de Categorias</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="modalAddCategories"
                max-width="400px"
              >
                <template v-slot:activator= {on,attrs}>
                  <v-btn
                    color="deep-purple accent-4"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="openModalAddCategory()"
                  >
                    Adicionar Categoria
                  </v-btn>
                </template>
                  <v-card>
                    <v-card-title class="d-flex justify-center">
                      <span v-if="controlAddAndEditCategory === 'editCategory'" class="text-h5 font-weight-bold"> Editar Categoria </span>
                      <span v-else class="text-h5 font-weight-bold"> Nova Categoria </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row class="justify-center">
                          <v-col cols="12">
                            <v-text-field
                              v-if="controlAddAndEditCategory === 'editCategory'"
                              outlined
                              dense
                              ref="nameCategory"
                              v-model="dataCategory.name"
                              label="Nome da Categoria"
                            />
                            <v-text-field
                              v-else
                              outlined
                              dense
                              ref="nameCategory"
                              v-model="registrationCategory.name"
                              label="Nome da Categoria"
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
                        @click="closeModalAddCategory()"
                      >
                        Fechar
                      </v-btn>
                      <v-btn
                        class="white--text"
                        color="deep-purple accent-4"
                        @click="controlAddAndEditCategory === 'editCategory' ? saveEditCategory() : addCategory()"
                      >
                        {{ controlAddAndEditCategory === 'editCategory' ? 'Salvar' : 'Adicionar' }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-dialog>
              <v-dialog v-model="modalDeleteCategory" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Você tem certeza que deseja deletar este item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeModalDeleteCategory()">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteCategoryConfirm()">Sim</v-btn>
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
              @click="openModalEditCategory(item)"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              text
              small
              color="red"
              @click="openModalDeleteCategory(item)"
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
import { mapActions, mapGetters } from 'vuex'

export default ({
  name: 'ProductsView',

  data () {
    return {
      text: '',
      color: '',
      timeout: 2500,
      snackbar: false,
      modalAddCategories: false,
      modalDeleteCategory: false,
      controlAddAndEditCategory: '',
      propsCategory: '',

      registrationCategory: {
        name: ''
      },

      dataCategory: {},
      indexEditCategory: '',
      dessertHeaders: [
        { text: 'Categorias', align: 'left', value: 'name', sortable: false },
        { text: 'Ações', align: 'center', value: 'actions', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters('categories', ['getCategories'])
  },

  methods: {
    ...mapActions('categories', ['actionAddCategories', 'actionPutCategories', 'actionDeleteCategory']),

    openModalAddCategory () {
      this.controlAddAndEditCategory = 'addCategory'
      this.modalAddCategories = true
      // this.$refs.nameCategory.focus()
    },

    closeModalAddCategory () {
      this.modalAddCategories = false
    },

    async openModalEditCategory (item) {
      this.controlAddAndEditCategory = 'editCategory'
      this.dataCategory = item
      await this.getCategories.forEach(async (element, index) => {
        if (this.dataCategory.name === element.name) {
          this.indexEditCategory = await this.$lodash.cloneDeep(index)
        }
      })
      setTimeout(() => {
        this.modalAddCategories = true
      }, 250)
      // this.$refs.nameCategory.focus()
    },

    addCategory () {
      if (this.controlAddAndEditCategory === 'addCategory') {
        if (this.registrationCategory.name !== '') {
          this.actionAddCategories({
            data: this.registrationCategory
          })
          this.clearInputs()
          this.closeModalAddCategory()
        } else {
          this.notify('O nome da categoria é um campo obrigatório!', 'red')
        }
      }
    },

    saveEditCategory () {
      if (this.dataCategory.name !== '') {
        this.actionPutCategories({
          data: this.dataCategory,
          index: this.indexEditCategory
        })
      }
      this.notify('Produto Atualizado com Sucesso!', 'green')
      this.closeModalAddCategory()
    },

    openModalDeleteCategory (item) {
      this.propsCategory = item
      this.modalDeleteCategory = true
    },

    closeModalDeleteCategory () {
      this.modalDeleteCategory = false
    },

    async deleteCategoryConfirm () {
      if (this.propsCategory !== '') {
        let indexCategory = ''
        await this.getCategories.forEach(async (element, index) => {
          if (this.propsCategory.name === element.name) {
            indexCategory = index
          }
        })
        this.actionDeleteCategory({
          data: indexCategory
        })
      }
      this.notify('Categoria deletada com sucesso!', 'green')
      this.closeModalDeleteCategory()
    },

    notify (message, color) {
      this.text = message
      this.color = color
      this.snackbar = true
    },

    clearInputs () {
      this.registrationCategory = {
        name: ''
      }
    }
  }
})
</script>
