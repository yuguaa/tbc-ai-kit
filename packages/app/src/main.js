import Vue from 'vue'
import App from './App.vue'
import '@/icons'
import '@/styles/tailwindcss.css'
Vue.config.productionTip = false

class TbcAiApp {
  constructor({ target, config }) {
    // 是否有target,没有添加到body子元素上
    if (!target) {
      const app = document.createElement('div')
      app.id = '__TBC_AI_APP_DOM' // 可选：设置 ID
      document.body.appendChild(app)
      target = '#__TBC_AI_APP_DOM'
    }
    new Vue({
      render: (h) =>
        h(App, {
          props: {
            config,
          },
        }),
    }).$mount(target)
  }
}

if (process.env.NODE_ENV === 'development') {
  new TbcAiApp({
    target: '#app',
    config: {
      __mounted: () => {
        console.log('TbcAiApp mounted')
      },
    },
  })
}

export default TbcAiApp
