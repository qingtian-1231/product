<template>
  <v-dialog
    v-model="loginDialog"
    transition="dialog-bottom-transition"
    scrollable
    persistent
    max-width="940px"
  >
    <v-card>
      <v-toolbar>
        <v-btn icon dark @click="closeLoginDialog()">
          <v-icon color="black">close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div id="login-dialog">
        <h2>
          <v-icon>lock_open</v-icon>
          注册,充分利用BASF产品助手。
        </h2>
        <p>
          完全访问专有配方和完整的产品数据。 个性化您自己的帐户并存储喜欢的或最近访问的产品和配方。 您甚至可以将您的帐户链接到同事，以共享您的示例订单信息-这只是注册的一些优点。
        </p>
        <div class="row text-center mx-0">
          <v-col cols="12" md="6" sm="12">
            <router-link :to="{ name: 'Login' }">
              <v-btn class="ma-2" block rounded color="success" @click="closeLoginDialog()">
                登录
              </v-btn>
            </router-link>
          </v-col>

          <v-col cols="12" md="6" sm="12" class="mx-0">
            <router-link :to="{ name: 'Register' }">
              <v-btn class="ma-2" right block rounded color="info" @click="closeLoginDialog()">
                注册
              </v-btn>
            </router-link>
          </v-col>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'login-dialog',

    computed: {
      ...mapState({
        loginDialog: state => state.core.loginDialog,
      }),
    },

    methods: {
      closeLoginDialog () {
        this.$store.commit('close_login_dialog')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #login-dialog {
    text-align: center;
    padding: 60px 4%;
    background: #fff;

    h2 {
      padding: 2%;

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
