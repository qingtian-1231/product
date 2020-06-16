<template>
  <v-app-bar
    id="app-header"
    fixed
    dark
    hide-on-scroll
    height="72"
    extension-height="72"
  >
    <v-container class="fill-height app-tool-bar">
      <v-row>
        <a href="/" class="logo">
          <Logo></Logo>
        </a>
        <v-spacer/>
      </v-row>
    </v-container>
    <template v-slot:extension>
      <v-container class="fill-height px-0 py-0 app-tool-bar-extention">
        <v-row :class="`mx-0 ${headerMenuClass}`">
          <v-col class="px-0 login-layout" cols="6" md="2">
            <v-btn @click.stop="openLoginSheet" class="mx-2" fab dark small color="secondary">
              <template v-if="isLogin">
                <v-icon class="d-none d-md-block" dark>account_box</v-icon>
              </template>

              <template v-else>
                <v-icon class="d-none d-md-block" dark>person</v-icon>
              </template>

              <template v-if="!loginStatus">
                <v-icon class="d-md-none" dark>menu</v-icon>
              </template>
              <template v-else>
                <v-icon class="d-md-none" dark>close</v-icon>
              </template>
            </v-btn>

            <v-btn
              small
              fab
              color="primary"
              dark
              @click="switchLanguage(language)"
            >
              <template v-if="language === 'zh-hans'">
                EN
              </template>

              <template v-else-if="language === 'en'">
                中文
              </template>
            </v-btn>
          </v-col>
          <v-col class="py-0 menu-layout hidden-sm-and-down" cols="12" sm="8">
            <menu-links></menu-links>
          </v-col>
          <v-col class="px-0 search-layout text-right" cols="6" md="2">
            <basket></basket>
            <v-btn
              fab
              small
              color="secondary"
              v-on="on"
              class="mx-2"
              @click="openGlobalSearch"
            >
              <v-icon>search</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row :class="`mx-0 ${searchGlobalClass}`" style="animation-duration: 0.25s">
          <template v-if="globalSearchLoading">
            <v-progress-circular
              :size="72"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>

          <template v-else>
            <v-icon>search</v-icon>
          </template>

          <div class="search-input">
            <input
              type="text"
              placeholder="Search"
              name="searchInput"
              class="smartSearch"
              id="smartSearch"
              v-model="globalSearchKeyWord"
              @keyup="globalSearch()"
            >
            <ul id="search-result" class="search-result">
              <template v-for="(result, index) in globalSearchResult">
                <li :key="index">
                  <div class="item listed product result">
              <span>
                <template v-if="result.type === 'product'">
                  <router-link :to="{name: 'Product', params: {id: result.uuid}}" @click.native="flushCom">
                    {{ result.title }}
                  </router-link>
                </template>

                <template v-else>
                  <router-link :to="{name: 'Formulation', params: {id: result.uuid}}" @click.native="flushCom">
                  {{ result.title }}
                </router-link>
                </template>

                <small>
                  - {{ result.type }}
                </small>
              </span>
                    <span></span>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <v-btn icon @click="closeGlobalSearch">
            <v-icon>closed</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import Logo from '../svg/Logo'
  import Basket from '../Basket'
  import MenuLinks from '../base/Menu'
  import { debounce } from '../../utils/globalUtils'
  import { getCookie } from "../../utils/cookie"
  import $ from 'jquery'

  export default {
    components: { Logo, Basket, MenuLinks },

    data: function () {
      return {
        globalSearchLoading: false,
        globalSearchKeyWord: '',
        headerMenuClass: 'header-main-menu',
        searchGlobalClass: 'search d-none hidden',
      }
    },

    computed: {
      ...mapState({
        menuLinks: state => state.core.menuItems,
        isLogin: state => state.user.isLogin,
        loginStatus: state => state.core.loginStatus,
        globalSearchResult: state => state.search.searchResult
      }),
      language: function () {
        return getCookie('drupal:session:language') || 'zh-hans'
      }
    },

    mounted () {
      let vm = this
      vm.clearSearchResult()

      if (vm.$router.history.current.name !== 'Home') {
        $('body').click(function(e){
          if(
            $(e.target).attr('class') !== 'router-link-exact-active router-link-active' &&
            $(e.target).attr('class') !== 'v-icon notranslate material-icons theme--dark' &&
            $(e.target).attr('class') !== 'smartSearch' &&
            $(e.target).attr('class') !== 'mx-2 v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--small secondary'
          ){
            vm.closeGlobalSearch()
          }
        });
      }
    },

    methods: {
      switchLanguage (language) {
        let vm = this
        let switchLanguage = {}

        if (language === 'zh-hans') {
          switchLanguage = {language: 'en'}
        }
        else if (language === 'en') {
          switchLanguage = {language: 'zh-hans'}
        }
        vm.$store.commit('switch_Language', switchLanguage)
        window.location.reload()
      },

      openGlobalSearch () {
        if (this.$router.history.current.name === 'Home') {
          this.$store.commit('changeSearchFocus')
          let scrollHeight = $('.search-content').offset().top / 2 + 50
          this.scrollTop(scrollHeight)

          $('.search-content').find('input').focus()
        }
        else {
          console.log("searchGlobalClasssearchGlobalClass")
          this.headerMenuClass = 'header-main-menu d-none'
          this.searchGlobalClass = 'search fadeRight-enter-active'
          setTimeout(() => {
            $('#smartSearch').focus()
          }, 1000)
        }
      },

      scrollTop (scrollHeight) {
        window.scrollTo({
          top: scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      },

      flushCom () {
        this.$router.go(0);
      },

      closeGlobalSearch () {
        this.headerMenuClass = 'header-main-menu'
        this.searchGlobalClass = 'search hidden fadeRight-leave-active'
        // d-none
      },

      openLoginSheet () {
        this.$store.state.core.loginStatus = !this.$store.state.core.loginStatus
      },

      debounceGlobalSearch: debounce(({ vm }) => {
        if (vm.globalSearchKeyWord) {
          vm.globalSearchLoading = true
          vm.$store.dispatch('productSearch', vm.globalSearchKeyWord).then(result => {
            vm.globalSearchLoading = false
            $('#search-result').removeClass('hidden')
          });
        } else {
          vm.clearSearchResult()
        }
      }, 300),

      globalSearch() {
        let vm = this
        vm.debounceGlobalSearch({ vm })
      },

      clearSearchResult() {
        this.$store.commit('clearSearchResult')
        $('#search-result').addClass('hidden')
      }
    }
  }
</script>
<style lang="scss">
  header {
    .app-tool-bar {
      padding-left: 50px;
      padding-right: 50px;
      @media screen and (min-width: 1264px) {
        max-width: 1665px;
      }
    }

    .app-tool-bar-extention {
      @media screen and (min-width: 1264px) {
        max-width: 1665px;
      }

      .login-layout {
        padding-left: 50px !important;

        @media screen and (max-width: 600px) {
          padding-left: 10px !important;
        }

        button {
          margin: 0 10px!important;
        }
      }

      .menu-layout {

        .below-menu {
          padding: 0;

          & > .v-btn {
            height: 100%;
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            border-radius: 0;
            margin: 0 16px;
            color: #333!important;
            text-transform: capitalize;
          }
        }
      }

      .search-layout {
        padding-right: 50px !important;

        @media screen and (max-width: 600px) {
          text-align: right;
          padding-right: 0 !important;
        }
      }
    }

    box-shadow: none !important;

    a.logo {
      padding: 0px 0;
      position: relative;
      width: 127px;

      .icon {
        float: inherit;
      }
    }

    .v-toolbar__extension {
      background-color: #fff;
      padding: 0;
      border-bottom: 1px solid #e2e2e2;
    }

    .header-main-menu {
      height: 100%;

      .v-tabs {
        height: 100%;

        .v-tab.v-tab {
          color: #333 !important;
          opacity: 1 !important;

          a {
            color: #333;
          }

          .v-icon {
            color: #333 !important;
          }
        }

        .v-item-group {
          height: 100%;
        }
      }
    }

    .search {
      background: #fff;
      height: 72px;
      margin: 0;
      right: 0;
      transition: all .3s;
      width: 100%;

      & > .v-icon {
        display: block;
        height: 32px;
        left: 6px;
        position: absolute;
        top: 6px;
        width: 32px;
        z-index: 1;

        @media screen and (min-width: 1024px) {
          height: 48px;
          left: 72px;
          right: 0;
          top: 15px;
          width: 48px;
          font-size: 48px;
          color: #9c9c9c;
        }
      }

      & > div {
        border: none;
        height: 100%;
        padding-left: 120px;
        width: 100%;

        input {
          border: none;
          font-size: 1em;
          color: #333;
          line-height: 37px;
          width: 100%;
          z-index: 2;
          background: none;
          padding: 10px;
          height: 100%;

          &:focus {
            border: none;
            outline: unset;
            outline-offset: unset;
          }

          @media screen and (min-width: 480px) {
            line-height: 63px;
            font-size: 1.5em;
          }
        }

        & > .search-input {
          width: 100%;
        }

        @media screen and (max-width: 480px) {
          padding-left: 12px;
        }
      }

      & > .v-progress-circular {
        position: absolute;
      }

      & > .v-btn {
        background: #fff;
        border-radius: 0;
        height: 100% !important;
        margin: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 72px !important;
        color: #333 !important;
      }

      .search-result {
        position: absolute;
        background: #fff;
        border-radius: 0;
        box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.25);
        height: auto;
        max-height: 300px;
        margin: 0;
        overflow-y: auto;
        padding: 0;
        right: 0;
        text-align: center;
        top: 72px;
        width: 100%;
        transition: all 0.3s;
        border-top: 1px solid #ddd;

        li {
          text-align: left;
          padding: 0 10%;
        }
      }
    }
  }

  .hidden {
    display: none;
  }

  .current {
    background-color: #028fd2;
    color: #fff;

    a {
      color: #fff !important;
    }
  }

  .v-menu__content {

    .v-list {
      padding: 0;

      a {
        color: #333;
        text-decoration: none;
      }
    }
  }

  #minibasket {
    padding: 10px 26px;

    h2 {
      padding: 15px 0;
      text-align: center;

      & > .v-icon {
        width: 40px;
        height: 40px;
        margin: -5px 5px 0 -10px;
      }

      .v-btn {
        float: right;
        height: 40px;
        width: 40px;
        margin: -5px -10px 0 0;
      }
    }

    & > div {

      & > ul {
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        margin: 0;
        padding: 0;

        li {
          list-style: none;
        }
      }

      & > .v-btn {
        border: 1px solid #555;
        display: inline-block;
        height: 32px;
        line-height: 1;
        margin: 15px auto 0;
        position: relative;
        text-align: center;
        text-decoration: none;
        width: 100%;
      }
    }

    .item {

      &.added {
        padding: 10px 0;

        & > span {
          font-size: .8125em;

          & > a {

            & > .icon {
              height: 24px;
              margin-right: 10px;
              width: 24px;
            }
          }

          & > .select {
            margin: 10px 0 10px 34px;
            position: relative;

            & > .v-input {
              border: 1px solid rgba(255, 255, 255, 0);
            }
          }
        }
      }
    }
  }
</style>
