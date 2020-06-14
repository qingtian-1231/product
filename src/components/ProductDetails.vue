<template>
  <div id="product-details">
    <v-alert
      :value="alert"
      :type="alertType"
      :class="alterClass"
      transition="scale-transition"
    >
      {{alertMessage}}
    </v-alert>
    <div>
      <router-link :to="{name: 'Product', params: {id: product.uuid}}">
        <icon-additives bg-color-class="default"></icon-additives>
        <span>{{ product.title }}</span>
        <v-icon class="icon float-right">keyboard_arrow_right</v-icon>
      </router-link>
      <small v-if="previewProductBasic.benefits">
        {{ previewProductBasic.benefits.value }}
      </small>
    </div>
    <ul>
      <template v-for="(item, index) in previewProductProp">
        <li :key="index" v-if="item.value.length">
          <div class="item-property">
            <span>
<!--              <v-icon class="material-icons-outlined">colorize</v-icon>-->
            </span>
            <span>
              {{ item.label }}
            </span>
            <span><b>{{ item.value }}</b></span>
          </div>
        </li>
      </template>
    </ul>
    <div>
      <v-btn icon @click="closeRequestDialog">
        <v-icon large>close</v-icon>
      </v-btn>

      <v-btn
        icon
        @click="favoritesProductStar('product',product.isFeature ? 'delete' : 'add',product.uuid)"
      >
        <v-icon
          v-if="!product.isFeature"
          color="grey lighten-1"
          large
        >
          star_border
        </v-icon>
        <v-icon v-else color="yellow" large>
          star
        </v-icon>
      </v-btn>

      <v-btn icon @click="hasAddBasket ? removeBasket() : addBasket()">
        <v-icon v-if="hasAddBasket" color="yellow" large class="material-icons-outlined">shopping_cart</v-icon>
        <v-icon v-else class="material-icons-outlined" large>shopping_cart</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
  import IconAdditives from '../components/svg/Additives'
  import { mapState } from "vuex";

  export default {
    name: 'product-details',

    components: { IconAdditives },

    props: {
      product: {
        type: Object
      },

      previewProductBasic: {
        type: Object
      },

      previewProductProp: {
        type: Object
      }

    },

    data: function () {
      return {
        alertMessage: '',
        alertType: '',
        alterClass: '',
        alert: false,
        productTitle: '',
        productBasic: {},
        productProp: {},
        hasAddBasket: false,
      }
    },

    computed: {
      ...mapState({
        productDetails: state=> state.product.productDetails,
        isLogin: state => state.user.isLogin,
        shoppingCart: state => state.basket.shoppingCart
      })
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
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
                  vm.product.isFeature = true;
                } else if (action === "delete") {
                  vm.product.isFeature = false;
                }
              }

              vm.$loading.hide();
            });
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

          console.log(item.uuid, vm.product.uuid, item.uuid === vm.product.uuid)
          if (item.uuid === vm.product.uuid) {
            vm.hasAddBasket = true
          }
        })
      },

      removeBasket () {
        this.$store.dispatch('removeShoppingCart', this.product.uuid)

        this.changeProductBasketStatus()
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
    },

    mounted () {
      this.changeProductBasketStatus()
    }
  }
</script>

<style lang="scss" scoped>
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
      padding: 0 15px;

      &:first-child {
        max-height: 170px;
        overflow: hidden;
      }

      &:last-child {
        bottom: 10px;
        left: 0;
        text-align: center;
        width: 100%;

        @media screen and (min-width: 768px) {
          bottom: 16px;
        }
      }
    }
  }
</style>
