<template>
  <div class="filter-bar">
    <v-btn icon dark>
      <v-icon color="black">filter_list</v-icon>
    </v-btn>
    <div class="filter-bar-title">
      <h2>Filter {{title}}</h2>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'filter-bar',
    props: ['title']
  }
</script>
<style lang="scss" scoped>
.filter-bar {
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -o-transition: all .3s;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  opacity: 1;
  overflow: hidden;
  position: absolute;
  top: 144px;
  transition: all .3s;
  width: 100%;
  z-index: 2;

  button {
    background: none;
    border: none;
    border: 0 solid rgba(0,0,0,.1);
    height: 40px;
    position: absolute;
    right: 10px;
    top: 12px;
    transition: all .3s;
    width: 40px;
    z-index: 2;
  }

  .filter-bar-title {
    display: block;
    line-height: 64px;
    margin: 0;
    min-height: 64px;
    opacity: 1;
    padding: 0;
    position: relative;
    text-align: center;
    transition: all .3s;
    width: 100%;
  }
}
</style>
