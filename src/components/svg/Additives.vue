<template>
  <i :class="`icon additives bgcolor ${bgColorClass}`" title="Additives: Defoamers"
    ><svg viewBox="0 0 32 32">
      <g transform="translate(9.000000, 6.000000)">
        <path
          d="M7.53738839,0 C7.53738839,0 -1.16351373e-13,5.79869131 -1.16351373e-13,12.4257671 C-1.16351373e-13,16.0859011 3.37448878,19.0528429 7.53738839,19.0528429 C11.700288,19.0528429 15.0747768,16.0859011 15.0747768,12.4257671 C15.0747768,5.79869131 7.53738839,0 7.53738839,0 Z"
          vector-effect="non-scaling-stroke"
        ></path>
        <path
          d="M7.58638393,8.88888889 L7.58638393,14.7513021"
          vector-effect="non-scaling-stroke"
        ></path>
        <path
          d="M4.57142857,11.8200955 L10.6013393,11.8200955"
          vector-effect="non-scaling-stroke"
        ></path>
      </g></svg
  ></i>
</template>
<script>
export default {
  name: "icon-additives",
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
  margin-left: -12px;
  margin-top: -12px;
  max-height: 96px;
  max-width: 96px;
  position: absolute;
  top: 0;
  width: 96px;

  &.bgcolor {

    &.default {
      background: linear-gradient(135deg,#c50022,#facf8c);
    }

    &.defoamers {
      background: linear-gradient(135deg,#c50022,#facf8c);
    }

    &.wetting-agents {
      background: linear-gradient(135deg,#f39500,#bada9a);
    }

    &.film-forming-agents {
      background: linear-gradient(135deg,#65ac1e,#facf8c);
    }

    &.rheology-modifiers {
      background: linear-gradient(135deg,#c50022,#bada9a);
    }

    &.dispersing-agents {
      background: linear-gradient(135deg,#f39500,#eba6b2);
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
