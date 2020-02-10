<template>
  <v-container
    id="formulations"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row class="back">
        <v-col class="col-xs-8" md="6">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            返回上一页
          </v-btn>
        </v-col>
        <v-col class="col-xs-4">
        </v-col>
      </v-row>

      <v-row dense>
        <v-card
          class="mx-auto"
          width="100%"
        >

          <v-list two-line>
            <template v-for="(formulation, index) in formulationList">
              <v-hover :key="index" v-slot:default="{ hover }">
                <v-list-item :class="hover ? 'elevation-12' : ''" @click="test">
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>

                  <router-link :to="{name: 'Formulation', params: {id: formulation.uuid}}">
                    <v-list-item-avatar>
                      <template v-if="index % 2">
                        <icon-features1 width="50" height="50"></icon-features1>
                      </template>
                      <template v-else>
                        <icon-features4 width="50" height="50"></icon-features4>
                      </template>
                    </v-list-item-avatar>
                  </router-link>
                  <v-list-item-content>
                    <v-list-item-title v-text="formulation.field_formulation_name"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon class="material-icons-outlined" @click="previewFormulation">pageview</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        star_border
                      </v-icon>

                      <v-icon
                        v-else
                        color="yellow"
                      >
                        star
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>

              <v-divider
                v-if="index + 1 < formulationList.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-row>
    </v-col>

    <v-dialog
      v-model="requestFormulationDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="344px"
    >
      <v-card>
        <formulation-details @fatherMethod="closeRequestDialog()"></formulation-details>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  // import IconDispersions from '../components/svg/Dispersions'
  import IconFeatures1 from '../components/svg/features/Features-1'
  import IconFeatures4 from '../components/svg/features/Features-4'
  import formulationDetails from '../components/FormulationDetails'
  import { mapState } from 'vuex'

  export default {
    components: { IconFeatures1, IconFeatures4, formulationDetails },

    computed: {
      ...mapState({
        requestFormulationDialog: state => state.core.requestFormulationDialog,
        formulationList: state => state.formulation.formulationList
      }),
    },

    data: () => ({
      selected: [2]
    }),

    mounted () {
      let vm = this
      vm.$store.dispatch('getFormulationList').then(() => {
        console.log('222')
      })
    },

    methods: {
      previewFormulation () {
        this.$store.state.core.requestFormulationDialog = true
      },

      closeRequestDialog () {
        this.$store.state.core.requestFormulationDialog = false
      },
    }
  }
</script>
<style lang="scss" scoped>
  #formulations {
    max-width: 1318px;

    .v-list {

      .v-avatar {

        i {
          height: 40px;
          width: 40px;
          margin-top: 0;
        }
      }
    }
  }
</style>
