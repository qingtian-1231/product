<template>
  <v-container
    id="login"
    tag="section"
  >
    <div class="header">
      <div class="excerpt">
        <h1>BASF产品助理</h1>
        <h2>用于配方产品</h2>
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
            欢迎您{{ displayName }}, 登录本站！
          </h2>
          <p>
            您已经登录成功，现在请您使用完成的BASF产品助理的功能吧
          </p>
          <router-link :to="{name: 'Home'}">
            <v-btn class="ma-2" rounded color="success">
              回到首页
            </v-btn>
          </router-link>
        </div>
      </template>

      <template v-else>
        <v-col cols="6">
          <v-form ref="loginForm" id="login-form" class="form" v-model="loginValid" lazy-validation>
            <v-col cols="12">
              <v-text-field
                label="用户名"
                v-model="userName"
                :rules="[rules.required, rules.max]"
                counter
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="密码"
                v-model="userPass"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="passwordShow ? 'text' : 'password'"
                counter
                @click:append="passwordShow = !passwordShow"
                outlined
              ></v-text-field>
            </v-col>
            <div class="bottom row text-center mx-0">
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2" block rounded color="success" @click="$router.back(-1)">
                  取消
                  <v-icon right>close</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="12" md="6" sm="12" class="mx-0">
                <v-btn class="ma-2" right block rounded color="info" @click="userLogin()">
                  登录
                  <v-icon right>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-col>
            </div>
          </v-form>
        </v-col>
        <v-col cols="6">
          <div class="unlock">
            <h2>
              <v-icon>lock_open</v-icon>
              注册， 充分使用<br>BASF产品助理.
            </h2>
            <p>
              完全访问专有配方和完整的产品数据。
              个性化您自己的帐户并存储喜欢的或最近访问的产品和配方。
              您甚至可以将您的帐户链接到同事，以共享您的示例订单信息-这只是注册的一些优点。
            </p>
          </div>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
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
          required: v => !!v || '必须.',
          min: v => v.length >= 8 || '至少8位字符',
          max: v => v.length <= 20 || '不能超过20位字符',
          emailMatch: v => (/.+@.+\..+/.test(v) || '请输入合法的email地址'),
          confirmPass: v => this.password === v || '确认密码不正确'
        },
      }
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
    }
  }
</script>
<style lang="scss" scoped>
  #login {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

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
</style>
