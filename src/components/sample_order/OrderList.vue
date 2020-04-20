<template>
  <div class="order-list">
    <template v-if="!shoppingCart.length && !cart.length">
      <h1 class="empty-cart">您的样品订单为空，请添加产品！</h1>
    </template>

    <template v-if="shoppingCart.length">
      <h2>
        {{ $t('sampleOrder.orderList.productList') }}
      </h2>
      <div class="order">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">{{ $t('sampleOrder.orderList.productName') }}</th>
              <th class="text-left">{{ $t('sampleOrder.orderList.amount') }}</th>
              <th class="text-left">{{ $t('sampleOrder.orderList.variation') }}</th>
              <th class="text-left">{{ $t('sampleOrder.orderList.action') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="product in shoppingCart"
              :key="product.uuid"
            >
              <td>
                <router-link
                  :to="{ name: 'Product', params: { id: product.uuid } }"
                >
                  <icon-dispersions
                    bg-color-class="styrene-acrylics"
                  ></icon-dispersions>
                  <b>{{ product.title }}</b>
                </router-link>
              </td>
              <td>
                <v-text-field
                  v-model="product.quantity"
                  type="number"
                  height="18"
                  outlined
                  dense
                  solo
                  hide-details
                ></v-text-field>
              </td>
              <td>
                <v-select
                  class="select small"
                  v-model="product.selectVariation"
                  :items="product.variationsItem"
                  :label="$t('sampleOrder.orderList.productWeight')"
                  height="18"
                  outlined
                  dense
                  solo
                  hide-details
                ></v-select>
              </td>
              <td>
                <v-btn icon small @click="removeShoppingCart(product.uuid)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="pagination">
          <v-btn color="info" class="float-left" @click="$router.back(-1)">
            {{ $t('sampleOrder.orderList.cancel') }}
          </v-btn>
          <v-btn class="float-right" color="primary" @click="addCart()">
            {{ $t('sampleOrder.orderList.addCart') }}
          </v-btn>
        </div>
      </div>
    </template>

    <template v-if="cart.length">
      <h2>
        {{ $t('sampleOrder.orderList.unSuccessProduct') }}
      </h2>
      <template v-for="(cartOrder, index) in cart">
        <div class="order" :key="index">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">{{ $t('sampleOrder.orderList.productName') }}</th>
                <th class="text-left">{{ $t('sampleOrder.orderList.amount') }}</th>
                <th class="text-left">{{ $t('sampleOrder.orderList.price') }}</th>
                <th class="text-left">{{ $t('sampleOrder.orderList.variation') }}</th>
                <th class="text-left">{{ $t('sampleOrder.orderList.action') }}</th>
              </tr>
              </thead>
              <tbody v-if="cartOrder.hasOwnProperty('order_items')">
              <tr
                v-for="order_item in cartOrder.order_items"
                :key="order_item.uuid"
              >
                <td>
                  <router-link
                    :to="{ name: 'Product', params: { id: order_item.purchased_entity.product_id } }"
                  >
                    <icon-dispersions
                      bg-color-class="styrene-acrylics"
                    ></icon-dispersions>
                    <b>{{ order_item.title }}</b>
                  </router-link>
                </td>
                <td>
                  <v-text-field
                    v-model="order_item.quantity"
                    @change="updateCart(cartOrder.order_id)"
                    type="number"
                    height="18"
                    outlined
                    dense
                    solo
                    hide-details
                  ></v-text-field>
                </td>
                <td>
                  <span>{{ order_item.total_price.formatted }}</span>
                </td>
                <td>
                  <span>{{ order_item.purchased_entity.sku }}</span>
                </td>
                <td>
                  <v-btn icon small @click="removeShoppingCart(product.uuid)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="pagination">
            <v-btn color="info" class="float-left" @click="cancelOrder(cartOrder.order_id)">
              {{ $t('sampleOrder.orderList.cancelOrder') }}
            </v-btn>
            <v-btn class="float-right" color="primary" @click="shippingOrder(cartOrder)">
              {{ $t('sampleOrder.orderList.completeOrder') }}
            </v-btn>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import IconDispersions from "../../components/svg/Dispersions";
import { debounce } from '../../utils/globalUtils'
import { mapState } from "vuex";

export default {
  name: "order-list",

  components: { IconDispersions },

  computed: {
    ...mapState({
      shoppingCartCount: state => state.basket.shoppingCartCount,
      shoppingCart: state => state.basket.shoppingCart,
      cart: state => state.basket.cart,
      isLogin: state => state.user.isLogin
    })
  },

  data() {
    return {};
  },

  mounted() {
    let vm = this;
    vm.loadCart();
  },

  methods: {
    debounceUpdate: debounce(({ vm, order_id }) => {
      let currentOrder = vm.getOrderFromCart(order_id)
      let cartInfo = {
        order_id: order_id
      }
      let quantity = {}

      currentOrder.order_items.forEach(item => {
        quantity[item.order_item_id] = {
          quantity: item.quantity
        }
      })
      cartInfo.quantity = quantity

      vm.$store.dispatch('updateCart', cartInfo).then(result => {
        vm.loadCart()
      })
    }, 300),

    loadCart () {
      let vm = this
      vm.$loading.show();
      vm.$store.dispatch("getCart").then(result => {
        if (result.status === 200) {
          vm.$loading.hide();
        }
      });
    },

    updateCart (order_id) {
      let vm = this

      vm.debounceUpdate({ vm, order_id})
    },

    getOrderFromCart(order_id) {
      let vm = this
      let $return
      vm.cart.forEach(order => {
        if (order.order_id === order_id) {
          $return = order
        }
      })

      return $return
    },

    removeShoppingCart(productId) {
      this.$store.dispatch("removeShoppingCart", productId);
    },

    addCart() {
      let vm = this
      let orders = []
      let order = {}
      orders = vm.shoppingCart.map(product => {
        order.purchased_entity_type = "commerce_product_variation"
        order.quantity = 1
        order.purchased_entity_id = vm.getSelectVariationId(product);
        return order;
      });

      vm.$loading.show()
      vm.$store.dispatch('addCart', orders).then(result => {
        if (result && result.status === 200) {
          vm.$loading.hide()
          vm.loadCart()
          vm.$store.commit('clearShoppingCart')
        }
      });
    },

    getSelectVariationId(product) {
      let selectVariation = product.selectVariation;
      let variations = product.variations;
      for (let key in variations) {
        if (
          variations[key].attribute_product_amount.value === selectVariation
        ) {
          return variations[key].variation_id.value;
        }
      }
    },

    cancelOrder(order_id) {
      let vm = this

      vm.$store.dispatch('cancelOrder', order_id).then(result => {
        if (result.status === 200) {
          vm.loadCart()
        }
      })
    },

    shippingOrder (cartOrder) {
      this.$store.commit('processOrder', cartOrder)
      this.$emit('nextstep')
    }
  }
};
</script>

<style scoped lang="scss">
.order {
  width: 100%;
  display: inline-block;
  border-bottom: 1px solid;
  padding: 25px 0;

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

  .pagination {
    margin-top: 25px;
  }

  table {
    tbody {
      text-align: left;

      tr {
        td {
          &:first-child {
            & > a {
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
          }
        }
      }
    }
  }
}
</style>
