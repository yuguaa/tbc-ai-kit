import deepmerge from 'deepmerge'
import Vue from 'vue'
import YAiApp from '@/components/YAiApp'
import TbcSSE from '@21tb/tbc-sse'
import {
  // APP_NEW_SESSTION_ID,
  APP_DEFAULT_TARGET_DOM,
  DEFAULT_MODE_CONFIG,
  // NORMAL_BOX_TYPES,
  // WORK_FLOW_BOX_TYPES,
  getApiConfigByConfig,
  getConversationApiConfig,
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
    conversationApiConfig = {
      mode: '',
      pageSize: 20,
    },
  }) {
    if (!target) {
      const app = document.createElement('div')
      app.id = APP_DEFAULT_TARGET_DOM
      document.body.appendChild(app)
      target = `#${APP_DEFAULT_TARGET_DOM}`
    }
    this.conversationApiConfig = conversationApiConfig
    this.modeConfig = deepmerge(DEFAULT_MODE_CONFIG, modeConfig)
    this.apiConfig = getApiConfigByConfig(apiConfig)
    this.conversationApi = getConversationApiConfig(apiConfig, this.conversationApiConfig)
    gainChatDomain()
      .then(({ bizResult }) => {
        this.prefix = bizResult
        const provider = {
          modeConfig: this.modeConfig,
          setModeConfig: this.setModeConfig.bind(this),
          setModeConfigItem: this.setModeConfigItem.bind(this),
          apiConfig: this.apiConfig,
          prefix: this.prefix,
          sseReqInterceptors: this.sseReqInterceptors,
          sseResInterceptors: this.sseResInterceptors,
          tbcSSE: this.tbcSSE,
          conversationApi: this.conversationApi,
          conversationApiConfig: this.conversationApiConfig,
        }
        this.vm = new Vue({
          data() {
            return provider
          },
          mounted() {},
          methods: {},
          render(h) {
            return h(YAiApp, {
              props: this.$data,
              attrs: this.$data,
            })
          },
        }).$mount(target)
      })
      .catch((err) => {
        console.error('获取域名失败', err)
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
}

export default TbcAiApp
