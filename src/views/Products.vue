<template>
  <v-container id="products" tag="section">
    <v-col lg="12" md="12" sm="12">
      <v-row class="back">
        <v-col class="col-xs-6" md="6">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            返回上一页
          </v-btn>
        </v-col>
        <v-col class="col-xs-6">
          <v-btn
            icon
            class="float-right"
            color="secondary"
            @click="showProductCard()"
          >
            <v-icon>apps</v-icon>
          </v-btn>

          <v-btn
            icon
            class="float-right"
            color="secondary"
            @click="(showList = true), (showCard = false)"
          >
            <v-icon>view_headline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row dense>
        <template v-if="showList">
          <v-card class="mx-auto product-list fade-enter-active" width="100%">
            <v-list two-line>
              <template v-for="(product, index) in productList">
                <v-hover :key="product.title" v-slot:default="{ hover }">
                  <v-list-item
                    :class="{
                      'elevation-12': hover,
                      locked: !parseInt(product.field_is_public) && !isLogin
                    }"
                  >
<!--                    <v-list-item-action-->
<!--                      v-if="!!parseInt(product.field_is_public) || isLogin"-->
<!--                    >-->
<!--                      <v-checkbox v-model="showCard" color="primary" hide-details></v-checkbox>-->
<!--                    </v-list-item-action>-->

                    <v-list-item-avatar
                      @click="goProductDetail(product.uuid,!!parseInt(product.field_is_public))"
                    >
                      <template v-if="index % 2">
                        <icon-features2 width="50" height="50"></icon-features2>
                      </template>
                      <template v-else>
                        <icon-features3 width="50" height="50"></icon-features3>
                      </template>
                    </v-list-item-avatar>

                    <v-list-item-content
                      @click="
                        goProductDetail(
                          product.uuid,
                          !!parseInt(product.field_is_public)
                        )
                      "
                    >
                      <v-list-item-title>
                        <span>{{ product.title }}</span>
                        <span>{{ product.field_benefits }}</span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <template
                      v-if="!!parseInt(product.field_is_public) || isLogin"
                    >
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
                          @click="
                            favoritesProductStar(
                              'product',
                              product.isFeature ? 'delete' : 'add',
                              product.uuid
                            )
                          "
                        >
                          <v-icon
                            v-if="!product.isFeature"
                            color="grey lighten-1"
                          >
                            star_border
                          </v-icon>
                          <v-icon v-else color="yellow">
                            star
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>

                    <template v-else>
                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon class="material-icons-outlined">lock</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </v-hover>
                <v-divider
                  v-if="index + 1 < productList.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
            <infinite-loading
              :identifier="infiniteId"
              @infinite="infiniteHandler"
              ref="infiniteLoading"
              :distance="distance"
            >
              <span slot="no-more">没有更多产品了</span>
              <span slot="no-results">没有更多产品了</span>
            </infinite-loading>
          </v-card>
        </template>

        <template v-else-if="showCard">
          <v-col v-for="(product, index) in productList" cols="3" :key="index" class="fade-enter-active">
            <v-card
              :key="index"
              :class="(!parseInt(product.field_is_public) && !isLogin) ? 'mx-auto product-list locked' : 'mx-auto product-list'"
              width="100%"
              height="500"
            >
              <div id="product-details">
                <div>
                  <div
                    @click="goProductDetail(product.uuid,!!parseInt(product.field_is_public))"
                  >
                    <icon-additives bg-color-class="default"></icon-additives>
                    <span>{{ product.title }}</span>
                    <template v-if="!!parseInt(product.field_is_public) || isLogin">
                      <v-icon class="icon float-right">keyboard_arrow_right</v-icon>
                    </template>

                    <template v-else>
                      <v-icon class="icon float-right material-icons-outlined">lock</v-icon>
                    </template>

                  </div>
                  <small v-if="product.field_benefits">
                    {{ product.field_benefits }}
                  </small>
                </div>
                <template v-if="!!parseInt(product.field_is_public) || isLogin">
                  <ul>
                    <template v-for="(item, index) in product.basic">
                      <li :key="index" v-if="item.value.length">
                        <div class="item-property">
                        <span>
                          <v-icon class="material-icons-outlined">colorize</v-icon>
                        </span>
                          <span>
                          {{ item.label }}
                        </span>
                          <span>
                          <b>{{ item.value }}</b>
                        </span>
                        </div>
                      </li>
                    </template>
                  </ul>
                  <div>
                    <v-btn
                      icon
                      @click="favoritesProductStar('product',product.isFeature ? 'delete' : 'add',product.uuid)"
                    >
                      <v-icon
                        v-if="!product.isFeature"
                        color="grey lighten-1"
                      >
                        star_border
                      </v-icon>
                      <v-icon v-else color="yellow">
                        star
                      </v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon class="material-icons-outlined">shopping_basket</v-icon>
                    </v-btn>
                  </div>
                </template>
                <template v-else>
                  <div></div>
                </template>
              </div>
            </v-card>
          </v-col>
          <infinite-loading
            :identifier="infiniteId"
            @infinite="infiniteHandler"
            ref="infiniteLoading"
            :distance="distance"
          >
            <span slot="no-more">没有更多产品了</span>
            <span slot="no-results">没有更多产品了</span>
          </infinite-loading>
        </template>
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
          @fatherMethod="closeRequestDialog()"
          :product="selectedProduct"
          :preview-product-basic="previewProductBasicInformation"
          :preview-product-prop="previewProductProperties"
        >
        </product-details>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
// import IconDispersions from '../components/svg/Dispersions'
import ProductDetails from "../components/ProductDetails";
import IconFeatures2 from "../components/svg/features/Features-2";
import IconFeatures3 from "../components/svg/features/Features-3";
import InfiniteLoading from "vue-infinite-loading/src/components/InfiniteLoading.vue";
import { mapState } from "vuex";
import config from "../config";

const isDev = process.env.NODE_ENV !== "production";
// 每页显示的产品条数
const pageCount = isDev ? config.dev.pageCount : config.prod.pageCount;

export default {
  components: { ProductDetails, IconFeatures2, IconFeatures3, InfiniteLoading },

  computed: {
    ...mapState({
      requestProductDialog: state => state.core.requestProductDialog,
      previewProductBasicInformation: state =>
        state.product.productBasicInformation,
      previewProductProperties: state => state.product.productProperties,
      isLogin: state => state.user.isLogin
    })
  },

  data: () => ({
    showList: true,
    showCard: false,
    distance: -Infinity,
    infiniteId: +new Date(),
    productList: [],
    selectedProduct: {},
    productQuery: {},
    previewProductBasic: {},
    previewProductProp: {}
  }),

  mounted() {
    let vm = this;
    vm.productQuery = this.$router.history.current.query;
    vm.distance = 1;
    vm.changeFilter();
  },

  watch: {
    $route(to, from) {
      let vm = this;
      vm.productQuery = to.query;
      vm.changeFilter();
    }
  },

  methods: {
    showProductCard () {
     let vm = this
      vm.showList = false
      vm.showCard = true

      // vm.productList = []
      // vm.changeFilter()
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

    changeFilter() {
      this.productList = [];
      this.infiniteId += 1;
    },

    infiniteHandler($state) {
      let vm = this;
      let options = {};

      options.items_per_page = pageCount
      options.page = Math.ceil(vm.productList.length / pageCount)

      if (vm.productQuery.hasOwnProperty("industry")) {
        options.product_application_id = vm.productQuery.industry;
      }

      if (vm.productQuery.hasOwnProperty("product_brand")) {
        options.product_brand_id = vm.productQuery.product_brand;
      }

      vm.$loading.show()
      vm.$store.dispatch("getProductList", options).then(() => {
        let products = vm.$store.state.product.productList;
        products = products.map((product) => {
          vm.$store.dispatch('getProductDetails', {
            id: product.uuid
          }).then(result => {
            delete result.uuid
            delete result.product_id
            delete result.langcode
            delete result.variations
            delete result.body
            delete result.default_langcode
            delete result.field_benefits
            delete result.field_buy_link
            delete result.field_country_registration_group
            delete result.field_product_brand
            delete result.field_other_names
            delete result.field_recommended_application
            delete result.field_suitable_application
            delete result.field_product_brand
            delete result.field_product_type
            delete result.field_formulation
            delete result.title

            product.basic = result
          })

          return product
        })

        if (products.length) {
          vm.productList = vm.productList.concat(products);

          $state.loaded();
          vm.$loading.hide()
          if (products.length < pageCount) {
            $state.complete();
            vm.$loading.hide()
          }
        } else {
          $state.complete();
          vm.$loading.hide()
        }
      });
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
              vm.productList = vm.productList.map(product => {
                if (product.uuid === productId) {
                  if (action === "add") {
                    product.isFeature = true;
                  } else if (action === "delete") {
                    product.isFeature = false;
                  }
                }
                return product;
              });
            }

            vm.$loading.hide();
          });
      }
    },

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

    closeRequestDialog() {
      this.$store.state.core.requestProductDialog = false;
    }
  }
};
</script>
<style lang="scss" scoped>
#products {
  max-width: 1318px;

  .product-list {
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

  .infinite-loading-container {
    height: 72px;
    line-height: 72px;
  }
}

#product-details {
  padding: 20px;

  .v-btn {
    background: none;
    margin: 0 7%;
    overflow: hidden;
    position: relative;

    .v-icon {
      height: 48px;
      width: 48px;
    }

    @media screen and (min-width: 1024px) {
      height: 48px;
      width: 48px;
    }
  }

  a {
    float: left;
    font-family: Helvetica Neue LT W01_65 Md,Helvetica,Arial,sans-serif;
    font-size: 1.125em;
    font-weight: 500;
    line-height: 1.333;
    margin-bottom: 5px;
    width: 100%;

    .icon {
      height: 32px;
      width: 32px;
      position: relative;
      margin: 0;

      &:first-child {
        margin-right: 8px;
      }
    }

    span {
      display: inline-block;
      float: left;
      overflow: hidden;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 72%;

      @media screen and (min-width: 768px) {
        width: 73%;
      }
    }
  }

  small {
    clear: both;
    display: block;
  }

  ul {
    height: 300px;
    list-style-type: none;
    margin: 0 0 50px;
    overflow-y: auto;
    padding: 0;
    position: relative;
    width: 100%;

    @media screen and (min-width: 768px) {
      margin: 5px 0 0;
      height: 290px;
    }
  }

  & > div {

    &:first-child {
      max-height: 170px;
      overflow: hidden;
      cursor: pointer;
    }

    &:last-child {
      bottom: 10px;
      left: 0;
      text-align: center;
      width: 100%;
      position: absolute;

      @media screen and (min-width: 768px) {
        bottom: 16px;
      }
    }
  }
}

.product-list {

  &.locked {
    background-color: rgba(226, 213, 213, 0.32);
    color: #655c5c !important;
  }
}
</style>
