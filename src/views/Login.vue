<template>
  <v-container
    id="login"
    tag="section"
  >
    <div class="header">
      <div class="card">
        <icon-app></icon-app>
      </div>
      <div class="excerpt">
        <h1>Lab Assistant</h1>
        <h2>for Architectural Coatings</h2>
      </div>
    </div>

    <v-row class="content">
      <v-col cols="6">
        <form id="register-form" class="form">
            <v-col cols="12">
              <v-text-field
                label="显示名称"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="邮箱地址"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="公司名称"
                outlined
              ></v-text-field>
            </v-col>
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
      </v-col>
      <v-col cols="6">
        <div class="unlock">
          <h2>
            <v-icon>lock_open</v-icon>
            <!-- react-text: 6164 -->Sign up. Make the most of<!-- /react-text --><br><!-- react-text: 6166 -->Lab
            Assistant.<!-- /react-text --></h2>
          <p>Get full access to exclusive formulations and complete product data. Individualize your own account and
            store favorite or recently visited products and formulations. You can even link your account to colleagues
            to share your sample order information – just some of the advantages of signing up.</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import IconApp from '../components/svg/App'

  export default {
    components: {IconApp},

    data: function () {
      return {}
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #login {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

    .header {
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;

      .icon {
        height: 60px;
        max-height: 60px;
        max-width: 60px;
        width: 60px;
      }
    }

    .content {
      padding-top: 40px;

      .unlock {
        border-left: 1px solid #eee;
        padding-left: 30px;
      }
    }

    .bottom {
      padding-top: 40px;
      border-top: 1px solid #eee;
    }
  }
</style>
