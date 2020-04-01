<template>
  <v-app v-scroll="onScroll" :class="appColor">
    <core-toolbar></core-toolbar>

    <template v-if="showFilterbar">
      <core-filterbar :title="title"></core-filterbar>
    </template>

    <core-drawer></core-drawer>

    <core-view></core-view>

    <footer-bar></footer-bar>

    <core-footer></core-footer>

    <core-cta></core-cta>

    <v-snackbar
      top
      right
      timeout="3000"
      v-model="globalSnackbar"
      multi-line
      color="secondary"
    >
      {{ snackbarMessage }}
      <v-btn
        color="white"
        text
        @click="setSnackbar"
      >
        关闭
      </v-btn>
    </v-snackbar>

    <login-dialog></login-dialog>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import { globalUtils } from './utils/globalUtils'
  import path from '../public/css/googleapi_material_icons.css'

  export default {
    name: 'App',
    components: {
      LoginDialog: () => import('@/components/LoginDialog'),
      CoreCta: () => import('@/components/core/Cta'),
      CoreDrawer: () => import('@/components/core/Drawer'),
      FooterBar: () => import('@/components/core/FooterBar'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreToolbar: () => import('@/components/core/Toolbar'),
      CoreFilterbar: () => import('@/components/core/Filterbar'),
      CoreView: () => import('@/components/core/View')
    },

    data () {
      return {
        showFilterbar: false,
        title: 'Products'
      }
    },

    computed: {
      ...mapState({
        globalSnackbar: state => state.core.globalSnackbar,
        snackbarMessage: state => state.core.snackbarMessage,
        appColor: state => state.core.appColor,
      }),
    },

    watch: {
      '$route' (to, from) {
          if (to.name === 'Products' || to.name === 'Formulations') {
            // 关闭产品和配方列表页的过滤组件
            // this.title = to.name
            // this.showFilterbar = true
          } else {
            this.showFilterbar = false
          }
        }
    },

    created () {
      // IE 浏览器不加载material 样式文件
      if (!this.isIE()) {
        globalUtils.loadCss('/css/googleapi_material_icons.css')
      }
    },

    methods: {
      isIE () {
        if (window.ActiveXObject || "ActiveXObject" in window || window.navigator.userAgent.indexOf("MSIE") >= 1){
          return true
        }else{
          return false
        }
      },
      setSnackbar () {
        this.$store.commit('SET_SNACKBAR', {
          globalSnackbar: false,
          snackbarMessage: ''
        })
      },

      onScroll: function () {
        let appHeader = document.getElementById('app-header')
        let _that = this

        if (appHeader.style.transform === 'translateY(0px)' || document.documentElement.scrollTop === 0) {
          _that.$store.state.core.hiddenTopAppBar = false
        } else if (appHeader.style.transform === 'translateY(-72px)' || document.documentElement.scrollTop > 173) {
          _that.$store.state.core.hiddenTopAppBar = true
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "scss/app.scss";
</style>
