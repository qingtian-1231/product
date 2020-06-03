<template>
  <span class="icon-container">
    <i
      :class="`icon bgcolor ${bgColorClass}`"
      title="Additives: Defoamers"
      v-if="iconName == 13"
    >
      <svgicon name="features-1" :width="width" :height="height"></svgicon>
    </i>

    <i
      :class="`icon dispersions bgcolor ${bgColorClass}`"
      title="Dispersions: Styrene acrylics"
      v-else-if="iconName == 14"
    >
      <svgicon name="features-2" :width="width" :height="height"></svgicon>
    </i>

    <i
      :class="`icon bgcolor ${bgColorClass}`"
      title="Dispersions: Styrene acrylics"
      v-else-if="iconName == 15"
    >
      <svgicon name="features-3" :width="width" :height="height"></svgicon>
    </i>

    <i
      :class="`icon bgcolor ${bgColorClass}`"
      title="Dispersions: Styrene acrylics"
      v-else
    >
      <svgicon name="features-4" :width="width" :height="height"></svgicon>
    </i>
  </span>
</template>

<script>
  export default {
    name: 'icon',

    props: {
      iconName: {
        type: String
      },
      width: {
        type: String,
        required: true
      },
      height: {
        type: String,
        required: true
      },
      bgColorClass: {
        type: String,
        default: 'default',
        required: false
      }
    },

    mounted() {
      // console.log(this.iconName, 'iconName')
    }
  }
</script>

<style lang="scss" scoped>
  i.icon {
    display: contents;
    height: 96px;
    left: 0;
    max-height: 96px;
    max-width: 96px;
    position: absolute;
    top: 0;
    width: 96px;

    &.bgcolor {

      svg {
        stroke: rgba(0, 0, 0, 0.1);
        fill: #d64043;
        left: 0;
        position: absolute;
        stroke-width: 1;
        top: 0;
      }

      &.Dispex {

        svg {
          fill: #004a96;
        }
      }

      &.Acronal {

        svg {
          fill: #47c797;
        }
      }

      &.Basonat {

        svg {
          fill: #239187;
        }
      }

      &.Attagel {

        svg {
          fill: #21a0d2;
        }
      }

      &.Efka {

        svg {
          fill: #F44336;
        }
      }

      &.Foamaster {

        svg {
          fill: #E91E63;
        }
      }

      &.FoamStar {

        svg {
          fill: #9C27B0;
        }
      }

      &.Hydropalat {

        svg {
          fill: #673AB7;
        }
      }

      &.Irgafos {

        svg {
          fill: #3F51B5;
        }
      }

      &.Irganox {

        svg {
          fill: #2196F3;
        }
      }

      &.Joncryl {

        svg {
          fill: #03A9F4;
        }
      }

      &.Laroflex {

        svg {
          fill: #00BCD4;
        }
      }

      &.Laromer {

        svg {
          fill: #009688;
        }
      }

      &.Laropal {

        svg {
          fill: #4CAF50;
        }
      }

      &.Larotact {

        svg {
          fill: #8BC34A;
        }
      }

      &.Lignostab {

        svg {
          fill: #CDDC39;
        }
      }

      &.Loxanol {

        svg {
          fill: #FFEB3B;
        }
      }

      &.Luhydran {

        svg {
          fill: #FFC107;
        }
      }

      &.Lutonal {

        svg {
          fill: #FF9800;
        }
      }

      &.Luwipal {

        svg {
          fill: #FF5722;
        }
      }

      &.Rheovis {

        svg {
          fill: #795548;
        }
      }

      &.Solvermol {

        svg {
          fill: #9E9E9E;
        }
      }

      &.Tinopal {

        svg {
          fill: #607D8B;
        }
      }

      &.Tunuvin {

        svg {
          fill: #21a0d2;
        }
      }

      &.Versamid {

        svg {
          fill: #21a0d2;
        }
      }
    }
  }
</style>
