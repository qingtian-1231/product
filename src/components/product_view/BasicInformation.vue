<template>
  <v-card flat color="basil" id="basic-information">
    <div class="information">
      <template v-if="productInfo.description">
        <h2 v-html="productInfo.description.value"></h2>
      </template>

      <p>
        <span class="grey-2">
          {{ brand.label }}
        </span>
        {{ brand.value }}
      </p>

      <p>
        <span class="grey-2">
          {{ field_product_type.label }}
        </span>
        {{ field_product_type.value }}
      </p>

      <p>
        <span class="grey-2">
          {{ field_cas_number.label }}
        </span>
        {{ field_cas_number.value }}
      </p>

      <p>
        <span class="grey-2">
          {{ field_product_name.label }}
        </span>
        {{ field_product_name.value }}
      </p>

      <p v-if="buy_link.value">
        <span class="grey-2">
          {{ buy_link.label }}
        </span>
        <a target="_blank" :href="buy_link.value.uri">{{ buy_link.value.title }}</a>
      </p>

      <p>
        <span class="grey-2">
          {{ benefits.label }}
        </span>
        {{ benefits.value }}
      </p>

    </div>

    <div class="app" v-if="recommended_application">
      <h2>应用</h2>
      <p>{{ recommended_application.label }}</p>
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
      <p>{{ suitable_application.label }}</p>
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
    </div>

    <div class="countries">
      <template v-if="country_registration_group">
        <h2>{{ country_registration_group.label }}</h2>
        <ul class="clearfix">
          <template v-for="(field, index) in country_registration_group.value">
            <li :key="index">
              <div class="item-property">
            <span>
              <v-icon>outlined_flag</v-icon>
            </span>
                <span>{{ field.field_country_registration.value }}<br></span>
                <span><b>{{ field.field_country_registration_descr.value }}</b></span>
              </div>
            </li>
          </template>
        </ul>
      </template>
    </div>
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

  h2, p, ul {
    display: inline-block;
    margin: 0 0 25px;
    padding: 0;
    width: 100%;
    font-size: 1.25rem;
  }

  .information {

    h2 {
      padding-bottom: 25px;
    }

    p {
      padding-bottom: 25px;
      border-bottom: 1px solid #eee;

      span {
        display: block;
        text-transform: capitalize;
        color: #aaa;
      }

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

  }

  .app {

    p {
      margin-bottom: 15px;
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
          width: 24%;
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
        display: inline-block;
        float: left;
        margin: 0 1%;
        width: 100%;

        span {
          font-size: 1em;

          &:last-child {
            font-size: 70%;
            max-height: 60px;
            overflow: hidden;
            overflow-y: auto;
            padding-right: 5px;
          }
        }

        @media screen and (min-width: 940px) {
          width: 48%;
          margin: 10px 1%;
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
