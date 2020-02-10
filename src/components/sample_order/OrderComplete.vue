<template>
  <div>
    <div class="order-complete">
      <div class="success_message">
        <h2>
          <v-icon color="primary">check_circle_outline</v-icon>
          恭喜您下单成功！
        </h2>
        <p>
          请注意查收我们发出的邮件，你注册的邮箱将会收到订单信息的邮件通知。
        </p>
        <router-link :to="{ name: 'Home' }">
          <v-btn class="ma-2" rounded color="success">
            回到首页
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'Products' }">
          <v-btn class="ma-2" rounded color="success">
            浏览产品
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import IconDispersions from "../../components/svg/Dispersions";
import { mapState } from "vuex";

export default {
  name: "order-complete",

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

  methods: {}
};
</script>

<style scoped lang="scss">
.success_message {
  margin-top: 2rem;

  h2 {
    position: relative;
    padding: 1rem;

    i {
      margin: 0 0 0 -21px;
      left: 50%;
      position: absolute;
      top: -2rem;
      font-size: 2.5rem;
    }
  }
}
</style>
