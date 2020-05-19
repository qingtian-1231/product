<template>
  <v-container
    id="formulations"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row class="back">
        <v-col class="col-xs-3" md="3">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            {{ $t('global.goBack') }}
          </v-btn>
        </v-col>

        <v-col class="col-xs-7" md="7">
          <template v-for="(item, index) in currentTerm">
            <v-chip
              :key="index"
              class="float-left"
              close
              color="teal"
              text-color="white"
              @click:close="removeFilter(item.field)"
            >
              <v-icon>mdi-label</v-icon>
              {{ item.name }}
            </v-chip>
          </template>
        </v-col>

        <v-col class="col-xs-2" style="text-align: right">
          <span class="formulation-list-count">{{ formulationListCount }}</span>
          <v-btn icon class="float-right" color="primary" @click="showFormulationCard()">
            <v-icon>apps</v-icon>
          </v-btn>

          <v-btn icon class="float-right" color="primary" @click="(showList = true), (showCard = false)">
            <v-icon>view_headline</v-icon>
          </v-btn>
        </v-col>
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
              <span slot="no-more">{{ $t('global.noMoreFormulation') }}</span>
              <span slot="no-results">{{ $t('global.noMoreFormulation') }}</span>
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
            <span slot="no-more">{{ $t('global.noMoreFormulation') }}</span>
            <span slot="no-results">{{ $t('global.noMoreFormulation') }}</span>
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
  // import IconFeatures1 from '../components/svg/features/Features-1'
  // import IconFeatures4 from '../components/svg/features/Features-4'
  import Icon from "../components/svg/features/Icon";
  import formulationDetails from '../components/FormulationDetails'
  import { mapState } from 'vuex'
  import config from '../config'

  const isDev = process.env.NODE_ENV !== 'production'
  // 每页显示的配方条数
  const pageCount = isDev ? config.dev.pageCount : config.prod.pageCount

  export default {
    components: { Icon, formulationDetails},

    computed: {
      ...mapState({
        formulationListCount: state => state.formulation.formulationListCount,
        requestFormulationDialog: state => state.core.requestFormulationDialog,
        formulationFieldsDefinition: state => state.formulation.formulationFieldsDefinition,
        previewFormulationBasicInformation: state => state.formulation.formulationBasicInformation,
        previewFormulationProperties: state => state.formulation.formulationProperties,
        taxonomyFormulationApplication: state => state.core.taxonomyProductApplication,
        isLogin: state => state.user.isLogin
      }),
    },

    data: () => ({
      showList: true,
      showCard: false,
      formulationField: {},
      distance: -Infinity,
      infiniteId: +new Date(),
      formulationList: [],
      alertMessage: '',
      alertClass: '',
      alert: false,
      queryOptions: {},
      selectedFormulation: {},
      formulationQuery: {},
      currentTerm: [],
    }),

    mounted () {
      let vm = this
      vm.formulationQuery = this.$router.history.current.query;
      vm.distance = 1
      vm.$store.dispatch('getFormulationFieldsDefinition')
      vm.changeFilter()
    },

    watch: {
      $route(to, from) {
        let vm = this;
        vm.formulationQuery = to.query;
        vm.changeFilter();
      }
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

      changeFilter () {
        this.formulationList = []
        this.infiniteId += 1
      },

      infiniteHandler ($state) {
        let vm = this
        let options = {}
        let filter = {
          'formulation_application_ids': 'all'
        }

        options.items_per_page = pageCount
        options.page = Math.ceil(vm.formulationList.length / pageCount)
        options = { ...options, ...vm.queryOptions }

        if (vm.formulationQuery.hasOwnProperty("industry")) {
          let subIds = []
          subIds = vm.getChildrenIds(vm.taxonomyFormulationApplication, vm.formulationQuery.industry)
          filter.formulation_application_ids = vm.formulationQuery.industry + '+' + subIds.join('+')
        }

        // 固定工业配方条件过滤
        if (vm.formulationQuery.hasOwnProperty("field_luster_60")) {
          let filterTerm = {
            field: 'field_luster_60',
            name: '光泽 60'
          }
          let hasFilter = vm.currentTerm.findIndex(item => item.field === 'field_luster_60')
          options.field_luster_60 = vm.formulationQuery.field_luster_60

          if (hasFilter === -1) {
            vm.currentTerm.push(filterTerm)
          }
        }

        if (vm.formulationQuery.hasOwnProperty("field_sheet")) {
          let filterTerm = {
            field: 'field_sheet',
            name: '板材'
          }
          let hasFilter = vm.currentTerm.findIndex(item => item.field === 'field_sheet')
          options.field_sheet = vm.formulationQuery.field_sheet

          if (hasFilter === -1) {
            vm.currentTerm.push(filterTerm)
          }
        }

        if (vm.formulationQuery.hasOwnProperty("field_thickness")) {
          let filterTerm = {
            field: 'field_thickness',
            name: '厚度'
          }
          let hasFilter = vm.currentTerm.findIndex(item => item.field === 'field_thickness')
          options.field_thickness = vm.formulationQuery.field_thickness

          if (hasFilter === -1) {
            vm.currentTerm.push(filterTerm)
          }
        }

        if (vm.formulationQuery.hasOwnProperty("field_sst")) {
          let filterTerm = {
            field: 'field_sst',
            name: 'SST'
          }
          let hasFilter = vm.currentTerm.findIndex(item => item.field === 'field_sst')
          options.field_sst = vm.formulationQuery.field_sst

          if (hasFilter === -1) {
            vm.currentTerm.push(filterTerm)
          }
        }

        vm.$loading.show()
        vm.$store.dispatch('getFormulationList', {filter: filter, options: options}).then(() => {
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

      getChildrenIds(terms, target_id) {
        let vm = this
        let childrens = []
        let hasFilter = vm.currentTerm.findIndex(item => item.field === 'industry')

        for (let id in terms) {
          if (terms[id]['tid'] === target_id) {
            childrens = terms[id]['children_ids']
            if (hasFilter === -1) {
              terms[id].field = 'industry'
              vm.currentTerm.push(terms[id])
            }
          }
        }

        if (childrens.length <= 0) {
          for (let id in terms) {
            childrens = vm.getChildrenIds(terms[id]['children'], target_id)
          }
        }

        return childrens
      },

      removeFilter(field) {
        let vm = this
        let query = this.$router.history.current.query
        let newQuery = JSON.parse(JSON.stringify(query));

        delete newQuery[field]
        vm.currentTerm.splice(vm.currentTerm.findIndex(item => item.field === field), 1)
        vm.$router.push({ path: 'formulations', query: newQuery});
      }
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

  .formulation-list-count {
    border: 1px solid #2196f3;
    border-radius: 8px;
    margin-right: 10px;
    padding: 2px 10px;
    line-height: 38px;
    color: #2196f3;
  }
</style>
