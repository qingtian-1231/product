<template>
  <div id="product-details">
    <div>
      <router-link :to="{name: 'Product', params: {id: product.uuid}}">
        <icon-additives bg-color-class="default"></icon-additives>
        <span>{{ product.title }}</span>
        <v-icon class="icon float-right">keyboard_arrow_right</v-icon>
      </router-link>
      <small>
        {{ productBasicInformation.field_benefits.value }}
      </small>
    </div>
    <ul>
      <template v-for="(item, index) in productProperties">
        <li :key="index">
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              {{ item.label }}
            </span>
            <span><b>{{ item.value }}</b></span>
          </div>
        </li>
      </template>
    </ul>
    <div>
      <v-btn icon @click="closeRequestDialog">
        <v-icon class="material-icons-outlined">close</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon class="material-icons-outlined">start</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon class="material-icons-outlined">shopping_basket</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
  import IconAdditives from '../components/svg/Additives'
  import { mapState } from 'vuex'

  export default {
    name: 'formulation-details',

    components: { IconAdditives },

    props: {
      product: {
        type: Object
      },

    },

    computed: {
      ...mapState({
        productBasicInformation: state => state.product.productBasicInformation,
        productProperties: state => state.product.productProperties,
      }),
    },

    data: function () {
      return {
        productTitle: '',
      }
    },

    mounted () {
      let vm = this

      vm.$store.dispatch('getProductDetails', {
        id: vm.product.uuid
      }).then(() => {
        console.log('productProperties')
      })
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #product-details {
    padding: 20px;

    .v-btn {
      background: none;
      margin: 0 7%;
      overflow: hidden;
      position: relative;

      .v-icon {
        height: 48px;
        width: 48px;
      }

      @media screen and (min-width: 1024px) {
        height: 48px;
        width: 48px;
      }
    }

    a {
      float: left;
      font-family: Helvetica Neue LT W01_65 Md,Helvetica,Arial,sans-serif;
      font-size: 1.125em;
      font-weight: 500;
      line-height: 1.333;
      margin-bottom: 5px;
      width: 100%;

      .icon {
        height: 32px;
        width: 32px;
        position: relative;
        margin: 0;

        &:first-child {
          margin-right: 8px;
        }
      }

      span {
        display: inline-block;
        float: left;
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 72%;

        @media screen and (min-width: 768px) {
          width: 73%;
        }
      }
    }

    small {
      clear: both;
      display: block;
    }

    ul {
      height: 300px;
      list-style-type: none;
      margin: 0 0 50px;
      overflow-y: auto;
      padding: 0;
      position: relative;
      width: 100%;

      @media screen and (min-width: 768px) {
        margin: 5px 0 0;
        height: 290px;
      }
    }

    & > div {
      padding: 0 15px;

      &:first-child {
        max-height: 170px;
        overflow: hidden;
      }

      &:last-child {
        bottom: 10px;
        left: 0;
        text-align: center;
        width: 100%;

        @media screen and (min-width: 768px) {
          bottom: 16px;
        }
      }
    }
  }
</style>
