<template>
  <v-container
    id="products"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row class="back">
        <v-col class="col-xs-8" md="6">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            返回上一页
          </v-btn>
        </v-col>
        <v-col class="col-xs-4">
        </v-col>
      </v-row>

      <v-row dense>
        <v-card
          class="mx-auto"
          width="100%"
        >

          <v-list two-line>
            <template v-for="(product, index) in productList">
              <v-hover :key="product.title" v-slot:default="{ hover }">
                <v-list-item :class="hover ? 'elevation-12' : ''" @click="test">
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>

                  <router-link :to="{name: 'Product', params: {id: product.uuid}}">
                    <v-list-item-avatar>
                      <template v-if="index % 2">
                        <icon-features2 width="50" height="50"></icon-features2>
                      </template>
                      <template v-else>
                        <icon-features3 width="50" height="50"></icon-features3>
                      </template>
                    </v-list-item-avatar>
                  </router-link>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>{{ product.title }}</span>
                      <span>{{ product.field_benefits }}</span>
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon class="material-icons-outlined" @click="previewProduct(product)">pageview</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon @click="favoritesStar">
                      <v-icon
                        v-if="!starActive"
                        color="grey lighten-1"
                      >
                        star_border
                      </v-icon>

                      <v-icon
                        v-else
                        color="yellow"
                      >
                        star
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>
              <v-divider
                v-if="index + 1 < productList.length"
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
        <product-details @fatherMethod="closeRequestDialog()" :product="product"></product-details>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  // import IconDispersions from '../components/svg/Dispersions'
  import ProductDetails from '../components/ProductDetails'
  import IconFeatures2 from '../components/svg/features/Features-2'
  import IconFeatures3 from '../components/svg/features/Features-3'
  import { mapState } from 'vuex'

  export default {
    components: { ProductDetails, IconFeatures2, IconFeatures3 },

    computed: {
      ...mapState({
        requestProductDialog: state => state.core.requestProductDialog,
        productList: state => state.product.productList
      }),
    },

    data: () => ({
      selected: [2],
      starActive: false,
      product: {},
    }),

    mounted () {
      let vm = this
      vm.$loading.show()
      vm.$store.dispatch('getProductList').then((result) => {
        if (result && result.status === 200) {
          console.log(result, vm.productList)
          vm.$loading.hide()
        }
      })
    },

    methods: {
      favoritesStar () {
        this.starActive = !this.starActive
      },

      previewProduct (product) {
        this.product = product
        this.$store.state.core.requestProductDialog = true
      },

      closeRequestDialog () {
        this.$store.state.core.requestProductDialog = false
      },
    }
  }
</script>
<style lang="scss" scoped>
  #products {
    max-width: 1318px;

    .v-list {

      .v-avatar {

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
