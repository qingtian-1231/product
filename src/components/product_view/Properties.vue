<template>
  <v-card flat color="basil" id="properties">
    <div class="props">
      <ul>
        <template v-for="(item, index) in productProperties">
          <li :key="index" v-if="item.value.length">
            <div class="item-property">
            <span class="label grey-2">
              {{ item.label }}
            </span>
              <span>{{ item.value }}</span>
            </div>
          </li>
        </template>
      </ul>
<!--      <span class="label">{{ $t('productView.techData') }}</span>-->
      <p>{{ $t('productView.techDataDescription') }}</p>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'properties',
    props: {
      productProperties: {
        type: Object
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  #properties {

    h2, p, ul {
      display: inline-block;
      margin: 0 0 25px;
      padding: 0;
      width: 100%;
    }

    ul {
      margin-left: -1%;
      width: 100%;

      li {
        position: relative;
        display: inline-block;
        float: left;
        width: 48%;
        margin: 10px 1%;

        span {

          &:first-child {
            width: 45%;
          }

          &:last-child {
            line-height: 1.4;
            max-width: 75%;
            right: 0;
            text-align: left;
            float: right;
            width: 55%;
          }
        }

        @media screen and (max-width: 480px) {
          width: 96%;
        }
      }

      @media screen and (min-width: 768px) {
        margin-left: -1%;
        width: 102%;
      }
    }
  }
</style>
