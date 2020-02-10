<template>
  <v-container grid-list-lg px-0 px-md-3 class="custom-container">
    <v-layout justify-center>
      <v-flex xs12 sm12 md10 lg9 xl8>
        <v-layout row wrap mx-0 my-0 px-3 py-3 white class="post-border">
          <v-flex xs12 pl-0>
            <h1 class="show-title">401，未经授权的访问</h1>
          </v-flex>
          <v-flex xs12 pl-0 class="mt20">
            <p style="font-size:16px;">
              很抱歉， 您无权访问此页面，请去
              <router-link :to="{ name: 'Login' }">登录</router-link>
              页面登录后使用，或者前往<router-link :to="{ name: 'Register' }">注册</router-link>
              页面，充分使用BASF助手吧！
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'not-found',
    data: function () {
      return {
      }
    }
  }
</script>
