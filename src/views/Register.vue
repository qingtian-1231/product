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
      <div class="QR-code">
        <v-img
          :src="require('@/assets/global/qr_code.jpg')"
          :lazy-src="require('@/assets/global/qr_code.jpg')"
          contain
        >
        </v-img>
        <div class="title mb-1">关注公众号</div>
      </div>
      <template v-if="registerSuccess">
        <div class="success_message">
          <h2>
            <v-icon color="primary">check_circle_outline</v-icon>
            感谢您注册本站！
          </h2>
          <p>
            您已经注册成功，请等待管理员确认激活您的账户，你注册的邮箱将会收到注册成功的邮件通知。
          </p>
          <router-link :to="{name: 'Home'}">
            <v-btn class="ma-2" rounded color="success">
              回到首页
            </v-btn>
          </router-link>
        </div>
      </template>

      <template v-else>
        <v-form ref="registerForm" id="register-form" class="form" v-model="registerValid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="用户名"
                outlined
                :rules="[rules.required, rules.max, rules.chineseVarchar, rules.FullwidthChar, rules.invilideChar]"
                v-model="userName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="邮箱地址"
                outlined
                :rules="[rules.required, rules.emailMatch]"
                v-model="userMail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="公司名称"
                outlined
                :rules="[rules.required]"
                v-model="companyName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="您的职位"
                outlined
                :rules="[rules.required]"
                v-model="companyPosition"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="密码"
                outlined
                v-model="password"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="passwordShow ? 'text' : 'password'"
                counter
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="重复密码"
                outlined
                v-model="rePassword"
                :append-icon="rePasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.confirmPass]"
                :type="rePasswordShow ? 'text' : 'password'"
                counter
                @click:append="rePasswordShow = !rePasswordShow"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="bottom row text-center mx-0">
            <v-col cols="12" md="6" sm="12">
              <v-btn class="ma-2" block rounded color="success" @click="$router.back(-1)">
                取消
                <v-icon right>close</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" sm="12" class="mx-0">
              <v-btn class="ma-2" right block rounded color="info" @click="registerUser()">
                注册
                <v-icon right>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
          </div>
        </v-form>
      </template>
    </div>
  </v-container>
</template>
<script>
  import { request } from '../utils/request'

  export default {
    name: 'online-request-form',

    data: function () {
      return {
        registerSuccess: false,
        registerValid: true,
        passwordShow: false,
        rePasswordShow: false,
        password: '',
        rePassword: '',
        userName: '',
        userMail: '',
        companyName: '',
        companyPosition: '',
        rules: {
          required: v => !!v || '必须.',
          min: v => v.length >= 8 || '至少8位字符',
          max: v => v.length <= 20 || '不能超过20位字符',
          emailMatch: v => (/.+@.+\..+/.test(v) || '请输入合法的email地址'),
          confirmPass: v => this.password === v || '确认密码不正确',
          chineseVarchar: v => {
            let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/

            return !reg.test(v) || '用户名仅能包含英文字符下划线或者数字'
          },
          FullwidthChar: v => {
            let reg = /[\uFF00-\uFFEF]/

            return !reg.test(v) || '您输入了非法的全角字符'
          },
          invilideChar: v => {
            let reg = /[`~!@#$%^&*()+=<>?:|"{},\\./;'[\]]/

            return !reg.test(v) || '您输入了非法字符'
          }
        },
      }
    },

    methods: {
      closeRequestDialog: function () {
        this.$emit('fatherMethod')
      },

      registerUser () {
        let vm = this
        if (vm.$refs.registerForm.validate()) {
          vm.$loading.show()
          request().post('/user/register?_format=hal_json',
            {
              "name": {
                "value": vm.userName
              },
              "mail":{
                "value": vm.userMail
              },
              "pass":{
                "value": vm.password
              },
              "field_company_name": {
                "value": vm.companyName
              },
              "field_company_position": {
                "value": vm.companyPosition
              }
            }
          )
            .then(res => {
              if (res.status === '200' || res.statusText === 'OK') {
                vm.registerSuccess = true
                vm.$loading.hide()
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
  #register {
    margin: 30px auto;
    background-color: #fff;
    text-align: center;
    padding: 60px 4%;

    .QR-code {
      width: 20%;
      margin: 0 auto;
    }

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

      .success_message {

        h2 {
          position: relative;

          i {
            margin: -10px 0 0 -21px;
            left: 50%;
            position: absolute;
            top: -2.5rem;
            font-size: 2.5rem;
          }
        }
      }
    }

    .bottom {
      padding-top: 40px;
      border-top: 1px solid #eee;
    }
  }
</style>
