<template>
  <v-footer
    class="py-4"
    dark
    height="auto"
  >
    <v-container mx-auto px-0>
      <v-row class="align-center">
        <div class="ml-auto mr-auto ml-md-0 d-flex align-center col col-auto footer-left">
          <span class="mr-3 overline">Copyright @ BASF</span>
          <a aria-label="Link to Shopify" href="" target="_blank" rel="noopener noreferrer">
            巴斯夫1688官方旗舰店
          </a>
        </div>
        <div class="ml-auto mr-auto mr-md-0 col col-auto footer-right">
          <v-img
            class="wechat-image"
            :src="require('@/assets/global/wechat.png')"
            :lazy-src="require('@/assets/global/wechat.png')"
            contain
          >
          </v-img>
          <div class="footer-welcome">
            欢迎关注“巴斯夫分散体与树脂”官方微信公众号
          </div>
        </div>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  // import IconApp from '../svg/App'

  export default {
    components: { },

    data: function () {
      return {
        cardElevation: 0
      }
    },

    methods: {}
  }
</script>
<style lang="scss" scoped>
  .v-footer {

    .footer-left {

      a {

      }
    }

    .footer-right {
      display: flex;

      .wechat-image {
        width: 40px;
        float: left;
      }

      .footer-welcome {
        line-height: 40px;
      }
    }
  }
</style>
