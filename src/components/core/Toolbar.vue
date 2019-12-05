<template>
  <v-app-bar
    fixed
    dark
    prominent
    hide-on-scroll
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <template v-slot:extension>
      <v-tabs
        v-model="model"
        centered
        slider-color="yellow"
        background-color="primary"
      >
        <v-tab
          v-for="(link, i) in menuLinks"
          :key="i"
          :href="`${link.relative}`"
        >
          <v-icon>home</v-icon>{{ link.title }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
    // Utilities
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
                menuLinks: state => state.core.menuItems
            }),
        },

        methods: {
            onClick (e, item) {
                e.stopPropagation()

                if (item.to || !item.href) return

                this.$vuetify.goTo(item.href)
            }
        }
    }
</script>
