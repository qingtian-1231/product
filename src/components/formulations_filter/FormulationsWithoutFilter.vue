<template>
  <v-card
    class="mx-auto formulations-without-filter"
    width="100%"
  >

    <v-list
      two-line
    >
      <template v-for="(formulation, index) in formulationList">
        <v-hover :key="index" v-slot:default="{ hover }">
          <v-list-item :class="{'elevation-12': hover, 'locked': (!parseInt(formulation.field_is_public) && !isLogin)}">
            <v-list-item-avatar @click="goFormulationDetail(formulation.uuid, !!parseInt(formulation.field_is_public))">
              <icon
                width="50"
                height="50"
                icon-name="14"
                bg-color-class="Hydropalat"
              >
              </icon>
            </v-list-item-avatar>

            <v-list-item-content @click="goFormulationDetail(formulation.uuid, !!parseInt(formulation.field_is_public))">
              <v-list-item-title>
                <span>{{ formulation.field_formulation_name }}</span>
                <span>{{ formulation.field_formulationbenefits }}</span>
              </v-list-item-title>
            </v-list-item-content>

            <template v-if="(!!parseInt(formulation.field_is_public) || isLogin)">
              <v-list-item-action>
                <v-btn
                  icon
                  @click="favoritesFormulationStar('formulation', formulation.isFeature ? 'delete' : 'add', formulation.uuid)"
                >
                  <v-icon
                    v-if="!formulation.isFeature"
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
            </template>

            <template v-else>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon class="material-icons-outlined">lock</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-hover>

        <v-divider
          :key="index"
        ></v-divider>
      </template>
    </v-list>
    <v-row class="formulations-without-filter-button">
      <v-col cols="6"></v-col>
      <v-col cols="6" style="text-align: right">
        <v-btn rounded color="info" @click="findFormulations()">
          {{ $t('formulationFilter.moreFormulation') }}
          <v-icon right>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
  import Icon from "../../components/svg/features/Icon";
  import { mapState } from 'vuex'

  const pageCount = 5
  export default {
    name: 'formulations-without-filter',

    components: { Icon },

    props: {
      industry: {
        type: String
      }
    },

    computed: {
      ...mapState({
        taxonomyFormulationApplication: state => state.core.taxonomyProductApplication,
        isLogin: state => state.user.isLogin
      }),
    },

    data () {
      return {
        formulationQuery: {},
        formulationList: [],
      }
    },

    mounted () {
      let vm = this
      let options = {}
      let filter = {
        'formulation_application_ids': 'all'
      }

      options.items_per_page = pageCount
      options.page = Math.ceil(vm.formulationList.length / pageCount)
      options = { ...options, ...vm.queryOptions }

      if (vm.industry) {
        let subIds = []
        subIds = vm.getChildrenIds(vm.taxonomyFormulationApplication, vm.industry)
        filter.formulation_application_ids = vm.industry + '+' + subIds.join('+')
      }

      vm.$loading.show()
      vm.$store.dispatch('getFormulationList', {filter: filter, options: options}).then(() => {
        let formulations = vm.$store.state.formulation.formulationList
        if (formulations.length) {
          vm.formulationList = vm.formulationList.concat(formulations)

          // console.log(vm.formulationList, 'vm.formulationList')
          vm.$loading.hide()
        } else {
          vm.$loading.hide()
        }
      })
    },

    methods: {
      findFormulations () {
        let vm = this
        let options = {
          industry: vm.industry
        }

        let parameters = '';
        for (let j in options) {
          parameters += `&${j}=${options[j]}`
        }
        window.location.href = '/formulations?' + parameters
        // vm.$router.push({ path: 'formulations', query: options})
      },

      goFormulationDetail (formulationId, UnLocked) {
        let vm = this
        if (UnLocked) {
          window.location.href = `/formulation/?formulation=${formulationId}`
          // vm.$router.push({path:`/formulation/${formulationId}`})
        } else {
          if (!vm.isLogin) {
            vm.$store.commit('open_login_dialog')
          } else {
            window.location.href = `/formulation/?formulation=${formulationId}`
            // vm.$router.push({path:`/formulation/${formulationId}`})
          }
        }
      },

      favoritesFormulationStar (type, action, formulationId) {
        let vm = this
        let favoriteInfo = {}
        if (!vm.isLogin) {
          vm.$store.commit('open_login_dialog')
        } else {
          favoriteInfo.type = type
          favoriteInfo.action = action
          favoriteInfo.id = formulationId
          vm.$loading.show()
          vm.$store.dispatch('processFavoriteForUser', favoriteInfo).then(result => {
            if (result.status === 200) {
              vm.formulationList = vm.formulationList.map(formulation => {
                if (formulation.uuid === formulationId) {
                  if (action === 'add') {
                    formulation.isFeature = true
                  } else if (action === 'delete') {
                    formulation.isFeature = false
                  }
                }
                return formulation
              })
            }

            vm.$loading.hide()
          })
        }
      },

      getChildrenIds(terms, target_id) {
        let vm = this
        let childrens = []

        for (let id in terms) {
          if (terms[id]['tid'] === target_id) {
            childrens = terms[id]['children_ids']
          }
        }

        if (childrens.length <= 0) {
          for (let id in terms) {
            childrens = vm.getChildrenIds(terms[id]['children'], target_id)
          }
        }

        return childrens
      },
    }
  }
</script>

<style lang="scss" scoped>
.formulations-without-filter {

  .v-list-item {
    max-height: 64px;

    &.locked {
      background-color: rgba(226, 213, 213, 0.32);
      color: #655c5c !important;
    }

    .v-list-item__content {
      cursor: pointer;
    }

    .v-avatar {
      cursor: pointer;
    }
  }

  .formulations-without-filter-button {
    margin: 0 0;
  }

  .v-btn {
    margin: 25px 0;
  }
}
</style>
