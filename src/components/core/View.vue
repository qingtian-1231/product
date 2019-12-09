<template>
  <v-content id="home" style="padding: 144px 0 0;">
    <router-view />
    <v-navigation-drawer
      v-model="loginStatus"
      fixed
      temporary
      width="100%"
      hide-overlay
      height="calc(100% - 144px)"
      @transitionend="testtest"
      @input="updateLoginStatus"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>
<script>
  // Utilities
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
      }
    },

    computed: {
      ...mapState({
        loginStatus: state => state.core.loginStatus
      }),
    },

    methods: {
      updateLoginStatus (value) {
        this.$store.state.core.loginStatus = value
      }
    }
  }
</script>
<style lang="sass" scoped>
  .v-content
    .v-navigation-drawer
      max-width: 640px
      top: 144px!important
      overflow-y: auto
</style>
