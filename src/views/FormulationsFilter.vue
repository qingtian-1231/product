<template>
  <v-container
    id="formulations-filter"
    tag="section"
  >
    <v-col lg="12" md="12" sm="12">
      <v-row justify="center">
        <v-expansion-panels
          v-model="panel"
          popout
          focusable
        >
          <template v-for="(item, i) in formulationApplicationList">

            <template v-if="item.name === 'Industrial coating' || item.name === '工业涂料'">
              <v-expansion-panel
                :key="i"
              >
                <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <formulations-with-filter :industry="item.tid"></formulations-with-filter>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>

            <template v-else>
              <v-expansion-panel
                :key="i"
              >
                <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <formulations-without-filter :industry="item.tid"></formulations-without-filter>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>

          </template>
        </v-expansion-panels>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  import FormulationsWithFilter from '../components/formulations_filter/FormulationsWithFilter'
  import FormulationsWithoutFilter from '../components/formulations_filter/FormulationsWithoutFilter'

  export default {
    components: { FormulationsWithFilter, FormulationsWithoutFilter },

    computed: {
      ...mapState({
        formulationApplicationList: state => state.core.formulationApplicationList,
        isLogin: state => state.user.isLogin
      })
    },

    data: () => ({
      panel: [],
    }),

    created() {
      this.formulationApplicationList.forEach((item, index) => {
        /**
         * 默认第一个工业涂料不再展开
         */
        // if (item.name === '工业涂料' || item.name === 'Industrial coating') {
        //   this.panel = index
        // }
      });
    }
  }
</script>
<style lang="scss" scoped>
.v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
