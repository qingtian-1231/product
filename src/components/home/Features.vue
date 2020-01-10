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
              <icon-dispersions bg-color-class="styrene-acrylics"></icon-dispersions>
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
              <icon-additives bg-color-class="defoamers"></icon-additives>
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
              <icon-additives bg-color-class="wetting-agents"></icon-additives>
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
            <icon-dispersions bg-color-class="styrene-acrylics"></icon-dispersions>
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
  import IconDispersions from '../svg/Dispersions'
  import IconAdditives from '../svg/Additives'

  export default {
    components: { IconDispersions, IconAdditives },

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
    margin-top: -13%;
    max-width: 1070px;
    min-width: 1070px;
    padding: 4px;

    @media screen and (max-width: 640px) {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }
  }

  .features-card {
    padding: 10px;
  }

  .features-product {
    overflow: hidden;
    padding: 100px 20px 50px 20px;
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

      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
</style>
