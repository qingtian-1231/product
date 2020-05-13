<template>
  <v-container
    id="reset-pass"
    tag="section"
  >
    <div class="header">
      <h1>
        {{ $t('global.resetPass') }}
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
      <template v-if="resetPassSuccess">
        <router-link :to="{name: 'Login'}">
          <v-btn class="ma-2" right block rounded color="info">
            {{ $t('global.login') }}
            <v-icon right>keyboard_arrow_right</v-icon>
          </v-btn>
        </router-link>
      </template>

      <template v-else>
        <v-form ref="resetPassForm" id="resetPass-form" class="form" v-model="resetPassValid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                :label="$t('global.email')"
                outlined
                :rules="[rules.required, rules.emailMatch]"
                v-model="userMail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :label="$t('global.newPassWord')"
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
          </v-row>

          <div class="bottom row text-center mx-0">
            <v-col cols="6" md="6" sm="6" offset-md="6" class="mx-0">

            </v-col>
            <v-col cols="6" md="6" sm="6" offset-md="6" class="mx-0" style="text-align: right">
              <v-btn class="ma-2" right block rounded color="info" @click="resetPass()">
                {{ $t('global.submit') }}
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
    name: 'reset-pass',

    data: function () {
      return {
        resetPassSuccess: false,
        resetPassValid: true,
        passwordShow: false,
        rePasswordShow: false,
        password: '',
        rePassword: '',
        alertMessage: '',
        alertClass: '',
        alert: false,
        userMail: '',
        rules: {
          required: v => !!v || this.$t('global.required'),
          min: v => v.length >= 8 || this.$t('global.min'),
          max: v => v.length <= 20 || this.$t('global.max'),
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
      }
    },

    methods: {
      resetPass () {
        let vm = this
        if (vm.$refs.resetPassForm.validate()) {
          vm.$loading.show()
          request().post('/user/lost-password-reset?_format=json',
            {
              "name": vm.userMail,
              "temp_pass": vm.$router.history.current.params.tempPass,
              "new_pass": vm.password
            }
          )
            .then(res => {
              if (res.status === '200' || res.statusText === 'OK') {
                vm.resetPassSuccess = true
                vm.setAlert(res.data.message, 'success')
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
        }, 50000)
      },

      clearAlert () {
        this.alertMessage = ''
        this.alertClass = ''
        this.alert = false
      },
    },

    mounted (){
      console.log(this.$router.history.current.params.tempPass)
    }
  }
</script>
<style lang="scss" scoped>
  #reset-pass {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;
  }
</style>
