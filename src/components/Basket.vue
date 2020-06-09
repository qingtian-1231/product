<template>
  <div class="menu-minibasket">
    <v-btn fab small color="secondary" @click="openMiniBasket()">
      <v-badge v-model="showBadge" color="secondary" left>
        <template v-slot:badge>
          <span>{{ shoppingCartCount }}</span>
        </template>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    <v-card
      id="minibasket"
      light
      :class="miniBasketClass"
      style="animation-duration: 0.25s"
    >
      <div>
        <h2>
          <v-icon>shopping_cart</v-icon>
          {{ $t('basket.title') }}
          <v-btn icon @click="closeMiniBasket()">
            <v-icon class="material-icons-outlined">close</v-icon>
          </v-btn>
        </h2>
        <ul v-for="(product, index) in shoppingCart" :key="index">
          <li>
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
                      :label="$t('basket.productWeight')"
                      height="18"
                      hide-details
                      outlined
                      dense
                      solo
                    ></v-select>
                  </div>
                </span>
              <span>
                  <v-btn icon @click="removeShoppingCart(product.uuid)">
                    <v-icon class="material-icons-outlined">delete</v-icon>
                  </v-btn>
                </span>
            </div>
          </li>
        </ul>
        <v-btn
          block
          color="grey"
          class="white--text"
          @click="clearShoppingCart()"
        >
          {{ $t('basket.clearBasket') }}
          <v-icon right class="material-icons-outlined">
            delete
          </v-icon>
        </v-btn>
        <v-btn block color="primary" @click="sampleOrder()">
          {{ $t('basket.seeOrder') }}
          <template v-if="isLogin">
            <v-icon right class="material-icons-outlined">
              check
            </v-icon>
          </template>

          <template v-else>
            <v-icon right class="material-icons-outlined">
              clock
            </v-icon>
          </template>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IconAdditives from "./svg/Additives";

export default {
  name: "basket",

  components: { IconAdditives },

  data() {
    return {
      miniBasketClass: 'hiddenBasket',
      showShoppingCart: false,
      showBadge: true
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
        this.openMiniBasket()
      }
    }
  },

  created() {
    this.$store.commit("initComputedShoppingCart");
  },

  methods: {
    closeMiniBasket () {
      this.miniBasketClass = 'fadeDown-leave-active'

      setTimeout(() => {
        this.miniBasketClass = 'hiddenBasket'
      }, 1000)
    },

    openMiniBasket () {
      this.miniBasketClass = 'fadeDown-enter-active'
    },

    clearShoppingCart () {
      this.$store.commit('clearShoppingCart')
    },

    sampleOrder () {
      let vm = this
      if (!vm.isLogin) {
        this.$store.commit('open_login_dialog')
      } else {
        this.$router.push({ path: '/sample-order', query: {step: 'sampleOrder'}})
      }
    },

    removeShoppingCart(productId) {
      this.$store.dispatch("removeShoppingCart", productId);
    },
  }
};
</script>

<style lang="scss" scoped>
  .menu-minibasket {
    display: inline;
    position: relative;

    #minibasket {
      position: absolute;
      right: 0;
      min-width: 400px;

      @media screen and (max-width: 480px) {
        right: -60px;
        width: 100%;
      }

      &.hiddenBasket {
        display: none;
      }
    }
  }
</style>
