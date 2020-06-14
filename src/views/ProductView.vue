<template>
  <v-container
    id="product-view"
    tag="section"
  >
    <v-row class="back">
      <v-col class="col-xs-8" md="6">
        <v-btn class="float-left" color="primary" @click="$router.back(-1)">
          <v-icon>apps</v-icon>
          {{ $t('global.goBack') }}
        </v-btn>
      </v-col>
      <v-col class="col-xs-4">
      </v-col>
    </v-row>

    <v-row class="header">
      <v-col class="col-xs-12" md="12">
        <v-alert
          :value="alert"
          :type="alertType"
          :class="alterClass"
          transition="scale-transition"
        >
          {{alertMessage}}
        </v-alert>
        <div>
          <h1>
            <icon
              width="64"
              height="64"
              :icon-name="productTypeId"
              :bg-color-class="productBrandValue"
            >
            </icon>
            <template v-if="productTitle">
              <span v-html="productTitle"></span>
            </template>
          </h1>
          <div>
<!--            <v-btn icon>-->
<!--              <v-icon large class="material-icons-outlined">cloud_download</v-icon>-->
<!--            </v-btn>-->
            <v-btn icon @click="openShareDialog()">
              <v-icon large class="material-icons-outlined">share</v-icon>
            </v-btn>

            <v-btn
              icon
              @click="favoritesProductStar('product', productBasicInformation.isFeature ? 'delete' : 'add', productBasic.uuid)"
            >
              <v-icon
                v-if="!productBasicInformation.isFeature"
                class="material-icons-outlined"
                large
              >
                star_border
              </v-icon>

              <v-icon
                v-else
                color="yellow"
                large
              >
                star
              </v-icon>
            </v-btn>

            <v-btn icon @click=" hasAddBasket ? removeBasket() : addBasket()">
              <v-icon v-if="hasAddBasket" color="yellow" large class="material-icons-outlined">shopping_cart</v-icon>
              <v-icon v-else large class="material-icons-outlined">shopping_cart</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="content">
      <v-col class="col-xs-12" md="12">
        <div>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="primary"
            grow
          >
            <v-tab @click="showIcon">
              {{ $t('productView.basicInfo') }}
            </v-tab>

            <v-tab>
              {{ $t('productView.property') }}
            </v-tab>

            <v-tab>
              {{ $t('productView.formulation') }}
            </v-tab>

            <v-tab>
              {{ $t('productView.download') }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <basic-information :product-basic="productBasic" :product-info="productInfo"></basic-information>
            </v-tab-item>
            <v-tab-item>
              <properties :product-properties="productProperties"></properties>
            </v-tab-item>
            <v-tab-item>
              <formulations
                :product-relation-formulation="productFormulation"
                :title-field="productInfo.title"
              ></formulations>
            </v-tab-item>
            <v-tab-item>
              <additional :product-relation-file="productRelationFile" :title-field="productInfo.title"></additional>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>

    <v-row class="footer">
      <v-col class="col-xs-12" md="12">
        <div>
<!--          <v-btn icon tile large>-->
<!--            <v-icon large class="material-icons-outlined">cloud_download</v-icon>-->
<!--            <p>下载</p>-->
<!--          </v-btn>-->
          <v-btn icon tile large @click="openShareDialog()">
            <v-icon large class="material-icons-outlined">share</v-icon>
            <p>{{ $t('productView.share') }}</p>
          </v-btn>
          <v-btn
            icon
            title
            large
            @click="favoritesProductStar('product', productBasicInformation.isFeature ? 'delete' : 'add', productBasic.uuid)"
          >
            <v-icon
              v-if="!productBasicInformation.isFeature"
              large
              class="material-icons-outlined"
            >
              star_border
            </v-icon>

            <v-icon
              v-else
              color="yellow"
              large
            >
              star
            </v-icon>
            <p>{{ $t('productView.favorite') }}</p>
          </v-btn>
          <v-btn icon tile large @click="addBasket()">
            <v-icon large class="material-icons-outlined">shopping_cart</v-icon>
            <p>{{ $t('productView.basket') }}</p>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="shareDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="940px"
    >
      <v-card>
        <v-toolbar>
          <v-btn icon dark>
            <v-icon color="black" class="material-icons-outlined">share</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeShareDialog()">
            <v-icon color="black">close</v-icon>
          </v-btn>
        </v-toolbar>
        <div id="share-dialog">
          <h2 v-html="productTitle">
          </h2>
          <p>
            {{ $t('global.shareThisPage') }}
          </p>
          <p>
            {{ currentLocation }}
          </p>
          <div class="row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <v-btn
                class="ma-2"
                block
                rounded
                color="info"
                v-clipboard:copy="currentLocation"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                {{ $t('global.copyLink') }}
              </v-btn>
            </v-col>

<!--            <a style="display: none" href="mailto:example@qq.com?cc=example2@qq.com&subject=有未结算的单据&body=您有未付清的账单">发送邮件</a>-->

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="sendEmail()">
                {{ $t('global.sendEmail') }}
              </v-btn>
            </v-col>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import IconAdditives from '../components/svg/Additives'
  import BasicInformation from '../components/product_view/BasicInformation'
  import Properties from '../components/product_view/Properties'
  import Formulations from '../components/product_view/Formulations'
  import Additional from '../components/product_view/Additional'
  import { mapState } from 'vuex'
  import Icon from "../components/svg/features/Icon";
  import { getCookie } from "../utils/cookie";

  export default {
    components: { Icon, BasicInformation, Properties, Formulations, Additional },

    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin,
        requestProductDialog: state => state.core.requestProductDialog,
        productDetails: state=> state.product.productDetails,
        productInformation: state => state.product.productInfo,
        productBasicInformation: state => state.product.productBasicInformation,
        productProperties: state => state.product.productProperties,
        productRelationFormulation: state => state.product.productRelationFormulation,
        productRelationFile: state => state.product.productRelationFile,
        shoppingCart: state => state.basket.shoppingCart
      }),

      productTitle: function () {
        return (this.productInfo && this.productInfo.title) ? this.productInfo.title.value.replace('®', '<sup>®</sup>') : ''
      },

      productUuid: function () {
        return (this.productBasic && this.productBasic.uuid) ? this.productBasic.uuid : ''
      },

      productTypeId: function () {
        return (this.productBasic.field_product_type && this.productBasic.parentTid) ? this.productBasic.parentTid : ''
      },

      productBrandValue: function () {
        return (this.productBasic.brand) ? this.productBasic.brand.value : ''
      }
    },

    watch: {
      $route(to, from) {
        let vm = this

        vm.loadProduct()
      }
    },

    data () {
      return {
        shareDialog: false,
        tab: 0,
        productBasic: {},
        productInfo: {},
        productFormulation: [],
        alertMessage: '',
        alertType: '',
        alterClass: '',
        alert: false,
        currentLocation: '',
        hasAddBasket: false,
      }
    },

    created () {
      this.loadProduct()
      this.$store.commit("initComputedShoppingCart")
    },

    methods: {
      loadProduct() {
        let vm = this
        let productId = vm.$route.params.id
        vm.$loading.show();
        vm.currentLocation = window.location.href
        vm.$store.dispatch('getProductDetails', {
          id: productId
        }).then(() => {
          vm.productBasic = vm.productBasicInformation
          vm.productInfo = vm.productInformation
          vm.productFormulation = vm.productRelationFormulation
          vm.$loading.hide();
          // console.log(vm.productBasic, 'productProperties')
          vm.changeProductBasketStatus()
        })
      },

      sendEmail() {
        let vm = this
        let currentLanguage = getCookie('drupal:session:language')

        if (currentLanguage === 'en') {
          window.location.href = `mailto:?subject=Product ${vm.productInfo.title.value} from BASF Product Center&body= Please browse the product information${vm.productInfo.title.value}。
I find it at BASF Product Center:
${vm.currentLocation}`
        }
        else {
          window.location.href = `mailto:?subject=产品${vm.productInfo.title.value}来自BASF产品中心&body=请查看产品详细信息${vm.productInfo.title.value}。
我在BASF产品中心中找到了它：
${vm.currentLocation}`
        }

      },

      addBasket () {
        let vm = this
        if (vm.productDetails.hasOwnProperty('variations') && vm.productDetails.variations.length > 0) {
          vm.$store.dispatch('addShoppingCart', {product: vm.productDetails})
          vm.changeProductBasketStatus()
        } else {
          vm.setAlert('当前产品未设置价格以及产品规格，如果您希望获得此产品的样品，请联系管理员添加', 'warning')
        }
      },

      changeProductBasketStatus () {
        let vm = this
        vm.hasAddBasket = false
        vm.shoppingCart.forEach(item => {

          console.log(item.uuid, vm.productUuid, item.uuid === vm.productUuid)
          if (item.uuid === vm.productUuid) {
            vm.hasAddBasket = true
          }
        })
      },

      removeBasket () {
        this.$store.dispatch('removeShoppingCart', this.productUuid)

        this.changeProductBasketStatus()
      },

      openShareDialog() {
        this.shareDialog = true
      },

      closeShareDialog() {
        this.shareDialog = false
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
                if (action === "add") {
                  vm.$store.commit('addFavoriteProduct', productId)
                  vm.$store.commit('processProductDetailsFeature', true)
                  vm.loadProduct()
                } else if (action === "delete") {
                  vm.$store.commit('removeFavoriteProduct', productId)
                  vm.$store.commit('processProductDetailsFeature', false)
                  vm.loadProduct()
                }
              }

              vm.$loading.hide();
            });
        }
      },

      setAlert (message, style, type) {
        type === 'append'
          ? (this.alertMessage += message)
          : (this.alertMessage = message)
        this.alertType = style
        this.alterClass = 'bounce-enter-active'
        this.alert = true
        setTimeout(() => {
          this.clearAlert()
        }, 5000)
      },

      clearAlert () {
        let vm = this
        vm.alterClass='bounce-leave-active'
        setTimeout(() => {
          vm.alert = false
          vm.alertMessage = ''
          vm.alertType = ''
        }, 800)
      },

      onCopy(e) {
        this.$store.commit('SET_SNACKBAR', {
                globalSnackbar: true,
                snackbarMessage: '您已经将链接复制到粘贴板'
              })

        this.closeShareDialog()
      },

      onError(e) {
        this.$store.commit('SET_SNACKBAR', {
          globalSnackbar: true,
          snackbarMessage: '复制失败'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
#product-view {
  .v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active) {
    border-bottom: 1px solid #ddd;
  }
  .header {

    h1 {
      width: 68%;
      float: left;
      line-height: 48px;
      margin: 0;
      padding-left: 70px;
      padding-top: 8px;

      .icon-container {
        margin: -7px 10px 0 -70px;
        max-height: 64px;
        max-width: 64px;
        height: 64px;
        width: 64px;
        position: relative;
        float: left;
      }

      .icon {
        margin: -7px 10px 0 -70px;
        max-height: 64px;
        max-width: 64px;
        height: 64px;
        width: 64px;
        position: relative;
        float: left;
      }
    }

    .col {
      padding-top: 0;
      padding-bottom: 0;

      & > div {
        border-bottom: 1px solid #eee;
        border-radius: 8px 8px 0 0;
        padding-top: 20px;

        & > div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          float: right;
          padding: 20px 0;
          text-align: center;
          width: 100%;

          @media screen and (min-width: 1024px) {
            float: right;
            padding: 10px 0;
            text-align: right;
            width: auto;
          }
        }
      }
    }

    .v-btn {
      float: none;
      display: inline;
      height: 48px;
      margin: 0 auto;
      width: 48px;

      @media screen and (min-width: 1024px) {
        margin-left: 5px;
      }
    }
  }

  .content {

    .col {
      padding-top: 0;
      padding-bottom: 0;

      & > div {

        &:last-child {
          border-radius: 0 0 8px 8px;
        }

        &:first-child {
          padding-top: 0;
        }

        .v-tabs {
          height: auto;
          text-align: center;
          margin-bottom: 20px;
          overflow: hidden;

          .v-tab {
            font-size: 1.1rem;
            text-transform: capitalize;

            &.v-tab--active {

              &:before {
                opacity: 0.12;
              }
            }

            @media screen and (max-width: 480px) {
              font-size: 10px;
              padding: 0;
              min-width: auto;
            }
          }
        }
      }
    }
  }

  .footer {

    & > .col {
      padding-top: 0;
      padding-bottom: 0;

      & > div {
        margin-top: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 8px;
        box-shadow: 2px 2px 8px 0 rgba(0,0,0,.1);
        text-align: center;

        @media screen and (min-width: 480px) {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
      }
    }

    .v-btn {
      background: transparent;
      border: none;
      line-height: 48px;
      text-align: left;
      display: block;
      float: none;
      overflow: visible;
      margin: 0 auto;
      padding: 0;
      width: 180px;

      .v-icon {
        font-size: 30px!important;
      }

      p {
        line-height: 48px;
        margin: 0 10px;
      }

      @media screen and (min-width: 1024px) {
        display: inline;
        text-align: left;
      }

      @media screen and (min-width: 480px) {
        display: inline;
        text-align: center;
        width: auto;
      }
    }
  }
}

#share-dialog {
  text-align: center;
  padding: 0 4%;
  background: #fff;

  h2 {
    padding: 0 0 2% 0;

    i {
      margin: -10px 0 0 -20px;
      left: 50%;
      position: absolute;
      top: 90px;
      font-size: 2.5rem;
    }
  }
}
</style>
