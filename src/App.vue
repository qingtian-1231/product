<template>
  <v-app v-scroll="onScroll">
    <core-toolbar></core-toolbar>

    <template v-if="showFilterbar">
      <core-filterbar :title="title"></core-filterbar>
    </template>

    <core-drawer></core-drawer>

    <core-view></core-view>

    <core-footer></core-footer>

    <core-cta></core-cta>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {
      CoreCta: () => import('@/components/core/Cta'),
      CoreDrawer: () => import('@/components/core/Drawer'),
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

    watch: {
      '$route' (to, from) {
          console.log('route change: ' + from.name)
          if (to.name === 'Products' || to.name === 'Formulations') {
            this.title = to.name
            this.showFilterbar = true
          } else {
            this.showFilterbar = false
          }
        }
    },

    methods: {
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
<style lang="sass">
  @import "sass/app.sass"
</style>
