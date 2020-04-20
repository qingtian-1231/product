<template>
  <v-container id="home-search" tag="section">
    <div class="search-content">
      <v-text-field
        @keyup="search()"
        :autofocus="searchFocus"
        @click:clear="clearSearchResult()"
        v-model="searchKeyWord"
        background-color="white"
        loader-height="5"
        :loading="searchLoading"
        light
        outlined
        filled
        :label="$t('home.search.search')"
        append-icon="search"
        clear-icon="mdi-close-circle"
        clearable
      >
      </v-text-field>
      <ul class="search-result">
        <template v-for="(result, index) in searchResult">
          <li :key="index">
            <div class="item listed product result">
              <span>
                <template v-if="result.type === 'product'">
                  <router-link :to="{name: 'Product', params: {id: result.uuid}}">
                  {{ result.title }}
                </router-link>
                </template>

                <template v-else>
                  <router-link :to="{name: 'Formulation', params: {id: result.uuid}}">
                  {{ result.title }}
                </router-link>
                </template>

                <small>
                  - {{ result.type }}
                </small>
              </span>
              <span></span>
            </div>
          </li>
        </template>
      </ul>

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
        max-width="400"
      >
        <template v-slot:activator="{ on }">
          <v-btn fab large v-on="on">
            <icon-modulator bg-color-class="default"></icon-modulator>
          </v-btn>
        </template>

        <v-card id="minibasket" class="basket mini open">
          <div>
            <h2>
              <v-icon>menu</v-icon>
              {{ $t('home.search.brand') }}
              <v-btn icon @click="filterProduct = false">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </h2>
            <ul>
              <template v-for="(productType, index) in taxonomyProductBrand">
                <li :key="index">
                  <router-link :to="{path: '/products', query: {product_brand: productType.tid}}">
                    <div class="item added product">
                  <span>
                    <v-icon>radio_button_checked</v-icon>
                  </span>
                      <span>
                    {{ productType.name }}
                  </span>
                    </div>
                  </router-link>
                </li>
              </template>
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
      <v-btn flat @click="snackbar = false">
        {{ $t('global.close') }}
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import IconModulator from "../../components/svg/Modulator";
import { debounce } from '../../utils/globalUtils'
import { mapState } from "vuex";

export default {
  components: { IconModulator },

  computed: {
    ...mapState({
      searchResult: state => state.search.searchResult,
      searchFocus: state => state.search.searchFocus,
      taxonomyProductBrand: state => state.core.taxonomyProductBrand
    })
  },

  data() {
    return {
      searchLoading: false,
      filterProduct: false,
      searchKeyWord: ""
    };
  },

  mounted () {
    this.clearSearchResult()
  },

  methods: {
    debounceSearch: debounce(({ vm }) => {
      if (vm.searchKeyWord) {
        vm.searchLoading = true
        vm.$store.dispatch('productSearch', vm.searchKeyWord).then(result => {
          vm.searchLoading = false
        });
      } else {
        vm.clearSearchResult()
      }
    }, 300),

    search() {
      let vm = this
      vm.debounceSearch({ vm })
    },

    clearSearchResult() {
      this.$store.commit('clearSearchResult')
    }
  }
};
</script>

<style lang="scss" scoped>
#home-search {
  left: 0;
  margin-left: 0;
  max-width: 100%;
  padding: 0 8px;
  //position: absolute;
  transition: all 0.4s ease-in-out;
  top: 10%;
  width: 100%;
  z-index: 2;

  .search-content {
    position: relative;
    display: flex;
    margin: 0 auto;

    .search-result {
      position: absolute;
      background: #fff;
      border-radius: 0;
      box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.25);
      height: auto;
      max-height: 200px;
      margin: 0;
      overflow-y: auto;
      padding: 0;
      right: 0;
      text-align: center;
      top: 60px;
      width: 100%;
      transition: all 0.3s;

      li {
        text-align: left;
        padding: 0 10%;
      }
    }

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
        border-radius: 100%;
        top: 0px;
        left: 0px;
        -webkit-animation: filterButtonPulse 4s ease-out 6s infinite;
        animation: filterButtonPulse 4s ease-out 6s infinite;
        z-index: -1;
      }

      @keyframes filterButtonPulse {
        12.5% {
          height: 64px;
          width: 64px;
          opacity: 1;
          top: 0;
          left: 0;
        }
        25% {
          height: 90px;
          width: 90px;
          opacity: 0.2;
          top: -13px;
          left: -13px;
        }
        37.5% {
          height: 64px;
          width: 64px;
          opacity: 1;
          top: 0;
          left: 0;
        }
        50% {
          height: 90px;
          width: 90px;
          opacity: 0.2;
          top: -13px;
          left: -13px;
        }
        62.5% {
          height: 64px;
          width: 64px;
          opacity: 1;
          top: 0;
          left: 0;
        }
        to {
          height: 64px;
          width: 64px;
          opacity: 1;
          top: 0;
          left: 0;
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
    top: 5%;
  }

  @media screen and (min-width: 996px) {
    left: 0;
    width: 100%;
    top: 120px;
    position: absolute;
    padding: 30px;
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

      li {
        width: 50%;
        float: left;
      }
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
