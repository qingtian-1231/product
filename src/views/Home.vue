<template>
  <div id="home">
    <banner />

    <features />

    <middle-content />
  </div>
</template>

<script>

  export default {
    name: 'Home',

    components: {
      Features: () => import('@/components/home/Features'),
      Banner: () => import('@/components/home/Banner'),
      MiddleContent: () => import('@/components/home/MiddleContent')
    }
  }
</script>
