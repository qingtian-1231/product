<template>
  <v-card flat color="basil" id="properties">
    <div class="props">
      <h2>技术数据</h2>
      <p>确切的规格可以在规格数据表中找到</p>
      <ul>
        <template v-for="(item, index) in productProperties">
          <li :key="index" v-if="item.value.length">
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
      }

      @media screen and (min-width: 768px) {
        margin-left: -1%;
        width: 102%;
      }
    }
  }
</style>
