<template>
  <v-content id="home" :style="`padding: ${paddingTop}px 0 0;`">
    <router-view />
    <v-navigation-drawer
      v-model="loginStatus"
      fixed
      temporary
      width="100%"
      hide-overlay
      height="calc(100% - 144px)"
      @input="updateLoginStatus"
      :class="hiddenTopAppBar ? 'hidden-to-app-bar' : ''"
    >
      <v-row justify="center" class="mx-0">
        <v-col cols="12" sm="12">
          <ul class="d-md-none mobile-menu">
            <template v-for="(link, i) in menuLinks">
              <template v-if="link.dialog">
                <li
                  :key="i"
                >
                  <a
                    @click="headerMenuClick($event, link)"
                  >
                    <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                    {{ link.title }}
                  </a>
                </li>
              </template>
              <template v-else>
                <li
                  :key="i"
                >
                  <a
                    :href="link.relative"
                    @click="headerMenuClick($event, link)"
                  >
                    <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                    {{ link.title }}
                  </a>
                </li>
              </template>
            </template>
          </ul>
          <v-card
            class="mx-auto px-6 cutome-card"
            outlined
          >
            <template v-if="isLogin || loginSuccess">
              <v-card-title class="px-0 my-5">
                <span class="headline">{{ displayName }}, 欢迎你</span>
                <v-spacer></v-spacer>
                <v-btn dark icon @click.stop="closeLoginSheet" class="black--text">
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider class="py-5"></v-divider>

              <v-btn block rounded color="primary" dark @click="userLogout()">
                退出登录<v-icon right dark>keyboard_arrow_right</v-icon>
              </v-btn>
            </template>

            <template v-else>
              <v-card-title class="px-0 my-5">
                <span class="headline">登录</span>
                <v-spacer></v-spacer>
                <v-btn dark icon @click.stop="closeLoginSheet" class="black--text">
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-card-title>

              <v-divider class="py-5"></v-divider>
              <v-alert
                :value="alert"
                :type="alertClass"
                transition="scale-transition"
              >
                {{alertMessage}}
              </v-alert>
              <v-form ref="loginForm" id="login-form" class="form" v-model="loginValid" lazy-validation>
                <v-text-field
                  v-model="userName"
                  :rules="[rules.required, rules.max]"
                  counter
                  label="用户名"
                  outlined
                  required
                ></v-text-field>

                <v-text-field
                  v-model="userPass"
                  label="密码"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="passwordShow ? 'text' : 'password'"
                  counter
                  @click:append="passwordShow = !passwordShow"
                  outlined
                  required
                ></v-text-field>

<!--                <v-checkbox-->
<!--                  v-model="rememberMe"-->
<!--                  label="记住用户?"-->
<!--                  required-->
<!--                ></v-checkbox>-->

                <v-btn block rounded color="secondary" dark @click="userLogin()">
                  登录<v-icon right dark>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-form>
            </template>
          </v-card>

          <v-card
            class="mx-auto px-6 cutome-card"
            outlined
          >
            <v-card-title class="px-0 my-5">
              <span class="headline black--text">
                <v-icon large>lock_open</v-icon>
                注册，充分利用BASF产品助理
              </span>
            </v-card-title>

            <v-divider class="py-5"></v-divider>

            <blockquote class="blockquote px-0 py-8">
              完全访问专有配方和完整的产品数据。
              个性化您自己的帐户并存储喜欢的或最近访问的产品和配方。
              您甚至可以将您的帐户链接到同事，以共享您的示例订单信息-这只是注册的一些优点。
            </blockquote>
            <router-link :to="{name: 'Register'}">
              <v-btn
                block
                rounded
                color="secondary"
                dark
              >
                注册<v-icon right dark>keyboard_arrow_right</v-icon>
              </v-btn>
            </router-link>
          </v-card>
        </v-col>
      </v-row>

    </v-navigation-drawer>
    <v-dialog
      v-model="requestDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="940px"
    >
      <v-card>
        <v-toolbar>
          <v-btn icon dark @click="closeRequestDialog()">
            <v-icon color="black">close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <online-request-form @fatherMethod="closeRequestDialog()"></online-request-form>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
  // Utilities
  import { mapState } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import OnlineRequestForm from '../OnlineRequestForm'

  export default {
    components: { OnlineRequestForm },

    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data () {
      return {
        loginSuccess: false,
        alertMessage: '',
        alertClass: '',
        alert: false,
        loginValid: true,
        passwordShow: false,
        userName: '',
        userPass: '',
        rememberMe: false,
        rules: {
          required: v => !!v || '必须.',
          min: v => v.length >= 8 || '至少8位字符',
          max: v => v.length <= 20 || '不能超过20位字符',
          emailMatch: v => (/.+@.+\..+/.test(v) || '请输入合法的email地址'),
          confirmPass: v => this.password === v || '确认密码不正确'
        },
        paddingTop: 144,
      }
    },

    watch: {
      '$route' (to, from) {
        if (to.name === 'Products' || to.name === 'Formulations') {
          // this.paddingTop = 200
        } else {
          this.paddingTop = 144
        }
      }
    },

    computed: {
      ...mapState({
        menuLinks: state => state.core.menuItems,
        loginStatus: state => state.core.loginStatus,
        hiddenTopAppBar: state => state.core.hiddenTopAppBar,
        requestDialog: state => state.core.requestDialog,
        isLogin: state => state.user.isLogin,
        currentUser: state => state.user.currentUser,
      }),
      displayName: function () {
        return (this.currentUser) ? this.currentUser.name : '未知名称'
      }
    },

    methods: {
      closeLoginSheet () {
        this.$store.state.core.loginStatus = !this.$store.state.core.loginStatus
      },

      closeRequestDialog () {
        this.$store.state.core.requestDialog = false
      },

      updateLoginStatus (value) {
        this.$store.state.core.loginStatus = value
      },

      headerMenuClick (e, item) {
        e.stopPropagation()

        if (item.dialog) {
          this.$store.state.core.requestDialog = true
          return
        }

        if (item.uri === 'base:sample-order' && !this.isLogin) {
          this.$store.commit('open_login_dialog')
          return
        }

        if (item.to || !item.relative) {
          return
        }

        this.$router.push({ path: item.relative})
      },

      userLogin () {
        let vm = this
        if (this.$refs.loginForm.validate()) {
          let userInfo = {
            name: vm.userName,
            pass: vm.userPass
          }
          vm.$store.dispatch('loginByPassword', userInfo).then(result => {
            if (result instanceof Object) {
              if (result.hasOwnProperty('status') && result.status === 200) {
                vm.loginSuccess = true
                vm.displayName = result.data.current_user.name
                window.location.reload()
              } else if (result.hasOwnProperty('response') && result.response.status !== 200) {
                if (result.response.data.message === 'The user has not been activated or is blocked.') {
                  vm.setAlert('您的账号还没有被管理员激活，请注意查收邮件', 'error')
                }

                if (result.response.data.message === 'Sorry, unrecognized username or password.') {
                  vm.setAlert('您的用户名或者密码错误', 'error')
                }
              }
            }
          })
        }
      },

      userLogout () {
        this.$store.dispatch('logout')
        this.loginSuccess = false
        window.location.reload()
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
<style lang="sass" scoped>
  .v-content
    .v-navigation-drawer
      max-width: 640px
      top: 144px!important
      overflow-y: auto
      box-shadow: none

      .mobile-menu
        background: #fff
        margin: 0
        overflow-y: auto
        padding: 0 0 40px
        text-align: left
        transition: all .3s
        min-width: 300px
        border-bottom: 1px solid #e2e2e2

        li
          float: left
          display: inline-block
          position: relative
          width: 100%

          a
            float: left
            display: inline-block
            position: relative
            width: 100%
            border-bottom: 4px solid transparent
            height: 48px
            padding: 10px
            line-height: 32px
            text-decoration: none
            white-space: nowrap
            font-size: 1em
            transition: all .15s ease-in-out
            color: #333

      &.hidden-to-app-bar
        top: 72px!important
      .cutome-card
        border: 0
</style>
