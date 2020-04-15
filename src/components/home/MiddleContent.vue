<template>
  <v-container
    fluid
    id="middle-content"
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row dense>
      <v-col cols="12">
        <h1>{{ $t('home.middleContent.aboutBASF') }}</h1>
        <p>
         {{ $t('home.middleContent.aboutBASFDescription') }}<a target="_blank" href="https://www.basf.com">www.basf.com</a>。
        </p>
      </v-col>

      <v-col cols="12">
        <h1>
          <router-link :to="{ name: 'Register' }">
            {{ $t('global.register') }} !
          </router-link>
          {{ $t('home.middleContent.registerTitle') }}
        </h1>
        <p>
          {{ $t('home.middleContent.registerDescription') }}
        </p>
<!--        <div class="">-->
<!--          <div class="row text-center mx-0">-->
<!--&lt;!&ndash;            <v-col cols="12" md="6" sm="12">&ndash;&gt;-->
<!--&lt;!&ndash;              <router-link :to="{ name: 'Login' }">&ndash;&gt;-->
<!--&lt;!&ndash;                <v-btn class="ma-2" block rounded color="success" >&ndash;&gt;-->
<!--&lt;!&ndash;                  {{ $t('global.login') }}&ndash;&gt;-->
<!--&lt;!&ndash;                  <v-icon right>keyboard_arrow_right</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;                </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;              </router-link>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-col>&ndash;&gt;-->

<!--&lt;!&ndash;            <v-col cols="12" md="6" sm="12" class="mx-0">&ndash;&gt;-->
<!--&lt;!&ndash;              <router-link :to="{ name: 'Register' }">&ndash;&gt;-->
<!--&lt;!&ndash;                <v-btn class="ma-2" right block rounded color="info" >&ndash;&gt;-->
<!--&lt;!&ndash;                  {{ $t('global.register') }}&ndash;&gt;-->
<!--&lt;!&ndash;                  <v-icon right>keyboard_arrow_right</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;                </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;              </router-link>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-col>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  // import IconApp from '../svg/App'

  export default {
    components: {},

    data: function () {
      return {
        cardElevation: 0
      }
    },

    methods: {}
  }
</script>

<style lang="scss" scoped>
  #middle-content {
    float: none;
    position: relative;

    & > div {
      margin: 0 auto;
    }

    @media screen and (max-width: 640px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }

    .col {
      border-radius: 8px;
      background: linear-gradient(0deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .8));
      margin-top: 30px;
      margin-bottom: 25px;

      h1 {
        padding: 60px 100px 30px;

        a {
          text-transform: capitalize;
        }
      }

      p {
        padding: 0 100px;
      }

      .icon {
        width: 64px;
        height: 64px;
        max-width: 64px;
        max-height: 64px;
        margin: 100px auto 60px;
        float: none;
        display: block;
      }
    }

    .unlock {
      background-color: #fff;
      border-radius: 8px;
      display: inline-block;
      float: left;
      padding: 10px 3%;
      width: 100%;
      box-shadow: 2px 2px 8px 0 rgba(0,0,0,.1);
      margin-bottom: 50px;
      padding-bottom: 50px!important;
    }
  }
</style>
