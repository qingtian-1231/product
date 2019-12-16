<template>
  <i :class="`icon dispersions bgcolor ${bgColorClass}`" title="Dispersions: Styrene acrylics">
    <svg viewBox="0 0 32 32">
      <g transform="translate(8.000000, 8.000000)">
        <path d="M10.5538364,6.56892727 C10.7847455,7.5462 10.1794727,8.52565455 9.2022,8.75638182 C8.22492727,8.98729091 7.24565455,8.3822 7.01474545,7.40492727 C6.78401818,6.42765455 7.38910909,5.44838182 8.36638182,5.21747273 C9.34365455,4.98656364 10.3229273,5.59165455 10.5538364,6.56892727" vector-effect="non-scaling-stroke"></path>
        <path d="M15.4015455,0.753236364 C16.0900909,1.48414545 16.0555455,2.63487273 15.3248182,3.32341818 C14.5937273,4.01196364 13.443,3.9776 12.7546364,3.24669091 C12.0660909,2.51578182 12.1002727,1.36505455 12.8311818,0.676509091 C13.5622727,-0.0120363636 14.713,0.0223272727 15.4015455,0.753236364 Z" vector-effect="non-scaling-stroke"></path>
        <path d="M1.29583636,6.63727273 C0.3342,6.34854545 -0.211436364,5.33490909 0.0772909091,4.37327273 C0.366018182,3.41145455 1.37965455,2.86581818 2.34147273,3.15454545 C3.30310909,3.44327273 3.84874545,4.45690909 3.56001818,5.41872727 C3.27129091,6.38036364 2.25765455,6.926 1.29583636,6.63727273" vector-effect="non-scaling-stroke"></path>
        <path d="M12.2257091,13.6468727 C12.4566182,14.6241455 11.8515273,15.6036 10.8742545,15.8343273 C9.89698182,16.0652364 8.91770909,15.4601455 8.6868,14.4828727 C8.45607273,13.5056 9.06116364,12.5263273 10.0382545,12.2952364 C11.0155273,12.0645091 11.9948,12.6696 12.2257091,13.6468727" vector-effect="non-scaling-stroke"></path>
        <path d="M7.0135498,6.4609375 L3.66088867,5.44763184" vector-effect="non-scaling-stroke"></path>
        <path d="M12.7386475,3.30810547 L10.1055908,5.66992188" vector-effect="non-scaling-stroke"></path>
        <path d="M9.95410156,12.288208 L9.17114258,8.80273438" vector-effect="non-scaling-stroke"></path>
      </g>
    </svg>
  </i>
</template>
<script>
  export default {
    name: 'icon-dispersions',
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
    margin-left: -12px;
    margin-top: -12px;
    max-height: 96px;
    max-width: 96px;
    position: absolute;
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
