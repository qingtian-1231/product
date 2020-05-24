<template>
  <div class="carousel">
    <v-carousel
      continuous="false"
      cycle
      interval="6000"
      progress
      progress-color="primary"
      :height="height"
      delimiter-icon="mdi-minus"
      show-arrows-on-hover
      touch
      v-model="currentCarousel"
    >
      <v-carousel-item
        v-for="(carousel, i) in carousels"
        :key="i"
        :src="carousel.field_media_image"
        :value="carousel.color"
      >
        <div class="slide-caption">
          <p v-html="carousel.field_front_carousel_description"></p>
          <span v-html="carousel.field_front_carousel_link"></span>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'carousel',

    data () {
      return {
        height: 720,
        currentCarousel: 'green_dark1',
      }
    },

    computed: {
      // Getting Vuex State from store/modules/
      ...mapState({
        isLogin: state => state.user.isLogin,
        carousels: state => state.home.carousels
      })
    },

    watch: {
      currentCarousel (val, old) {
        this.$store.commit('change_app_color', {colorClass: val})
      }
    },

    created () {
      if (this._isMobile()) {
        this.height = 240
      }
    },

    mounted () {
      let vm = this
      vm.$store.dispatch('getCarousel')
    },

    methods: {
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slide-caption {
    background-color: hsla(0,0%,100%,.7);
    bottom: 60px;
    padding: 20px;
    position: absolute;
    width: auto;
    text-align: left;
    margin-left: 30px;
    left: 2%;
    -webkit-transition: all .3s ease-in .5s;
    -o-transition: all .3s ease-in .5s;
    transition: all .3s ease-in .5s;

    h2 {
      font-size: 2em;
      color: #333;
      margin-bottom: 20px;
    }

    @media screen and (min-width: 640px) {
      padding: 30px;
      width: 500px;
      left: 45px;
    }

    .button {
      background-repeat: no-repeat;
      -webkit-background-size: 70px 7967px;
      background-size: 70px 7967px;
      background-position: right -1271px;
      color: #fff;
      height: 60px;
      width: 280px;
      padding-top: 16px;
      text-align: center;
      text-transform: none;
      vertical-align: middle;
      text-indent: -16px;
      background-color: #f49800;
      cursor: pointer;
      display: block;
      font-size: 25px;
      line-height: 25px;

      & .origin {
        background-color: #f49800;
      }
    }
  }
</style>
