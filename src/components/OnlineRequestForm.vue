<template>
  <div id="feedback">
    <template v-if="feedback_success">
      <div class="success_message">
        <h2>
          <v-icon color="primary">check_circle_outline</v-icon>
          感谢您的反馈！
        </h2>

        <v-btn class="ma-2" rounded color="success" @click="closeRequestDialog()">
          关闭
        </v-btn>
      </div>
    </template>

    <template v-else>
      <h2>
        <v-icon>send</v-icon>
        {{ $t('onlineRequestForm.title') }}
      </h2>
      <p>
        {{ $t('onlineRequestForm.description') }}
      </p>
      <v-form id="feedback-form" class="form" ref="onlineRequestForm" v-model="onlineRequestValid" lazy-validation>
        <div>
          <v-textarea
            outlined
            required
            name="input-7-4"
            :label="$t('onlineRequestForm.feedbackContent')"
            v-model="feedback_content"
            :rules="[rules.required]"
          ></v-textarea>

          <v-text-field
            :label="$t('onlineRequestForm.yourEmail')"
            required
            v-model="email_address"
            :rules="[rules.required, rules.emailMatch]"
            outlined
          ></v-text-field>
          <div class="row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <v-btn class="ma-2" block rounded color="success" @click="closeRequestDialog()">
                {{ $t('global.cancel') }}
                <v-icon right>close</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="sendFeedback()">
                {{ $t('global.submit') }}
                <v-icon right>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
          </div>
        </div>
      </v-form>
    </template>
  </div>
</template>
<script>
  import { request } from '../utils/request'

  export default {
    name: 'online-request-form',

    data: function () {
      return {
        onlineRequestValid: true,
        feedback_success: 0,
        feedback_content: '',
        email_address: '',
        rules: {
          required: v => !!v || '必须.',
          emailMatch: v => (/.+@.+\..+/.test(v) || '请输入合法的email地址')
        },
      }
    },

    methods: {
      closeRequestDialog: function () {
        let vm = this
        vm.$emit('fatherMethod')
        vm.feedback_success = 0
      },

      sendFeedback () {
        let vm = this
        if (this.$refs.onlineRequestForm.validate()) {
          request().post('/webform_rest/submit?_format=json',
            {
              webform_id: 'feedback',
              email_address: vm.email_address,
              feedback_content: vm.feedback_content
            }
          )
            .then(res => {
              if (res.status === '200' || res.statusText === 'OK') {
                vm.feedback_success = 1
              }

              return Promise.resolve(res)
            }, err => {
              return Promise.resolve(err)
            })
            .catch(function (error) {
              console.log(error)
              return Promise.resolve(error)
            })
        }
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

    .success_message {

      h2 {

        i {
          font-size: 2.5rem;
        }
      }
    }
  }
</style>
