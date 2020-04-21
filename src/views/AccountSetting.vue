<template>
  <v-container
    id="register"
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
                :disabled="disabled"
                :rules="[rules.required, rules.emailMatch]"
                v-model="userMail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.userAccountName')"
                :disabled="disabled"
                outlined
                :rules="[rules.required, rules.max, rules.chineseVarchar, rules.FullwidthChar, rules.invilideChar]"
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

            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.passWord')"
                :disabled="disabled"
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
                :disabled="disabled"
                outlined
                v-model="rePassword"
                :append-icon="rePasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.confirmPass]"
                :type="rePasswordShow ? 'text' : 'password'"
                counter
                @click:append="rePasswordShow = !rePasswordShow"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="bottom row text-center mx-0">
            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="registerUser()">
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

  export default {
    name: 'account-setting',

    data: function () {
      return {
        disabled: true,
        businessModelList: [
          {
            code: 'Manufacturing',
            name: '生产型企业',
          },
          {
            code: 'Trade',
            name: '贸易型企业'
          },
          {
            code: 'Research Institutes',
            name: '科研机构'
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
        businessModel: {},
        companyPosition: '',
        rules: {
          required: v => !!v || '必须.',
          min: v => v.length >= 8 || '至少8位字符',
          max: v => v.length <= 20 || '不能超过20位字符',
          emailMatch: v => (/.+@.+\..+/.test(v) || '请输入合法的email地址'),
          confirmPass: v => this.password === v || '确认密码不正确',
          chineseVarchar: v => {
            let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/

            return !reg.test(v) || '用户名仅能包含英文字符下划线或者数字'
          },
          FullwidthChar: v => {
            let reg = /[\uFF00-\uFFEF]/

            return !reg.test(v) || '您输入了非法的全角字符'
          },
          invilideChar: v => {
            let reg = /[`~!@#$%^&*()+=<>?:|"{},\\./;'[\]]/

            return !reg.test(v) || '您输入了非法字符'
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
          request().post('/user/register?_format=hal_json',
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
