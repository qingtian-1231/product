<template>
  <ul class="children-sub-menu">
    <li
      v-for="(item, index) in below"
      :key="index"
    >
      <template v-if="item.vid === 'applacation'">
        <router-link  :to="{path: '/industry', query: {industry: item.tid}}">
          {{ item.name }}
        </router-link>
      </template>

      <template v-else>
        <router-link  :to="{path: '/products', query: {product_type: item.tid}}">
          {{ item.name }}
        </router-link>
      </template>

      <template v-if="item.children.length">
        <span class="icon-children glyphicon glyphicon-play">
        <v-icon>play_arrow</v-icon>
      </span>
        <mobile-sub-menu :below="item.children"></mobile-sub-menu>
      </template>
    </li>
  </ul>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'mobile-sub-menu',

    props: {
      below: {
        type: Object,
      }
    },

    mounted () {
      $('.icon-children').each(function (index, item) {
        $(item).click(function () {
          $(this).next('children-sub-menu').toggle()
        })
      })
    },
  }
</script>
<style lang="scss" scoped>
  ul {
    padding: 15px 10px;
    margin: 0;
    list-style: none;

    li {
      padding: 0;
      list-style: none;
      height: auto;
      border-bottom: solid 1px white;
      width: 300px;
      cursor: pointer;
      margin: 5px 0;

      &:hover {
        background-color: #f1f1f1;

        & > ul {
          left: 300px;
          top: 0;
          display: block;
          height: auto;
          background-color: #fff;
        }
      }

      a {
        padding: 5px 15px;
        color: #3F3F3F !important;
        display: inline-block;
        text-decoration: none;
        text-transform: none !important;
        font-size: 14px !important;
        max-width: 290px;

        &:hover {
          color: #028fd2 !important;
        }
      }

      span {
        position: relative;
        display: inline-block;
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #028fd2;
        font-size: 7px;
        vertical-align: baseline;
        float: right;
        right: 12px;
        top: 2px;

        i {
          color: #028fd2 !important;
        }
      }

      & > ul {
        position: absolute;
        display: none;
        height: 100% !important;
        padding: 15px 10px;
        margin: 0;
        list-style: none;

        @media screen and (max-width: 480px) {
          position: static;
        }
      }
    }
  }
</style>
