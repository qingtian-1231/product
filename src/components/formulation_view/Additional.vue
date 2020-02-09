<template>
  <v-card flat color="basil" id="additional">
    <div class="additional">
      <h2>下载</h2>
      <ul>
        <template v-for="(item, index) in formulationFiles">
          <li :key="index">
            <figure class="download document">
              <p>日常生活专用涂料。</p>
               <small>
                <span>{{ item.field_file_type.value }}<br></span>
                 <span><br></span>
                 <span>
                   {{ item.field_file_description.value }}<br>
                 </span>
              </small>
              <a target="_blank" :href="item.field_entity_file.value" class="btn btn-default">
                <v-icon large class="material-icons-outlined">book</v-icon>
              </a>
              <span>最新日期: {{ item.field_entity_file.changed }}</span>
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
      formulationFiles: {
        type: Object
      }
    },
    data () {
      return {
        productFile: [],
      }
    },

    mounted() {
      let vm = this

      vm.$store.dispatch('getProductFile', {
        relation: vm.productRelationFile
      }).then((result) => {
        vm.productFile = result

        console.log(vm.productFile, 'vm.productFile')
      })
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
            min-height: 320px;

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
