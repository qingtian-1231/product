<template>
  <v-card
    class="mx-auto formulations-with-filter fade-enter-active"
    width="100%"
  >
    <template v-for="(item, index) in formulationFilterList">
      <v-list
        two-line
        height="60"
        :key="index">
        <v-list-item>
          <v-col cols="2">
            <v-subheader>{{ item.label }}</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
              class="select small"
              v-model="item.selected"
              :hint="`${item.selected.value}, ${item.selected.name}`"
              :items="item.selectList"
              item-text="name"
              item-value="code"
              return-object
              :label="$t('formulationFilter.select')"
              filled
              dense
              hide-details
              solo
            ></v-select>
          </v-col>
          <v-col cols="2">
          </v-col>
        </v-list-item>
      </v-list>
    </template>
    <v-btn block rounded color="success" @click="findFormulations()">
      {{ $t('formulationFilter.selectFormulation') }}
      <v-icon right>keyboard_arrow_right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: 'formulations-with-filter',

    data () {
      return {
        formulationFilterList: [
          {
            label: '60度光泽',
            selected: {},
            filedName: 'field_luster_60',
            selectList: [
              {
                name: '>85°',
                value: '>85°',
              },
              {
                name: '<85°',
                value: '<85°',
              }
            ]
          },
          {
            label: '板材',
            selected: {},
            filedName: 'field_sheet',
            selectList: [
              {
                name: 'CRS',
                value: 'CRS',
              },
              {
                name: 'HDG',
                value: 'HDG',
              },
              {
                name: 'AI',
                value: 'AI',
              }
            ]
          },
          {
            label: '厚度',
            selected: {},
            filedName: 'field_thickness',
            selectList: [
              {
                name: '30um±5',
                value: '30um±5',
              },
              {
                name: '50um±5',
                value: '50um±5',
              },
              {
                name: '90um±10',
                value: '90um±10',
              }
            ]
          },
          {
            label: 'SST',
            selected: {},
            filedName: 'field_sst',
            selectList: [
              {
                name: '≤150h',
                value: '≤150h',
              },
              {
                name: '150h~300h',
                value: '150h~300h',
              },
              {
                name: '≥300h',
                value: '≥300h',
              }
            ]
          }
        ]
      }
    },

    computed: {
      ...mapState({
        taxonomyProductApplication: state => state.core.taxonomyProductApplication
      })
    },

    props: {
     industry: {
       type: String,
     }
    },

    methods: {
      findFormulations () {
        let vm = this
        let options = {
          industry: vm.industry
        }

        for (let i in vm.formulationFilterList) {
          let selected = vm.formulationFilterList[i].selected
          let fieldName = vm.formulationFilterList[i].filedName
          if (selected.hasOwnProperty('value')) {
            options[fieldName] = selected.value
          }
        }

        vm.$router.push({ path: 'formulations', query: options})
      }
    }
  }
</script>

<style lang="scss" scoped>
.formulations-with-filter {

  .v-btn {
    margin: 25px 0;
  }
}
</style>
