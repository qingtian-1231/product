<template>
  <v-card flat color="basil" id="formulations">
    <div class="formula">
      <template v-if="currentLanguage === 'zh-hans'">
        <h4>包含{{ titleField.value }}的配方</h4>
      </template>

      <template v-if="currentLanguage === 'en'">
        <h4>Formulations with {{ titleField.value }}</h4>
      </template>

      <template v-for="(item, index) in productRelationFormulation">
        <div class="item listed formulation referenced locked" :key="index">
          <span>
            <router-link :to="{name: 'Formulation', params: {id: item.uuid }}">
              <icon
                width="32"
                height="32"
                icon-name="14"
                bg-color-class="Hydropalat"
              >
            </icon>
              {{ item.field_formulation_name }}
            </router-link>
          </span>
          <span>
            <v-btn icon>
<!--              <v-icon class="material-icons-outlined">lock</v-icon>-->
            </v-btn>
          </span>
        </div>
      </template>
    </div>
  </v-card>
</template>

<script>
  // import IconInterior from  '../../components/svg/formulations/Interior'
  import Icon from "../../components/svg/features/Icon";
  import { getCookie } from "../../utils/cookie"

  export default {
    name: 'formulations',
    components: { Icon },
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
        currentLanguage: 'zh-hans'
      }
    },

    mounted () {
      let cookieLanguage = getCookie('drupal:session:language')
      if (cookieLanguage) {
        this.currentLanguage = cookieLanguage
      }
    },
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

    .formulation {

      a {

        .icon-container {
          position: relative;
          margin-right: 32px;
          top: -15px;
        }
      }
    }
  }
</style>
