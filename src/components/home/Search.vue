<template>
  <v-container
    id="home-search"
    tag="section"
  >
    <div class="search-content">
      <v-autocomplete
        :loading="isLoading"
        :items="items"
        :search-input.sync="search"
        light
        v-model="select"
        append-icon="search"
        cache-items="false"
        clearable
        class="mx-1"
        flat
        hide-no-data
        hide-details
        label="搜索"
        item-text="name"
        item-value="id"
        return-object
        return-masked-value
        solo
        @keyup.enter.native="listenEnterKeyBoard()"
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>Cryptocurrency</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left>mdi-coin</v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="headline font-weight-light white--text"
          >
            {{ item.name.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>

      <v-menu
        v-model="filterProduct"
        :close-on-content-click="false"
        bottom
        right
        :nudge-width="200"
        origin="left top"
        offset-x
        offset-overflow
        transition="scale-transition"
        class="mx-2"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            large
            color="primary"
            v-on="on"
          >
            <icon-modulator bg-color-class="default"></icon-modulator>
          </v-btn>
        </template>

        <v-card id="minibasket" class="basket mini open">
          <div>
            <h2>
              <v-icon>menu</v-icon>
              产品过滤
              <v-btn icon @click="filterProduct = false">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </h2>
            <ul>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Construction
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Auxilliary
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Printing
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Ink
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Packaging
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Adhesives
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Furniture
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Automobile
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Battery
                  </span>
                </div>
              </li>
              <li>
                <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                  <span>
                    Composites
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </v-card>
      </v-menu>
    </div>

    <v-snackbar
      v-model="snackbar"
      :bottom="false"
      :left="false"
      :multi-line="true"
      :right="true"
      :timeout="2000"
      :top="true"
      :vertical="false"
      color="primary"
    >
      {{ text }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import IconModulator from '../../components/svg/Modulator'

  export default {
    components: { IconModulator },

    data () {
      return {
        filterProduct: false,
        e2: 'Test',
        states: [
          '涂料',
          '建筑',
          '纺织及纤维',
          '助剂',
          '印刷',
          '油墨',
          '包装',
          '胶黏剂',
          '家具',
          '汽车',
          '电池',
          '符合材料',
        ],
        isLoading: false,
        items: [],
        model: null,
        search: null,
        tab: null,
      }
    },

    watch: {
      model (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search () {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        setTimeout(() => {
          // Lazily load input items
          fetch('https://api.coinmarketcap.com/v2/listings/')
            .then(res => res.json())
            .then(res => {
              this.items = res.data
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
        }, 1000)
      },
    },
  }
</script>

<style lang="scss" scoped>
  #home-search {
    left: 0;
    margin-left: 0;
    max-width: 100%;
    padding: 0 8px;
    position: absolute;
    transition: all .4s ease-in-out;
    top: 10%;
    width: 100%;
    z-index: 2;

    .search-content {
      display: flex;
      width: 30%;
      margin: 0 auto;

      .v-input__control {
        min-height: 48px;

        & > .v-input__slot {
          min-height: 48px;
        }
      }

      .v-icon {
        color: #333;
      }

      .v-select__selections {
        color: #333;
      }

      & > div {

        &:first-child {
          flex: 2;
        }

        &:last-child {
          flex: 1;
        }
      }

      .v-size--large {
        top: -8px;
        left: 20px;

        &:after {
          content: " ";
          display: block;
          position: absolute;
          height: 64px;
          width: 64px;
          background:rgb(2, 143, 210);
          border-radius: 100%;
          top: 0px;
          left: 0px;
          -webkit-animation: filterButtonPulse 4s ease-out 6s infinite;
          animation: filterButtonPulse 4s ease-out 6s infinite;
          z-index: -1;
        }

        @keyframes filterButtonPulse{
          12.5%{
            height:64px;
            width:64px;
            opacity:1;
            top:0;
            left:0;
          }
          25%{
            height:90px;
            width:90px;
            opacity:.2;
            top:-13px;
            left:-13px
          }
          37.5%{
            height:64px;
            width:64px;
            opacity:1;
            top:0;
            left:0;
          }
          50%{
            height:90px;
            width:90px;
            opacity:.2;
            top:-13px;
            left:-13px
          }
          62.5%{
            height:64px;
            width:64px;
            opacity:1;
            top:0;
            left:0;
          }
          to{
            height:64px;
            width:64px;
            opacity:1;
            top:0;
            left:0;
          }
        }

        @media screen and (max-width: 640px) {
          left: 10px;
        }
      }
    }

    @media screen and (min-width: 500px) {
      left: 0;
      padding: 0;
      width: 100%;
    }

    @media screen and (max-width: 640px) {
      width: 100%;
      top: 5%;
    }
  }

  #minibasket {

    h2 {
      text-align: center;
    }

    & > div {

      & > ul {
        display: inline-block;
      }
    }

    .item {

      &.added {

        & > span {

          &:first-child {
            width: auto;
            padding-right: 40px;
          }

          &:last-child {
            float: none;
          }
        }
      }
    }
  }
</style>
