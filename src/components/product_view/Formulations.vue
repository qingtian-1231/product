<template>
  <v-card flat color="basil" id="formulations">
    <div class="formula">
      <h2>含{{ titleField.value }}的配方</h2>
      <template v-for="(item, index) in productRelationFormulation.value">
        <div class="item listed formulation referenced locked" :key="index">
          <span>
            <router-link :to="{name: 'Formulation', params: {id: item.uuid.value }}">
              <icon-interior bg-color-class="default"></icon-interior>
              {{ item.field_formulation_name.value }}
            </router-link>
          </span>
          <span>
            <v-btn icon>
              <v-icon class="material-icons-outlined">lock</v-icon>
            </v-btn>
          </span>
        </div>
      </template>
    </div>
  </v-card>
</template>

<script>
  import IconInterior from  '../../components/svg/formulations/Interior'

  export default {
    name: 'formulations',
    components: { IconInterior },
    props: {
      productRelationFormulation: {
        type: Object
      },
      titleField: {
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
  #formulations {

    h2, p, ul {
      display: inline-block;
      margin: 0 0 25px;
      padding: 0;
      width: 100%;
    }
  }
</style>
