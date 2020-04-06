<template>
  <v-container
    fluid
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row>
      <v-col cols="12" md="6" sm="6" v-for="(featureProduct, index) in featureProducts" :key="index">
        <v-hover v-slot:default="{ hover }">
<!--          <v-card-->
<!--            class="mx-auto features-product"-->
<!--            max-width="500"-->
<!--            :elevation="hover ? 18 : 2"-->
<!--          >-->
<!--            <v-card-title>-->
<!--              <template v-if="index === 0">-->
<!--                <icon-features1 width="100" height="100"></icon-features1>-->
<!--              </template>-->

<!--              <template v-else-if="index === 1">-->
<!--                <icon-features2 width="100" height="100"></icon-features2>-->
<!--              </template>-->

<!--              <template v-else-if="index === 2">-->
<!--                <icon-features3 width="100" height="100"></icon-features3>-->
<!--              </template>-->

<!--              <template v-else-if="index === 3">-->
<!--                <icon-features4 width="100" height="100"></icon-features4>-->
<!--              </template>-->
<!--              <span class="title font-weight-light"><samll>Product <br> Highlight</samll></span>-->
<!--            </v-card-title>-->

<!--            <v-card-actions class="title-name">-->
<!--              <v-list-item class="grow">-->
<!--                <h1>-->
<!--                  <router-link :to="{name: 'Product', params: {id: featureProduct.uuid}}">-->
<!--                    {{ featureProduct.title }}<v-icon>keyboard_arrow_right</v-icon>-->
<!--                  </router-link>-->
<!--                </h1>-->
<!--              </v-list-item>-->
<!--            </v-card-actions>-->

<!--            <v-card-text class="subtitle-1" v-html="featureProduct.body">-->
<!--            </v-card-text>-->
<!--          </v-card>-->
          <div class="teaser-container orange1" :elevation="hover ? 18 : 2">
            <a href="https://carecreations.basf.us/stories/covid-19-march-2020" target="_blank">
              <picture target="_blank" href="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_hands.jpg?sfvrsn=76c5d260_2">
                <!--[if IE 9]><video style="display: none;"><![endif]-->
                <source srcset="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_hands.jpg?sfvrsn=76c5d260_2" media="(min-width: 1024px)">
                <source srcset="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_hands.jpg?sfvrsn=76c5d260_2">
                <!--[if IE 9]></video><![endif]-->
                <img src="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_hands.jpg?sfvrsn=76c5d260_2" srcset="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_hands.jpg?sfvrsn=76c5d260_2 1279w, https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_hands.jpg?sfvrsn=76c5d260_2 1024w" alt="home_teaser_hands">
              </picture>
            </a>

            <div class="caption">
              <a href="https://carecreations.basf.us/stories/covid-19-march-2020" target="_blank">
                <h1>What’s new</h1>
                <h2>News from North America</h2>
              </a>

              <p><strong>Hand Hygiene Formulation Support in Response to COVID-19
              </strong><br> While consumers practice social distancing, manufacturers are
                hard at work supplying the goods needed to stay safe and healthy
                while the virus runs its course. People especially need liquid hand soaps,
                hand sanitizers, wipes, and similar products to keep their bodies and
                environments free of pathogens.
              </p>

              <a href="https://carecreations.basf.us/stories/covid-19-march-2020" target="_blank" class="external">Read More</a>
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
