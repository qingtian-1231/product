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
        <div>
          <h1>
            <icon-additives bg-color-class="wetting-agents"></icon-additives>
            <template v-if="productInfo.title">
              {{ productInfo.title.value }}
            </template>
          </h1>
          <div>
            <v-btn icon>
              <v-icon large class="material-icons-outlined">cloud_download</v-icon>
            </v-btn>
<!--            <v-btn icon>-->
<!--              <v-icon large class="material-icons-outlined">share</v-icon>-->
<!--            </v-btn>-->
            <v-btn icon>
              <v-icon large class="material-icons-outlined">star_border</v-icon>
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
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">cloud_download</v-icon>
            <p>下载</p>
          </v-btn>
<!--          <v-btn icon tile large>-->
<!--            <v-icon large class="material-icons-outlined">share</v-icon>-->
<!--            <p>分享</p>-->
<!--          </v-btn>-->
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">star_border</v-icon>
            <p>最爱</p>
          </v-btn>
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">shopping_basket</v-icon>
            <p>购物车</p>
          </v-btn>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import IconAdditives from '../components/svg/Additives'
  import BasicInformation from '../components/product_view/BasicInformation'
  import Properties from '../components/product_view/Properties'
  import Formulations from '../components/product_view/Formulations'
  import Additional from '../components/product_view/Additional'
  import { mapState } from 'vuex'

  export default {
    components: { IconAdditives, BasicInformation, Properties, Formulations, Additional },

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
    },

    data () {
      return {
        tab: null,
        items: [
          '基本信息', '属性', '配方', '其他信息',
        ],
        productBasic: {},
        productInfo: {},
        productFormulation: []
      }
    },

    mounted () {
      let vm = this
      let productId = vm.$route.params.id

      vm.$store.dispatch('getProductDetails', {
        id: productId
      }).then(() => {
        vm.productBasic = vm.productBasicInformation
        vm.productInfo = vm.productInformation
        vm.productFormulation = vm.productRelationFormulation.value
        // console.log(vm.productProperties, 'productProperties')
      })
    },

    methods: {
      addBasket () {
        let vm = this
        vm.$store.dispatch('addShoppingCart', {product: vm.productDetails}).then(() => {
          console.log('添加成功')
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
</style>
