<template>
  <i :class="`icon colorants bgcolor ${bgColorClass}`" title="">
    <svg viewBox="0 0 32 32">
      <g transform="translate(4.000000, 4.000000)">
        <path d="M7.86477273,20.8260114 L0.460454545,8.98715429 C-0.205,7.92315429 0.116136364,6.50486857 1.17431818,5.83538286 L3.24295455,4.52681143" vector-effect="non-scaling-stroke"></path>
        <path d="M7.91670455,20.67312 L3.26647727,5.80637714 C2.89147727,4.60706286 3.56011364,3.31723429 4.75261364,2.94009143 L7.96715909,1.92317714" vector-effect="non-scaling-stroke"></path>
        <path d="M17.0077273,20.9894171 L24.5140909,8.98713143 C25.1795455,7.92313143 24.8584091,6.50484571 23.8002273,5.83536 L21.7315909,4.52701714" vector-effect="non-scaling-stroke"></path>
        <path d="M17.058,20.67312 L21.708,5.80637714 C22.0832273,4.60706286 21.4143636,3.31723429 20.2220909,2.94009143 L17.0075455,1.92317714" vector-effect="non-scaling-stroke"></path>
        <path d="M14.7347955,23.872 L10.1893409,23.872 C8.93934091,23.872 7.91661364,22.8434286 7.91661364,21.5862857 L7.91661364,2.4 C7.91661364,1.14285714 8.93934091,0.114285714 10.1893409,0.114285714 L14.7347955,0.114285714 C15.9847955,0.114285714 17.0075227,1.14285714 17.0075227,2.4 L17.0075227,21.5862857 C17.0075227,22.8434286 15.9847955,23.872 14.7347955,23.872 Z" vector-effect="non-scaling-stroke"></path>
        <path d="M11.0932045,20.4434286 C11.0932045,19.6832 11.7061591,19.0669714 12.4620682,19.0669714 C13.2179773,19.0669714 13.8309318,19.6832 13.8309318,20.4434286 C13.8309318,21.2036571 13.2179773,21.8198857 12.4620682,21.8198857 C11.7061591,21.8198857 11.0932045,21.2036571 11.0932045,20.4434286 Z" vector-effect="non-scaling-stroke"></path>
      </g>
    </svg>
  </i>
</template>
<script>
  export default {
    name: 'icon-colorants',
    props: {
      bgColorClass: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  i.colorants {
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
        background: linear-gradient(135deg,#0a4a96,#c50022);
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
