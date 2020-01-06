<template>
  <v-app-bar
    id="app-header"
    fixed
    dark
    hide-on-scroll
    height="72"
    extension-height="72"
    color="primary"
  >
    <v-container class="fill-height app-tool-bar">
      <v-row>
        <a href="/" class="logo">
          <Logo></Logo>
        </a>
        <v-spacer/>
      </v-row>
    </v-container>
    <template v-slot:extension>
      <v-container class="fill-height px-0 py-0 app-tool-bar-extention">
        <v-row class="mx-0 header-main-menu">
          <v-col class="px-0 login-layout" cols="12" sm="1">
            <v-btn @click.stop="openLoginSheet" class="mx-2" fab dark small color="secondary">
              <v-icon dark>perm_identity</v-icon>
            </v-btn>
          </v-col>
          <v-col class="py-0 menu-layout" cols="12" sm="10">
            <v-tabs
              v-model="model"
              centered
              slider-color="secondary"
              slider-size="4"
              background-color="white"
              color="grey"
            >
              <template v-for="(link, i) in menuLinks">
                <template v-if="link.dialog">
                  <v-tab
                    :key="i"
                    @click="headerMenuClick($event, link)"
                  >
                    <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                    {{ link.title }}
                  </v-tab>
                </template>

                <template v-else>
                  <v-tab
                    :key="i"
                    :to="link.relative"
                    @click="headerMenuClick($event, link)"
                  >
                    <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                    {{ link.title }}
                  </v-tab>
                </template>
              </template>
            </v-tabs>
          </v-col>
          <v-col class="px-0 search-layout" cols="12" sm="1">
            <v-menu
              bottom
              left
              origin="right top"
              offset-y
              transition="scale-transition"
              class="mx-2"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  small
                  color="secondary"
                  v-on="on"
                >
                  <v-badge
                    v-model="show"
                    color="secondary"
                    left
                  >
                    <template v-slot:badge>
                      <span>6</span>
                    </template>
                    <v-icon>shopping_cart</v-icon>
                  </v-badge>
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>John Leider</v-list-item-title>
                      <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn
                        :class="fav ? 'red--text' : ''"
                        icon
                        @click="fav = !fav"
                      >
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <v-switch v-model="message" color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Enable messages</v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-switch v-model="hints" color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Enable hints</v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text @click="menu = false">Cancel</v-btn>
                  <v-btn color="primary" text @click="menu = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <v-menu
              bottom
              left
              origin="right top"
              offset-y
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  small
                  color="secondary"
                  v-on="on"
                  class="mx-2"
                >
                  <v-icon>search</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-text-field
                  append-icon="mic"
                  class="mx-4"
                  flat
                  hide-details
                  label="Search"
                  prepend-inner-icon="search"
                  solo-inverted
                ></v-text-field>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text @click="menu = false">Cancel</v-btn>
                  <v-btn color="primary" text @click="menu = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import Logo from '../svg/Logo'

  export default {
    components: { Logo },

    data: function () {
      return {
        show: true
      }
    },

    computed: {
      ...mapState({
        menuLinks: state => state.core.menuItems
      }),
    },

    methods: {
      headerMenuClick: function (e, item) {
        e.stopPropagation()

        if (item.dialog) {
          this.$store.state.core.requestDialog = true
        }

        if (item.to || !item.href) {
          return
        }

        this.$vuetify.goTo(item.href)
      },

      openLoginSheet () {
        this.$store.state.core.loginStatus = !this.$store.state.core.loginStatus
      }
    }
  }
</script>
<style lang="scss">
  header {
    .app-tool-bar {
      padding-left: 50px;
      padding-right: 50px;
      @media screen and (min-width: 1264px) {
        max-width: 1665px;
      }
    }

    .app-tool-bar-extention {
      @media screen and (min-width: 1264px) {
        max-width: 1665px;
      }

      .login-layout {
        padding-left: 50px !important;

        button {
          margin: 0 !important;
        }
      }
    }

    box-shadow: none !important;

    a.logo {
      padding: 0px 0;
      position: relative;
      width: 127px;
    }

    .v-toolbar__extension {
      background-color: #fff;
      padding: 0;
      border-bottom: 1px solid #e2e2e2;
    }

    .header-main-menu {
      height: 100%;

      .v-tabs {
        height: 100%;

        .v-tab.v-tab {
          color: #333 !important;
          opacity: 1 !important;

          .v-icon {
            color: #333 !important;
          }
        }

        .v-item-group {
          height: 100%;
        }
      }
    }
  }
</style>
