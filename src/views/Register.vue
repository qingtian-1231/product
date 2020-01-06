<template>
  <v-container
    id="register"
    tag="section"
  >
    <div class="header">
      <h1>
        <v-icon x-large class="material-icons-outlined">person_add</v-icon>
        注册
      </h1>
    </div>

    <div class="content">
      <form id="register-form" class="form">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="显示名称"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="邮箱地址"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="公司名称"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="您的职位"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="密码"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="重复密码"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="bottom row text-center mx-0">
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
      </form>
    </div>
  </v-container>
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
  #register {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

    .header {
      text-align: left;
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;

      h1 {
        font-size: 35px;

        .v-icon {
          font-size: 54px;
        }
      }
    }

    .content {
      padding-top: 40px;
    }

    .bottom {
      padding-top: 40px;
      border-top: 1px solid #eee;
    }
  }
</style>
