<template>
  <v-card flat color="basil" id="formulation-recipe">
    <h2 class="light clearfix"><b>配方公式计算</b></h2>
    <div id="recipe">
      <ul>
        <li>
          <span>
            <input type="number" name="total" placeholder="100" value="">
            <v-icon>keyboard</v-icon>
          </span>
          <span>
            <h2 class="light">
              <icon
                width="40"
                height="40"
                icon-name="14"
                bg-color-class="Hydropalat"
              >
              </icon>
              <template v-if="basicInfo.name">
                {{ basicInfo.name.value }}
              </template>
            </h2>
          </span>
      </li>
      </ul>
      <div>
        <span><small>配方比例</small></span>
        <span><small>配方组成</small></span>
      </div>
      <ul class="clearfix">
        <template v-for="(item, index) in formulationInfo">
          <template v-if="item.hasOwnProperty('field_part_basf_product')">
            <li class="basf" :key="index">
              <span>
                <input type="number" name="DISPEX_ULTRA_PA_4550" :placeholder="item.field_proportion.value" :value="item.field_proportion.value">
              </span>
              <span>
                <icon
                  width="24"
                  height="24"
                  :icon-name="item.field_part_basf_product.termId"
                  :bg-color-class="item.field_part_basf_product.brandName"
                >
                </icon>
                <router-link :to="{name: 'Product', params: {id: item.field_part_basf_product.uuid}}" target="_blank">
                  <b>{{ item.field_part_basf_product.value }}</b>
                </router-link>
                <v-btn icon>
                  <v-icon class="material-icons-outlined">pageview</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon class="material-icons-outlined">shopping_basket</v-icon>
                </v-btn>
              </span>
            </li>
          </template>

          <template v-else>
            <li class="basic" :key="index">
              <span><input type="number" name="WATER_DEMINERALIZED" :placeholder="item.field_proportion.value" :value="item.field_proportion.value"></span>
              <span>{{ item.field_part_normal_product.value }}</span>
            </li>
          </template>
        </template>
      </ul>
    </div>
    <div class="to-basket clearfix"></div>
  </v-card>
</template>

<script>
  import Icon from "../../components/svg/features/Icon";
  import IconColorants from '../../components/svg/formulations/Colorants'

  export default {
    components: { Icon },

    props: {
      basicInfo: {
        type: Object,
      },
      formulationInfo: {
        type: Array,
      }
    },

    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
#formulation-recipe {

  h2 {
    display: inline-block;
    margin: 0 0 25px;
    padding: 0;
    width: 100%;
  }

  #recipe {
    display: inline-block;

    .basf {

      span {

        &:last-child {
          box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
        }
      }
    }

    .basic {

      span {

        &:last-child {
          box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
        }
      }
    }

    span {

      &:first-child {
        width: 22.5%;
        -webkit-animation: .4s ease-out 0s 1 rotateX;
        animation: .4s ease-out 0s 1 rotateX;
        display: inline-block;
        float: left;
        position: relative;
        border-radius: 8px;
        line-height: 32px;
        font-size: .75em;

        @media screen and (min-width: 960px) {
          width: 12.5%;
          font-size: 1em;
        }

        & > input {
          border: none;
          background: transparent;
          max-height: 110px;
          padding: 0 10px;
          line-height: 32px;
          min-height: 32px;
          width: 100%;
          text-align: center;
          background-color: #f0f0f0;
          border-radius: 8px;
          font-style: normal;
        }
      }

      &:last-child {
        padding: 0 8px 0 12.5%;
        width: 75.5%;
        margin-left: 2%;
        -webkit-animation: .4s ease-out 0s 1 rotateX;
        animation: .4s ease-out 0s 1 rotateX;
        display: inline-block;
        float: left;
        position: relative;
        border-radius: 8px;
        line-height: 32px;
        font-size: .75em;

        @media screen and (min-width: 960px) {
          padding: 0 8px 0 12.5%;
          width: 85.5%;
          margin-left: 2%;
        }

        .icon-container {
          height: 24px;
          margin-top: 4px;
          margin-right: 4px;
          width: 24px;
        }

        & > .icon-container {
          height: 24px;
          margin-top: 4px;
          margin-right: 4px;
          width: 24px;
          border-radius: 50%;
          left: 8px;
          position: absolute;
        }
      }
    }

    & > ul {
      display: inline-block;
      float: left;
      margin: 0;
      width: 100%;
      padding: 0;

      &:first-child {

        h2 {
          padding-left: 50px;
          margin: 0;

          .icon-container {
            box-shadow: none !important;
            border-radius: 10px;
            float: left;
            height: 40px;
            position: absolute;
            margin: -20px 0 0 -50px;
            top: 50%;
            left: auto;
            width: 40px;
          }

          @media screen and (min-width: 768px) {
            line-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }
        }

        span {

          &:first-child {
            width: 25%;

            input {
              font-style: normal;
              font-size: 2.5em;
              line-height: 48px;
              min-height: 99px;
              padding: 15px;
              text-align: center;
              text-overflow: ellipsis;
              width: 100%;
              white-space: nowrap;

              @media screen and (min-width: 640px) {
                min-height: 108px;
                padding: 30px;
              }

              @media screen and (min-width: 960px) {
                padding: 30px 20px 30px 60px;
                text-align: left;
              }
            }

            .v-icon {
              display: none;
              height: 32px;
              margin-top: -16px;
              left: 30px;
              position: absolute;
              top: 50%;
              width: 32px;
              font-size: 32px;

              @media screen and (min-width: 960px) {
                display: inline-block;
              }
            }
          }

          &:last-child {
            box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
            max-height: 110px;
            width: 73%;
            overflow: hidden;
            font-size: 1em;
            padding: 30px;
          }
        }
      }

      li {
        list-style-type: none;
        float: left;
        margin: 1% 0 0;
        width: 100%;
      }
    }

    & > div {
      display: inline-block;
      float: left;
      width: 100%;
      margin: 10px 0 8px;
    }
  }

  .to-basket {
    margin: 60px 0 0;
    padding: 25px;
    line-height: 32px;
    border: 1px solid #aaa;
    border-radius: 8px;
    -webkit-animation: .4s ease-out 0s 1 rotateX;
    animation: .4s ease-out 0s 1 rotateX;
    float: left;
    text-align: center;
    width: 100%;
  }
}
</style>
