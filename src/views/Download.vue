<template>
  <v-container
    id="download"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row dense>
        <v-card
          class="mx-auto"
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
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        downloadList: state => state.download.downloadList
      }),
    },

    data: () => ({
    }),

    mounted () {
      let vm = this
      vm.$store.dispatch('getDownloadList')
    },

    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  #download {
    max-width: 1318px;

    .v-list {

      .v-avatar {

        i {
          height: 40px;
          width: 40px;
          margin-top: 0;
        }
      }
    }
  }
</style>
