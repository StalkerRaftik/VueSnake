import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as movement from "./logic/Movement"
import {mainCycle} from "./logic/MainCycle";


Vue.config.productionTip = false

export let vm = new Vue({
  mounted: function () {
    this.$nextTick(function() {
      mainCycle.CreateCycle()
      movement.createMovementListener()
    })
  },
  store,
  render: h => h(App),
}).$mount('#app')

