<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="auto"
      width="100%"
      contain
      :src="require('@/assets/home/keyvisual_homepage_mega.jpg')"
      :srcset="require('@/assets/home/keyvisual_homepage_tiny.jpg') + ' 480w,'
      + require('@/assets/home/keyvisual_homepage_small.jpg') + ' 640w,'
      + require('@/assets/home/keyvisual_homepage_medium.jpg') + ' 768w,'
      + require('@/assets/home/keyvisual_homepage_big.jpg') + ' 1024w,'
      + require('@/assets/home/keyvisual_homepage_mega.jpg') + ' 1600w'"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md12
        >
          <search></search>
        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>

<script>
  export default {
    name: 'Banner',

    components: {
      Search: () => import('@/components/home/Search')
    }
  }
</script>
