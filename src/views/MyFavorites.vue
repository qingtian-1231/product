<template>
  <v-container id="my-favorite" tag="section">
    <v-col lg="12" md="12" sm="12" class="product-list">
      <v-row class="back">
        <v-col class="col-xs-3" md="3">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            {{ $t('global.goBack') }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row dense>
        <h1>
          <v-icon class="material-icons-outlined">star_outline</v-icon>
          {{ $t('global.myFavoriteProduct') }}
        </h1>
        <v-card class="mx-auto product-list fade-enter-active" width="100%">
          <v-list two-line>
            <template v-for="(product, index) in favoriteProductList">
              <v-hover :key="product.title" v-slot:default="{ hover }">
                <v-list-item
                  :class="{
                      'elevation-12': hover
                    }"
                >

                  <v-list-item-avatar @click="goProductDetail(product.uuid, 1)">
                    <icon
                      width="50"
                      height="50"
                      :icon-name="product.parentTid"
                      :bg-color-class="product.brand"
                    >
                    </icon>
                  </v-list-item-avatar>

                  <v-list-item-content @click="goProductDetail(product.uuid, 1)">
                    <v-list-item-title>
                      <span>{{ product.title }}</span>
                      <span>{{ product.benefits }}</span>
                    </v-list-item-title>
                  </v-list-item-content>

                  <template>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          class="material-icons-outlined"
                          @click="previewProduct(product)"
                        >pageview</v-icon
                        >
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-btn
                        icon
                        @click="favoritesProductStar('product', 'delete', product.uuid)"
                      >
                        <v-icon color="yellow">
                          star
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-hover>
              <v-divider
                v-if="index + 1 < favoriteProductList.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-row>
    </v-col>

    <v-col lg="12" md="12" sm="12" class="formulation-list">
      <v-row dense>
        <h1>
          <v-icon class="material-icons-outlined">star_outline</v-icon>
          {{ $t('global.myFavoriteFormulation') }}
        </h1>
        <v-card
          class="mx-auto formulation-list"
          width="100%"
        >

          <v-list two-line>
            <template v-for="(formulation, index) in favoriteFormulationList">
              <v-hover :key="index" v-slot:default="{ hover }">
                <v-list-item
                  :class="{
                    'elevation-12': hover
                    }"
                >

                  <v-list-item-avatar @click="goFormulationDetail(formulation.uuid, 1)">
                    <icon
                      width="50"
                      height="50"
                      icon-name="14"
                      bg-color-class="Hydropalat"
                    >
                    </icon>
                  </v-list-item-avatar>

                  <v-list-item-content @click="goFormulationDetail(formulation.uuid, 1)">
                    <v-list-item-title>
                      <span>{{ formulation.formulation_name }}</span>
                      <span>{{ formulation.formulationbenefits }}</span>
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon class="material-icons-outlined" @click="previewFormulation(formulation)">pageview</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="favoritesFormulationStar('formulation', 'delete', formulation.uuid)"
                    >
                      <v-icon
                        color="yellow"
                      >
                        star
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>

              <v-divider
                v-if="index + 1 < favoriteFormulationList.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-row>
    </v-col>
    <v-dialog
      v-model="requestProductDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="344px"
    >
      <v-card>
        <product-details
          @fatherMethod="closeProductRequestDialog()"
          :product="selectedProduct"
          :preview-product-basic="previewProductBasicInformation"
          :preview-product-prop="previewProductProperties"
        >
        </product-details>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="requestFormulationDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="344px"
    >
      <v-card>
        <formulation-details
          @fatherMethod="closeFormulationRequestDialog()"
          :formulation="selectedFormulation"
          :preview-formulation-prop="previewFormulationProperties"
          :preview-formulation-basic="previewFormulationBasicInformation"
        >
        </formulation-details>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Icon from "../components/svg/features/Icon"
  import ProductDetails from "../components/ProductDetails"
  import formulationDetails from '../components/FormulationDetails'
  import { mapState } from 'vuex'

  export default {
    components: { Icon, ProductDetails, formulationDetails },

    name: 'my-favorites',

    data: () => ({
      formulationQuery: {},
      selectedProduct: {},
    }),

    computed: {
      ...mapState({
        requestProductDialog: state => state.core.requestProductDialog,
        requestFormulationDialog: state => state.core.requestFormulationDialog,
        previewProductBasicInformation: state => state.product.productBasicInformation,
        previewProductProperties: state => state.product.productProperties,
        previewFormulationBasicInformation: state => state.formulation.formulationBasicInformation,
        previewFormulationProperties: state => state.formulation.formulationProperties,
        isLogin: state => state.user.isLogin,
        currentUser: state => state.user.currentUser,
        favoriteProductList: state => state.user.favoriteProductList,
        favoriteFormulationList: state => state.user.favoriteFormulationList
      }),
      displayName: function () {
        return (this.currentUser) ? this.currentUser.name : '未知名称'
      }
    },

    created () {
      if (!this.isLogin) {
        window.location = '/'
      }
    },

    methods: {
      previewProduct(product) {
        let vm = this;
        vm.$loading.show();
        vm.$store
          .dispatch("getProductDetails", {
            id: product.uuid
          })
          .then(() => {
            vm.selectedProduct = product;
            vm.$loading.hide();
            vm.$store.state.core.requestProductDialog = true;
          });
      },

      previewFormulation (formulation) {
        let vm = this
        vm.$loading.show()
        vm.$store.dispatch('getFormulationDetails', {
          id: formulation.uuid
        }).then(() => {
          vm.selectedFormulation = formulation
          vm.$loading.hide()
          vm.$store.state.core.requestFormulationDialog = true
        })
      },

      closeFormulationRequestDialog () {
        this.$store.state.core.requestFormulationDialog = false
      },

      closeProductRequestDialog() {
        this.$store.state.core.requestProductDialog = false;
      },

      favoritesProductStar(type, action, productId) {
        let vm = this;
        let favoriteInfo = {};
        if (!vm.isLogin) {
          vm.$store.commit("open_login_dialog");
        } else {
          favoriteInfo.type = type;
          favoriteInfo.action = action;
          favoriteInfo.id = productId;
          vm.$loading.show();
          vm.$store
            .dispatch("processFavoriteForUser", favoriteInfo)
            .then(result => {
              if (result.status === 200) {
                vm.$store.commit('removeFavoriteProduct', productId)
              }

              vm.$loading.hide();
            });
        }
      },

      favoritesFormulationStar (type, action, formulationId) {
        let vm = this
        let favoriteInfo = {}
        if (!vm.isLogin) {
          vm.$store.commit('open_login_dialog')
        } else {
          favoriteInfo.type = type
          favoriteInfo.action = action
          favoriteInfo.id = formulationId
          vm.$loading.show()
          vm.$store.dispatch('processFavoriteForUser', favoriteInfo).then(result => {
            if (result.status === 200) {
              vm.$store.commit('removeFavoriteFormulation', formulationId)
            }

            vm.$loading.hide()
          })
        }
      },

      goProductDetail(productId, UnLocked) {
        let vm = this;
        if (UnLocked) {
          vm.$router.push({ path: `/product/${productId}` });
        } else {
          if (!vm.isLogin) {
            vm.$store.commit("open_login_dialog");
          } else {
            vm.$router.push({ path: `/product/${productId}` });
          }
        }
      },

      goFormulationDetail (formulationId, UnLocked) {
        let vm = this
        if (UnLocked) {
          vm.$router.push({path:`/formulation/${formulationId}`})
        } else {
          if (!vm.isLogin) {
            vm.$store.commit('open_login_dialog')
          } else {
            vm.$router.push({path:`/formulation/${formulationId}`})
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  #my-favorite {
    h1 {
      margin: 0;
      line-height: 65px;
      padding-left: 70px;
      padding-top: 8px;
      width: 100%;

      .v-icon {
        height: 64px;
        margin: 0 10px 0 -70px;
        max-height: 64px;
        max-width: 64px;
        width: 64px;
        font-size: 40px;
      }
    }

    .v-list {
      padding: 0;
      border-bottom: 1px solid #ddd;

      & > .v-list-item {
        &.locked {
          background-color: rgba(226, 213, 213, 0.32);
          color: #655c5c !important;

          a {
            color: #655c5c;
          }
        }

        .v-list-item__content {
          cursor: pointer;
        }
      }

      .v-avatar {
        cursor: pointer;

        i {
          height: 40px;
          width: 40px;
          margin-top: 0;
        }
      }

      .v-list-item__title {
        span {
          &:first-child {
            width: 40%;
            display: inline-block;
          }
        }
      }
    }
  }
</style>

