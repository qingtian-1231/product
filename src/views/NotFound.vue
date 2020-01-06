<template>
  <v-container grid-list-lg px-0 px-md-3 class="custom-container">
    <v-layout justify-center>
      <v-flex xs12 sm12 md10 lg9 xl8>
        <v-layout row wrap mx-0 my-0 px-3 py-3 white class="post-border">
          <v-flex xs12 pl-0>
            <h1 class="show-title">404，无效的页面</h1>
          </v-flex>
          <v-flex xs12 pl-0 class="mt20">
            <p style="font-size:16px;">很抱歉， 您访问的页面已经不存在了，请返回<router-link :to="{ name: 'Home' }">首页</router-link>！</p>
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
