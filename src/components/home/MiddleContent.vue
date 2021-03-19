<template>
  <v-container
    fluid
    id="middle-content"
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row dense>
      <v-col cols="12" class="about-us">
        <h1>{{ $t('home.middleContent.aboutBASF') }}</h1>
        <p>
          {{ $t('home.middleContent.aboutBASFDescription') }}<a target="_blank"
                                                                href="https://www.basf.com">www.basf.com</a>。
        </p>

        <div class="buy-link">
          <div class="icon-with-text">
            <v-icon>chevron_right</v-icon>
            <a
              class="text"
              aria-label="Link to Shopify"
              href="https://basfinchina.1688.com/page/offerlist_98047612.htm?spm=a2615.7691456.autotrace-categoryNavNew.7.5836dc8buyLxDr"
              target="_blank" rel="noopener noreferrer"
            >
              {{ $t('home.footer.link_buy_site') }}
            </a>
          </div>
        </div>

        <div class="footer-welcome-wrapper">
          <div class="footer-welcome">
            <div class="icon-with-text">
              <v-icon>chevron_right</v-icon>
              <span class="text">{{ $t('home.footer.weChat') }}</span>
            </div>
            <v-img
              class="wechat-image"
              width="130"
              height="130"
              :src="require('@/assets/global/wechat.png')"
            >
            </v-img>
          </div>

          <div class="footer-welcome">
            <div class="icon-with-text">
              <v-icon>chevron_right</v-icon>
              <a class="text" href="http://www.basf.com/solution-finder" target="_blank">{{ $t('home.footer.weChat2') }}</a>
            </div>
            <v-img
              class="wechat-image"
              width="130"
              height="130"
              :src="require('@/assets/global/wechat2.png')"
            >
            </v-img>
          </div>
        </div>
      </v-col>

      <contact-us></contact-us>

      <v-col cols="12" class="introduce">
        <h1>
          <a class="special-color" :href="`/register`">
            {{ $t('global.register') }} !
          </a>
          {{ $t('home.middleContent.registerTitle') }}
        </h1>
        <p>
          {{ $t('home.middleContent.registerDescription') }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  // import IconApp from '../svg/App'
  import {getCookie} from "../../utils/cookie"

  export default {
    components: {
      ContactUs: () => import('@/components/home/ContactUs')
    },

    data: function () {
      return {
        cardElevation: 0,
        currentLanguage: 'zh-hans'
      }
    },

    mounted() {
      let cookieLanguage = getCookie('drupal:session:language')
      if (cookieLanguage) {
        this.currentLanguage = cookieLanguage
      }
    },

    methods: {}
  }
</script>

<style lang="scss" scoped>
  #middle-content {
    float: none;
    position: relative;

    & > div {
      margin: 0 auto;
      padding: 12px;
    }

    @media screen and (max-width: 640px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }

    .col {
      border-radius: 8px;
      background: #fff;
      margin-top: 0px;
      margin-bottom: 10px;
      /*padding: 0 100px;*/
      font-size: 16px !important;

      h1 {
        /*padding: 60px 100px 30px;*/

        a {
          text-transform: capitalize;
        }
      }

      .v-icon {
        border-radius: 20px;
        margin-right: 20px;
        color: #fff;
        top: -2px;
      }

      .icon {
        width: 64px;
        height: 64px;
        max-width: 64px;
        max-height: 64px;
        margin: 100px auto 60px;
        float: none;
        display: block;
      }
    }

    .about-us {
      padding: 0 50px;

      h1 {
        padding: 10px 0;
        margin-top: 17px;
      }

      .icon-with-text {
        display: flex;
        align-items: center;

        .text {
          flex: 1;
        }
      }

      .buy-link {
        padding: 10px 0;
        margin-top: 25px;
      }

      .footer-welcome-wrapper {
        padding: 0;

        .footer-welcome {

          .wechat-image {

            @media screen and (max-width: 480px) {
              margin: 0 auto;
            }
          }
        }
      }

      @media screen and (max-width: 480px) {
        padding: 0 25px 20px;
      }
    }

    .introduce {
      padding: 0 50px;

      h1 {
        padding: 20px 0;
      }

      .special-color {
        color: #004a96;
      }

      @media screen and (max-width: 480px) {
        padding: 0 25px;
      }
    }

    .unlock {
      background-color: #fff;
      border-radius: 8px;
      display: inline-block;
      float: left;
      padding: 10px 3%;
      width: 100%;
      box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, .1);
      margin-bottom: 50px;
      padding-bottom: 50px !important;
    }
  }
</style>
