<template>
  <div id="home">
    <banner />

    <features />

    <middle-content />

    <social />
  </div>
</template>

<script>
  export default {
    name: 'Home',

    components: {
      Features: () => import('@/components/home/Features'),
      Banner: () => import('@/components/home/Banner'),
      Social: () => import('@/components/home/Social'),
      MiddleContent: () => import('@/components/home/MiddleContent')
    }
  }
</script>
