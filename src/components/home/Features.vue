<template>
  <v-container
    id="features"
    tag="section"
    class="bounceUp-enter-active"
  >
    <v-row dense>
      <v-col cols="12" md="3" class="features-card">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="mx-auto features-product"
            max-width="400"
            :elevation="hover ? 18 : 2"
          >
            <v-card-title>
              <icon-features1 width="100" height="100"></icon-features1>
              <span class="title font-weight-light"><samll>Product <br> Highlight</samll></span>
            </v-card-title>

            <v-card-actions class="title-name">
              <v-list-item class="grow">
                <h1>
                  <a href="/product/0000000">
                    Acronal® 6292<v-icon>keyboard_arrow_right</v-icon>
                  </a>
                </h1>
              </v-list-item>
            </v-card-actions>

            <v-card-text class="subtitle-1 font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>


      <v-col cols="12" sm="3" class="features-card">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="mx-auto features-product"
            :elevation="hover ? 18 : 2"
            max-width="400"
          >
            <v-card-title>
              <icon-features2 width="100" height="100"></icon-features2>
              <span class="title font-weight-light"><samll>Product <br> Highlight</samll></span>
            </v-card-title>

            <v-card-actions class="title-name">
              <v-list-item class="grow">
                <h1>
                  <a href="/product/0000000">
                    Acronal® 6292<v-icon>keyboard_arrow_right</v-icon>
                  </a>
                </h1>
              </v-list-item>
            </v-card-actions>

            <v-card-text class="subtitle-1 font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

          </v-card>
        </v-hover>
      </v-col>


      <v-col cols="12" sm="3" class="features-card">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="mx-auto features-product"
            :elevation="hover ? 18 : 2"
            max-width="400"
          >
            <v-card-title>
              <icon-features3 width="100" height="100"></icon-features3>
              <span class="title font-weight-light"><samll>Product <br> Highlight</samll></span>
            </v-card-title>

            <v-card-actions class="title-name">
              <v-list-item class="grow">
                <h1>
                  <a href="/product/0000000">
                    Acronal® 6292<v-icon>keyboard_arrow_right</v-icon>
                  </a>
                </h1>
              </v-list-item>
            </v-card-actions>

            <v-card-text class="subtitle-1 font-weight-bold">
              "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

          </v-card>
        </v-hover>
      </v-col>


      <v-col cols="12" sm="3" class="features-card">
        <v-hover v-slot:default="{ hover }">
          <v-card
          class="mx-auto features-product"
          :elevation="hover ? 18 : 2"
          max-width="400"
        >
          <v-card-title>
            <icon-features4 width="100" height="100"></icon-features4>
            <span class="title font-weight-light"><samll>Product <br> Highlight</samll></span>
          </v-card-title>

          <v-card-actions class="title-name">
            <v-list-item class="grow">
              <h1>
                <a href="/product/0000000">
                  Acronal® 6292<v-icon>keyboard_arrow_right</v-icon>
                </a>
              </h1>
            </v-list-item>
          </v-card-actions>

          <v-card-text class="subtitle-1 font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
          </v-card-text>
        </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import IconFeatures1 from '../svg/features/Features-1'
  import IconFeatures2 from '../svg/features/Features-2'
  import IconFeatures3 from '../svg/features/Features-3'
  import IconFeatures4 from '../svg/features/Features-4'

  export default {
    components: { IconFeatures1, IconFeatures2, IconFeatures3, IconFeatures4 },

    data: function () {
      return {
        cardElevation: 0
      }
    },

    methods: {}
  }
</script>

<style lang="scss" scoped>
  #features {
    margin-top: -45%;
    max-width: 1070px;
    min-width: 1070px;
    padding: 4px;

    @media screen and (max-width: 640px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      margin-top: -70%;
    }
  }

  .features-card {
    padding: 10px;
  }

  .features-product {
    overflow: hidden;
    padding: 50px 20px 20px 20px;
    position: relative;
    transition: all .2s ease-in-out;
    white-space: normal;

    .v-card__title {

      .title {
        border-radius: 8px;
        display: block;
        line-height: 17px;
        padding: 0;
        position: absolute;
        right: 20px;
        text-align: right;
        top: 22px;

        samll {
          color: #aaa;
          font-family: Helvetica Neue LT W01_71488914;
          line-height: 17px;
          font-size: .8125em;
        }
      }
    }

    .v-card__actions {

      & > div {
        padding-left: 0;
      }

      a {
        text-decoration: none;
        color: #333;
      }
    }

    .v-card__text {
      padding-top: 0;
    }
  }
</style>
