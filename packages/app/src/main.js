// main.js
import Vue from 'vue'
import '@/icons'
import '@/styles/tailwindcss.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false
import TbcAiApp from './core'

if (process.env.NODE_ENV === 'development') {
  window.$cookies.set('corp_code', 'shyf17')
  window.$cookies.set('eln_session_id', 'elnSessionId.4a7b29c7c95e4245afbf24bb65af5cac')

  // 开发模式下，body margin 0
  document.body.style.margin = '0'
  document.body.style.height = '100vh'
  new Vue({
    data() {
      return {
        pageConfig: {
          mode: 'page',
          modeFull: {},
          modeVisible: false,
          modeShowSidebar: true,
          modeIsFull: true,
        },
        modalConfig: {
          mode: 'modal',
          modeVisible: true,
          modeShowSidebar: true,
          modeIsFull: false,
        },
        drawerConfig: {
          mode: 'drawer',
          modeVisible: false,
          modeShowSidebar: true,
          modeIsFull: false,
        },
        pageApp: null,
        modalApp: null,
        drawerApp: null,
      }
    },
    mounted() {
      // 创建 page 实例
      this.pageApp = new TbcAiApp({
        target: '#page-app',
        modeConfig: this.pageConfig,
      })
      // sse请求和响应拦截器
      // this.pageApp.useRequestInterceptor((params) => {
      //   console.log('请求拦截器', params)
      //   return params
      // })
      // this.pageApp.useResponseInterceptor((params) => {
      //   console.log('响应拦截器', params)
      //   return params
      // })

      // // 创建 modal 实例
      // this.modalApp = new TbcAiApp({
      //   target: '#modal-app',
      //   modeConfig: this.modalConfig,
      // })

      // // 创建 drawer 实例
      // this.drawerApp = new TbcAiApp({
      //   target: '#drawer-app',
      //   modeConfig: this.drawerConfig,
      // })
    },
    methods: {
      togglePage() {},
      toggleModal() {},
      toggleDrawer() {},
    },
    render(h) {
      return h('div', { class: 'y-h-screen' }, [
        // 控制按钮
        h('div', [
          false &&
            h(
              'button',
              {
                class: 'y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600',
                on: { click: this.togglePage },
              },
              '切换页面',
            ),
          false &&
            h(
              'button',
              {
                class: 'y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600',
                on: { click: this.toggleModal },
              },
              '切换弹窗',
            ),
          false &&
            h(
              'button',
              {
                class: 'y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600',
                on: { click: this.toggleDrawer },
              },
              '切换抽屉',
            ),
        ]),
        // AIApp 挂载点
        h('div', { attrs: { id: 'modal-app' } }),
        h('div', { attrs: { id: 'page-app' } }),
        h('div', { attrs: { id: 'drawer-app' } }),
      ])
    },
  }).$mount('#app')
}

export default TbcAiApp
