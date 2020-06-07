<template>
  <v-container id="industry" tag="section">
    <v-col lg="12" md="12" sm="12">
      <v-row class="back">
        <v-col class="col-xs-6" md="6">
          <v-btn class="float-left" color="primary" @click="$router.back(-1)">
            <v-icon>apps</v-icon>
            {{ $t('global.goBack') }}
          </v-btn>
        </v-col>
        <v-col class="col-xs-6">
        </v-col>
      </v-row>

      <v-row dense>
        <div class="main-content">
          <template v-if="!Array.isArray(termDescription)">
            <p v-html='termDescription'></p>
          </template>

          <template v-else>
            <h1>{{ $t('industry.noDescription') }}</h1>
          </template>

        </div>
      </v-row>

      <v-row class="footer">
        <v-col class="col-xs-6" md="6">
          <v-btn class="float-left" color="primary" @click="goClick('formulations', termTid)">
            {{ $t('industry.checkFormulation') }}
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </v-col>
        <v-col class="col-xs-6">
          <v-btn class="float-right" color="primary" @click="goClick('products', termTid)">
            {{ $t('industry.checkProduct') }}
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  import $ from 'jquery'

  export default {
    name: 'industry',

    computed: {
      ...mapState({
        termDetail: state => state.industry.termDetail,
        isLogin: state => state.user.isLogin,
      }),
      termDescription: function () {
        return (this.termDetail && this.termDetail.field_application_description) ? this.termDetail.field_application_description : []
      },

      termTid: function () {
        return (this.termDetail && this.termDetail.tid) ? this.termDetail.tid : []
      },
    },

    watch: {
      $route(to, from) {
        this.loadTermDetail();
      }
    },

    mounted () {
      this.loadTermDetail()
    },

    methods: {
      loadTermDetail () {
        let vm = this
        let query = vm.$router.history.current.query
        let term_id = query.industry

        if (!term_id) {
          term_id = 4
        }
        vm.$loading.show()
        vm.$store.dispatch('getTaxonomyDetail', {term_type: 'applacation', term_id: term_id}).then(result => {
          if (result.status === 200) {
            if ($('.main-content img').length > 0) {
              let imgs = $('.main-content img')
              imgs.each((index, img) => {
                let align = $(img).attr('data-align')

                if (align) {
                  $(img).addClass('align-' + align)
                }
              })
            }
            vm.$loading.hide()
          }
        })
      },

      goClick (path, tid) {
        this.$router.push({ path: path, query: {industry: tid}})
      }
    }
  }
</script>

<style lang="scss" scoped>
#industry {

  .main-content {
    width: 100%;
    background-color: #fff;
    padding: 15px;
    border-radius: 5px;
  }
}
</style>
