<template>
  <div>
    <v-card
      class="mx-auto formulations-with-filter fade-enter-active clearfix"
      width="100%"
    >
      <div class="formulations-subtitle">
        <span>{{ $t('formulationFilter.filterSubtitle') }}</span>
      </div>
      <template v-for="(item, index) in formulationFilterList">
        <v-list
          two-line
          height="60"
          :key="index">
          <v-list-item>
            <v-col cols="2">
              <v-subheader>{{ item.label }}</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-select
                class="select small"
                v-model="item.selected"
                :hint="`${item.selected.value}, ${item.selected.name}`"
                :items="item.selectList"
                item-text="name"
                item-value="code"
                return-object
                :label="$t('formulationFilter.select')"
                filled
                dense
                hide-details
                solo
              ></v-select>
            </v-col>
            <v-col cols="2">
              <template v-if="item.filedName === 'field_sheet' && currentLanguage === 'zh-hans'">
                <v-tooltip v-model="show" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon color="grey lighten-1">info</v-icon>
                    </v-btn>
                  </template>
                  <span>
                    HDG：镀锌板<br>
                    CRS：冷轧钢板<br>
                    AI：铝板<br>
                  </span>
                </v-tooltip>
              </template>
            </v-col>
          </v-list-item>
        </v-list>
      </template>

    </v-card>

    <v-row class="formulations-without-filter-button" style="margin: 0">
      <v-col cols="6"></v-col>
      <v-col cols="6" style="text-align: right">
        <v-btn rounded color="info" @click="findFormulations()">
          {{ $t('formulationFilter.selectFormulation') }}
          <v-icon right>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card
      class="mx-auto formulations-without-filter"
      width="100%"
    >

      <div class="formulations-subtitle">
        <span>{{ $t('formulationFilter.withOutFilterSubtitle') }}</span>
      </div>
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
      <v-row class="formulations-without-filter-button" style="margin: 0">
        <v-col cols="6"></v-col>
        <v-col cols="6" style="text-align: right">
          <v-btn rounded color="info" @click="findFormulations()">
            {{ $t('formulationFilter.moreFormulation') }}
            <v-icon right>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Icon from "../../components/svg/features/Icon";
  import { getCookie } from "../../utils/cookie"

  export default {
    components: { Icon },

    name: 'formulations-with-filter',

    data () {
      return {
        formulationFilterList: [
          {
            label: this.$t('formulationFilter.gloss_60'),
            selected: {
              name: '>85°',
              value: '>85°',
            },
            filedName: 'field_luster_60',
            selectList: [
              {
                name: '>85°',
                value: '>85°',
              },
              {
                name: '<85°',
                value: '<85°',
              }
            ]
          },
          {
            label: this.$t('formulationFilter.sheet_metal'),
            selected: {
              name: 'HDG',
              value: 'HDG',
            },
            filedName: 'field_sheet',
            selectList: [
              {
                name: 'CRS',
                value: 'CRS',
              },
              {
                name: 'HDG',
                value: 'HDG',
              },
              {
                name: 'AI',
                value: 'AI',
              }
            ]
          },
          {
            label: this.$t('formulationFilter.thickness'),
            selected: {
              name: '50µm ± 5',
              value: '50um±5',
            },
            filedName: 'field_thickness',
            selectList: [
              {
                name: '30µm ± 5µm',
                value: '30um±5',
              },
              {
                name: '50µm ± 5',
                value: '50um±5',
              }
            ]
          },
          {
            label: this.$t('formulationFilter.SST'),
            selected: {
              name: '≤150h',
              value: '≤150h',
            },
            filedName: 'field_sst',
            selectList: [
              {
                name: '≤150h',
                value: '≤150h',
              },
              {
                name: '150h~300h',
                value: '150h~300h',
              },
              {
                name: '≥300h',
                value: '≥300h',
              }
            ]
          }
        ],
        formulationList: [],
        currentLanguage: 'zh-hans'
      }
    },

    computed: {
      ...mapState({
        taxonomyProductApplication: state => state.core.taxonomyProductApplication
      })
    },

    props: {
     industry: {
       type: String,
     }
    },

    created () {
      let cookieLanguage = getCookie('drupal:session:language')
      if (cookieLanguage) {
        this.currentLanguage = cookieLanguage
      }
    },

    mounted () {
      let vm = this
      let options = {}
      let filter = {
        'formulation_application_ids': 'all'
      }

      options.items_per_page = 5
      options.page = Math.ceil(vm.formulationList.length / 5)

      vm.$loading.show()
      vm.$store.dispatch('getFormulationWithoutList', {filter: filter, options: options}).then(() => {
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

        for (let i in vm.formulationFilterList) {
          let selected = vm.formulationFilterList[i].selected
          let fieldName = vm.formulationFilterList[i].filedName
          if (selected.hasOwnProperty('value')) {
            options[fieldName] = selected.value
          }
        }

        vm.$router.push({ path: 'formulations', query: options})
      },

      goFormulationDetail (formulationId, UnLocked) {
        let vm = this
        if (UnLocked) {
          vm.$router.push({path:`/formulation/${formulationId}`})
        } else {
          if (!vm.isLogin) {
            vm.$store.commit('open_login_dialog')
          } else {
            vm.$router.push({path:`/formulation/${formulationId}`})
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
    }
  }
</script>

<style lang="scss" scoped>
.formulations-with-filter {
  box-shadow: none;

  .v-list {
    width: 50%;
    float: left;

    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
  
  .v-btn {
    margin: 25px;
    float: right;
  }
}
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

.formulations-subtitle {
  padding: 24px 10px 0 42px;
  color: #333;
}

.clearfix:after {
  content: '';
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  clear: both;
}

.clearfix {
  zoom: 1;
}
</style>
