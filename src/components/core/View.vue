<template>
  <v-content id="home" :style="`padding: ${paddingTop}px 0 0;`">
    <router-view />
    <v-navigation-drawer
      v-model="loginStatus"
      fixed
      temporary
      width="100%"
      hide-overlay
      height="100%"
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
                <span class="headline">{{ displayName }}, {{ $t('global.welcome') }}</span>
                <v-spacer></v-spacer>
                <v-btn dark icon @click.stop="closeLoginSheet" class="black--text">
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider class="py-5"></v-divider>

              <div class="person-center">
                <ul>
                  <li >
                    <router-link :to="{name: 'MyFavorites'}">
                      <v-icon class="material-icons-outlined">star_outline</v-icon>{{ $t('global.myFavorite') }}
                    </router-link>
                  </li>
                  <li >
                    <router-link :to="{name: 'OrderHistory'}">
                      <v-icon class="material-icons-outlined">shopping_basket</v-icon>{{ $t('global.orderHistory') }}
                    </router-link>
                  </li>
                  <li >
                    <router-link :to="{name: 'AccountSetting'}">
                      <v-icon class="material-icons-outlined">settings</v-icon>{{ $t('global.accountSetting') }}
                    </router-link>
                  </li>
                </ul>
              </div>

              <v-btn block rounded color="primary" dark @click="userLogout()">
                {{ $t('global.logout') }}<v-icon right dark>keyboard_arrow_right</v-icon>
              </v-btn>
            </template>

            <template v-else>
              <v-card-title class="px-0 my-5">
                <span class="headline">{{ $t('global.login') }}</span>
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
                  :label="$t('global.userName')"
                  outlined
                  required
                ></v-text-field>

                <v-text-field
                  v-model="userPass"
                  :label="$t('global.passWord')"
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
                <div class="html" style="line-height: 36px;">
                  <small><a target="_blank" href="/forget-pass">Forgot your password?</a></small>
                  <v-btn block rounded color="info" right dark @click="userLogin()">
                    {{ $t('global.login') }}<v-icon right dark>keyboard_arrow_right</v-icon>
                  </v-btn>
                </div>
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
                {{ $t('home.middleContent.registerTitle') }}
              </span>
            </v-card-title>

            <v-divider class="py-5"></v-divider>

            <blockquote class="blockquote px-0 py-8">
              <router-link :to="{ name: 'Register' }" class="special-color" style="text-transform: capitalize">
                {{ $t('global.register') }} !
              </router-link>
              {{ $t('home.middleContent.registerDescriptionPart') }}
            </blockquote>
<!--            <router-link :to="{name: 'Register'}">-->
<!--              <v-btn-->
<!--                block-->
<!--                rounded-->
<!--                color="secondary"-->
<!--                dark-->
<!--              >-->
<!--                {{ $t('global.register') }}<v-icon right dark>keyboard_arrow_right</v-icon>-->
<!--              </v-btn>-->
<!--            </router-link>-->
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
          required: v => !!v || this.$t('global.required'),
          min: v => v.length >= 8 || this.$t('global.min'),
          max: v => v.length <= 20 || this.$t('global.max'),
          emailMatch: v => (/.+@.+\..+/.test(v) || this.$t('global.emailMatch')),
          confirmPass: v => this.password === v || this.$t('global.confirmPass')
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
        favoriteProductList: state => state.user.favoriteProductList,
        favoriteFormulationList: state => state.user.favoriteFormulationList
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
<style lang="scss" scoped>
  .v-content {

    .v-navigation-drawer {
      max-width: 640px;
      top: 144px!important;
      overflow-y: auto;
      box-shadow: none;

      .mobile-menu {
        background: #fff;
        margin: 0;
        overflow-y: auto;
        padding: 0 0 40px;
        text-align: left;
        transition: all .3s;
        min-width: 300px;
        border-bottom: 1px solid #e2e2e2;

        li {
          float: left;
          display: inline-block;
          position: relative;
          width: 100%;

          a {
            float: left;
            display: inline-block;
            position: relative;
            width: 100%;
            border-bottom: 4px solid transparent;
            height: 48px;
            padding: 10px;
            line-height: 32px;
            text-decoration: none;
            white-space: nowrap;
            font-size: 1em;
            transition: all .15s ease-in-out;
            color: #333;
          }

        }

      }


      &.hidden-to-app-bar {
        top: 72px!important;
      }

      .cutome-card {
        border: 0;
      }
    }

    .person-center {
      display: block;

      ul {
        padding: 0;
        margin-left: -5px;
        
        li {
          position: relative;
          width: 100%;
          display: inline-block;
          float: left;
          margin-bottom: 20px;
          
          a {
            text-decoration: none;
            font-size: 1em;
            color: #333;

            .v-icon {
              height: 32px;
              display: inline-block;
              margin-right: 10px;
              width: 32px;
              margin-top: -1px;
            }
          }
        }
      }
    }

  }

  .html {

    button {
      float: right;
    }
  }
</style>
