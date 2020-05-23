<template>
  <v-container
    fluid
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row>
      <v-col cols="12" md="6" sm="6" v-for="(featureProduct, index) in featureProducts" :key="index">
        <v-hover v-slot:default="{ hover }">
          <div :class="`teaser-container ${featureProduct.field_front_product_color}`" :elevation="hover ? 18 : 2">
            <a target="_blank" :href="`/product/${featureProduct.uuid}`">
              <picture target="_blank" :href="featureProduct.field_media_image">
                <!--[if IE 9]><video style="display: none;"><![endif]-->
                <source :srcset="featureProduct.field_media_image" media="(min-width: 1024px)">
                <source :srcset="featureProduct.field_media_image">
                <!--[if IE 9]></video><![endif]-->
                <img :src="featureProduct.field_media_image" :srcset="featureProduct.field_media_image">
              </picture>
            </a>

            <div class="caption">
              <a target="_blank" :href="`/product/${featureProduct.uuid}`">
<!--                <h1>What’s new</h1>-->
                <h2 class="title" v-html="featureProduct.title"></h2>
              </a>
              <p v-html="featureProduct.field_front_product_description"></p>
              <a target="_blank" :href="`/product/${featureProduct.uuid}`">
                {{ $t('global.readMore') }}
              </a>
            </div>
          </div>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  // import IconFeatures1 from '../svg/features/Features-1'
  // import IconFeatures2 from '../svg/features/Features-2'
  // import IconFeatures3 from '../svg/features/Features-3'
  // import IconFeatures4 from '../svg/features/Features-4'
  import { mapState } from 'vuex'

  export default {
    components: { },

    data: function () {
      return {
        cardElevation: 0
      }
    },

    computed: {
      // Getting Vuex State from store/modules/
      ...mapState({
        isLogin: state => state.user.isLogin,
        featureProducts: state => state.home.featureProduct
      })
    },

    methods: {},

    mounted () {
      let vm = this
      vm.$store.dispatch('getFeatureProducts').then(() => {

      })
    }
  }
</script>

<style lang="scss" scoped>
  #features {

    & > div {
      margin: 0 auto;
    }

    @media screen and (max-width: 1600px) {
      //margin-top: -20%;
    }

    @media screen and (max-width: 800px) {
      //margin-top: -130%;
    }

    @media screen and (max-width: 640px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
     //margin-top: -110%;
    }
  }

  .features-card {
    padding: 10px;
  }

  .features-product {
    overflow: hidden;
    padding: 50px 20px 20px 20px;
    position: relative;
    transition: all .2s ease-in-out;
    white-space: normal;
    min-height: 425px;

    p {
      margin-bottom: 0;
    }

    .v-card__title {

      .title {
        border-radius: 8px;
        display: block;
        line-height: 17px;
        padding: 0;
        position: absolute;
        right: 20px;
        text-align: right;
        top: 22px;

        samll {
          color: #aaa;
          font-family: Helvetica Neue LT W01_71488914;
          line-height: 17px;
          font-size: .8125em;
        }
      }
    }

    .v-card__actions {

      & > div {
        padding-left: 0;
      }

      a {
        text-decoration: none;
        color: #333;
      }
    }

    .v-card__text {
      padding-top: 0;
    }
  }
</style>
