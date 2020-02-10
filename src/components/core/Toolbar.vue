<template>
  <v-app-bar
    id="app-header"
    fixed
    dark
    hide-on-scroll
    height="72"
    extension-height="72"
    color="primary"
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
              <v-icon class="d-none d-md-block" dark>perm_identity</v-icon>
              <template v-if="!loginStatus">
                <v-icon class="d-md-none" dark>menu</v-icon>
              </template>
              <template v-else>
                <v-icon class="d-md-none" dark>close</v-icon>
              </template>
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  fab
                  color="primary"
                  dark
                  v-on="on"
                >
                  <v-icon>translate</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title><a @click="switchChinese">中文</a></v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><a @click="switchEnglish">English</a></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col class="py-0 menu-layout hidden-sm-and-down" cols="12" sm="8">
            <v-tabs
              v-model="model"
              centered
              slider-color="secondary"
              slider-size="4"
              background-color="white"
              color="grey"
            >
              <template v-for="(link, i) in menuLinks">
                <template v-if="link.dialog">
                  <v-tab
                    :key="i"
                    @click="headerMenuClick($event, link)"
                  >
                    <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                    {{ link.title }}
                  </v-tab>
                </template>

                <template v-else-if="link.below">
                  <v-tab
                    :key="i"
                    class="below-menu"
                  >
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          color="primary"
                          dark
                          icon
                          v-on="on"
                        >
                          <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                          {{ link.title }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in link.below"
                          :key="index"
                          @click="test"
                        >
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-tab>
                </template>

                <template v-else>
                  <v-tab
                    :key="i"
                    :to="link.relative"
                    @click="headerMenuClick($event, link)"
                  >
                    <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                    {{ link.title }}
                  </v-tab>
                </template>
              </template>
            </v-tabs>
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
        <v-row :class="`mx-0 ${searchGlobalClass}`">
          <v-icon>search</v-icon>
          <div class="search-input">
            <input type="text" placeholder="Search" name="searchInput" id="smartSearch" value="">
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

  export default {
    components: { Logo, Basket },

    data: function () {
      return {
        headerMenuClass: 'header-main-menu',
        searchGlobalClass: 'search d-none',
      }
    },

    computed: {
      ...mapState({
        menuLinks: state => state.core.menuItems,
        loginStatus: state => state.core.loginStatus
      }),
    },

    methods: {
      switchEnglish () {
        let vm = this
        vm.$store.commit('SWITCH_ENGLISH', {
          path: 'en/api/menu_items/vue-app-menu'
        })

        vm.$store.dispatch('getApiMenu').then(() => {
          vm.$store.commit('SET_SNACKBAR', {
            globalSnackbar: true,
            snackbarMessage: 'Your languages has been changed！'
          })
        })
      },

      switchChinese () {
        let vm = this
        vm.$store.commit('SWITCH_ENGLISH', {
          path: 'api/menu_items/vue-app-menu'
        })

        vm.$store.dispatch('getApiMenu').then(() => {
          vm.$store.commit('SET_SNACKBAR', {
            globalSnackbar: true,
            snackbarMessage: '您的语言切换成功！'
          })
        })
      },

      openGlobalSearch () {
        this.headerMenuClass = 'header-main-menu d-none'
        this.searchGlobalClass = 'search bounceDown-enter-active'
      },

      closeGlobalSearch () {
        this.headerMenuClass = 'header-main-menu'
        this.searchGlobalClass = 'search bounceUp-leave-active'
        // d-none
      },

      headerMenuClick: function (e, item) {
        e.stopPropagation()

        if (item.dialog) {
          this.$store.state.core.requestDialog = true
        }

        if (item.to || !item.href) {
          return
        }

        this.$vuetify.goTo(item.href)
      },

      openLoginSheet () {
        this.$store.state.core.loginStatus = !this.$store.state.core.loginStatus
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
          }
        }
      }

      .search-layout {
        padding-right: 50px !important;

        @media screen and (max-width: 600px) {
         text-align: right;
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
      overflow: hidden;
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
