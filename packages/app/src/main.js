// main.js
import Vue from 'vue'
import YAiApp from '@/components/YAiApp' // 直接导入 AIApp
// import App from './App.vue'
import '@/icons'
import '@/styles/tailwindcss.css'
Vue.config.productionTip = false

class TbcAiApp {
  constructor({ target, config = {}, visible = true, onvisibleChange }) {
    // 是否有 target，没有则添加到 body 子元素上
    if (!target) {
      const app = document.createElement('div')
      app.id = '__TBC_AI_APP_DOM'
      document.body.appendChild(app)
      target = '#__TBC_AI_APP_DOM'
    }
    // 创建 Vue 实例，挂载 YAiApp 组件
    const vm = new Vue({
      data() {
        return {
          isVisible: visible, // 管理 visible 状态
          onvisibleChange: onvisibleChange || (() => {}), // 默认回调函数
        }
      },
      render(h) {
        return h(YAiApp, {
          props: {
            config,
            visible: this.isVisible,
            onvisibleChange: this.onvisibleChange,
          },
          on: {
            'update:visible': (value) => {
              this.isVisible = value // 支持 .sync 双向绑定
              this.onvisibleChange(value) // 调用回调函数
            },
          },
        })
      },
    }).$mount(target)
    if (config.__mounted && typeof config.__mounted === 'function') {
      vm.$nextTick(() => {
        config.__mounted()
      })
    }
    this.vm = vm
  }
  // 提供方法控制 visible
  setVisible(visible) {
    this.vm.isVisible = visible
  }
  getVisible() {
    return this.vm.isVisible
  }
  toggleVisible() {
    this.vm.isVisible = !this.vm.isVisible
  }
}

if (process.env.NODE_ENV === 'development') {
  new Vue({
    data() {
      return {
        showModal: false,
        showDrawer: false,
        pageApp: null,
        modalApp: null,
        drawerApp: null,
      }
    },
    mounted() {
      // 创建 page 实例
      this.pageApp = new TbcAiApp({
        target: '#page-app',
        config: {
          mode: 'page',
          size: 'large',
          __mounted: () => {
            console.log('Page AIApp mounted')
          },
        },
      })

      // 创建 modal 实例
      this.modalApp = new TbcAiApp({
        target: '#modal-app',
        config: {
          mode: 'modal',
          size: 'medium',
          __mounted: () => {
            console.log('Modal AIApp mounted')
          },
        },
        visible: this.showModal,
        onvisibleChange: (value) => {
          console.log(`🚀 ~ Modal AIApp visible changed:`, value)
        },
      })

      // 创建 drawer 实例
      this.drawerApp = new TbcAiApp({
        target: '#drawer-app',
        config: {
          mode: 'drawer',
          size: '50%',
          __mounted: () => {
            console.log('Drawer AIApp mounted')
          },
        },
        visible: this.showDrawer,
      })
    },
    methods: {
      togglePage() {
        // this.showPage = !this.showPage
        // this.pageApp.setVisible(this.showPage)
      },
      toggleModal() {
        console.log(`🚀 ~ this.showModal:`, this.modalApp.getVisible())
        // this.modalApp.setVisible(!this.modalApp.getVisible())
        this.modalApp.toggleVisible()
      },
      toggleDrawer() {
        console.log(`🚀 ~ this.showDrawer:`, this.drawerApp.getVisible())
        this.drawerApp.setVisible(!this.drawerApp.getVisible())
      },
    },
    render(h) {
      return h('div', { class: 'y-h-screen y-p-4' }, [
        // 控制按钮
        h('div', { class: 'y-mb-4 y-space-x-2' }, [
          h(
            'button',
            {
              class: 'y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600',
              on: { click: this.togglePage },
            },
            '切换页面',
          ),
          h(
            'button',
            {
              class: 'y-rounded y-bg-blue-500 y-px-4 y-py-2 y-text-white hover:y-bg-blue-600',
              on: { click: this.toggleModal },
            },
            '切换弹窗',
          ),
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
        h('div', { attrs: { id: 'page-app' } }),
        h('div', { attrs: { id: 'modal-app' } }),
        h('div', { attrs: { id: 'drawer-app' } }),
      ])
    },
  }).$mount('#app')
}

export default TbcAiApp
