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
         {{ $t('home.middleContent.aboutBASFDescription') }}<a target="_blank" href="https://www.basf.com">www.basf.com</a>。
        </p>

        <p class="buy-link">
           <v-icon>chevron_right</v-icon>
           <a aria-label="Link to Shopify" href="https://m.1688.com/page/offerlist.html?spm=a262to.11649723.category_view.12&catId=98047612&catPid=&isUserDefined=true&title=%E4%B9%B3%E6%B6%B2%E5%8F%8A%E9%85%8D%E6%96%B9%E5%8A%A9%E5%89%82&memberId=b2b-2123073290" target="_blank" rel="noopener noreferrer">
             {{ $t('home.footer.link_buy_site') }}
           </a>
         </p>
        <p class="footer-welcome">
          <v-icon>chevron_right</v-icon>
          {{ $t('home.footer.weChat') }}
          <v-img
            class="wechat-image"
            width="130"
            height="130"
            :src="require('@/assets/global/wechat.png')"
          >
          </v-img>
        </p>
      </v-col>

      <v-col cols="12" :class="{'contact': 1, 'english-version': currentLanguage === 'en'}">
        <h2>{{ $t('home.middleContent.contact') }}</h2>
        <ul>
          <template v-if="currentLanguage === 'zh-hans'">
            <li>
              <strong>{{ $t('home.middleContent.xianggangInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.xianggangInfo.city') }}<br>
              {{ $t('home.middleContent.xianggangInfo.street') }}<br>
              {{ $t('home.middleContent.xianggangInfo.address') }}<br><br>
              {{ $t('home.middleContent.xianggangInfo.phone') }}<br><br><br>
              邮箱：<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
                Dispersions-Resins-Asia<br>@basf.com
              </a>
            </li>

            <li>
              <strong>上海</strong><br><br>
              上海浦东新区<br>
              江心沙路<br><br>
              300号<br>
              {{ $t('home.middleContent.shanghaiInfo.postCode') }}<br>
              {{ $t('home.middleContent.shanghaiInfo.phone') }}<br><br>
              邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
                Dispersions-Resins-CN<br>@basf.com
              </a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.beijingInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.beijingInfo.street') }}<br>
              {{ $t('home.middleContent.beijingInfo.address') }}<br>
              {{ $t('home.middleContent.beijingInfo.detail') }}<br><br>
              {{ $t('home.middleContent.beijingInfo.postCode') }}<br>
              {{ $t('home.middleContent.beijingInfo.phone') }}<br><br>
              邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
                Dispersions-Resins-CN<br>@basf.com
              </a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.guangzhouInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.guangzhouInfo.city') }}<br>
              {{ $t('home.middleContent.guangzhouInfo.street') }}<br>
              {{ $t('home.middleContent.guangzhouInfo.address') }}<br><br>
              {{ $t('home.middleContent.guangzhouInfo.postCode') }}<br>
              {{ $t('home.middleContent.guangzhouInfo.phone') }}<br><br>
              邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
                Dispersions-Resins-CN<br>@basf.com
              </a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.taiwanInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.taiwanInfo.city') }}<br>
              {{ $t('home.middleContent.taiwanInfo.street') }}<br>
              {{ $t('home.middleContent.taiwanInfo.address') }}<br>
              {{ $t('home.middleContent.taiwanInfo.postCode') }}<br><br>
              {{ $t('home.middleContent.taiwanInfo.phone') }}<br><br>
              邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
                Dispersions-Resins-CN<br>@basf.com
              </a>
            </li>
          </template>


          <template v-if="currentLanguage === 'en'">
            <li>
              <strong>{{ $t('home.middleContent.shanghaiInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.shanghaiInfo.city') }}<br>
              {{ $t('home.middleContent.shanghaiInfo.address') }}<br>
              {{ $t('home.middleContent.shanghaiInfo.postCode') }}<br><br><br>
              {{ $t('home.middleContent.shanghaiInfo.phone') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
              Dispersions-Resins-Asia<br>@basf.com
            </a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.beijingInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.beijingInfo.street') }}<br>
              {{ $t('home.middleContent.beijingInfo.address') }}<br>
              {{ $t('home.middleContent.beijingInfo.detail') }}<br><br><br>
              {{ $t('home.middleContent.beijingInfo.phone') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
              Dispersions-Resins-Asia<br>@basf.com</a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.guangzhouInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.guangzhouInfo.city') }}<br>
              {{ $t('home.middleContent.guangzhouInfo.street') }}<br>
              {{ $t('home.middleContent.guangzhouInfo.address') }}<br><br><br>
              {{ $t('home.middleContent.guangzhouInfo.phone') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
              Dispersions-Resins-Asia<br>@basf.com</a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.taiwanInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.taiwanInfo.city') }}<br>
              {{ $t('home.middleContent.taiwanInfo.street') }}<br>
              {{ $t('home.middleContent.taiwanInfo.address') }}<br>
              {{ $t('home.middleContent.taiwanInfo.postCode') }}<br><br>
              {{ $t('home.middleContent.taiwanInfo.phone') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
              Dispersions-Resins-Asia<br>@basf.com</a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.xianggangInfo.title') }}</strong><br><br>
              {{ $t('home.middleContent.xianggangInfo.city') }}<br>
              {{ $t('home.middleContent.xianggangInfo.street') }}<br>
              {{ $t('home.middleContent.xianggangInfo.address') }}<br>
              Tokyo 106-6121, Japan<br><br>
              {{ $t('home.middleContent.xianggangInfo.phone') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
              Dispersions-Resins-Asia<br>@basf.com</a>
            </li>

            <li>
              <strong>{{ $t('home.middleContent.greaterChinaInfo.title') }}</strong><br><br>
              <strong>{{ $t('home.middleContent.greaterChinaInfo.city') }}</strong><br>
              {{ $t('home.middleContent.greaterChinaInfo.address') }}<br>
              {{ $t('home.middleContent.greaterChinaInfo.phone') }}<br>
              {{ $t('home.middleContent.greaterChinaInfo.title2') }}<br><br>
              {{ $t('home.middleContent.greaterChinaInfo.city2') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
              Dispersions-Resins-Asia<br>@basf.com</a>
            </li>

            <li>
              <br><br><strong class="special">{{ $t('home.middleContent.basfInfo.title') }}</strong><br>
              {{ $t('home.middleContent.basfInfo.city') }}<br>
              {{ $t('home.middleContent.basfInfo.street') }}<br>
              {{ $t('home.middleContent.basfInfo.address') }}<br><br>
              {{ $t('home.middleContent.basfInfo.postCode') }}<br>
              Email:<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
              Dispersions-Resins-CN<br>@basf.com</a>
            </li>

            <li>
              <br><br><strong class="special">{{ $t('home.middleContent.basfTaiwanInfo.title') }}</strong><br>
              {{ $t('home.middleContent.basfTaiwanInfo.city') }}<br>
              {{ $t('home.middleContent.basfTaiwanInfo.street') }}<br>
              Taipei 10486, Taiwan <br><br>
              Tel: +886 2 2518 7600<br>
              Email:<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
              Dispersions-Resins-CN<br>@basf.com</a>
            </li>
          </template>
        </ul>
      </v-col>

      <v-col cols="12" class="introduce">
        <h1>
          <router-link :to="{ name: 'Register' }" class="special-color">
            {{ $t('global.register') }} !
          </router-link>
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
  import { getCookie } from "../../utils/cookie"

  export default {
    components: {},

    data: function () {
      return {
        cardElevation: 0,
        currentLanguage: 'zh-hans'
      }
    },

    mounted () {
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

      h1 {
        /*padding: 60px 100px 30px;*/

        a {
          text-transform: capitalize;
        }
      }

      p {
        /*padding: 0 100px;*/
        font-size: 16px!important;

        .v-icon {
          border-radius: 20px;
          margin-right: 20px;
          color: #fff;
          top: -2px;
        }
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

    .contact {
      text-align: left;
      padding: 0 50px;
      padding-bottom: 20px;

      h2 {
        font-size: 1.4em;
        line-height: 1.3;
        margin: 0;
        padding: 20px 0;
        border-bottom: 1px solid;
      }

      ul {
        padding: 0;

        li {
          float: left;
          font-size: .8em;
          line-height: 1.3;
          min-height: auto;
          padding: 20px 20px 0;
          width: 20%;
          list-style: none;

          &:first-child {
            border: none!important;
            padding-left: 0;
          }
        }
      }
    }

    .english-version {

      li {
        width: 20% !important;
        padding-left: 0 !important;
        white-space: nowrap;

        strong {
          white-space: nowrap;

          &.special {
            white-space: normal;
          }
        }
      }
    }

    .about-us {
      padding: 0 50px;

      h1 {
        padding: 10px 0;
        margin-top: 17px;
      }

      .buy-link {
      margin-top: 25px;
    }

      .wechat-image {
        /*margin-top: 20px;*/
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
    }

    .unlock {
      background-color: #fff;
      border-radius: 8px;
      display: inline-block;
      float: left;
      padding: 10px 3%;
      width: 100%;
      box-shadow: 2px 2px 8px 0 rgba(0,0,0,.1);
      margin-bottom: 50px;
      padding-bottom: 50px!important;
    }
  }
</style>
