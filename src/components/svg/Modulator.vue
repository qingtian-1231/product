<template>
  <i class="icon modulator v-icon" title="">
    <svg viewBox="0 0 48 48">
      <g transform="translate(14.000000, 13.000000)">
        <path d="M0,2.85185185 L13.75,2.85185185" vector-effect="non-scaling-stroke"></path>
        <path d="M19.25,2.85185185 L22,2.85185185" vector-effect="non-scaling-stroke"></path>
        <path d="M13.75,2.88580247 C13.75,1.36725247 14.981175,0.135802469 16.5,0.135802469 C18.018825,0.135802469 19.25,1.36725247 19.25,2.88580247 C19.25,4.40435247 18.018825,5.63580247 16.5,5.63580247 C14.981175,5.63580247 13.75,4.40435247 13.75,2.88580247 Z" vector-effect="non-scaling-stroke"></path>
        <path d="M22,11 L8.25,11" vector-effect="non-scaling-stroke"></path>
        <path d="M8.25,19.1481481 L0,19.1481481" vector-effect="non-scaling-stroke"></path>
        <path d="M22,19.1481481 L13.75,19.1481481" vector-effect="non-scaling-stroke"></path>
        <path d="M2.75,11 L0,11" vector-effect="non-scaling-stroke"></path>
        <path d="M8.25,11 C8.25,12.4998025 7.018825,13.7160494 5.5,13.7160494 C3.981175,13.7160494 2.75,12.4998025 2.75,11 C2.75,9.50019753 3.981175,8.28395062 5.5,8.28395062 C7.018825,8.28395062 8.25,9.50019753 8.25,11 Z" vector-effect="non-scaling-stroke"></path>
        <path d="M13.75,19.1481481 C13.75,20.6479506 12.518825,21.8641975 11,21.8641975 C9.481175,21.8641975 8.25,20.6479506 8.25,19.1481481 C8.25,17.6483457 9.481175,16.4320988 11,16.4320988 C12.518825,16.4320988 13.75,17.6483457 13.75,19.1481481 Z" vector-effect="non-scaling-stroke"></path>
      </g>
    </svg>
  </i>
</template>
<script>
  export default {
    name: "icon-modulator",
    props: {
      bgColorClass: {
        type: String,
        required: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  i.modulator {
    width: 45px !important;
    height: 45px !important;

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
