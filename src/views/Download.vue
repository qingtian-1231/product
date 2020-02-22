<template>
  <v-container
    id="download"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row dense>
        <v-card
          class="mx-auto download-list"
          width="100%"
        >

          <v-list two-line>
            <template v-for="(download, index) in downloadList">
              <v-hover :key="index" v-slot:default="{ hover }">
                <v-list-item :class="hover ? 'elevation-12' : ''" @click="test">
                  <v-list-item-avatar>
                    <v-icon class="material-icons-outlined">attach_file</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="download.title"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <a :href="download.field_global_file" download target="_blank">
                      <v-btn icon>
                        <v-icon class="material-icons-outlined">archive</v-icon>
                      </v-btn>
                    </a>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>

              <v-divider
                v-if="index + 1 < downloadList.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
          <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading" :distance="distance">
            <span slot="no-more">没有更多下载文件了</span>
            <span slot="no-results">没有下载文件</span>
          </infinite-loading>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue'
  import { mapState } from 'vuex'
  import config from '../config'

  const isDev = process.env.NODE_ENV !== 'production'
  // 每页显示的文章条数
  const pageCount = isDev ? config.dev.pageCount : config.prod.pageCount

  export default {
    components: { InfiniteLoading },

    computed: {
      ...mapState({}),
    },

    data: () => ({
      distance: -Infinity,
      infiniteId: +new Date(),
      downloadList: [],
    }),

    mounted () {
      let vm = this
      vm.distance = 1
      vm.changeFilter()
    },

    methods: {
      changeFilter () {
        this.downloadList = []
        this.infiniteId += 1
      },

      infiniteHandler ($state) {
        let vm = this
        let options = {}

        options.items_per_page = pageCount
        options.page = vm.downloadList.length / pageCount
        vm.$store.dispatch('getDownloadList', options).then(() => {
          let downloads = vm.$store.state.download.downloadList

          if (downloads.length) {
            vm.downloadList = vm.downloadList.concat(downloads)

            $state.loaded()
            if (downloads.length < pageCount) {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  #download {
    max-width: 1318px;

    .download-list {

      .v-list {
        padding: 0;
        border-bottom: 1px solid #ddd;

        .v-avatar {

          i {
            height: 40px;
            width: 40px;
            margin-top: 0;
          }
        }
      }
    }

    .infinite-loading-container {
      height: 72px;
      line-height: 72px;
    }
  }
</style>