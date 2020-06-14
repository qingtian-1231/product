<template>
  <v-container
    id="register"
    tag="section"
  >
    <div class="header">
      <h1>
        <v-icon x-large class="material-icons-outlined">person_add</v-icon>
        {{ $t('global.register') }}
      </h1>
    </div>

    <div class="content">
      <div class="QR-code">
        <v-img
          :src="require('@/assets/global/wechat.png')"
          :lazy-src="require('@/assets/global/wechat.png')"
          contain
        >
        </v-img>
        <div class="title mb-1">{{ $t('global.followWechat') }}</div>
      </div>
      <v-alert
        :value="alert"
        :type="alertClass"
        transition="scale-transition"
      >
        {{alertMessage}}
      </v-alert>
      <template v-if="registerSuccess">
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
        <v-form ref="registerForm" id="register-form" class="form" v-model="registerValid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.email')"
                outlined
                :rules="[rules.required, rules.emailMatch]"
                v-model="userMail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.userAccountName')"
                outlined
                :rules="[rules.required, rules.max, rules.FullwidthChar, rules.invilideChar]"
                v-model="userAccountName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.companyName')"
                outlined
                :rules="[rules.required]"
                v-model="companyName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.phone')"
                outlined
                :rules="[rules.required, rules.phoneNumber]"
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
                outlined
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.position')"
                outlined
                :rules="[rules.required]"
                v-model="companyPosition"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.passWord')"
                outlined
                v-model="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="passwordShow ? 'text' : 'password'"
                counter
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.repeatPass')"
                outlined
                v-model="rePassword"
                :append-icon="rePasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.confirmPass]"
                :type="rePasswordShow ? 'text' : 'password'"
                counter
                @click:append="rePasswordShow = !rePasswordShow"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="yin-si-xie-yi">
              <v-row align="center">
                <v-switch v-model="agree" :label="$t('global.agree')" :rules="[rules.required]"></v-switch>
                <a target="_blank" href="https://www.basf.com/en/tools/legal/data-protection.html">{{ $t('global.private') }}</a>
              </v-row>
            </v-col>
          </v-row>

          <div class="bottom row text-center mx-0">
            <v-col cols="6" md="6" sm="6">
              <v-btn class="ma-2" block rounded color="info" @click="$router.back(-1)">
                {{ $t('global.cancel') }}
                <v-icon right>close</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="6" md="6" sm="6" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="registerUser()">
                {{ $t('global.register') }}
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
  import { getCookie } from '../utils/cookie'
  import $ from 'jquery'

  export default {
    name: 'online-request-form',

    data: function () {
      return {
        agree: false,
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
        registerSuccess: false,
        registerValid: true,
        passwordShow: false,
        rePasswordShow: false,
        password: '',
        rePassword: '',
        userAccountName: '',
        userMail: '',
        companyName: '',
        phone: '',
        businessModel: {
          code: 'Manufacturing',
          name: this.$t('businessModelList.Manufacturing'),
        },
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
          phoneNumber: v => {
            let reg = /^\d+$/

            return reg.test(v) || this.$t('global.phoneNumber')
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
      }
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      },

      registerUser () {
        let vm = this
        if (vm.$refs.registerForm.validate()) {
          vm.$loading.show()
          let requestPath = '/user/register?_format=hal_json'
          let currentLanguage = getCookie('drupal:session:language')

          if (!currentLanguage) {
            currentLanguage = 'en'
          }

          if (currentLanguage === 'en') {
            requestPath = '/en/user/register?_format=hal_json'
          }

          request().post(requestPath,
            {
              "name": {
                "value": vm.userMail
              },
              "mail":{
                "value": vm.userMail
              },
              "pass":{
                "value": vm.password
              },
              "preferred_langcode": {
                "value": currentLanguage
              },
              "field_company_name": {
                "value": vm.companyName
              },
              "field_user_account_name": {
                "value": vm.userAccountName
              },
              "field_phone": {
                "value": vm.phone
              },
              "field_business_model": {
                "value": vm.businessModel.code
              },
              "field_company_position": {
                "value": vm.companyPosition
              }
            }
          )
            .then(res => {
              if (res.status === '200' || res.statusText === 'OK') {
                vm.registerSuccess = true
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
      $('#register-form').find('input').each((index, item) => {
        $(item).attr('autocomplete', 'off')
      })
    }
  }
</script>
<style lang="scss" scoped>
  #register {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

    .QR-code {
      width: 20%;
      margin: 0 auto;

      @media screen and (max-width: 480px) {
        width: 50%;
      }
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
        margin-top: 50px;

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

    .bottom {
      padding-top: 40px;
      border-top: 1px solid #eee;
    }
  }

  .yin-si-xie-yi {

    .row {

      margin: 0;

      a {
        position: relative;
        top: -3px;
        left: 10px;
      }
    }
  }
</style>
