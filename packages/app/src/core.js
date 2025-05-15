import deepmerge from 'deepmerge'
import Vue from 'vue'
import YAiApp from '@/components/YAiApp'
import TbcSSE from '@21tb/tbc-sse'
import {
  APP_NEW_SESSTION_ID,
  APP_DEFAULT_TARGET_DOM,
  DEFAULT_MODE_CONFIG,
  NORMAL_BOX_TYPES,
  WORK_FLOW_BOX_TYPES,
  getApiConfigByConfig,
} from '@/const/aiApp'
import { gainChatDomain } from '@/api'
class TbcAiApp {
  vm = null // Vue 实例，视图展示
  modeConfig = {} // 模式配置
  apiConfig = {} // API 配置
  sseReqInterceptors = [] // 请求拦截器
  sseResInterceptors = [] // 响应拦截器
  tbcSSE = new TbcSSE({}) // SSE 实例
  prefix = '' // 域名
  conversations = [] // 对话列表
  currentSessionId = APP_NEW_SESSTION_ID // 当前会话ID
  constructor({
    target,
    modeConfig = {},
    apiConfig = {
      params: {
        boxType: 'AT_017',
        types: 'LOCAL',
      },
      timeout: 1000 * 60 * 3,
    },
  }) {
    if (!target) {
      const app = document.createElement('div')
      app.id = APP_DEFAULT_TARGET_DOM
      document.body.appendChild(app)
      target = `#${APP_DEFAULT_TARGET_DOM}`
    }
    this.modeConfig = deepmerge(DEFAULT_MODE_CONFIG, modeConfig)
    this.apiConfig = getApiConfigByConfig(apiConfig)
    this.subscribeSSEEvents()
    gainChatDomain().then(({ bizResult }) => {
      this.prefix = bizResult
      const provider = {
        modeConfig: this.modeConfig,
        setModeConfig: this.setModeConfig.bind(this),
        setModeConfigItem: this.setModeConfigItem.bind(this),
        apiConfig: this.apiConfig,
        sendMsg: this.sendMsg.bind(this),
        prefix: this.prefix,
        conversations: this.conversations,
        currentSessionId: this.currentSessionId,
      }
      this.vm = new Vue({
        data() {
          return provider
        },
        provide: this.$data,
        render(h) {
          return h(YAiApp, {
            props: this.$data,
            attrs: this.$data,
          })
        },
      }).$mount(target)
    })
  }
  // 请求拦截器
  useRequestInterceptor(interceptor) {
    this.sseReqInterceptors.push(interceptor)
  }
  // 响应拦截器
  useResponseInterceptor(interceptor) {
    this.sseResInterceptors.push(interceptor)
  }
  setModeConfig = (modeConfig) => {
    Promise.resolve().then(() => {
      this.modeConfig = modeConfig
      if (this.vm) {
        this.vm.$data.modeConfig = modeConfig
      }
    })
  }
  setModeConfigItem(key, value) {
    Promise.resolve().then(() => {
      this.modeConfig[key] = value
      this.modeConfig[key] = value
      if (this.vm) {
        this.vm.$data.modeConfig[key] = value
      }
    })
  }
  // 给sse加订阅
  subscribeSSEEvents() {
    // 拦截所有SSE事件
    const eventTypes = ['onopen', 'onmessage', 'onend', 'onerror', 'oncancel', 'ontimeout', 'onfinally']
    eventTypes.forEach((eventType) => {
      this.tbcSSE.subscribe(eventType, (data) => {
        // 应用响应拦截器
        const processedData = this.sseResInterceptors.reduce(
          (acc, interceptor) => interceptor(acc, eventType) || acc,
          data,
        )

        // 根据事件类型调用相应的处理方法
        this.handleSSEEvent(eventType, processedData)
      })
    })
  }
  // 处理SSE事件
  handleSSEEvent(eventType, data) {
    switch (eventType) {
      case 'onopen':
        console.log('SSE连接已打开:', data)
        break
      case 'onmessage':
        console.log('接收到消息:', data)
        break
      case 'onend':
        console.log('SSE连接已关闭:', data)
        break
      case 'onerror':
        console.error('SSE发生错误:', data)
        break
      case 'oncancel':
        console.log('SSE请求已取消:', data)
        break
      case 'ontimeout':
        console.warn('SSE请求超时:', data)
        break
      case 'onfinally':
        console.log('SSE请求完成:', data)
        break
      default:
        console.warn(`未知事件类型: ${eventType}`, data)
    }
  }
  // 发送对话消息
  sendMsg(payload) {
    payload = deepmerge(this.apiConfig, payload)
    payload.params.sessionId = this.currentSessionId === APP_NEW_SESSTION_ID ? '' : this.currentSessionId
    payload.params.inputs.cookie = document.cookie
    payload.params.inputs.domain_name = this.prefix
    payload.params.elnSessionId = window.$cookies.get('eln_session_id') || ''
    payload.url = `https://${this.prefix}` + this.apiConfig.url
    if (WORK_FLOW_BOX_TYPES.includes(this.apiConfig.params.boxType)) {
      // 处理工作流类型的请求
    }
    if (NORMAL_BOX_TYPES.includes(this.apiConfig.params.boxType)) {
      // 处理普通类型的请求
      delete payload.params.inputs
    }
    const processedPayload = this.sseReqInterceptors.reduce((acc, interceptor) => interceptor(acc), payload)
    this.tbcSSE.sendSSE(processedPayload)
  }
  // 新增：终止SSE连接的方法
  terminateSSE() {
    this.tbcSSE.terminateWorker()
    console.log('SSE连接已终止')
  }

  // 新增：终止请求的方法
  terminateRequest(abortData) {
    this.tbcSSE.terminateRequest(abortData)
    console.log('SSE请求已终止')
  }
}

export default TbcAiApp
