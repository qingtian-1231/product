<template>
  <v-container
    id="account-setting"
    tag="section"
  >
    <div class="header">
      <h1>
        <v-icon x-large class="material-icons-outlined">person_add</v-icon>
        {{ $t('accountSetting.title') }}
      </h1>
    </div>

    <div class="content">
      <v-alert
        :value="alert"
        :type="alertClass"
        transition="scale-transition"
      >
        {{alertMessage}}
      </v-alert>
      <template v-if="accountSettingSuccess">
        <div class="success_message">
          <h2>
            <v-icon color="primary">check_circle_outline</v-icon>
            {{ $t('global.thanksRegister') }}！
          </h2>
          <p>
            {{ $t('global.registerSuccess') }}
          </p>
          <router-link :to="{name: 'Home'}">
            <v-btn class="ma-2" rounded color="success">
              {{ $t('global.backToHome') }}
            </v-btn>
          </router-link>
        </div>
      </template>

      <template v-else>
        <v-form ref="accountSettingForm" id="account-setting-form" class="form" v-model="accountSettingValid" lazy-validation>
          <div class="bottom row text-center mx-0">
            <v-col cols="6" md="6" sm="0" class="mx-0">
            </v-col>
            <v-col cols="6" md="6" sm="12" class="mx-0" style="text-align: right">
              <v-btn class="ma-2" right block rounded color="info" @click="accountSettingEdit()">
                {{ $t('accountSetting.edit') }}
                <v-icon right>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
          </div>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.email')"
                outlined
                :disabled="true"
                :rules="[rules.required, rules.emailMatch]"
                v-model="userMail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.userAccountName')"
                :disabled="disabled"
                outlined
                :rules="[rules.required, rules.max, rules.FullwidthChar, rules.invilideChar]"
                v-model="userAccountName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.companyName')"
                :disabled="disabled"
                outlined
                :rules="[rules.required]"
                v-model="companyName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.phone')"
                :disabled="disabled"
                outlined
                :rules="[rules.required]"
                v-model="phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                class="select small"
                v-model="businessModel"
                :items="businessModelList"
                item-text="name"
                item-value="code"
                return-object
                :rules="[rules.required]"
                :label="$t('global.businessModel')"
                :disabled="disabled"
                outlined
                solo
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.position')"
                :disabled="disabled"
                outlined
                :rules="[rules.required]"
                v-model="companyPosition"
              ></v-text-field>
            </v-col>
          </v-row>

<!--          <div class="d-flex">-->
<!--            <v-checkbox-->
<!--              v-model="passDisabled"-->
<!--              label="修改密码"-->
<!--            ></v-checkbox>-->
<!--          </div>-->

<!--          <v-expansion-panels-->
<!--            v-model="panel"-->
<!--            :disabled="passDisabled"-->
<!--            multiple-->
<!--          >-->
<!--            <v-expansion-panel>-->
<!--              <v-expansion-panel-header>密码修改</v-expansion-panel-header>-->
<!--              <v-expansion-panel-content>-->
<!--                <v-row>-->
<!--                  <v-col cols="12" sm="6">-->
<!--                    <v-text-field-->
<!--                      :label="$t('global.currentPass')"-->
<!--                      :disabled="disabled"-->
<!--                      outlined-->
<!--                      v-model="currentPassword"-->
<!--                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--                      :rules="[rules.required, rules.min]"-->
<!--                      :type="passwordShow ? 'text' : 'password'"-->
<!--                      counter-->
<!--                      @click:append="passwordShow = !passwordShow"-->
<!--                    ></v-text-field>-->
<!--                  </v-col>-->

<!--                  <v-col cols="12" sm="6">-->
<!--                    <v-text-field-->
<!--                      :label="$t('global.newPassWord')"-->
<!--                      :disabled="disabled"-->
<!--                      outlined-->
<!--                      v-model="newPassword"-->
<!--                      :append-icon="rePasswordShow ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--                      :rules="[rules.required, rules.confirmPass]"-->
<!--                      :type="rePasswordShow ? 'text' : 'password'"-->
<!--                      counter-->
<!--                      @click:append="rePasswordShow = !rePasswordShow"-->
<!--                    ></v-text-field>-->
<!--                  </v-col>-->
<!--                </v-row>-->
<!--              </v-expansion-panel-content>-->
<!--            </v-expansion-panel>-->
<!--          </v-expansion-panels>-->
          <div class="bottom row text-center mx-0">
            <v-col cols="6" md="6" sm="0" class="mx-0">
            </v-col>
            <v-col cols="6" md="6" sm="12" class="mx-0" style="text-align: right">
              <v-btn class="ma-2" right block rounded color="info" @click="userAccountSetting()">
                {{ $t('accountSetting.confirm') }}
                <v-icon right>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-form>
      </template>
    </div>
  </v-container>
</template>
<script>
  import { request } from '../utils/request'
  import { mapState } from 'vuex'

  export default {
    name: 'account-setting',

    data: function () {
      return {
        disabled: true,
        businessModelList: [
          {
            code: 'Manufacturing',
            name: this.$t('businessModelList.Manufacturing'),
          },
          {
            code: 'Trade',
            name: this.$t('businessModelList.Trade'),
          },
          {
            code: 'Research Institutes',
            name: this.$t('businessModelList.ResearchInstitutes')
          }
        ],
        alertMessage: '',
        alertClass: '',
        alert: false,
        accountSettingSuccess: false,
        accountSettingValid: true,
        passwordShow: false,
        rePasswordShow: false,
        currentPassword: '',
        newPassword: '',
        userAccountName: '',
        userMail: '',
        companyName: '',
        phone: '',
        businessModel: {},
        companyPosition: '',
        rules: {
          required: v => !!v || this.$t('global.required'),
          min: v => v.length >= 8 || this.$t('global.min'),
          max: v => v.length <= 40 || this.$t('global.max'),
          emailMatch: v => (/.+@.+\..+/.test(v) || this.$t('global.emailMatch')),
          confirmPass: v => this.password === v || this.$t('global.confirmPass'),
          chineseVarchar: v => {
            let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/

            return !reg.test(v) || this.$t('global.chineseVarchar')
          },
          FullwidthChar: v => {
            let reg = /[\uFF00-\uFFEF]/

            return !reg.test(v) || this.$t('global.FullwidthChar')
          },
          invilideChar: v => {
            let reg = /[`~!@#$%^&*()+=<>?:|"{},\\./;'[\]]/

            return !reg.test(v) || this.$t('global.invilideChar')
          }
        },
        panel: [],
        passDisabled: true,
        readonly: false,
      }
    },

    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin,
        currentUser: state => state.user.currentUser
      }),
    },

    created () {
      if (!this.isLogin) {
        window.location = '/'
      }
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      },

      accountSettingEdit () {
        this.disabled = false
      },

      userAccountSetting () {
        let vm = this
        let data = {}
        if (vm.$refs.accountSettingForm.validate()) {
          vm.$loading.show()
          data = {
            "field_company_name": [
              {
                "value": vm.companyName
              }
            ],
            "field_user_account_name": [
              {
                "value": vm.userAccountName
              }
            ],
            "field_phone": [
              {
                "value": vm.phone
              }
            ],
            "field_business_model": [
              {
                "value": vm.businessModel.code ? vm.businessModel.code : vm.businessModel
              }
            ],
            "field_company_position": [
              {
                "value": vm.companyPosition
              }
            ]
          }

          if (vm.currentPassword && vm.newPassword) {
            data.pass = [
              {
                "value": vm.newPassword,
                "existing": vm.currentPassword
              }
            ]
          }

          request().patch(`/user/${vm.currentUser.uid}?_format=hal_json`, data)
            .then(res => {
              if (res.status === '200' || res.statusText === 'OK') {
                vm.setAlert(vm.$t('accountSetting.successMessage'), 'success')
                vm.registerSuccess = true
                vm.disabled = true
                vm.$loading.hide()
              }

              return Promise.resolve(res)
            }, err => {
              vm.$loading.hide()
              vm.setAlert(err.response.data.message, 'error')

              return Promise.resolve(err)
            })
            .catch(function (error) {
              vm.$loading.hide()
              vm.setAlert(error.response.data.message, 'error')
              return Promise.resolve(error)
            })
        }
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
    },

    mounted () {
      let vm = this

      if (vm.currentUser) {
        vm.userMail = vm.currentUser.mail
        vm.userAccountName = vm.currentUser.field_user_account_name
        vm.companyName = vm.currentUser.field_company_name
        vm.phone = vm.currentUser.field_phone
        vm.businessModel = vm.currentUser.field_business_model
        vm.companyPosition = vm.currentUser.field_company_position
      }
    }
  }
</script>
<style lang="scss" scoped>
  #account-setting {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

    .QR-code {
      width: 20%;
      margin: 0 auto;
    }

    .header {
      text-align: left;
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;

      h1 {
        font-size: 35px;

        .v-icon {
          font-size: 54px;
        }
      }
    }

    .content {

      .success_message {

        h2 {
          position: relative;

          i {
            margin: -10px 0 0 -21px;
            left: 50%;
            position: absolute;
            top: -2.5rem;
            font-size: 2.5rem;
          }
        }
      }
    }

    .col-sm-6 {
      cursor: not-allowed;
    }

    .bottom {
      padding-top: 40px;
      border-top: 1px solid #eee;
    }
  }
</style>
