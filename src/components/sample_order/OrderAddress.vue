<template>
  <div class="order-address">
    <v-form ref="orderAddressForm" id="register-form" class="form" v-model="orderAddressValid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :label="$t('sampleOrder.orderAddress.firstName')"
            outlined
            :rules="[rules.required, rules.max]"
            v-model="family_name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :label="$t('sampleOrder.orderAddress.lastName')"
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
            :label="$t('sampleOrder.orderAddress.country')"
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
            :label="$t('sampleOrder.orderAddress.state')"
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
            :label="$t('sampleOrder.orderAddress.city')"
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
            :label="$t('sampleOrder.orderAddress.district')"
            outlined
            solo
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            :label="$t('sampleOrder.orderAddress.postCode')"
            outlined
            :rules="[rules.required]"
            v-model="postal_code"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            :label="$t('sampleOrder.orderAddress.streetAddress')"
            outlined
            :rules="[rules.required]"
            v-model="address_line1"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :label="$t('sampleOrder.orderAddress.streetAddress2')"
            outlined
            v-model="address_line2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :label="$t('sampleOrder.orderAddress.company')"
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
        {{ $t('sampleOrder.orderAddress.editOrder') }}
      </v-btn>

      <v-btn
        class="float-right"
        color="info"
        @click="updateOrderAddress()"
      >
        {{ $t('sampleOrder.orderAddress.goOn') }}
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
        orderID: state => state.basket.orderID,
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
          required: v => !!v || this.$t('global.required'),
          min: v => v.length >= 8 || this.$t('global.min'),
          max: v => v.length <= 20 || this.$t('global.max'),
          emailMatch: v => (/.+@.+\..+/.test(v) || this.$t('global.emailMatch')),
          confirmPass: v => this.password === v || this.$t('global.confirmPass')
        },
      }
    },

    watch: {
      country_code: function (val, oldval) {
        let vm = this
        if (val.code) {
          vm.$loading.show()
          vm.$store.dispatch('getProvinces', val.code).then(result => {
            if (result.status === 200) {
              vm.$loading.hide()
            }
          })
        }
      },

      administrative_area: function (val, oldval) {
        let vm = this
        if (val.code) {
          vm.$loading.show()
          this.$store.dispatch('getCities', {
            country_code: vm.country_code.code,
            province_code: val.code
          }).then(result => {
            if (result.status === 200) {
              vm.$loading.hide()
            }
          })
        }
      },

      locality: function (val, oldval) {
        let vm = this
        if (val.code) {
          vm.$loading.show()
          this.$store.dispatch('getLocals', {
            country_code: vm.country_code.code,
            province_code: vm.administrative_area.code,
            city_code: val.code
          }).then(result => {
            if (result.status === 200) {
              vm.$loading.hide()
            }
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
          address.order_id = vm.orderID
          address.given_name = vm.given_name
          address.family_name = vm.family_name
          address.organization = vm.organization
          address.country_code = vm.country_code ? vm.country_code.code : null
          address.administrative_area = vm.administrative_area ? vm.administrative_area.code : null
          address.locality = vm.locality ? vm.locality.code : null
          address.dependent_locality = vm.dependent_locality ? vm.dependent_locality.code : null
          address.postal_code = vm.postal_code
          address.address_line1 = vm.address_line1
          address.address_line2 = vm.address_line2
          vm.$loading.show()
          vm.$store.dispatch('updateOrderAddress', address).then(result => {
            vm.$loading.hide()
            vm.$emit('nextstep')
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
