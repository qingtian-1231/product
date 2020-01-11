<template>
  <v-card flat color="basil" id="properties">
    <div class="props">
      <h2>Technical Data</h2>
      <p>The exact specifications can be found in the specification data sheet</p>
      <ul>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
        <li>
          <div class="item-property">
            <span>
              <v-icon class="material-icons-outlined">cloud</v-icon>
            </span>
            <span>
              Elongation at break at 23 °C
              <span>%</span><br>
            </span>
            <span><b>250</b></span>
          </div>
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'properties',
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
