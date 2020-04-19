<template>
  <v-container
    id="order-history"
    tag="section"
  >
    <div class="header">
      <h1>
        <v-icon x-large class="material-icons-outlined">shopping_cart</v-icon>
        订单历史
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
              text: '订单号',
              align: 'start',
              value: 'order_number',
            },
            {
              text: '总价',
              value: 'total_price__number',
              sortable: false,
            },
            {
              text: '订单状态',
              value: 'state',
              sortable: false,
            },
            {
              text: '创建时间',
              value: 'created',
              sortable: false,
            },
            {
              text: '下单时间',
              value: 'placed',
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
