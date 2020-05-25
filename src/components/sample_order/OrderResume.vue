<template>
  <div class="order-resume">
    <v-data-iterator
      :items="order_address"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>{{ $t('sampleOrder.OrderResume.title') }}</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="(item, index) in order_address"
            :key="index"
            cols="12"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.family_name }}, {{ item.given_name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.country') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.country_code }}
                    {{ item.administrative_area }}
                    {{ item.locality }}
                    {{ item.dependent_locality }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.company') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.organization }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.address') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.address_line1 }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.postCode') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.postal_code }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.totalPrice') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ order_total_price.number }} {{ order_total_price.currency_code }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <v-data-iterator
      :items="order_items"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>{{ $t('sampleOrder.OrderResume.orderInfo') }}</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in order_items"
            :key="item.uuid[0].value"
            cols="12"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.title[0].value }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.amount') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.quantity[0].value }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.price') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.unit_price[0].number }} {{ item.unit_price[0].currency_code }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>{{ $t('sampleOrder.OrderResume.totalPrice') }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.total_price[0].number }} {{ item.total_price[0].currency_code }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <div class="pagination">
      <v-btn
        color="info"
        class="float-left"
        @click="backPrevStep()"
      >
        {{ $t('sampleOrder.OrderResume.editAddress') }}
      </v-btn>

      <v-btn
        class="float-right"
        color="info"
        @click="completeOrder()"
      >
        {{ $t('sampleOrder.OrderResume.completeOrder') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: 'order-resume',

    computed: {
      ...mapState({
        order_total_price: state => state.basket.order_total_price,
        order_items: state => state.basket.order_items,
        order_address: state => state.basket.order_address,
        orderID: state => state.basket.orderID,
        isLogin: state => state.user.isLogin
      })
    },

    data () {
      return {

      }
    },

    mounted () {

    },

    methods: {
      backPrevStep () {
        this.$emit('prevstep')
      },

      completeOrder () {
        let vm = this
        if (vm.orderID) {
          vm.$loading.show()
          vm.$store.dispatch('completeOrder', vm.orderID).then(result => {
            if (result.status === 200) {
              vm.$store.commit('clearShoppingCart')
              vm.$emit('nextstep')
              vm.$loading.hide()
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
