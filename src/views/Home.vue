<template>
  <div id="home">
    <carousel></carousel>

    <banner />

    <features />

    <middle-content />

    <contact-us />
  </div>
</template>

<script>

  export default {
    name: 'Home',

    components: {
      Carousel: () => import('@/components/home/Carousel'),
      Features: () => import('@/components/home/Features'),
      Banner: () => import('@/components/home/Banner'),
      MiddleContent: () => import('@/components/home/MiddleContent'),
      ContactUs: () => import('@/components/home/ContactUs')
    }
  }
</script>
