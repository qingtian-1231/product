<template>
  <v-container
    tag="section"
    fluid
  >
    <v-row>
      <v-col cols="12" md="6" sm="6">
        <div
          :align="alignment"
          :justify="justify"
          class="search-container"
          style="height: 320px;"
        >
            <span>
              欢迎访问巴斯夫分散体与树脂产品中心！
在这里，您可以轻松查找您所需的巴斯夫产品信息，<a href="">注册</a>用户更可浏览详细的应用配方或同我们的技术专家深入交流。在线样品定购和1688官方旗舰店下单等便捷功能可随时满足您的采购需求。
            </span>
          <search></search>
        </div>
      </v-col>
      <v-col cols="12" md="6" sm="6">
        <div
          :align="alignment"
          :justify="justify"
          class="teaser-container orange1"
          style="height: 320px;"
        >
          <a href="https://www.basf.com/global/en/corona-information.html" target="_blank">
            <picture target="_blank" href="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_corona.jpg?sfvrsn=e211d160_6">
              <!--[if IE 9]><video style="display: none;"><![endif]-->
              <source srcset="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_corona.jpg?sfvrsn=e211d160_6" media="(min-width: 1024px)">
              <source srcset="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_corona.jpg?sfvrsn=e211d160_6">
              <!--[if IE 9]></video><![endif]-->
              <img src="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_corona.jpg?sfvrsn=e211d160_6" srcset="https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_corona.jpg?sfvrsn=e211d160_6 1279w, https://www.carecreations.basf.com/images/default-source/homepage/teaser/2020/home_teaser_corona.jpg?sfvrsn=e211d160_6 1024w" alt="home_teaser_corona">
            </picture>
          </a>

          <div class="caption">
            <a href="https://www.basf.com/global/en/corona-information.html" target="_blank">
              <h1>What’s new</h1>
              <h2>Coronavirus and Measures at BASF</h2>
            </a>

            <p><strong>The novel coronavirus COVID-19 pandemic poses unprecedented challenges for all of us.
            </strong><br> The well-being of our employees and supplying our customers in the best possible way have the utmost priority for us.</p>

            <a href="https://www.basf.com/global/en/corona-information.html" target="_blank" class="external">Read More</a>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
</template>

<script>
  export default {
    name: 'Banner',

    data () {
      return {
        alignment: 'center',
        justify: 'center',
      }
    },

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

  .teaser-container {
    
    &.orange1 {
      border-color: #f49800;
    }
  }

  .search-container {
    height: 320px;
    overflow: hidden;
    position: relative;
    text-align: left;
    padding: 24px 30px 24px !important;
    background-color: #fff;
  }
</style>
