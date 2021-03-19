<template>
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
          <template v-if="isMobile">
            Dispersions-Resins-Asia@basf.com
          </template>

          <template v-else>
            Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span>
          </template>
        </a>
        </li>

        <li>
          <strong>上海</strong><br><br>
          上海浦东新区<br>
          江心沙路<br>
          300号<br><br>
          {{ $t('home.middleContent.shanghaiInfo.phone') }}<br>
          {{ $t('home.middleContent.shanghaiInfo.postCode') }}<br><br>
          邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">

          <template v-if="isMobile">
            Dispersions-Resins-CN@basf.com
          </template>

          <template v-else>
            Dispersions-Resins-CN<span class="special-class">@basf.com</span>
          </template>

        </a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.beijingInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.beijingInfo.street') }}<br>
          {{ $t('home.middleContent.beijingInfo.address') }}<br>
          {{ $t('home.middleContent.beijingInfo.detail') }}<br><br>
          {{ $t('home.middleContent.beijingInfo.phone') }}<br>
          {{ $t('home.middleContent.beijingInfo.postCode') }}<br><br>
          邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
          <template v-if="isMobile">
            Dispersions-Resins-CN@basf.com
          </template>

          <template v-else>
            Dispersions-Resins-CN<br><span class="special-class">@basf.com</span>
          </template>
        </a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.guangzhouInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.guangzhouInfo.city') }}<br>
          {{ $t('home.middleContent.guangzhouInfo.street') }}<br>
          {{ $t('home.middleContent.guangzhouInfo.address') }}<br><br>
          {{ $t('home.middleContent.guangzhouInfo.phone') }}<br>
          {{ $t('home.middleContent.guangzhouInfo.postCode') }}<br><br>
          邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
          <template v-if="isMobile">
            Dispersions-Resins-CN@basf.com
          </template>

          <template v-else>
            Dispersions-Resins-CN<br><span class="special-class">@basf.com</span>
          </template>
        </a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.taiwanInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.taiwanInfo.city') }}<br>
          {{ $t('home.middleContent.taiwanInfo.street') }}<br>
          {{ $t('home.middleContent.taiwanInfo.address') }}<br><br>
          {{ $t('home.middleContent.taiwanInfo.phone') }}<br>
          {{ $t('home.middleContent.taiwanInfo.postCode') }}<br><br>
          邮箱：<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
          <template v-if="isMobile">
            Dispersions-Resins-CN@basf.com
          </template>

          <template v-else>
            Dispersions-Resins-CN<br><span class="special-class">@basf.com</span>
          </template>
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
          Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span>
        </a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.beijingInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.beijingInfo.street') }}<br>
          {{ $t('home.middleContent.beijingInfo.address') }}<br>
          {{ $t('home.middleContent.beijingInfo.detail') }}<br><br><br>
          {{ $t('home.middleContent.beijingInfo.phone') }}<br>
          Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
          Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span></a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.guangzhouInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.guangzhouInfo.city') }}<br>
          {{ $t('home.middleContent.guangzhouInfo.street') }}<br>
          {{ $t('home.middleContent.guangzhouInfo.address') }}<br><br><br>
          {{ $t('home.middleContent.guangzhouInfo.phone') }}<br>
          Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
          Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span></a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.taiwanInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.taiwanInfo.city') }}<br>
          {{ $t('home.middleContent.taiwanInfo.street') }}<br>
          {{ $t('home.middleContent.taiwanInfo.address') }}<br>
          {{ $t('home.middleContent.taiwanInfo.postCode') }}<br><br>
          {{ $t('home.middleContent.taiwanInfo.phone') }}<br>
          Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
          Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span></a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.xianggangInfo.title') }}</strong><br><br>
          {{ $t('home.middleContent.xianggangInfo.city') }}<br>
          {{ $t('home.middleContent.xianggangInfo.street') }}<br>
          {{ $t('home.middleContent.xianggangInfo.address') }}<br>
          {{ $t('home.middleContent.xianggangInfo.postCode') }}{{ $t('home.middleContent.xianggangInfo.city2')
          }}<br><br>
          {{ $t('home.middleContent.xianggangInfo.phone') }}<br>
          Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
          Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span></a>
        </li>

        <li>
          <strong>{{ $t('home.middleContent.greaterChinaInfo.title') }}</strong><br><br>
          <strong>{{ $t('home.middleContent.greaterChinaInfo.city') }}</strong><br>
          {{ $t('home.middleContent.greaterChinaInfo.address') }}<br>
          {{ $t('home.middleContent.greaterChinaInfo.phone') }}<br>
          {{ $t('home.middleContent.greaterChinaInfo.title2') }}<br><br>
          {{ $t('home.middleContent.greaterChinaInfo.city2') }}<br>
          Email:<a :href="`mailto:Dispersions-Resins-Asia@basf.com`">
          Dispersions-Resins-Asia<br><span class="special-class">@basf.com</span></a>
        </li>

        <li>
          <template v-if="!isMobile"><br><br></template>
          <strong class="special">{{ $t('home.middleContent.basfInfo.title') }}</strong><br>
          {{ $t('home.middleContent.basfInfo.city') }}<br>
          {{ $t('home.middleContent.basfInfo.street') }}<br>
          {{ $t('home.middleContent.basfInfo.address') }}<br><br>
          {{ $t('home.middleContent.basfInfo.postCode') }}<br>
          Email:<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
          Dispersions-Resins-CN<br><span class="special-class">@basf.com</span></a>
        </li>

        <li>
          <template v-if="!isMobile"><br><br></template>
          <strong class="special">{{ $t('home.middleContent.basfTaiwanInfo.title') }}</strong><br>
          {{ $t('home.middleContent.basfTaiwanInfo.city') }}<br>
          {{ $t('home.middleContent.basfTaiwanInfo.street') }}<br>
          Taipei 10486, Taiwan <br><br>
          Tel: +886 2 2518 7600<br>
          Email:<a :href="`mailto:Dispersions-Resins-CN@basf.com`">
          Dispersions-Resins-CN<br><span class="special-class">@basf.com</span></a>
        </li>
      </template>
    </ul>
  </v-col>
</template>

<script>
  // Utilities
  // import IconApp from '../svg/App'
  import {getCookie} from "../../utils/cookie"
  import {isMobile} from '../../utils/globalUtils'

  export default {
    components: {},

    data: function () {
      return {
        currentLanguage: 'zh-hans',
        isMobile: isMobile(),
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
  .contact {
    text-align: left;
    padding: 0 50px 20px !important;

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
          border: none !important;
          padding-left: 0;
        }
      }
    }

    &.english-version {

      li {
        width: 20%;
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

    .special-class {
      position: relative;
      left: 39px;
    }

    @media screen and (max-width: 480px) {
      padding: 0 25px 20px !important;

      ul {

        li {
          width: 50%;
          padding-left: 0;

          &:nth-last-child(1) {
            width: 100% !important;
          }
        }
      }

      &.english-version {

        li {
          width: 100%;
        }
      }
    }
  }
</style>
