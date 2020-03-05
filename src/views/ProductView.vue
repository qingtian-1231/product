<template>
  <v-container
    id="product-view"
    tag="section"
  >
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
            <template v-if="productInfo.title">
              {{ productInfo.title.value }}
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
              @click="favoritesProductStar('product', productBasic.isFeature ? 'delete' : 'add', productBasic.uuid)"
            >
              <v-icon
                v-if="!productBasic.isFeature"
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

            <v-btn icon @click="addBasket()">
              <v-icon large class="material-icons-outlined">shopping_basket</v-icon>
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
            color="basil"
            grow
          >
            <v-tab @click="showIcon">
              基本信息
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              属性
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              配方
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              下载
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
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
              <additional :product-relation-file="productRelationFile"></additional>
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
            <p>分享</p>
          </v-btn>
          <v-btn
            icon
            title
            large
            @click="favoritesProductStar('product', productBasic.isFeature ? 'delete' : 'add', productBasic.uuid)"
          >
            <v-icon
              v-if="!productBasic.isFeature"
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
            <p>最爱</p>
          </v-btn>
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">shopping_basket</v-icon>
            <p>购物车</p>
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
          <h2>
            {{ productTitle }}
          </h2>
          <p>
            分享这个页面
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
                color="success"
                v-clipboard:copy="currentLocation"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                复制链接
              </v-btn>
            </v-col>

<!--            <a style="display: none" href="mailto:example@qq.com?cc=example2@qq.com&subject=有未结算的单据&body=您有未付清的账单">发送邮件</a>-->

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="sendEmail()">
                发送邮件
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

  export default {
    components: { Icon, BasicInformation, Properties, Formulations, Additional },

    computed: {
      ...mapState({
        requestProductDialog: state => state.core.requestProductDialog,
        productDetails: state=> state.product.productDetails,
        productInformation: state => state.product.productInfo,
        productBasicInformation: state => state.product.productBasicInformation,
        productProperties: state => state.product.productProperties,
        productRelationFormulation: state => state.product.productRelationFormulation,
        productRelationFile: state => state.product.productRelationFile,
      }),

      productTitle: function () {
        return (this.productInfo && this.productInfo.title) ? this.productInfo.title.value : ''
      },

      productTypeId: function () {
        return (this.productBasic.field_product_type && this.productBasic.parentTid) ? this.productBasic.parentTid : ''
      },

      productBrandValue: function () {
        return (this.productBasic.brand) ? this.productBasic.brand.value : ''
      }
    },

    data () {
      return {
        shareDialog: false,
        tab: null,
        items: [
          '基本信息', '属性', '配方', '其他信息',
        ],
        productBasic: {},
        productInfo: {},
        productFormulation: [],
        alertMessage: '',
        alertType: '',
        alterClass: '',
        alert: false,
        currentLocation: ''
      }
    },

    mounted () {
      let vm = this
      let productId = vm.$route.params.id
      vm.currentLocation = window.location.href
      vm.$store.dispatch('getProductDetails', {
        id: productId
      }).then(() => {
        vm.productBasic = vm.productBasicInformation
        vm.productInfo = vm.productInformation
        vm.productFormulation = vm.productRelationFormulation.value
        // console.log(vm.productBasic.parentTid, vm.productBasic, 'productProperties')
      })
    },

    methods: {
      sendEmail() {
        let vm = this
        window.location.href = `mailto:?subject=产品${vm.productTitle}来自BASF产品助手&body=请查看产品详细信息${vm.productTitle}。
我在BASF产品助手中找到了它：
${vm.currentLocation}`
      },
      addBasket () {
        let vm = this
        if (vm.productDetails.hasOwnProperty('variations') && vm.productDetails.variations.length > 0) {
          vm.$store.dispatch('addShoppingCart', {product: vm.productDetails})
        } else {
          vm.setAlert('当前产品未设置价格以及产品规格，如果您希望获得此产品的样品，请联系管理员添加', 'info')
        }
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
                  vm.productBasic.isFeature = true;
                } else if (action === "delete") {
                  vm.productBasic.isFeature = false;
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
      line-height: 1.3;
      margin: 0;
      padding-left: 70px;
      padding-top: 8px;
      font-size: 2.2rem;

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
        padding-top: 40px;

        @media screen and (min-width: 1024px) {
          padding-bottom: 40px;
        }

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
          padding-top: 40px;
        }

        .v-tabs {
          height: auto;
          text-align: center;
          margin-bottom: 45px;
          overflow: hidden;

          .v-tab {
            font-size: 1.25rem;
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
        font-size: 48px;
      }

      p {
        line-height: 48px;
        margin: 0;
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
