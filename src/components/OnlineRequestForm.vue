<template>
  <div id="feedback">
    <h2>
      <v-icon>send</v-icon>
      Send Feedback
    </h2>
    <p>
      If you have any suggestions or questions regarding the usage of Lab
      Assistant for Architectural Coatings, please do not hesitate to give us
      your feedback.
    </p>
    <form id="feedback-form" class="form">
      <div>
        <v-textarea
          outlined
          name="input-7-4"
          label="Type here"
          value=""
        ></v-textarea>
        <v-text-field
          label="Your email address"
          outlined
        ></v-text-field>
        <div class="row text-center mx-0">
          <v-col cols="12" md="6" sm="12">
            <v-btn class="ma-2" block rounded color="success" @click="closeRequestDialog()">
               Cancel
              <v-icon right>close</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" md="6" sm="12" class="mx-0">
            <v-btn class="ma-2" right block rounded color="info">
               send
              <v-icon right>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-col>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'online-request-form',

    data: function () {
      return {

      }
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #feedback {
    text-align: center;
    padding: 60px 4%;

    h2 {
      padding: 2%;

      i {
        margin: -10px 0 0 -20px;
        left: 50%;
        position: absolute;
        top: 90px;
      }
    }
  }
</style>
