<template>
  <v-footer
    dark
    height="auto"
  >
    <v-container
      fluid
      mx-auto
      px-0
    >
      <v-row class="align-center">
        <div class="ml-auto mr-auto ml-md-0 d-flex align-center col col-auto footer-left">
          <span class="mr-5">{{ $t('home.footer.copyright') }}</span>
          <span class="mr-5 ml-5">
            <a target="_blank" :href="$t('home.footer.disclaimerLink')">{{ $t('home.footer.disclaimer') }}</a>
          </span>
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

      span:first-child {
        /*font-size: 14px;*/
      }

      a {
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
