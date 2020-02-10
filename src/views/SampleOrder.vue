<template>
  <v-container
    id="sample-order"
    tag="section"
  >
    <div class="header">
      <h1>
        <v-icon x-large class="material-icons-outlined">system_update_alt</v-icon>
        样品订单
      </h1>
    </div>

    <div class="content">
      <v-stepper
        v-model="e1"
        :alt-labels="altLabels"
      >
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"
              :editable="editable"
            >
              <template v-if="n === 1">
                样品订单
              </template>

              <template v-else-if="n === 2">
                地址信息
              </template>

              <template v-else-if="n === 3">
                核对
              </template>

              <template v-else-if="n === 4">
                确认
              </template>

            </v-stepper-step>

            <v-divider
              v-if="n !== steps"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="n in steps"
            :key="`${n}-content`"
            :step="n"
          >
            <template v-if="n === 1">
              <order-list
                @nextstep="nextStep(n)"
              >
              </order-list>
            </template>

            <template v-else-if="n === 2">
              <order-address
                @prevstep="prevStep(n)"
                @nextstep="nextStep(n)"
              >
              </order-address>
            </template>

            <template v-else-if="n === 3">
             <order-resume
               @prevstep="prevStep(n)"
               @nextstep="nextStep(n)"
             ></order-resume>
            </template>

            <template v-else-if="n === 4">
              <order-complete></order-complete>
            </template>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-container>
</template>
<script>
  import OrderList from '../components/sample_order/OrderList'
  import OrderAddress from '../components/sample_order/OrderAddress'
  import OrderResume from '../components/sample_order/OrderResume'
  import OrderComplete from '../components/sample_order/OrderComplete'

  export default {
    components: { OrderList, OrderAddress, OrderResume, OrderComplete },
    data: function () {
      return {
        e1: 1,
        steps: 4,
        vertical: false,
        altLabels: true,
        editable: false,
      }
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
      vertical () {
        this.e1 = 2
        requestAnimationFrame(() => this.e1 = 1) // Workarounds
      },
    },

    methods: {
      prevStep (n) {
        if (n > 1) {
          this.e1 = n - 1
        }
      },

      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  #sample-order {
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
