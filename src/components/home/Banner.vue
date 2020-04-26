<template>
  <v-container
    tag="section"
    fluid
  >
    <v-row>
      <v-col cols="12" md="6" sm="6">
        <div
          :align="alignment"
          :justify="justify"
          class="search-container"
          style="height: 320px;"
        >
            <span>
              {{ $t('home.search.searchDescription1') }}
              <a target="_blank" href="/register">{{ $t('global.registration') }}</a>
              {{ $t('home.search.searchDescription2') }}
            </span>
          <search></search>
        </div>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <div
          :align="alignment"
          :justify="justify"
          class="teaser-container orange1"
          style="height: 320px;"
        >
          <a href="https://www.basf.com/" target="_blank">
            <picture target="_blank" :href="require('@/assets/home/default.png')">
              <!--[if IE 9]><video style="display: none;"><![endif]-->
              <source :srcset="require('@/assets/home/default.png')" media="(min-width: 1024px)">
              <source :srcset="require('@/assets/home/default.png')">
              <!--[if IE 9]></video><![endif]-->
              <img :src="require('@/assets/home/default.png')">
            </picture>
          </a>

          <div class="caption company-introduce">
            <a href="https://www.basf.com/global/en/corona-information.html" target="_blank">
            </a>

            <span>
              {{ $t('home.ad') }}
            </span>

<!--            <a href="https://www.basf.com/global/en/corona-information.html" target="_blank" class="external">Read More</a>-->
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Banner',

    data () {
      return {
        alignment: 'center',
        justify: 'center',
      }
    },

    components: {
      Search: () => import('@/components/home/Search')
    }
  }
</script>

<style lang="scss" scoped>
  .slides {
    padding: 0;
    display: inline-block;
    height: auto;
    margin: 0;
    position: relative;
    width: 100%;
    overflow: hidden;
    background: transparent;
    opacity: 1;
    -webkit-animation: fadeStage 1.25s ease-in-out 1.25s both;
    animation: fadeStage 1.25s ease-in-out 1.25s both;
    max-height: 1200px;
  }

  .home-banner {
    margin-top: 45px;
  }

  .teaser-container {

    &.orange1 {
      border-color: #f49800;
    }

    .company-introduce {
      font-size: 16px!important;
      font-weight: normal;
      letter-spacing: normal !important;
      line-height: 1.5;
    }
  }

  .search-container {
    height: 320px;
    overflow: hidden;
    position: relative;
    text-align: left;
    padding: 24px 30px 24px !important;
    background-color: #fff;
  }
</style>
