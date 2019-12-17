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
      @input="updateLoginStatus"
      :class="hiddenTopAppBar ? 'hidden-to-app-bar' : ''"
    >
      <v-row justify="center" class="mx-0">
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto px-6 cutome-card"
            outlined
          >
            <v-card-title class="px-0 my-5">
              <span class="headline">Login</span>
              <v-spacer></v-spacer>
              <v-btn dark icon class="black--text">
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider class="py-5"></v-divider>

            <form>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="Name"
                outlined
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                outlined
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Item"
                outlined
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn rounded color="secondary" dark>Rounded Button<v-icon right dark>keyboard_arrow_right</v-icon></v-btn>
            </form>
          </v-card>

          <v-card
            class="mx-auto px-6 cutome-card"
            outlined
          >
            <v-card-title class="px-0 my-5">
              <span class="headline black--text"><v-icon large>lock_open</v-icon>Sign up. Make the most of
Lab Assistant.</span>
            </v-card-title>

            <v-divider class="py-5"></v-divider>

            <blockquote class="blockquote px-0 py-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
            </blockquote>
            <v-btn rounded color="secondary" dark>Rounded Button<v-icon right dark>keyboard_arrow_right</v-icon></v-btn>
          </v-card>
        </v-col>
      </v-row>

    </v-navigation-drawer>
    <v-dialog
      v-model="requestDialog"
      transition="dialog-bottom-transition"
      scrollable
      persistent
      max-width="940px"
    >
      <v-card>
        <v-toolbar>
          <v-btn icon dark @click="closeRequestDialog()">
            <v-icon color="black">close</v-icon>
          </v-btn>
<!--          <v-toolbar-title>product</v-toolbar-title>-->
          <v-spacer></v-spacer>
        </v-toolbar>
        <online-request-form></online-request-form>
<!--        <login-form @fatherMethod="closeDialog"></login-form>-->
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
  // Utilities
  import { mapState } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import OnlineRequestForm from '../OnlineRequestForm'

  export default {
    components: { OnlineRequestForm },

    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data () {
      return {
        name: '',
        email: '',
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
        ],
        checkbox: false,
      }
    },

    computed: {
      ...mapState({
        loginStatus: state => state.core.loginStatus,
        hiddenTopAppBar: state => state.core.hiddenTopAppBar,
        requestDialog: state => state.core.requestDialog
      }),

      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },

      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },

      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      closeRequestDialog () {
        this.$store.state.core.requestDialog = false
      },

      updateLoginStatus (value) {
        this.$store.state.core.loginStatus = value
      },

      submit () {
        this.$v.$touch()
      },

      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    }
  }
</script>
<style lang="sass" scoped>
  .v-content
    .v-navigation-drawer
      max-width: 640px
      top: 144px!important
      overflow-y: auto
      box-shadow: none

      &.hidden-to-app-bar
        top: 72px!important
      .cutome-card
        border: 0
</style>
