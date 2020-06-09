<template>
  <v-container
    id="order-history"
    tag="section"
  >
    <div class="header">
      <h1>
        <v-icon x-large class="material-icons-outlined">shopping_cart</v-icon>
        {{ $t('global.orderHistory') }}
      </h1>
    </div>

    <div class="content">
      <v-data-table
        :headers="headers"
        :items="orderHistory"
        hide-default-footer
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'order-history',

    data() {
      return {
          headers: [
            {
              text: this.$t('global.orderNumber'),
              value: 'order_number',
              sortable: false,
            },
            {
              text: this.$t('global.orderProduct'),
              value: 'order_items_target_id',
              sortable: false,
            },
            {
              text: this.$t('global.orderStatus'),
              value: 'state',
              sortable: false,
            },
            {
              text: this.$t('global.orderCreate'),
              value: 'created',
              sortable: false,
            },
          ],
        }
    },

    computed: {
      ...mapState({
        orderHistory: state => state.user.orderHistory,
        isLogin: state => state.user.isLogin,
        currentUser: state => state.user.currentUser,
      }),
    },

    created () {
      if (!this.isLogin) {
        window.location = '/'
      }
    },

    mounted () {
      let vm = this

      vm.$store.dispatch('getUserOrderHistory', vm.currentUser.uid)

      console.log(vm.desserts, vm.orderHistory, 'adsfaddf')
    }
  }
</script>

<style lang="scss" scoped>
  #order-history {
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
          margin-right: 10px;
        }
      }
    }

    .content {
      padding-top: 40px;

      .v-stepper {
        box-shadow: none;

        .v-stepper__header {
          box-shadow: none;
          padding: 40px 0;
        }

        .v-stepper__content {
          padding: 24px 0;
        }
      }

      .pagination {
        display: inline-block;
        width: 100%;
        margin-top: 50px;
        padding: 20px 0;
        border-top: 1px solid #eee;
      }
    }

    .bottom {
      padding-top: 40px;
      border-top: 1px solid #eee;
    }
  }
</style>
