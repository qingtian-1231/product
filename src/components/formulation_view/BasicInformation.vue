<template>
  <v-card flat color="basil" id="basic-information">
    <div class="information">
      <h2 v-html="formulationBasic.description.value"></h2>

<!--      <p>-->
<!--        <span class="grey-2">-->
<!--        {{ formulationBasic.formulation_number.label }}-->
<!--        </span>-->
<!--        {{ formulationBasic.formulation_number.value }}-->
<!--      </p>-->
      <p>
        <span class="grey-2">
        {{ formulationBasic.industry.label }}
        </span>
        {{ formulationBasic.industry.value }}
      </p>
<!--      <p>-->
<!--        <span class="grey-2">-->
<!--        {{ formulationBasic.formulation_cluster.label }}-->
<!--        </span>-->
<!--        {{ formulationBasic.formulation_cluster.value }}-->
<!--      </p>-->
      <p>
        <span class="grey-2">
        {{ formulationBasic.benefits.label }}
        </span>
        <span v-html="formulationBasic.benefits.value" style="color: #333;">
          
        </span>
      </p>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'basic-information',
    props: {
      formulationBasic: {
        type: Object
      }
    },
    data () {
      return {

      }
    },

    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  #basic-information {

     p, ul {
      display: inline-block;
      margin: 0 0 25px;
      padding: 0;
      width: 100%;
    }

    .information {

      h2 {
        /*padding-bottom: 25px;*/
      }

      p {
        padding-bottom: 25px;
        border-bottom: 1px solid #eee;

        span {
          display: block;
          text-transform: capitalize;
          color: #aaa;
        }

        &:nth-child(2n) {
          @media screen and (min-width: 640px) {
            margin-right: 8px;
          }
        }

        &:last-of-type {
          margin-left: 0;
          margin-right: 0;
          width: 100%;
        }
        @media screen and (min-width: 640px) {
          width: calc(50% - 8px);
        }
      }

    }

    .app {

      p {
        margin-bottom: 15px;
      }

      ul {
        margin-left: -.555555%;

        @media screen and (min-width: 640px) {
          width: 101%;
        }

        li {
          display: table;
          border-radius: 16px;
          border: 1px solid #aaa;
          float: left;
          line-height: 0;
          height: 40px;
          margin: 5px .499999%;
          overflow: hidden;
          width: 100%;

          .v-btn {
            height: 38px;
            width: 100%;
            background-color: transparent;
            text-align: left;
            border-radius: 16px;
            transition: all .15s ease-in-out;
          }

          @media screen and (min-width: 640px) {
            width: 32%;
          }

          @media screen and (min-width: 1024px) {
            width: 24%;
          }
        }
      }
    }

    .countries {

      ul {
        margin-left: -1%;
        width: 100%;

        li {
          position: relative;
          display: inline-block;
          float: left;
          margin: 0 1%;
          width: 100%;

          span {
            font-size: 1em;

            &:last-child {
              font-size: 70%;
              max-height: 60px;
              overflow: hidden;
              overflow-y: auto;
              padding-right: 5px;
            }
          }

          @media screen and (min-width: 940px) {
            width: 48%;
            margin: 10px 1%;
          }
        }

        @media screen and (min-width: 940px) {
          margin-left: -1%;
          width: 102%;
        }
      }
    }
  }
</style>
