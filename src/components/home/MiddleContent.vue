<template>
  <v-container
    id="middle-content"
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row dense>
      <v-col cols="12">
        <h1>立即使用BASF助理程序！</h1>
        <p>BASF助理是一个基于Web的应用程序，它使您比以往任何时候都更容易找到BASF产品和配方创意，并使用它们来创建建筑涂料。
          它可以在台式机，笔记本电脑，平板电脑和智能手机上运行。</p>
        <p>
          BASF助理可以帮助您轻松完成额外的任务。
          因此，您可以专注于自己的长处-配制客户想要的出色涂料。
        </p>
        <icon-app></icon-app>
      </v-col>

      <v-col cols="12">
        <div class="unlock">
          <h2>
            <v-icon>lock_open</v-icon>
            注册我们，充分使用<br>BASF助理
          </h2>
          <p>
            完全访问专有配方和完整的产品数据。
            个性化您自己的帐户并存储喜欢的产品和配方。
            您甚至可以将您的帐户链接到同事，以共享您的示例订单信息-这只是注册的一些优点。
          </p>
          <div class="row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <router-link :to="{ name: 'Login' }">
                <v-btn class="ma-2" block rounded color="success" >
                  登录
                  <v-icon right>keyboard_arrow_right</v-icon>
                </v-btn>
              </router-link>
            </v-col>

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <router-link :to="{ name: 'Register' }">
                <v-btn class="ma-2" right block rounded color="info" >
                  注册
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
