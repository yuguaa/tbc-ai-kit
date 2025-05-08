import Vue from 'vue'
import App from './App.vue'
import '@/icons'
import '@/styles/tailwindcss.css'
Vue.config.productionTip = false

class TbcAiApp {
  constructor({ target, ...rest }) {
    new Vue({
      render: h =>
        h(App, {
          props: {
            ...rest,
            config: {
              ...rest?.config,
              __mounted: rest?.mounted
            }
          }
        })
    }).$mount(target)
  }
}

if (process.env.NODE_ENV === 'development') {
  new TbcAiApp({
    target: '#app',
    config: {
      __mounted: () => {
        console.log('TbcAiApp mounted')
      }
    }
  })
}

export default TbcAiApp
