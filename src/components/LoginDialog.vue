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
          {{ $t('home.middleContent.registerTitle') }}
        </h2>
        <p>
          {{ $t('home.middleContent.registerDescription') }}
        </p>
        <div class="row text-center mx-0">
          <v-col cols="12" md="6" sm="12">
            <router-link :to="{ name: 'Login' }">
              <v-btn class="ma-2" block rounded color="success" @click="closeLoginDialog()">
                {{ $t('global.login') }}
              </v-btn>
            </router-link>
          </v-col>

          <v-col cols="12" md="6" sm="12" class="mx-0">
            <router-link :to="{ name: 'Register' }">
              <v-btn class="ma-2" right block rounded color="info" @click="closeLoginDialog()">
                {{ $t('global.register') }}
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
