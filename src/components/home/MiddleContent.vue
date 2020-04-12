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
        <div class="unlock">
          <h1>
            {{ $t('home.middleContent.registerTitle') }}
          </h1>
          <p>
            {{ $t('home.middleContent.registerDescription') }}
          </p>
          <div class="row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <router-link :to="{ name: 'Login' }">
                <v-btn class="ma-2" block rounded color="success" >
                  {{ $t('global.login') }}
                  <v-icon right>keyboard_arrow_right</v-icon>
                </v-btn>
              </router-link>
            </v-col>

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <router-link :to="{ name: 'Register' }">
                <v-btn class="ma-2" right block rounded color="info" >
                  {{ $t('global.register') }}
                  <v-icon right>keyboard_arrow_right</v-icon>
                </v-btn>
              </router-link>
            </v-col>
          </div>
        </div>
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
    text-align: center;

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

      h1 {
        padding: 60px 100px 30px;
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
      text-align: center;
    }
  }
</style>
