<template>
  <v-container
    id="formulations"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row dense>
        <v-card
          class="mx-auto"
          width="100%"
        >

          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-hover :key="item.title" v-slot:default="{ hover }">
                <v-list-item :class="hover ? 'elevation-12' : ''" @click="test">
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>

                  <router-link :to="{name: 'Formulation', params: {id: '12312321'}}">
                    <v-list-item-avatar>
                      <icon-additives bg-color-class="wetting-agents"></icon-additives>
                    </v-list-item-avatar>
                  </router-link>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon class="material-icons-outlined" @click="previewFormulation">pageview</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                      >
                        star_border
                      </v-icon>

                      <v-icon
                        v-else
                        color="yellow"
                      >
                        star
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-hover>

              <v-divider
                v-if="index + 1 < items.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-row>
    </v-col>

    <v-dialog
      v-model="requestFormulationDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="344px"
    >
      <v-card>
        <product-details @fatherMethod="closeRequestDialog()"></product-details>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  // import IconDispersions from '../components/svg/Dispersions'
  import IconAdditives from '../components/svg/Additives'
  import ProductDetails from '../components/ProductDetails'
  import { mapState } from 'vuex'

  export default {
    components: { IconAdditives, ProductDetails },

    computed: {
      ...mapState({
        requestFormulationDialog: state => state.core.requestFormulationDialog
      }),
    },

    data: () => ({
      selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),

    methods: {
      previewFormulation () {
        this.$store.state.core.requestFormulationDialog = true
      },

      closeRequestDialog () {
        this.$store.state.core.requestFormulationDialog = false
      },
    }
  }
</script>
<style lang="scss" scoped>
  #formulations {
    max-width: 1318px;

    .v-list {

      .v-avatar {

        i {
          height: 40px;
          width: 40px;
          margin-top: 0;
        }
      }
    }
  }
</style>
