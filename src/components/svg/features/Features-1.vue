<template>
  <i :class="`icon additives bgcolor ${bgColorClass}`" title="Additives: Defoamers">
    <svgicon name="features-1" width="100" height="100"></svgicon>
  </i>
</template>
<script>
  export default {
    name: "icon-features-1",
    props: {
      bgColorClass: {
        type: String,
        required: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  i.additives {
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
        /*background: linear-gradient(135deg,#c50022,#facf8c);*/
      }

      &.defoamers {
        /*background: linear-gradient(135deg,#c50022,#facf8c);*/
      }

      &.wetting-agents {
        /*background: linear-gradient(135deg,#f39500,#bada9a);*/
      }

      &.film-forming-agents {
        /*background: linear-gradient(135deg,#65ac1e,#facf8c);*/
      }

      &.rheology-modifiers {
        /*background: linear-gradient(135deg,#c50022,#bada9a);*/
      }

      &.dispersing-agents {
        /*background: linear-gradient(135deg,#f39500,#eba6b2);*/
      }
    }

    svg {
      stroke: rgba(0, 0, 0, 0.1);
      fill: #47c797;
      left: 0;
      position: absolute;
      stroke-width: 1;
      top: 0;
    }
  }
</style>
