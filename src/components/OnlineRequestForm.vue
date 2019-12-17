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
          label="Outlined textarea"
          value=""
        ></v-textarea>
        <div class="input email">
          <label for="email"></label
          ><input
            type="email"
            name="email"
            id="feedback-form-0-1"
            value=""
            placeholder="Your email address (optional)"
          />
        </div>
        <div class="row text-center mx-0">
          <v-col cols="12" md="6" sm="12">
            <v-btn class="ma-2" block rounded color="success">
               Edit
              <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" md="6" sm="12" class="mx-0">
            <v-btn class="ma-2" right block rounded color="info">
               Edit
              <v-icon right>mdi-pencil</v-icon>
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
    }
  }
</script>
