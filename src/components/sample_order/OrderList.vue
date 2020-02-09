<template>
  <div>
    <div class="order">
      <h2>
        样品订单
        <!--      <v-btn icon>-->
        <!--        <v-icon>edit</v-icon>-->
        <!--      </v-btn>-->
      </h2>
      <ul>
        <template v-for="(product, index) in shoppingCart">
          <li :key="index">
            <div class="item added product disabled">
            <span>
              <router-link :to="{name: 'Product', params: {id: product.uuid}}">
                <icon-dispersions
                  bg-color-class="styrene-acrylics"
                ></icon-dispersions>
                <b>{{ product.title }}</b>
              </router-link>
              <v-select
                class="select small"
                v-model="product.selectVariation"
                :items="product.variationsItem"
                label="产品分量"
                height="18"
                outlined
                dense
                solo
              ></v-select>
            </span>
              <span>
              <v-btn icon small @click="removeShoppingCart(product.uuid)">
                <v-icon>delete</v-icon>
              </v-btn>
            </span>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="pagination">
      <v-btn
        color="info"
        class="float-left"
        @click="$router.back(-1)"
      >
        取消订单
      </v-btn>
      <v-btn
        class="float-right"
        color="primary"
        @click="createOrder()"
      >
        继续
      </v-btn>
    </div>
  </div>
</template>

<script>
import IconDispersions from "../../components/svg/Dispersions";
import { mapState } from "vuex";

export default {
  name: "order-list",

  components: { IconDispersions },

  computed: {
    ...mapState({
      shoppingCartCount: state => state.basket.shoppingCartCount,
      shoppingCart: state => state.basket.shoppingCart,
      isLogin: state => state.user.isLogin
    })
  },

  data() {
    return {};
  },

  methods: {
    removeShoppingCart (productId) {
      this.$store.dispatch('removeShoppingCart', productId)
    },

    createOrder () {
      let vm = this
      let orders = []
      let order = {}
      orders = vm.shoppingCart.map(product => {
        order.purchased_entity_type = 'commerce_product_variation'
        order.quantity = 1
        order.purchased_entity_id = vm.getSelectVariationId(product)
        return order
      })

      vm.$loading.show()
      vm.$store.dispatch('createOrder', orders).then(result => {
        console.log(result)
        if (result && result.status === 200) {
          vm.$loading.hide()
          vm.$emit('nexstep')
        }
      })
    },

    getSelectVariationId (product) {
      let selectVariation = product.selectVariation
      let variations = product.variations
      for (let key in variations) {
        if (variations[key].attribute_product_amount.value === selectVariation) {
          return variations[key].variation_id.value
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.order {
  h2 {
    border-bottom: 1px solid #333;
    position: relative;
    line-height: 48px;
    text-align: left;

    button {
      background: none;
      border: none;
      float: right;
      height: 48px;
      width: 48px;
    }
  }

  ul > li {
    list-style-type: none;

    .item.added {
      animation: 0.4s ease-out 0s 1 rotateX;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      display: inline-block;
      float: left;
      padding: 20px 0;
      position: relative;
      width: 100%;

      span {
        font-size: 1em;
        float: left;
        height: auto;
        overflow: visible;

        & > a {
          float: left;
          padding: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          text-align: left;

          & > .icon {
            height: 32px;
            margin-right: 20px;
            width: 32px;
            position: relative;
            float: none;
            line-height: normal;
            display: inline-block;
            vertical-align: middle;
            margin-left: 0;
            margin-top: 0;
          }
        }

        & > .select {
          min-width: 75px;
          margin: 0;
          position: absolute;
          right: 50px;
        }

        &:first-child {
          width: 84%;
        }

        &:last-child {
          float: right;
          overflow: hidden;
          text-align: right;
          width: auto;
        }
      }
    }
  }
}
</style>
