<template>
  <i :class="`icon dispersions bgcolor ${bgColorClass}`" title="Dispersions: Styrene acrylics">
    <svgicon name="features-2" width="100" height="100"></svgicon>
  </i>
</template>
<script>
  export default {
    name: 'icon-features-2',
    props: {
      bgColorClass: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  i.dispersions {
    border-radius: 50%;
    display: block;
    height: 96px;
    left: 0;
    margin-left: -13px;
    margin-top: -3px;
    max-height: 96px;
    max-width: 96px;
    position: absolute;
    top: 0;
    width: 96px;

    &.bgcolor {

      &.default {
        /*background: linear-gradient(135deg,#004a96,#a6d0ba);*/
      }

      &.styrene-acrylics {
        /*background: linear-gradient(135deg,#004a96,#a6d0ba);*/
      }

      &.pure-acrylics {
        /*background: linear-gradient(135deg,#00793a,#98d4eb);*/
      }

      &.hybrid-technology {
        /*background: linear-gradient(135deg,#21a0d2,#a6c0da);*/
      }
    }

    svg {
      stroke: rgba(0, 0, 0, 0.1);
      fill: #d64043;
      left: 0;
      position: absolute;
      stroke-width: 1;
      top: 0;
    }
  }
</style>
