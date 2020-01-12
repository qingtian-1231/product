<template>
  <v-container
    id="home-search"
    tag="section"
  >
    <div class="search-content">
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

      <v-select
        v-model="e2"
        :items="states"
        solo
        label="行业"
        height="48"
        background-color="secondary"
      ></v-select>
    </div>

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
    components: {},

    data () {
      return {
        e2: 'Test',
        states: [
          '涂料',
          '建筑',
          '纺织及纤维',
          '助剂',
          '印刷',
          '油墨',
          '包装',
          '胶黏剂',
          '家具',
          '汽车',
          '电池',
          '符合材料',
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  #home-search {
    width: 30%;
    margin-top: -8%;

    .search-content {
      display: flex;

      .v-input__control {
        min-height: 48px;

        & > .v-input__slot {
          min-height: 48px;
        }
      }

      .v-icon {
        color: #333;
      }

      .v-select__selections {
        color: #333;
      }

      & > div {

        &:first-child {
          flex: 2;
        }

        &:last-child {
          flex: 1;
        }
      }
    }

    @media screen and (max-width: 640px) {
      width: 100%;
    }
  }
</style>
