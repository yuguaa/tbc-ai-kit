// main.js
import Vue from 'vue'
import YAiApp from '@/components/YAiApp' // 直接导入 AIApp
// import App from './App.vue'
import '@/icons'
import '@/styles/tailwindcss.css'
import deepmerge from 'deepmerge'
Vue.config.productionTip = false

class TbcAiApp {
  vm = null
  modeConfig = {}
  constructor({ target, modeConfig }) {
    // 是否有 target，没有则添加到 body 子元素上
    if (!target) {
      const app = document.createElement('div')
      app.id = '__TBC_AI_APP_DOM'
      document.body.appendChild(app)
      target = '#__TBC_AI_APP_DOM'
    }
    const defaultModeConfig = {
      mode: 'page',
      modeFull: {
        page: {
          width: '100%',
          height: '100%',
        },
        modal: {
          width: '100%',
          height: '100%',
        },
        drawer: {
          width: '100%',
          height: '100%',
        },
        messages: {
          minWidth: '800px',
          maxWidth: '1200px',
          width: '50%',
        },
      },
      modeNormal: {
        page: {
          width: '50%',
          height: '100%',
        },
        modal: {
          width: '80%',
          height: '80%',
        },
        drawer: {
          width: '50%',
          height: '100%',
        },
        messages: {
          minWidth: '422px',
          maxWidth: '1200px',
          width: '100%',
        },
      },
      modeIsFull: true,
      modeVisible: false,
      modeShowSidebar: true,
    }
    // modeConfig = {
    //   ...defaultModeConfig,
    //   ...modeConfig,
    // }
    this.modeConfig = deepmerge(defaultModeConfig, modeConfig)
    console.log(`🚀 ~ this.modeConfig:`, this.modeConfig)
    const provider = () => {
      return {
        modeConfig: this.modeConfig,
        setModeConfig: this.setModeConfig.bind(this),
        setModeConfigItem: this.setModeConfigItem.bind(this),
      }
    }
    this.vm = new Vue({
      data() {
        return {
          modeConfig: provider().modeConfig,
          setModeConfig: provider().setModeConfig,
          setModeConfigItem: provider().setModeConfigItem,
        }
      },
      provide: {
        modeConfig: this.modeConfig,
        setModeConfig: this.setModeConfig,
        setModeConfigItem: this.setModeConfigItem,
      },
      render(h) {
        return h(YAiApp, {
          props: {
            modeConfig: this.modeConfig, // 传递 modeConfig
            setModeConfig: this.setModeConfig, // 传递 setModeConfig 方法
            setModeConfigItem: this.setModeConfigItem, // 传递 setModeConfigItem 方法
          },
          attrs: {
            // 传递 modeConfig
            modeConfig: this.modeConfig, // 传递 modeConfig
            setModeConfig: this.setModeConfig, // 传递 setModeConfig 方法
            setModeConfigItem: this.setModeConfigItem, // 传递 setModeConfigItem 方法
          },
        })
      },
    }).$mount(target)
  }
  setModeConfig = (modeConfig) => {
    console.log(`🚀 ~TbcAiApp setModeConfig: 🚀`, modeConfig)
    // 创建微任务，保证在下一个事件循环中执行
    // 这样可以确保在 Vue 实例创建完成后再执行
    Promise.resolve().then(() => {
      this.modeConfig = modeConfig
      if (this.vm) {
        this.vm.$data.modeConfig = modeConfig
      }
    })
  }
  setModeConfigItem(key, value) {
    console.log(`🚀 ~TbcAiApp setModeConfigItem: 🚀`, key, value)
    // 创建微任务，保证在下一个事件循环中执行
    // 这样可以确保在 Vue 实例创建完成后再执行
    Promise.resolve().then(() => {
      this.modeConfig[key] = value
      this.modeConfig[key] = value
      if (this.vm) {
        this.vm.$data.modeConfig[key] = value
      }
    })
  }
}

if (process.env.NODE_ENV === 'development') {
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
          modeVisible: false,
          modeShowSidebar: true,
          modeIsFull: false,
        },
        drawerConfig: {
          mode: 'drawer',
          modeVisible: true,
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

      // 创建 modal 实例
      this.modalApp = new TbcAiApp({
        target: '#modal-app',
        modeConfig: this.modalConfig,
      })

      // 创建 drawer 实例
      this.drawerApp = new TbcAiApp({
        target: '#drawer-app',
        modeConfig: this.drawerConfig,
      })
    },
    methods: {
      togglePage() {
        // this.showPage = !this.showPage
        // this.pageApp.setVisible(this.showPage)
      },
      toggleModal() {
        // this.modalApp.setVisible(!this.modalApp.getVisible())
      },
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
