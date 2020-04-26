<template>
  <v-card flat color="basil" id="additional">
    <div class="additional">
      <span class="label">{{ $t('productView.download') }}</span>
      <ul>
        <template v-for="(item, index) in productRelationFile.value">
          <li :key="index">
            <figure class="download document">
              <p>{{ titleField.value }}</p>
              <p></p>
              <span>
                   {{ item.description }}。<br>
              </span>
              <p></p>
              <a target="_blank" :href="item.url" class="btn btn-default">
                <v-icon large class="material-icons-outlined">insert_drive_file</v-icon>
              </a>
              <span>日期: {{ item.changed }}</span>
            </figure>
          </li>
        </template>
      </ul>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'additional',
    props: {
      productRelationFile: {
        type: Object
      },

      titleField: {
        type: String
      }
    },
    data () {
      return {
        productFile: [],
      }
    },

    mounted() {
      console.log(this.productRelationFile, 'productRelationFile')
    }
  }
</script>

<style lang="scss" scoped>
  #additional {

    h2, p, ul {
      display: inline-block;
      margin: 0 0 25px;
      padding: 0;
      width: 100%;
    }

    .additional {

      ul {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-left: -1%;
        width: 100%;

        li {
          -webkit-box-flex: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          -ms-flex-preferred-size: 100%;
          flex-basis: 100%;
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          float: left;
          margin: 10px 1%;
          overflow: hidden;
          width: 100%;

          @media screen and (min-width: 640px) {
            -ms-flex-preferred-size: 48%;
            flex-basis: 48%;
            max-width: 48%;
          }

          @media screen and (min-width: 768px) {
            -ms-flex-preferred-size: 31.333333%;
            flex-basis: 31.333333%;
            max-width: 31.333333%;
          }

          @media screen and (min-width: 1024px) {
            -ms-flex-preferred-size: 23%;
            flex-basis: 23%;
            max-width: 23%;
          }

          .download {
            border: 1px solid #aaa;
            display: inline-block;
            height: auto;
            margin: 0;
            padding: 6% 7% 18%;
            position: relative;
            width: 100%;

            p {
              margin: 0;

              &:first-of-type {
                margin-top: 10px!important;
              }
            }

            .btn {
              background: transparent;
              border: none;
              display: block;
              overflow: hidden;
              margin: auto;
              text-align: center;
              width: 62px;
              height: 80px;
            }
          }
        }
      }
    }
  }
</style>
