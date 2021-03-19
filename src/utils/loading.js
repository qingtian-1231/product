import Vue from 'vue'
import loadingComponent from '../components/tools/loading'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
  el: document.createElement('div')
})

instance.show = false // 默认隐藏
const loading = {
  show() { // 显示方法
    instance.show = true
    // 暂时关闭
    document.body.appendChild(instance.$el)
  },
  hide() { // 隐藏方法
    instance.show = false
    // console.log(instance.$el, 'instance.$el')
    document.body.removeChild(instance.$el)
  }
}

export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading
      }
    })
  }
}
