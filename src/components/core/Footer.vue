<template>
  <v-footer
    class="py-4"
    dark
    height="auto"
  >
    <v-container mx-auto px-0>
      <v-row class="align-center">
        <div class="ml-auto mr-auto ml-md-0 d-flex align-center col col-auto footer-left">
          <a aria-label="Link to Shopify" href="https://m.1688.com/page/offerlist.html?spm=a262to.11649723.category_view.12&catId=98047612&catPid=&isUserDefined=true&title=%E4%B9%B3%E6%B6%B2%E5%8F%8A%E9%85%8D%E6%96%B9%E5%8A%A9%E5%89%82&memberId=b2b-2123073290" target="_blank" rel="noopener noreferrer">
            {{ $t('home.footer.link_buy_site') }}
          </a>

          <span class="mr-3 overline">{{ $t('home.footer.copyright') }}</span>
        </div>
        <div class="ml-auto mr-auto mr-md-0 col col-auto footer-right">
          <v-img
            class="wechat-image"
            width="80"
            height="80"
            :src="require('@/assets/global/wechat.png')"
          >
          </v-img>
          <div class="footer-welcome">
            {{ $t('home.footer.weChat') }}
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
      display: block!important;
      align-items: start !important;

      a {
        display: block;
        margin-bottom: 10px;
        color: #fff;
        text-decoration: none;
      }
    }

    .footer-right {
      display: flex;

      .wechat-image {
        width: 70px;
        height: 70px;
        float: left;
        margin-right: 20px;
        display: inline-block;

        .v-responsive__content {
          display: none !important;
        }
      }

      .footer-welcome {
        line-height: 80px;
      }
    }
  }
</style>
