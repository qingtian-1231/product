<template>
  <div class="carousel">
    <v-carousel
      interval
      progress
      progress-color="primary"
      height="720"
      delimiter-icon="mdi-minus"
      show-arrows-on-hover
      hide-delimiter-background
      touch
      v-model="currentCarousel"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
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
  export default {
    name: 'carousel',
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        items: [
          {
            src: 'https://www.carecreations.basf.com/images/default-source/homepage/home_slide6_large.jpg',
          },
          {
            src: 'https://www.carecreations.basf.com/images/default-source/homepage/home_slide1_large.jpg',
          },
          {
            src: 'https://www.carecreations.basf.com/images/default-source/homepage/home_slide2_large.jpg',
          },
          {
            src: 'https://www.carecreations.basf.com/images/default-source/homepage/home_slide3_large.jpg',
          },
          {
            src: 'https://www.carecreations.basf.com/images/default-source/homepage/home_slide4_large.jpg',
          },
          {
            src: 'https://www.carecreations.basf.com/images/default-source/homepage/home_slide5_large.jpg',
          },
        ],
        currentCarousel: 0,
      }
    },
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
