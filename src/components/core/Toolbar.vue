<template>
  <v-toolbar
    app
    flat
    color="primary"
  >
    <template v-slot:extension color="secondary">
      <v-tabs
              v-model="currentItem"
              color="secondary"
              fixed-tabs
              slider-color="yellow"
      >
        <v-tab
                v-for="item in items"
                :key="item"
                :href="'#tab-' + item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </template>
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <v-container
      mx-auto
      py-0
    >
      <v-layout>
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
          @click="onClick($event, item)"
        >
          {{ link.text }}
        </v-btn>
        <v-spacer />
        <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    data: () => ({
      currentItem: 'tab-Web',
      items: [
        'Web', 'Shopping', 'Videos', 'Images'
      ],
      more: [
        'News', 'Maps', 'Books', 'Flights', 'Apps'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }),
    computed: {
      ...mapGetters(['links'])
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href)
      }
    },

    created() {

      console.log(this.links);
    }
  }
</script>
