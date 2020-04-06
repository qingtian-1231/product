<template>
  <v-container
    fluid
    id="middle-content"
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row dense>
      <v-col cols="12">
        <h1>关于巴斯夫</h1>
        <p>
          在巴斯夫，我们创造化学新作用——追求可持续发展的未来。我们将经济上的成功、社会责任和环境保护相结合。
          巴斯夫在全球拥有约122,000名员工，为几乎所有国家、所有行业的客户成功作出贡献。
          我们的产品分属六大业务领域：化学品、材料、工业解决方案、表面处理技术、营养与护理、农业解决方案。
          2018年巴斯夫全球销售额约630亿欧元。
          巴斯夫的股票在法兰克福（BAS）证券交易所上市，并以美国存托凭证（BASFY）的形式在美国证券市场交易。
          欲了解更多信息，请访问：<a target="_blank" href="https://www.basf.com">www.basf.com</a>。
        </p>
      </v-col>

      <v-col cols="12">
        <div class="unlock">
          <h1>
            注册我们，充分使用<br>BASF产品助理
          </h1>
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
