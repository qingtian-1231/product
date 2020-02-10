<template>
  <v-footer
    class="py-4"
    dark
    height="auto"
  >
    <v-container mx-auto px-0>
      <v-row class="align-center">
        <div class="ml-auto mr-auto ml-md-0 d-flex align-center col col-auto footer-left">
          <span class="mr-3 overline">powered by:</span>
          <a aria-label="Link to Shopify" href="" target="_blank" rel="noopener noreferrer">
            BASF
          </a>
        </div>
        <div class="ml-auto mr-auto mr-md-0 col col-auto footer-right">
          © Copyright 2020 Vuetify LLC
          <span class="hidden-sm-and-down">|</span>
          <br class="hidden-md-and-up"> Made With ❤ by
          <a href="" target="_blank" rel="noopener noreferrer">CPQ</a>
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

      a {
        width: 30px;
        height: 30px;
        max-width: 30px;
        max-height: 30px;
      }
    }
  }
</style>
