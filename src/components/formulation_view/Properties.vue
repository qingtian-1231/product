<template>
  <v-card flat color="basil" id="properties">
    <div class="props">
      <h2>{{ $t('formulationView.Properties.title') }}</h2>
      <ul>
        <template v-for="(item, index) in formulationProperties">
          <li :key="index" v-if="item.value">
            <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">colorize</v-icon>
            </span>
            <span>
              {{ item.label }}
            </span>
              <span><b>{{ item.value }}</b></span>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'properties',
    props: {
      formulationProperties: {
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
      }

      @media screen and (min-width: 768px) {
        margin-left: -1%;
        width: 102%;
      }
    }
  }
</style>
