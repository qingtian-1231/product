<template>
  <v-container
    id="login"
    tag="section"
  >
    <div class="header">
      <div class="excerpt">
        <h1>BASF {{ $t('login.loginTitle') }}</h1>
        <h2>{{ $t('login.loginTitle2') }}</h2>
      </div>
      <v-alert
        :value="alert"
        :type="alertClass"
        transition="scale-transition"
      >
        {{alertMessage}}
      </v-alert>
    </div>

    <v-row class="content">
      <template v-if="loginSuccess || isLogin">
        <div class="success_message">
          <h2>
            <v-icon color="primary">check_circle_outline</v-icon>
            {{ $t('login.welcome') }} {{ displayName }}! {{ $t('login.loginSite') }}
          </h2>
          <p>
            {{ $t('global.loginSuccess') }}
          </p>
          <router-link :to="{name: 'Home'}">
            <v-btn class="ma-2" rounded color="success">
              {{ $t('global.backToHome') }}
            </v-btn>
          </router-link>
        </div>
      </template>

      <template v-else>
        <div class="col-sm-12 col-lg-3 col">
          <div class="title mb-1">{{ $t('global.followWechat') }}</div>
          <v-img
            :src="require('@/assets/global/wechat.png')"
            :lazy-src="require('@/assets/global/wechat.png')"
            contain
          >
          </v-img>
        </div>
        <div class="col-sm-12 col-lg-5 col">
          <v-form ref="loginForm" id="login-form" class="form" v-model="loginValid" lazy-validation>
            <v-col cols="12">
              <v-text-field
                :label="$t('global.email')"
                v-model="userName"
                :rules="[rules.required, rules.max]"
                counter
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :label="$t('global.passWord')"
                v-model="userPass"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="passwordShow ? 'text' : 'password'"
                counter
                @click:append="passwordShow = !passwordShow"
                outlined
              ></v-text-field>
            </v-col>
            <div class="html" style="line-height: 36px;">
              <small><a target="_blank" href="/forget-pass">{{ $t('global.forget') }}</a></small>
            </div>
            <div class="bottom row text-center mx-0">
              <v-col cols="6" md="6" sm="6">
                <v-btn class="ma-2" block rounded color="info" @click="$router.back(-1)">
                  {{ $t('global.cancel') }}
                  <v-icon right>close</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="6" md="6" sm="6" class="mx-0">
                <v-btn class="ma-2" right block rounded color="info" @click="userLogin()">
                  {{ $t('global.login') }}
                  <v-icon right>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-col>
            </div>
          </v-form>
        </div>
        <div class="col-sm-12 col-lg-4 col">
          <div class="unlock">
            <h2>
              <v-icon>lock_open</v-icon>
              {{ $t('home.middleContent.registerTitle') }}
            </h2>
            <p style="margin-top: 35px;">
              {{ $t('home.middleContent.registerDescription') }}
            </p>
          </div>
        </div>
      </template>
    </v-row>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'login-page',

    components: {},

    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin,
        currentUser: state => state.user.currentUser,
      }),
      displayName: function () {
        return (this.currentUser) ? this.currentUser.name : '未知名称'
      }
    },

    data: function () {
      return {
        loginSuccess: false,
        alertMessage: '',
        alertClass: '',
        alert: false,
        passwordShow: false,
        userName: '',
        userPass: '',
        rules: {
          required: v => !!v || this.$t('global.required'),
          min: v => v.length >= 8 || this.$t('global.min'),
          max: v => v.length <= 40 || this.$t('global.max'),
          emailMatch: v => (/.+@.+\..+/.test(v) || this.$t('global.emailMatch')),
          confirmPass: v => this.password === v || this.$t('global.confirmPass'),
        },
      }
    },

    mounted () {
      document.addEventListener("keyup", this.enterKey);
    },

    destroyed () {
      document.removeEventListener("keyup", this.enterKey);
    },

    methods: {
      userLogin () {
        let vm = this
        if (this.$refs.loginForm.validate()) {
          let userInfo = {
            name: vm.userName,
            pass: vm.userPass
          }
          vm.$loading.show()
          vm.$store.dispatch('loginByPassword', userInfo).then(result => {
            if (result instanceof Object) {
              if (result.hasOwnProperty('status') && result.status === 200) {
                vm.loginSuccess = true
                vm.displayName = result.data.current_user.name
                vm.$loading.hide()
                window.location.reload()
              } else if (result.hasOwnProperty('response') && result.response.status !== 200) {
                if (result.response.data.message === 'The user has not been activated or is blocked.') {
                  vm.setAlert('您的账号还没有被管理员激活，请注意查收邮件', 'error')
                  vm.$loading.hide()
                }

                if (result.response.data.message === 'Sorry, unrecognized username or password.') {
                  vm.setAlert('您的用户名或者密码错误', 'error')
                  vm.$loading.hide()
                }
              }
            }
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

      enterKey(event) {
        let loginContainer = document.getElementById('login')
        if (loginContainer) {
          const code = event.keyCode
            ? event.keyCode
            : event.which
              ? event.which
              : event.charCode;

          if (code == 13) {
            this.userLogin();
          }
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  #login {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

    .QR-code {
      width: 20%;
      margin: 0 auto;
    }

    .header {
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;

      .icon {
        height: 60px;
        max-height: 60px;
        max-width: 60px;
        width: 60px;
      }
    }

    .content {
      padding-top: 40px;

      .unlock {
        border-left: 1px solid #eee;
        padding-left: 30px;
      }

      .success_message {
        width: 100%;

        h2 {
          position: relative;
          line-height: 40px;
          font-weight: bold;
          margin-bottom: 5px;

          i {
            margin: -10px 0 0 -21px;
            left: 50%;
            position: absolute;
            top: -2rem;
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

  .html {
    text-align: right;
    padding: 0 15px;
    position: relative;
    bottom: 15px;
  }
</style>
