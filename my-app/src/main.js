import Vue from 'vue'
import App from './App.vue'
import Tone from 'tone'

Object.defineProperty(Vue.prototype, '$Tone', { value: Tone });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')