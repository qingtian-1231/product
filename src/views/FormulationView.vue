<template>
  <v-container
    id="product-view"
    tag="section"
  >
    <v-row class="back">
      <v-col class="col-xs-8" md="6">
        <v-btn class="float-left">
          <v-icon>apps</v-icon>
          返回上一页
        </v-btn>
      </v-col>
      <v-col class="col-xs-4">
      </v-col>
    </v-row>

    <v-row class="header">
      <v-col class="col-xs-12" md="12">
        <div>
          <h1>
            <icon-colorants bg-color-class="default"></icon-colorants>
            AQAGloss®
          </h1>
          <div>
            <v-btn icon>
              <v-icon large class="material-icons-outlined">share</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon large class="material-icons-outlined">print</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon large class="material-icons-outlined">star_border</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon large class="material-icons-outlined">shopping_basket</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="content">
      <v-col class="col-xs-12" md="12">
        <div>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab>
              配方公式
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab @click="showIcon">
              基本信息
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              属性
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              其他信息
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <formulation-recipe></formulation-recipe>
            </v-tab-item>

            <v-tab-item>
              <basic-information></basic-information>
            </v-tab-item>

            <v-tab-item>
              <properties></properties>
            </v-tab-item>

            <v-tab-item>
              <additional></additional>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>

    <v-row class="footer">
      <v-col class="col-xs-12" md="12">
        <div>
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">share</v-icon>
            <p>分享</p>
          </v-btn>
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">print</v-icon>
            <p>打印</p>
          </v-btn>
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">star_border</v-icon>
            <p>最爱</p>
          </v-btn>
          <v-btn icon tile large>
            <v-icon large class="material-icons-outlined">shopping_basket</v-icon>
            <p>购物车</p>
          </v-btn>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import IconColorants from '../components/svg/formulations/Colorants'
  import BasicInformation from '../components/product_view/BasicInformation'
  import Properties from '../components/product_view/Properties'
  import Additional from '../components/product_view/Additional'
  import FormulationRecipe from '../components/formulation_view/FormulationRecipe'

  export default {
    components: { IconColorants, BasicInformation, Properties, Additional, FormulationRecipe },
    data () {
      return {
        tab: null,
        items: [
          '基本信息', '属性', '配方', '其他信息',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    }
  }
</script>

<style lang="scss" scoped>
  #product-view {
    .v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active) {
      border-bottom: 1px solid #ddd;
    }
    .header {

      h1 {
        width: 68%;
        float: left;
        line-height: 1.3;
        margin: 0;
        padding-left: 70px;
        padding-top: 8px;

        .icon {
          margin: -7px 10px 0 -70px;
          max-height: 64px;
          max-width: 64px;
          height: 64px;
          width: 64px;
          position: relative;
          float: left;
        }
      }

      .col {
        padding-top: 0;
        padding-bottom: 0;

        & > div {
          border-bottom: 1px solid #eee;
          border-radius: 8px 8px 0 0;
          padding-top: 40px;

          @media screen and (min-width: 1024px) {
            padding-bottom: 40px;
          }

          & > div {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            float: right;
            padding: 20px 0;
            text-align: center;
            width: 100%;

            @media screen and (min-width: 1024px) {
              float: right;
              padding: 10px 0;
              text-align: right;
              width: auto;
            }
          }
        }
      }

      .v-btn {
        float: none;
        display: inline;
        height: 48px;
        margin: 0 auto;
        width: 48px;

        @media screen and (min-width: 1024px) {
          margin-left: 5px;
        }
      }
    }

    .content {

      .col {
        padding-top: 0;
        padding-bottom: 0;

        & > div {

          &:last-child {
            border-radius: 0 0 8px 8px;
          }

          &:first-child {
            padding-top: 40px;
          }

          .v-tabs {
            height: auto;
            text-align: center;
            margin-bottom: 45px;
            overflow: hidden;
          }
        }
      }
    }

    .footer {

      & > .col {
        padding-top: 0;
        padding-bottom: 0;

        & > div {
          margin-top: 30px;
          padding-top: 30px;
          padding-bottom: 30px;
          border-radius: 8px;
          box-shadow: 2px 2px 8px 0 rgba(0,0,0,.1);
          text-align: center;

          @media screen and (min-width: 480px) {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
          }
        }
      }

      .v-btn {
        background: transparent;
        border: none;
        line-height: 48px;
        text-align: left;
        display: block;
        float: none;
        overflow: visible;
        margin: 0 auto;
        padding: 0;
        width: 180px;

        .v-icon {
          font-size: 48px;
        }

        p {
          line-height: 48px;
          margin: 0;
        }

        @media screen and (min-width: 1024px) {
          display: inline;
          text-align: left;
        }

        @media screen and (min-width: 480px) {
          display: inline;
          text-align: center;
          width: auto;
        }
      }
    }
  }
</style>
