<template>
  <div id="formulation-details">
    <div>
      <router-link :to="{name: 'Formulation', params: {id: formulation.uuid}}">
        <icon-additives bg-color-class="default"></icon-additives>
        <span>{{ formulation.title }}</span>
        <v-icon class="icon float-right">keyboard_arrow_right</v-icon>
      </router-link>
      <small>
        {{ previewFormulationBasic.benefits.value }}
      </small>
    </div>
    <ul>
      <template v-for="(item, index) in previewFormulationProp">
        <li :key="index" v-if="item.value">
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
        <v-icon large>close</v-icon>
      </v-btn>

      <v-btn
        icon
        @click="favoritesFormulationStar('formulation', formulation.isFeature ? 'delete' : 'add', formulation.uuid)"
      >
        <v-icon
          v-if="!formulation.isFeature"
          large
          color="grey lighten-1"
        >
          star_border
        </v-icon>

        <v-icon
          v-else
          large
          color="yellow"
        >
          star
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
  import IconAdditives from '../components/svg/Additives'

  export default {
    name: 'formulation-details',

    components: { IconAdditives },

    props: {
      formulation: {
        type: Object
      },

      previewFormulationBasic: {
        type: Object
      },

      previewFormulationProp: {
        type: Object
      }
    },

    data: function () {
      return {
        productTitle: '',
      }
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #formulation-details {
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
