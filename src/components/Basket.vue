<template>
  <v-menu
    v-model="showShoppingCart"
    :close-on-content-click="false"
    bottom
    left
    origin="right top"
    offset-y
    transition="scale-transition"
    class="mx-2"
    absolute="true"
  >
    <template v-slot:activator="{ on }">
      <v-btn fab small color="secondary" v-on="on">
        <v-badge v-model="show" color="secondary" left>
          <template v-slot:badge>
            <span>{{ shoppingCartCount }}</span>
          </template>
          <v-icon>shopping_basket</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-card id="minibasket" class="basket mini open">
      <div>
        <h2>
          <v-icon>shopping_basket</v-icon>
          样品购物车
          <v-btn icon @click="showShoppingCart = false">
            <v-icon class="material-icons-outlined">closed</v-icon>
          </v-btn>
        </h2>
        <ul>
          <template v-for="(product, index) in shoppingCart">
            <li :key="index">
              <div class="item added product">
                <span>
                  <router-link :to="{ name: 'Product', params: product.uuid }">
                    <icon-additives bg-color-class="default"></icon-additives>
                    <b>{{ product.title }}</b>
                  </router-link>
                  <div class="select small closed">
                    <v-select
                      v-model="product.selectVariation"
                      :items="product.variationsItem"
                      label="产品分量"
                      height="18"
                      outlined
                      dense
                      solo
                    ></v-select>
                  </div>
                </span>
                <span>
                  <v-btn icon>
                    <v-icon class="material-icons-outlined">delete</v-icon>
                  </v-btn>
                </span>
              </div>
            </li>
          </template>
        </ul>
        <v-btn
          block
          color="grey"
          class="white--text"
          @click="clearShoppingCart()"
        >
          清空购物车
          <v-icon class="material-icons-outlined">
            delete
          </v-icon>
        </v-btn>
        <v-btn block color="primary" @click="sampleOrder()">
          查看样品订单
          <template v-if="isLogin">
            <v-icon class="material-icons-outlined">
              check
            </v-icon>
          </template>

          <template v-else>
            <v-icon class="material-icons-outlined">
              clock
            </v-icon>
          </template>
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex";
import IconAdditives from "./svg/Additives";

export default {
  name: "basket",

  components: { IconAdditives },

  data() {
    return {
      showShoppingCart: false,
      show: true
    };
  },

  computed: {
    ...mapState({
      shoppingCartCount: state => state.basket.shoppingCartCount,
      shoppingCart: state => state.basket.shoppingCart,
      isLogin: state => state.user.isLogin
    })
  },

  watch: {
    shoppingCartCount: function (val, old) {
      if (val) {
        this.showShoppingCart = true
      }
    }
  },

  created() {
    this.$store.commit("initComputedShoppingCart");
  },

  methods: {
    clearShoppingCart () {
      this.$store.commit('clearShoppingCart')
    },

    sampleOrder () {
      let vm = this
      if (!vm.isLogin) {
        this.$store.commit('open_login_dialog')
      } else {
        this.$router.push({ path: '/sample-order'})
      }
    },
  }
};
</script>

<style></style>
