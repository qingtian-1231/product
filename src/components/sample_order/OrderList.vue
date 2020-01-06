<template>
  <div class="order">
    <h2>
      Sample Order
      <v-btn icon>
        <v-icon>edit</v-icon>
      </v-btn>
    </h2>

    <ul>
      <li>
        <div class="item added product disabled">
                      <span>
                        <a href="">
                          <icon-dispersions bg-color-class="styrene-acrylics"></icon-dispersions>
                          <b>AQACell® HIDE 6299</b>
                        </a>
                        <div class="select small closed">
                          <ul><li><span><small>1000ml</small></span></li><li><small>5000ml</small></li></ul>
                          <div><span><small>1000ml</small></span></div>
                          <v-icon>expand_more</v-icon>
                          <input type="hidden" name="-" value="1000">
                        </div>
                      </span>
          <span>
                        <v-btn icon>
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </span>
        </div>
      </li>
      <li>
        <div class="item added product disabled">
                      <span>
                        <a href="">
                          <icon-dispersions bg-color-class="styrene-acrylics"></icon-dispersions>
                          <b>AQACell® HIDE 6299</b>
                        </a>
                        <div class="select small closed">
                          <ul><li><span><small>1000ml</small></span></li><li><small>5000ml</small></li></ul>
                          <div><span><small>1000ml</small></span></div>
                          <v-icon>expand_more</v-icon>
                          <input type="hidden" name="-" value="1000">
                        </div>
                      </span>
          <span>
                        <v-btn icon>
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </span>
        </div>
      </li>
      <li>
        <div class="item added product disabled">
                      <span>
                        <a href="">
                          <icon-dispersions bg-color-class="styrene-acrylics"></icon-dispersions>
                          <b>AQACell® HIDE 6299</b>
                        </a>
                        <div class="select small closed">
                          <ul><li><span><small>1000ml</small></span></li><li><small>5000ml</small></li></ul>
                          <div><span><small>1000ml</small></span></div>
                          <v-icon>expand_more</v-icon>
                          <input type="hidden" name="-" value="1000">
                        </div>
                      </span>
          <span>
                        <v-btn icon>
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </span>
        </div>
      </li>
      <li>
        <div class="item added product disabled">
                      <span>
                        <a href="">
                          <icon-dispersions bg-color-class="styrene-acrylics"></icon-dispersions>
                          <b>AQACell® HIDE 6299</b>
                        </a>
                        <div class="select small closed">
                          <ul><li><span><small>1000ml</small></span></li><li><small>5000ml</small></li></ul>
                          <div><span><small>1000ml</small></span></div>
                          <v-icon>expand_more</v-icon>
                          <input type="hidden" name="-" value="1000">
                        </div>
                      </span>
          <span>
                        <v-btn icon>
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import IconDispersions from '../../components/svg/Dispersions'

  export default {
    name: 'order-list',
    components: { IconDispersions },
    data () {
      return {

      }
    }

  }
</script>

<style scoped lang="scss">
  .order {

    h2 {
      border-bottom: 1px solid #333;
      position: relative;
      line-height: 48px;
      text-align: left;

      button {
        background: none;
        border: none;
        float: right;
        height: 48px;
        width: 48px;
      }
    }

    ul > li {
      list-style-type: none;

      .item.added {
        animation: .4s ease-out 0s 1 rotateX;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        display: inline-block;
        float: left;
        padding: 20px 0;
        position: relative;
        width: 100%;

        span {
          font-size: 1em;
          float: left;
          height: auto;
          overflow: visible;

          & > a {
            float: left;
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            text-align: left;

            & > .icon {
              height: 32px;
              margin-right: 20px;
              width: 32px;
              position: relative;
              float: none;
              line-height: normal;
              display: inline-block;
              vertical-align: middle;
              margin-left: 0;
              margin-top: 0;
            }
          }

          & > .select {
            min-width: 75px;
            margin: 0;
            position: absolute;
            right: 0;
          }

          &:first-child {
            width: 84%;
          }

          &:last-child {
            float: right;
            overflow: hidden;
            text-align: right;
            width: auto;
          }
        }
      }
    }
  }
</style>
