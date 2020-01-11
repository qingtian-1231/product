<template>
  <v-container
    id="middle-content"
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row dense>
      <v-col cols="12">
        <h1>Make use of Lab Assistant now and cut out the guesswork!</h1>
        <p>Lab Assistant is a Web-based application that makes it easier than ever for you to find BASF products and
          formulation ideas and use them to create your architectural coatings. It runs on your desktop PC, laptop,
          tablet and smartphone.</p>
        <p>Lab Assistant makes it easy, by taking care of the extra tasks for you. So you can focus on what you do best
          – formulating the outstanding coatings your customers want.</p>
        <icon-app></icon-app>
      </v-col>

      <v-col cols="12">
        <div class="unlock">
          <h2>
            <v-icon>lock_open</v-icon>
            Sign up. Make the most of<br>Lab
            Assistant.
          </h2>
          <p>Get full access to exclusive formulations and complete product data. Individualize your own account and
            store favorite or recently visited products and formulations. You can even link your account to colleagues
            to share your sample order information – just some of the advantages of signing up.
          </p>
          <div class="row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <v-btn class="ma-2" block rounded color="success" :to="{ name: 'Login' }">
                登录
                <v-icon right>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" :to="{ name: 'Register' }">
                注册
                <v-icon right>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import IconApp from '../svg/App'

  export default {
    components: {IconApp},

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
    max-width: 1070px;
    min-width: 1070px;
    margin: 0 auto;
    float: none;
    position: relative;
    width: 100%;

    @media screen and (max-width: 640px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }

    .col {
      border-radius: 8px;
      background: linear-gradient(0deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .8));

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
