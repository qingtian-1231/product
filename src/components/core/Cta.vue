<template>
  <v-btn
    fab
    fixed
    bottom
    right
    color="secondary"
    @click="scrollTop"
    target="_blank"
    rel="noopener"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>
<script>
  export default {
    name: 'cta',
    methods: {
      scrollTop: function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }
</script>
