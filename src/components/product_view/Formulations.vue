<template>
  <v-card flat color="basil" id="formulations">
    <div class="formula">
      <h2>Formulations with AQAGloss®</h2>
      <div class="item listed formulation referenced locked">
        <span>
          <router-link :to="{name: 'Formulation', params: {id: '12312321'}}">
            <icon-interior bg-color-class="default"></icon-interior>
            High-gloss waterborne decorative coatings with improved hardness development
          </router-link>
        </span>
        <span>
          <v-btn icon>
            <v-icon class="material-icons-outlined">lock</v-icon>
          </v-btn>
        </span>
      </div>
      <div class="item listed formulation referenced locked">
        <span>
          <router-link :to="{name: 'Formulations', params: {id: '12312321'}}">
            <icon-interior bg-color-class="default"></icon-interior>
            High-gloss waterborne decorative coatings with improved hardness development
          </router-link>
        </span>
        <span>
          <v-btn icon>
            <v-icon class="material-icons-outlined">lock</v-icon>
          </v-btn>
        </span>
      </div>
    </div>
  </v-card>
</template>

<script>
  import IconInterior from  '../../components/svg/formulations/Interior'

  export default {
    name: 'formulations',
    components: { IconInterior },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  #formulations {

    h2, p, ul {
      display: inline-block;
      margin: 0 0 25px;
      padding: 0;
      width: 100%;
    }
  }
</style>
