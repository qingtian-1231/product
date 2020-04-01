<template>
  <div class="carousel">
    <v-carousel
      cycle
      interval="6000"
      progress
      progress-color="primary"
      height="720"
      delimiter-icon="mdi-minus"
      show-arrows-on-hover
      touch
      v-model="currentCarousel"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        :value="item.color"
      >
        <div class="slide-caption">
          <h2><b>Their stories. Your products.</b><br>Our sun care expertise.</h2>
          <a href="/landingpage-sun/english" class="button">All about sun</a>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  let slider1 = require('@/assets/home/carsousel/home_slide1_large.jpg')
  let slider2 = require('@/assets/home/carsousel/home_slide2_large.jpg')
  let slider3 = require('@/assets/home/carsousel/home_slide3_large.jpg')
  let slider4 = require('@/assets/home/carsousel/home_slide4_large.jpg')
  let slider5 = require('@/assets/home/carsousel/home_slide5_large.jpg')
  let slider6 = require('@/assets/home/carsousel/home_slide6_large.jpg')

  export default {
    name: 'carousel',

    data () {
      return {
        items: [
          {
            src: slider1,
            color: 'orange1',
          },
          {
            src: slider2,
            color: 'orange2',
          },
          {
            src: slider3,
            color: 'green_dark1',
          },
          {
            src: slider4,
            color: 'green_dark2',
          },
          {
            src: slider5,
            color: 'red1',
          },
          {
            src: slider6,
            color: 'red2',
          },
        ],
        currentCarousel: 'orange1',
      }
    },

    watch: {
      currentCarousel (val, old) {
        this.$store.commit('change_app_color', {colorClass: val})
      }
    },

    created () {
      console.log(this.items, this.currentCarousel, 'items')
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
      height: 50px;
      width: 224px;
      padding-top: 16px;
      text-align: center;
      text-transform: none;
      vertical-align: middle;
      text-indent: -16px;
      background-color: #f49800;
      cursor: pointer;
      display: block;
      font-size: 1em;

      & .origin {
        background-color: #f49800;
      }
    }
  }
</style>
