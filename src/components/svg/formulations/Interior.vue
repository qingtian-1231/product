<template>
  <i :class="`icon interior bgcolor ${bgColorClass}`" title="">
    <svg viewBox="0 0 32 32">
      <g transform="translate(5.000000, 5.000000)">
        <polygon points="2.875 11.5 2.875 23 20.125 23 20.125 11.5 23 11.5 11.5 0 0 11.5" vector-effect="non-scaling-stroke"></polygon>
        <path d="M11.5,9 C11.5,9 8,12.0433727 8,15.5216863 C8,17.4426503 9.56686359,19 11.5,19 C13.4331364,19 15,17.4426503 15,15.5216863 C15,12.0433727 11.5,9 11.5,9 Z" vector-effect="non-scaling-stroke"></path>
      </g>
    </svg>
  </i>
</template>
<script>
  export default {
    name: 'icon-Interior',
    props: {
      bgColorClass: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  i.interior {
    border-radius: 50%;
    display: block;
    height: 96px;
    left: 0;
    margin-left: -12px;
    margin-top: -12px;
    max-height: 96px;
    max-width: 96px;
    top: 0;
    width: 96px;

    &.bgcolor {

      &.default {
        background: linear-gradient(135deg,#004a96,#a6d0ba);
      }

      &.styrene-acrylics {
        background: linear-gradient(135deg,#004a96,#a6d0ba);
      }

      &.pure-acrylics {
        background: linear-gradient(135deg,#00793a,#98d4eb);
      }

      &.hybrid-technology {
        background: linear-gradient(135deg,#21a0d2,#a6c0da);
      }
    }

    svg {
      stroke: #fff;
      fill: none;
      left: 0;
      position: absolute;
      stroke-width: 1;
      top: 0;
    }
  }
</style>
