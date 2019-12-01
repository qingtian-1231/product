<template>
  <v-toolbar
    app
    color="primary"
    dark
    extended
  >
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />

    <template v-slot:extension>
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
            v-for="(link, i) in menuLinks"
            :key="i"
            :to="link.relative"
            class="ml-0 hidden-sm-and-down"
            flat
            @click="onClick($event, item)"
          >
            <v-icon>home</v-icon>
            {{ link.title }}
          </v-btn>
        </v-layout>
      </v-container>
    </template>
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
        <v-spacer />
        <v-btn icon>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
  </v-toolbar>
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
