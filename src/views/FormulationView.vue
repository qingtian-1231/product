<template>
  <v-container
    id="formulation-view"
    tag="section"
  >
    <v-row class="back">
      <v-col class="col-xs-8" md="6">
        <v-btn class="float-left" color="primary" @click="$router.back(-1)">
          <v-icon>apps</v-icon>
          {{ $t('global.goBack') }}
        </v-btn>
      </v-col>
      <v-col class="col-xs-4">
      </v-col>
    </v-row>

    <v-row class="header">
      <v-col class="col-xs-12" md="12">
        <div>
          <h1>
            <icon
              width="64"
              height="64"
              icon-name="14"
              bg-color-class="Hydropalat"
            >
            </icon>
            <template v-if="formulationBasic.name">
              {{ formulationBasic.name.value }}
            </template>

          </h1>
          <div>
            <v-btn
              icon
              @click="openShareDialog"
            >
              <v-icon large class="material-icons-outlined">share</v-icon>
            </v-btn>

            <v-btn
              icon
              @click="favoritesFormulationStar('formulation', formulationBasic.isFeature ? 'delete' : 'add', formulationBasic.uuid)"
            >
              <v-icon
                v-if="!formulationBasic.isFeature"
                class="material-icons-outlined"
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
        </div>
      </v-col>
    </v-row>

    <v-row class="content">
      <v-col class="col-xs-12" md="12">
        <div>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="primary"
            grow
          >
            <v-tab>
              {{ $t('formulationView.formula') }}
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab @click="showIcon">
              {{ $t('formulationView.basicInfo') }}
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              {{ $t('formulationView.property') }}
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

            <v-tab>
              {{ $t('formulationView.otherInformation') }}
              <v-icon left class="material-icons-outlined">remove_red_eye</v-icon>
            </v-tab>

          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <formulation-recipe :basic-info="formulationBasic" :formulation-info="formulationRecipeInfo"></formulation-recipe>
            </v-tab-item>

            <v-tab-item>
              <basic-information :formulation-basic="formulationBasic"></basic-information>
            </v-tab-item>

            <v-tab-item>
              <properties :formulation-properties="formulationProp"></properties>
            </v-tab-item>

            <v-tab-item>
              <additional :formulation-files="formulationFiles"></additional>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>

    <v-row class="footer">
      <v-col class="col-xs-12" md="12">
        <div>
          <v-btn
            icon
            tile
            large
            @click="favoritesFormulationStar('formulation', formulationBasic.isFeature ? 'delete' : 'add', formulationBasic.uuid)"
          >
            <v-icon
              v-if="!formulationBasic.isFeature"
              large
              class="material-icons-outlined"
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

            <p>{{ $t('formulationView.share') }}</p>
          </v-btn>
          <v-btn icon tile large @click="openShareDialog()">
            <v-icon large class="material-icons-outlined">share</v-icon>
            <p>{{ $t('formulationView.favorite') }}</p>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="shareDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="940px"
    >
      <v-card>
        <v-toolbar>
          <v-btn icon dark>
            <v-icon color="black" class="material-icons-outlined">share</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeShareDialog()">
            <v-icon color="black">close</v-icon>
          </v-btn>
        </v-toolbar>
        <div id="share-dialog">
          <h2>
            {{ formulationTitle }}
          </h2>
          <p>
            分享这个页面
          </p>
          <p>
            {{ currentLocation }}
          </p>
          <div class="row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <v-btn
                class="ma-2"
                block
                rounded
                color="info"
                v-clipboard:copy="currentLocation"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                复制链接
              </v-btn>
            </v-col>

            <!--            <a style="display: none" href="mailto:example@qq.com?cc=example2@qq.com&subject=有未结算的单据&body=您有未付清的账单">发送邮件</a>-->

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="sendEmail()">
                发送邮件
              </v-btn>
            </v-col>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  // import IconColorants from '../components/svg/formulations/Colorants'
  import Icon from "../components/svg/features/Icon";
  import BasicInformation from '../components/formulation_view/BasicInformation'
  import Properties from '../components/formulation_view/Properties'
  import Additional from '../components/formulation_view/Additional'
  import FormulationRecipe from '../components/formulation_view/FormulationRecipe'
  import { mapState } from 'vuex'

  export default {
    components: { Icon, BasicInformation, Properties, Additional, FormulationRecipe },
    data () {
      return {
        shareDialog: false,
        tab: 0,
        formulationBasic: {},
        formulationProp: {},
        formulationRecipeInfo: [],
      }
    },

    computed: {
      ...mapState({
        formulationInfo: state => state.formulation.formulationDetails,
        formulationFiles: state => state.formulation.formulationFiles,
        formulationBasicInformation: state => state.formulation.formulationBasicInformation,
        formulationProperties: state => state.formulation.formulationProperties,
        isLogin: state => state.user.isLogin
      }),

      formulationTitle: function () {
        return (this.formulationBasic && this.formulationBasic.name) ? this.formulationBasic.name.value : ''
      }
    },

    mounted () {
      let vm = this
      let formulationId = vm.$route.params.id
      vm.currentLocation = window.location.href
      vm.$store.dispatch('getFormulationDetails', {
        id: formulationId
      }).then(result => {
        vm.formulationBasic = vm.formulationBasicInformation
        vm.formulationProp = vm.formulationProperties
        vm.formulationRecipeInfo = vm.formulationInfo
      })
    },

    methods: {
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
              if (action === 'add') {
                vm.formulationBasic.isFeature = true
              } else if (action === 'delete') {
                vm.formulationBasic.isFeature = false
              }
            }

            // console.log(vm.formulationBasic, 'vm.formulationBasic')
            vm.$loading.hide()
          })
        }
      },

      openShareDialog() {
        this.shareDialog = true
      },

      closeShareDialog() {
        this.shareDialog = false
      },

      sendEmail() {
        let vm = this
        window.location.href = `mailto:?subject=配方${vm.formulationTitle}来自BASF产品助手&body=请查看配方详细信息${vm.formulationTitle}。
我在BASF产品助手中找到了它：
${vm.currentLocation}`
      },

      onCopy(e) {
        this.$store.commit('SET_SNACKBAR', {
          globalSnackbar: true,
          snackbarMessage: '您已经将链接复制到粘贴板'
        })

        this.closeShareDialog()
      },

      onError(e) {
        this.$store.commit('SET_SNACKBAR', {
          globalSnackbar: true,
          snackbarMessage: '复制失败'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #formulation-view {
    .v-tabs>.v-tabs-bar .v-tab:not(.v-tab--active) {
      border-bottom: 1px solid #ddd;
    }
    .header {

      h1 {
        width: 68%;
        float: left;
        line-height: 1.3;
        margin: 0;
        padding-left: 70px;
        padding-top: 8px;
        font-size: 2.2rem;

        .icon-container {
          margin: -7px 10px 0 -70px;
          max-height: 64px;
          max-width: 64px;
          height: 64px;
          width: 64px;
          position: relative;
          float: left;
        }

        .icon {
          margin: -7px 10px 0 -70px;
          max-height: 64px;
          max-width: 64px;
          height: 64px;
          width: 64px;
          position: relative;
          float: left;
        }
      }

      .col {
        padding-top: 0;
        padding-bottom: 0;

        & > div {
          border-bottom: 1px solid #eee;
          border-radius: 8px 8px 0 0;
          padding-top: 40px;

          @media screen and (min-width: 1024px) {
            padding-bottom: 40px;
          }

          & > div {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            float: right;
            padding: 20px 0;
            text-align: center;
            width: 100%;

            @media screen and (min-width: 1024px) {
              float: right;
              padding: 10px 0;
              text-align: right;
              width: auto;
            }
          }
        }
      }

      .v-btn {
        float: none;
        display: inline;
        height: 48px;
        margin: 0 auto;
        width: 48px;

        @media screen and (min-width: 1024px) {
          margin-left: 5px;
        }
      }
    }

    .content {

      .col {
        padding-top: 0;
        padding-bottom: 0;

        & > div {

          &:last-child {
            border-radius: 0 0 8px 8px;
          }

          &:first-child {
            padding-top: 40px;
          }

          .v-tabs {
            height: auto;
            text-align: center;
            margin-bottom: 45px;
            overflow: hidden;

            .v-tab {
              font-size: 1.1rem;

              &.v-tab--active {

                &:before {
                  opacity: 0.12;
                }
              }
            }
          }
        }
      }
    }

    .footer {

      & > .col {
        padding-top: 0;
        padding-bottom: 0;

        & > div {
          margin-top: 30px;
          padding-top: 30px;
          padding-bottom: 30px;
          border-radius: 8px;
          box-shadow: 2px 2px 8px 0 rgba(0,0,0,.1);
          text-align: center;

          @media screen and (min-width: 480px) {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
          }
        }
      }

      .v-btn {
        background: transparent;
        border: none;
        line-height: 48px;
        text-align: left;
        display: block;
        float: none;
        overflow: visible;
        margin: 0 auto;
        padding: 0;
        width: 180px;

        .v-icon {
          font-size: 48px;
        }

        p {
          line-height: 48px;
          margin: 0;
        }

        @media screen and (min-width: 1024px) {
          display: inline;
          text-align: left;
        }

        @media screen and (min-width: 480px) {
          display: inline;
          text-align: center;
          width: auto;
        }
      }
    }
  }

  #share-dialog {
    text-align: center;
    padding: 0 4%;
    background: #fff;

    h2 {
      padding: 0 0 2% 0;

      i {
        margin: -10px 0 0 -20px;
        left: 50%;
        position: absolute;
        top: 90px;
        font-size: 2.5rem;
      }
    }
  }
</style>
