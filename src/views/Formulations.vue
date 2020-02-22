<template>
  <v-container
    id="formulations"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row class="back">
        <v-col class="col-xs-6" md="6">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            返回上一页
          </v-btn>
        </v-col>
        <v-col class="col-xs-6">
          <v-btn icon class="float-right" color="primary" @click="showFormulationCard()">
            <v-icon>apps</v-icon>
          </v-btn>

          <v-btn icon class="float-right" color="primary" @click="(showList = true), (showCard = false)">
            <v-icon>view_headline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row
        dense
        class="filter-block"
      >
        <v-card
          class="mx-auto formulation-list fade-enter-active"
          width="100%"
        >
          <v-alert
            :value="alert"
            :type="alertClass"
            transition="scale-transition"
          >
            {{alertMessage}}
          </v-alert>
          <v-list two-line>
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  @click="addFormulationFilter"
                >
                  添加过滤条件
                </v-btn>
              </v-list-item-action>
              <v-list-item-content>
                <v-select
                  v-model="formulationField"
                  :hint="`${formulationField.field}, ${formulationField.label}`"
                  :items="formulationFieldsDefinition"
                  persistent-hint
                  item-text="label"
                  item-value="field"
                  return-object
                  filled
                  label="搜索条件"
                  dense
                  hide-details
                  solo
                ></v-select>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  color="primary"
                  @click="formulationFilterSearch"
                >
                  搜索
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <template v-for="(item, index) in formulationFilterList">
            <v-list two-line :key="index">
              <v-list-item>
                <v-col cols="2">
                  <v-subheader>{{ item.label }}</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="item.value"
                    filled
                    dense
                    hide-details
                    solo
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                </v-col>
              </v-list-item>
            </v-list>
          </template>
        </v-card>
      </v-row>

      <v-row dense>
        <template v-if="showList">
          <v-card
            class="mx-auto formulation-list"
            width="100%"
          >

            <v-list two-line>
              <template v-for="(formulation, index) in formulationList">
                <v-hover :key="index" v-slot:default="{ hover }">
                  <v-list-item :class="{'elevation-12': hover, 'locked': (!parseInt(formulation.field_is_public) && !isLogin)}">
<!--                    <v-list-item-action v-if="(!!parseInt(formulation.field_is_public) || isLogin)">-->
<!--                      <v-checkbox-->
<!--                        color="primary"-->
<!--                      ></v-checkbox>-->
<!--                    </v-list-item-action>-->

                    <v-list-item-avatar @click="goFormulationDetail(formulation.uuid, !!parseInt(formulation.field_is_public))">
                      <template v-if="index % 2">
                        <icon-features1 width="50" height="50"></icon-features1>
                      </template>
                      <template v-else>
                        <icon-features4 width="50" height="50"></icon-features4>
                      </template>
                    </v-list-item-avatar>

                    <v-list-item-content @click="goFormulationDetail(formulation.uuid, !!parseInt(formulation.field_is_public))">
                      <v-list-item-title>
                        <span>{{ formulation.field_formulation_name }}</span>
                        <span>{{ formulation.field_formulationbenefits }}</span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <template v-if="(!!parseInt(formulation.field_is_public) || isLogin)">
                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon class="material-icons-outlined" @click="previewFormulation(formulation)">pageview</v-icon>
                        </v-btn>
                      </v-list-item-action>
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
                  v-if="index + 1 < formulationList.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
            <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading" :distance="distance">
              <span slot="no-more">没有更多配方了</span>
              <span slot="no-results">没有更多配方了</span>
            </infinite-loading>
          </v-card>
        </template>

        <template v-else-if="showCard">
          <v-col v-for="(formulation, index) in formulationList" cols="3" :key="index" class="fade-enter-active">
            <v-card
              :key="index"
              :class="(!parseInt(formulation.field_is_public) && !isLogin) ? 'mx-auto formulation-list locked' : 'mx-auto formulation-list'"
              width="100%"
              height="500"
            >
              <div id="formulation-details">
                <div>
                  <div
                    @click="goFormulationDetail(formulation.uuid, !!parseInt(formulation.field_is_public))"
                  >
                    <icon-additives bg-color-class="default"></icon-additives>
                    <span>{{ formulation.title }}</span>
                    <template v-if="(!!parseInt(formulation.field_is_public) || isLogin)">
                      <v-icon class="icon float-right">keyboard_arrow_right</v-icon>
                    </template>

                    <template v-else>
                      <v-icon class="icon float-right material-icons-outlined">lock</v-icon>
                    </template>
                  </div>
                  <small v-if="formulation.field_formulationbenefits">
                    {{ formulation.field_formulationbenefits }}
                  </small>
                </div>
                <template v-if="(!!parseInt(formulation.field_is_public) || isLogin)">
                  <ul>
                    <template v-for="(item, index) in formulation.basic">
                      <li :key="index" v-if="item.value">
                        <div class="item-property">
                        <span>
                          <v-icon class="material-icons-outlined">colorize</v-icon>
                        </span>
                          <span>
                          {{ item.label }}
                        </span>
                          <span>
                          <b>{{ item.value }}</b>
                        </span>
                        </div>
                      </li>
                    </template>
                  </ul>
                  <div>
                    <!--                  <v-btn icon @click="closeRequestDialog">-->
                    <!--                    <v-icon large>close</v-icon>-->
                    <!--                  </v-btn>-->

                    <v-btn
                      icon
                      @click="favoritesFormulationStar('formulation', formulation.isFeature ? 'delete' : 'add', formulation.uuid)"
                    >
                      <v-icon
                        v-if="!formulation.isFeature"
                        color="grey lighten-1"
                        large
                      >
                        star_border
                      </v-icon>

                      <v-icon
                        v-else
                        color="yellow"
                        large
                      >
                        star
                      </v-icon>
                    </v-btn>
                  </div>
                </template>

                <template v-else>
                  <div></div>
                </template>
              </div>
            </v-card>
          </v-col>
          <infinite-loading
            :identifier="infiniteId"
            @infinite="infiniteHandler"
            ref="infiniteLoading"
            :distance="distance"
          >
            <span slot="no-more">没有更多配方了</span>
            <span slot="no-results">没有更多配方了</span>
          </infinite-loading>
        </template>
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
        <formulation-details
          @fatherMethod="closeRequestDialog()"
          :formulation="selectedFormulation"
          :preview-formulation-prop="previewFormulationProperties"
          :preview-formulation-basic="previewFormulationBasicInformation"
        >
        </formulation-details>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  // import IconDispersions from '../components/svg/Dispersions'
  import IconFeatures1 from '../components/svg/features/Features-1'
  import IconFeatures4 from '../components/svg/features/Features-4'
  import formulationDetails from '../components/FormulationDetails'
  import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue'
  import { mapState } from 'vuex'
  import config from '../config'

  const isDev = process.env.NODE_ENV !== 'production'
  // 每页显示的配方条数
  const pageCount = isDev ? config.dev.pageCount : config.prod.pageCount

  export default {
    components: { IconFeatures1, IconFeatures4, formulationDetails, InfiniteLoading },

    computed: {
      ...mapState({
        requestFormulationDialog: state => state.core.requestFormulationDialog,
        formulationFieldsDefinition: state => state.formulation.formulationFieldsDefinition,
        previewFormulationBasicInformation: state => state.formulation.formulationBasicInformation,
        previewFormulationProperties: state => state.formulation.formulationProperties,
        isLogin: state => state.user.isLogin
      }),
    },

    data: () => ({
      showList: true,
      showCard: false,
      formulationField: {},
      formulationFilterList: [],
      distance: -Infinity,
      infiniteId: +new Date(),
      formulationList: [],
      alertMessage: '',
      alertClass: '',
      alert: false,
      queryOptions: {},
      selectedFormulation: {}
    }),

    mounted () {
      let vm = this
      vm.distance = 1
      vm.$store.dispatch('getFormulationFieldsDefinition')
      vm.changeFilter()
    },

    methods: {
      showFormulationCard () {
        let vm = this
        vm.showList = false
        vm.showCard = true

        // vm.productList = []
        // vm.changeFilter()
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

      formulationFilterSearch () {
        let vm = this
        let filterList = []
        if (vm.formulationFilterList.length <= 0) {
          vm.setAlert('搜索条件不能为空', 'warning')
          return false
        }

        filterList = vm.formulationFilterList.filter((item) => {
          return item.hasOwnProperty('value')
        })

        filterList.forEach((filterField) => {
          vm.queryOptions[filterField.field] = filterField.value
        })

        vm.changeFilter()
      },

      addFormulationFilter () {
        let vm = this

        if (!vm.formulationField.hasOwnProperty('label')) {
          vm.setAlert('请您选择搜索条件添加', 'warning')
          return false
        }

        let ret = vm.formulationFilterList.find((v) => {
          return v.label === vm.formulationField.label
        })

        if (ret === undefined) {
          vm.formulationFilterList.push(vm.formulationField)
        } else {
          vm.setAlert('禁止添加重复条件', 'warning')
          return false
        }
      },

      changeFilter () {
        this.formulationList = []
        this.infiniteId += 1
      },

      infiniteHandler ($state) {
        let vm = this
        let options = {}

        options.items_per_page = pageCount
        options.page = Math.ceil(vm.formulationList.length / pageCount)
        options = { ...options, ...vm.queryOptions }

        vm.$loading.show()
        vm.$store.dispatch('getFormulationList', options).then(() => {
          let formulations = vm.$store.state.formulation.formulationList
          formulations = formulations.map((formulation) => {
            vm.$store.dispatch('getFormulationDetails', {
              id: formulation.uuid
            }).then(result => {
              delete result.field_formula_composition
              delete result.field_formulation_file
              delete result.field_formulation_cluster
              delete result.field_formulation_name
              delete result.field_formulationbenefits
              delete result.field_is_public
              delete result.body

              formulation.basic = result
            })

            return formulation
          })
          if (formulations.length) {
            vm.formulationList = vm.formulationList.concat(formulations)
            $state.loaded()
            vm.$loading.hide()
            if (formulations.length < pageCount) {
              $state.complete()
              vm.$loading.hide()
            }
          } else {
            $state.complete()
            vm.$loading.hide()
          }
        })
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

      previewFormulation (formulation) {
        let vm = this
        vm.$loading.show()
        vm.$store.dispatch('getFormulationDetails', {
          id: formulation.uuid
        }).then(() => {
          vm.selectedFormulation = formulation
          vm.$loading.hide()
          vm.$store.state.core.requestFormulationDialog = true
        })
      },

      closeRequestDialog () {
        this.$store.state.core.requestFormulationDialog = false
      },

      setAlert (message, style, type) {
        type === 'append'
          ? (this.alertMessage += message)
          : (this.alertMessage = message)
        this.alertClass = style
        this.alert = true
        setTimeout(() => {
          this.clearAlert()
        }, 5000)
      },

      clearAlert () {
        this.alertMessage = ''
        this.alertClass = ''
        this.alert = false
      },
    }
  }
</script>
<style lang="scss" scoped>
  #formulations {
    max-width: 1318px;

    .formulation-list {

      .v-list {
        padding: 0;
        border-bottom: 1px solid #ddd;

        & > .v-list-item {

          &.locked {
            background-color: rgba(226, 213, 213, 0.32);
            color: #655c5c!important;

            a {
              color: #655c5c;
            }
          }

          .v-list-item__content {
            cursor: pointer;
          }
        }

        .v-avatar {
          cursor: pointer;

          i {
            height: 40px;
            width: 40px;
            margin-top: 0;
          }
        }

        .v-list-item__title {

          span {

            &:first-child {
              width: 40%;
              display: inline-block;
            }
          }
        }
      }
    }

    .infinite-loading-container {
      height: 72px;
      line-height: 72px;
    }
  }

  .formulation-list {

    &.locked {
      background-color: rgba(226, 213, 213, 0.32);
      color: #655c5c !important;
    }
  }

  #formulation-details {
    padding: 20px;

    .v-btn {
      background: none;
      margin: 0 7%;
      overflow: hidden;
      position: relative;

      .v-icon {
        height: 48px;
        width: 48px;
      }

      @media screen and (min-width: 1024px) {
        height: 48px;
        width: 48px;
      }
    }

    a {
      float: left;
      font-family: Helvetica Neue LT W01_65 Md,Helvetica,Arial,sans-serif;
      font-size: 1.125em;
      font-weight: 500;
      line-height: 1.333;
      margin-bottom: 5px;
      width: 100%;

      .icon {
        height: 32px;
        width: 32px;
        position: relative;
        margin: 0;

        &:first-child {
          margin-right: 8px;
        }
      }

      span {
        display: inline-block;
        float: left;
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 72%;

        @media screen and (min-width: 768px) {
          width: 73%;
        }
      }
    }

    small {
      clear: both;
      display: block;
    }

    ul {
      height: 300px;
      list-style-type: none;
      margin: 0 0 50px;
      overflow-y: auto;
      padding: 0;
      position: relative;
      width: 100%;

      @media screen and (min-width: 768px) {
        margin: 5px 0 0;
        height: 290px;
      }
    }

    & > div {
      padding: 0 15px;

      &:first-child {
        max-height: 170px;
        overflow: hidden;
        cursor: pointer;
      }

      &:last-child {
        bottom: 10px;
        left: 0;
        text-align: center;
        width: 100%;
        position: absolute;

        @media screen and (min-width: 768px) {
          bottom: 16px;
        }
      }
    }
  }
</style>
