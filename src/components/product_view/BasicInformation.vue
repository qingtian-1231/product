<template>
  <v-card flat color="basil" id="basic-information">
    <div class="information">
      <template v-if="productInfo.description">
        <h2 v-html="productInfo.description.value"></h2>
      </template>

      <p>
        <span class="grey-2 label">
          {{ brand.label }}
        </span>
        {{ brand.value }}
      </p>

      <p>
        <span class="grey-2 label">
          {{ field_product_type.label }}
        </span>
        {{ field_product_type.value }}
      </p>

      <p v-if="field_cas_number.value">
        <span class="grey-2 label">
          {{ field_cas_number.label }}
        </span>
        {{ field_cas_number.value }}
      </p>

      <p>
        <span class="grey-2 label">
          {{ field_product_name.label }}
        </span>
        {{ field_product_name.value }}
      </p>

      <p>
        <span class="grey-2 label">
          {{ benefits.label }}
        </span>
        {{ benefits.value }}
      </p>

    </div>

    <div class="app">
      <p v-if="recommended_application" class="full-width">
        <span class="grey-2 label">{{ recommended_application.label }}</span>
        <ul class="clearfix">
          <template v-for="(item, index) in recommended_application.value">
            <li :key="index">
              <v-btn>
                <v-icon>done</v-icon>
                <small>{{ item.value }}</small>
              </v-btn>
            </li>
          </template>
        </ul>
      </p>

      <p v-if="recommended_application" class="full-width">
        <span class="grey-2 label">{{ suitable_application.label }}</span>
        <ul>
        <template v-for="(item, index) in suitable_application.value">
          <li :key="index">
            <v-btn>
              <v-icon>done</v-icon>
              <small>{{ item }}</small>
            </v-btn>
          </li>
        </template>
      </ul>
      </p>
    </div>

    <div class="countries">
      <p v-if="country_registration_group.value" class="full-width">
        <span class="grey-2 label">{{ country_registration_group.label }}</span>
        <ul class="clearfix">
          <template v-for="(field, index) in country_registration_group.value">
          <li :key="index">
            <div class="item-property">
              <span>
                <v-icon>outlined_flag</v-icon>
              </span>
              <span>{{ field.field_country_registration.value }}<br></span>
              <span>{{ field.field_country_registration_descr.value }}</span>
            </div>
          </li>
        </template>
        </ul>
      </p>
    </div>

    <p v-if="product_origin.value" class="full-width">
        <span class="grey-2 label">
          {{ product_origin.label }}
        </span>
      {{ product_origin.value }}
    </p>

    <p v-if="product_package.value" class="full-width">
        <span class="grey-2 label">
          {{ product_package.label }}
        </span>
      {{ product_package.value }}
    </p>

    <p v-if="buy_link.value" class="full-width">
      <a target="_blank" :href="buy_link.value.uri">{{ buy_link.label }}</a>
    </p>
  </v-card>
</template>

<script>
  export default {
    name: 'basic-information',

    props: {
      productBasic: {
        type: Object
      },

      productInfo: {
        type: Object
      },
    },

    data () {
      return {
      }
    },

    computed: {
      benefits: function () {
        return (this.productBasic && this.productBasic.benefits) ? this.productBasic.benefits : {}
      },

      field_cas_number: function () {
        return (this.productBasic && this.productBasic.field_cas_number) ? this.productBasic.field_cas_number : {}
      },

      field_product_name: function () {
        return (this.productBasic && this.productBasic.field_product_name) ? this.productBasic.field_product_name : {}
      },

      field_product_type: function () {
        return (this.productBasic && this.productBasic.field_product_type) ? this.productBasic.field_product_type : {}
      },

      brand: function () {
        return (this.productBasic && this.productBasic.brand) ? this.productBasic.brand : {}
      },

      buy_link: function () {
        return (this.productInfo && this.productInfo.field_buy_link) ? this.productInfo.field_buy_link : {}
      },
      product_package: function () {
        return (this.productInfo && this.productInfo.field_product_package) ? this.productInfo.field_product_package : {}
      },
      product_origin: function () {
        return (this.productInfo && this.productInfo.field_product_origin) ? this.productInfo.field_product_origin : {}
      },
      recommended_application: function () {
        return (this.productInfo && this.productInfo.recommended_application) ? this.productInfo.recommended_application : []
      },

      suitable_application: function () {
        return (this.productInfo && this.productInfo.suitable_application) ? this.productInfo.suitable_application : []
      },

      country_registration_group: function () {
        return (this.productInfo && this.productInfo.country_registration_group) ? this.productInfo.country_registration_group : []
      }
    },

    created () {
    }
  }
</script>

<style lang="scss" scoped>
  #basic-information {

    .full-width {
      width: 100%;
    }

    .item-property {
      height: auto;
      border: none;
      float: initial;
      padding-left: 5px;
    }
  h2, p, ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  h2 {
    padding-bottom: 0;
  }

  p {
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    &:nth-child(2n) {
      @media screen and (min-width: 640px) {
        margin-right: 8px;
      }
    }

    &:last-of-type {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    }
    @media screen and (min-width: 640px) {
      width: calc(50% - 8px);
    }
  }

  span {
    display: block;
    text-transform: capitalize;
    color: #808080;
  }

  .app {

    p {
    }

    ul {
      margin-left: -.555555%;

      @media screen and (min-width: 640px) {
        width: 101%;
      }

      li {
        display: table;
        border-radius: 16px;
        border: 1px solid #aaa;
        float: left;
        line-height: 0;
        height: 40px;
        margin: 5px .499999%;
        overflow: hidden;
        width: 100%;

        .v-btn {
          height: 38px;
          width: 100%;
          background-color: transparent;
          text-align: left;
          border-radius: 16px;
          transition: all .15s ease-in-out;
        }

        @media screen and (min-width: 640px) {
          width: 32%;
        }

        @media screen and (min-width: 1024px) {
          width: 10%;
        }
      }
    }
  }

  .countries {

    ul {
      margin-left: -1%;
      width: 100%;

      li {
        position: relative;
        display: inline-grid;
        float: left;
        margin: 0 1%;
        width: 100%;

        span {
          font-size: 16px;

          &:last-child {
            font-size: 16px;
            max-height: 60px;
            overflow: hidden;
            overflow-y: auto;
            padding-right: 5px;
          }
        }

        @media screen and (min-width: 940px) {
          width: 48%;
          margin: 0;
        }
      }

      @media screen and (min-width: 940px) {
        margin-left: -1%;
        width: 102%;
      }
    }
  }
}
</style>
