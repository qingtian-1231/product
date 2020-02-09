<template>
  <div class="order-address">
    <v-form ref="orderAddressForm" id="register-form" class="form" v-model="orderAddressValid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="姓"
            outlined
            :rules="[rules.required, rules.max]"
            v-model="family_name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="名"
            outlined
            :rules="[rules.required, rules.max]"
            v-model="given_name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            class="select small"
            v-model="country_code"
            :hint="`${country_code.code}, ${country_code.name}`"
            :items="countryList"
            item-text="name"
            item-value="code"
            return-object
            :rules="[rules.required]"
            label="国家"
            outlined
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" v-if="provinceList.length">
          <v-select
            class="select small"
            v-model="administrative_area"
            :hint="`${administrative_area.code}, ${administrative_area.name}`"
            :items="provinceList"
            item-text="name"
            item-value="code"
            return-object
            :rules="[rules.required]"
            label="省/州"
            outlined
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" v-if="cityList.length">
          <v-select
            class="select small"
            v-model="locality"
            :hint="`${locality.code}, ${locality.name}`"
            :items="cityList"
            item-text="name"
            item-value="code"
            return-object
            :rules="[rules.required]"
            label="城市"
            outlined
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" v-if="localityList.length">
          <v-select
            class="select small"
            v-model="dependent_locality"
            :hint="`${dependent_locality.code}, ${dependent_locality.name}`"
            :items="localityList"
            item-text="name"
            item-value="code"
            return-object
            :rules="[rules.required]"
            label="区域"
            outlined
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="邮编"
            outlined
            :rules="[rules.required]"
            v-model="postal_code"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="街道地址"
            outlined
            :rules="[rules.required]"
            v-model="address_line1"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="街道地址2"
            outlined
            v-model="address_line2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="公司"
            outlined
            :rules="[rules.required]"
            v-model="organization"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <div class="pagination">
      <v-btn
        color="info"
        class="float-left"
        @click="backPrevStep()"
      >
        编辑样品订单
      </v-btn>

      <v-btn
        class="float-right"
        color="primary"
        @click="updateOrderAddress()"
      >
        继续
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: 'order-address',

    computed: {
      ...mapState({
        countryList: state => state.basket.countryList,
        provinceList: state => state.basket.provinceList,
        cityList: state => state.basket.cityList,
        localityList: state => state.basket.localityList,
        isLogin: state => state.user.isLogin
      })
    },

    data () {
      return {
        orderAddressValid: true,
        family_name: '',
        given_name: '',
        country_code: '',
        administrative_area: '',
        locality: '',
        dependent_locality: '',
        postal_code: '',
        address_line1: '',
        address_line2: '',
        organization: '',
        rules: {
          required: v => !!v || '必须.',
          min: v => v.length >= 8 || '至少8位字符',
          max: v => v.length <= 20 || '不能超过20位字符',
          emailMatch: v => (/.+@.+\..+/.test(v) || '请输入合法的email地址'),
          confirmPass: v => this.password === v || '确认密码不正确'
        },
      }
    },

    watch: {
      country_code: function (val, oldval) {
        if (val.code) {
          this.$store.dispatch('getProvinces', val.code)
        }
      },

      administrative_area: function (val, oldval) {
        let vm = this
        if (val.code) {
          this.$store.dispatch('getCities', {
            country_code: vm.country_code.code,
            province_code: val.code
          })
        }
      },

      locality: function (val, oldval) {
        let vm = this
        if (val.code) {
          this.$store.dispatch('getLocals', {
            country_code: vm.country_code.code,
            province_code: vm.administrative_area.code,
            city_code: val.code
          })
        }
      },

    },

    mounted () {
      this.$store.dispatch('getCountries')
    },

    methods: {
      backPrevStep () {
        this.$emit('prevstep')
      },

      updateOrderAddress () {
        let vm = this
        let address = {}
        if (vm.$refs.orderAddressForm.validate()) {
          address.given_name = vm.given_name
          address.family_name = vm.family_name
          address.organization = vm.organization
          address.country_code = vm.country_code
          address.administrative_area = vm.administrative_area
          address.locality = vm.locality
          address.dependent_locality = vm.dependent_locality
          address.postal_code = vm.postal_code
          address.address_line1 = vm.address_line1
          address.address_line2 = vm.address_line2
          vm.$store.dispatch('updateOrderAddress', address)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
