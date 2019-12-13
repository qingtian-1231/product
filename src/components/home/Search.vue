<template>
  <v-container
    id="home_search"
    tag="section"
  >
    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      light
      v-model="select"
      append-icon="search"
      cache-items
      clearable
      class="mx-1"
      flat
      hide-no-data
      hide-details
      label="搜索"
      item-text="name"
      item-value="id"
      return-object
      return-masked-value
      solo
      @keyup.enter.native="listenEnterKeyBoard()"
    >
    </v-autocomplete>
    <v-snackbar
      v-model="snackbar"
      :bottom="false"
      :left="false"
      :multi-line="true"
      :right="true"
      :timeout="2000"
      :top="true"
      :vertical="false"
      color="primary"
    >
      {{ text }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    components: {}
  }
</script>

<style lang="scss" scoped>
  #home_search {
    width: 30%;
    margin-top: -8%;
  }
</style>
