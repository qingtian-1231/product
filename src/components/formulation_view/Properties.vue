<template>
  <v-card flat color="basil" id="properties">
    <div class="props">
      <h2>配方的技术规格数据</h2>
      <ul>
        <template v-for="(item, index) in formulationProperties">
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
