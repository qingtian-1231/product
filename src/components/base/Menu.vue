<template>
  <ul
    class="main-menu"
  >
    <template v-for="(link, i) in menuLinks">
      <template v-if="link.dialog">
        <li
          :key="i"
        >
          <v-btn
            color="primary"
            dark
            icon
            v-on="on"
            @click="headerMenuClick($event, link)"
          >
            <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
            {{ link.title }}
          </v-btn>
        </li>
      </template>

      <template v-else-if="link.below">
        <li
          :key="i"
          class="below-menu"
        >
          <v-btn
            color="primary"
            dark
            icon
            v-on="on"
          >
            <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
            {{ link.title }}
          </v-btn>
          <div class="sub-menu">
            <sub-menu :below="link.below"></sub-menu>
          </div>
        </li>
      </template>

      <template v-else>
        <li
          :key="i"
        >
          <v-btn
            @click="headerMenuClick($event, link)"
            color="primary"
            dark
            icon
            v-on="on"
          >
            <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
            {{ link.title }}
          </v-btn>
        </li>
      </template>
    </template>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'
  import SubMenu from './SubMenu'

  export default {
    name: 'menu-links',

    components: { SubMenu },

    computed: {
      ...mapState({
        menuLinks: state => state.core.menuItems,
        isLogin: state => state.user.isLogin,
        loginStatus: state => state.core.loginStatus,
        globalSearchResult: state => state.search.searchResult
      }),
    },

    mounted () {},

    methods: {
      headerMenuClick: function (e, item) {
        e.stopPropagation()

        if (item.dialog) {
          this.$store.state.core.requestDialog = true
          return
        }

        if (item.uri === 'base:sample-order' && !this.isLogin) {
          this.$store.commit('open_login_dialog')
          return
        }

        if (item.to || !item.relative) {
          return
        }

        this.$router.push({ path: item.relative})
      },
    }
  }
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0;
  margin: 0;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  list-style: none;

  li {
    color: #333;
    height: 100%;

    &.below-menu {
      position: relative;

      &:hover {

        .sub-menu {
          opacity: 1;
          visibility: visible;
        }
      }

      .sub-menu {
        position: absolute;
        left: 16px;
        top: 72px;
        opacity: 0;
        visibility: hidden;
        background-color: #fff;
        -webkit-transition: all 225ms ease;
        -o-transition: all 225ms ease;
        transition: all 225ms ease;

        @media screen and (min-width: 1024px) {
          min-height: 350px;
        }
      }
    }

    & > .v-btn {
      height: 100% !important;
      width: 100% !important;
      min-width: 100%;
      max-width: 100%;
      border-radius: 0;
      margin: 0 16px;
      color: #333!important;
      font-weight: bold;
      font-size: .8em;
    }
    
    .v-icon {
      color: #333;
    }
  }
}
</style>
