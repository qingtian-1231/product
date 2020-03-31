<template>
  <div class="home-banner">
    <search></search>
<!--    <ul class="slides">-->
<!--      <li>-->
<!--        <picture>-->
<!--          <source :srcset="require('@/assets/home/keyvisual_homepage_mega.png')" media="(min-width: 1600px)">-->
<!--          <source :srcset="require('@/assets/home/keyvisual_homepage_tiny.jpg')" media="(min-width: 1024px)">-->
<!--          <source :srcset="require('@/assets/home/keyvisual_homepage_small.jpg')" media="(min-width: 768px)">-->
<!--          <source :srcset="require('@/assets/home/keyvisual_homepage_medium.jpg')" media="(min-width: 640px)">-->
<!--          <source :srcset="require('@/assets/home/keyvisual_homepage_big.jpg')">-->
<!--          <img-->
<!--            :src="require('@/assets/home/keyvisual_homepage_mega.png')"-->
<!--            :srcset="require('@/assets/home/keyvisual_homepage_tiny.jpg') + ' 480w,'-->
<!--      + require('@/assets/home/keyvisual_homepage_small.jpg') + ' 640w,'-->
<!--      + require('@/assets/home/keyvisual_homepage_medium.jpg') + ' 768w,'-->
<!--      + require('@/assets/home/keyvisual_homepage_big.jpg') + ' 1024w,'-->
<!--      + require('@/assets/home/keyvisual_homepage_mega.png') + ' 1600w'"-->
<!--            alt="Stage"-->
<!--          >-->
<!--        </picture>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
  export default {
    name: 'Banner',

    components: {
      Search: () => import('@/components/home/Search')
    }
  }
</script>

<style lang="scss" scoped>
  .slides {
    padding: 0;
    display: inline-block;
    height: auto;
    margin: 0;
    position: relative;
    width: 100%;
    overflow: hidden;
    background: transparent;
    opacity: 1;
    -webkit-animation: fadeStage 1.25s ease-in-out 1.25s both;
    animation: fadeStage 1.25s ease-in-out 1.25s both;
    max-height: 1200px;
  }

  .home-banner {
    margin-top: 45px;
  }
</style>
