<template>
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

      <template v-else-if="link.below">
        <v-tab
          :key="i"
          class="below-menu"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                icon
                v-on="on"
              >
                <v-icon left class="material-icons-outlined">{{ link.options.icon }}</v-icon>
                {{ link.title }}
              </v-btn>
            </template>
            <v-list
              v-for="(item, index) in link.below"
              :key="index"
            >
                <template v-if="item.children">
                  <v-menu
                    open-on-hover
                    offset-x
                  >
                    <template v-slot:activator="{ on }">
                      <v-list-item v-on="on">
                        <router-link :to="{path: '/products', query: {industry: item.tid}}">
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </router-link>
                      </v-list-item>
                    </template>

                    <v-list
                      v-for="(child, index) in item.children"
                      :key="index"
                    >
                      <template v-if="child.children">
                        <v-menu
                          open-on-hover
                          offset-x
                        >
                          <template v-slot:activator="{ on }">
                            <v-list-item v-on="on">
                              <router-link :to="{path: '/products', query: {industry: child.tid}}">
                                <v-list-item-title>{{ child.name }}</v-list-item-title>
                              </router-link>
                            </v-list-item>
                          </template>

                          <v-list
                            v-for="(levelchild, index) in child.children"
                            :key="index"
                          >
                            <v-list-item>
                              <router-link :to="{path: '/products', query: {industry: child.tid}}">
                                <v-list-item-title>{{ levelchild.name }}</v-list-item-title>
                              </router-link>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template>

                      <v-list-item v-else>
                        <router-link :to="{path: '/products', query: {industry: child.tid}}">
                          <v-list-item-title>{{ child.name }}</v-list-item-title>
                        </router-link>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>

                <v-list-item v-else>
                  <router-link  :to="{path: '/products', query: {industry: item.tid}}">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </router-link>
                </v-list-item>
            </v-list>
          </v-menu>
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
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'menu-links',

    computed: {
      ...mapState({
        menuLinks: state => state.core.menuItems,
        isLogin: state => state.user.isLogin,
        loginStatus: state => state.core.loginStatus,
        globalSearchResult: state => state.search.searchResult
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
    }
  }
</script>

<style>

</style>
