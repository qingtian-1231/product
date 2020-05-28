<template>
  <v-container
    id="forget-pass"
    tag="section"
  >
    <div class="header">
      <h1>
        {{ $t('global.forgetPass') }}
      </h1>
    </div>
    <div class="content">
      <template v-if="forgetPassSuccess">
        <v-alert
          :value="alert"
          :type="alertClass"
          transition="scale-transition"
        >
          {{alertMessage}}
        </v-alert>
      </template>

      <template v-else>
        <v-form ref="forgetPassForm" id="forgetPass-form" class="form" v-model="forgetPassValid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                :label="$t('global.email')"
                outlined
                :rules="[rules.required, rules.emailMatch]"
                v-model="userMail"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="bottom row text-center mx-0">
            <v-col cols="6" md="6" sm="6" offset-md="6" class="mx-0">

            </v-col>
            <v-col cols="6" md="6" sm="6" offset-md="6" class="mx-0" style="text-align: right">
              <v-btn class="ma-2" right block rounded color="info" @click="forgetPass()">
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
    name: 'forget-pass',

    data: function () {
      return {
        forgetPassSuccess: false,
        forgetPassValid: true,
        alertMessage: '',
        alertClass: '',
        alert: false,
        userMail: '',
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
      }
    },

    methods: {
      forgetPass () {
        let vm = this
        if (vm.$refs.forgetPassForm.validate()) {
          vm.$loading.show()
          request().post('/user/lost-password?_format=json',
            {
              "mail": vm.userMail,
            }
          )
            .then(res => {
              if (res.status === '200' || res.statusText === 'OK') {
                vm.forgetPassSuccess = true
                vm.setAlert(res.data.message, 'success')
                vm.$loading.hide()
              }

              return Promise.resolve(res)
            }, err => {
              vm.$loading.hide()
              vm.setAlert(err.data.message, 'error')

              return Promise.resolve(err)
            })
            .catch(function (error) {
              vm.$loading.hide()
              vm.setAlert(error.data.message, 'error')
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
    }
  }
</script>
<style lang="scss" scoped>
  #forget-pass {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;
  }
</style>
