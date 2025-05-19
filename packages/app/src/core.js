import deepmerge from 'deepmerge'
import Vue from 'vue'
import YAiApp from '@/components/YAiApp'
import {
  // APP_NEW_SESSTION_ID,
  APP_DEFAULT_TARGET_DOM,
  DEFAULT_MODE_CONFIG,
  DEFAULT_API_CONFIG,
  DEFAULT_CONVERSATION_API_CONFIG,
  // NORMAL_BOX_TYPES,
  // WORK_FLOW_BOX_TYPES,
  getApiConfigByConfig,
  getConversationApiConfig,
} from '@/const/aiApp'
import { gainChatDomain } from '@/api'
class TbcAiApp {
  vm = null // Vue 实例，视图展示
  pageApp = null // 页面实例
  modeConfig = {} // 模式配置
  apiConfig = {} // API 配置
  sseReqInterceptors = [] // 请求拦截器
  sseResInterceptors = [] // 响应拦截器
  apiReqInterceptors = [] // 请求拦截器
  apiResInterceptors = [] // 响应拦截器
  prefix = '' // 域名
  constructor({ target, modeConfig = {}, apiConfig = {}, conversationApiConfig }, cb) {
    if (!target) {
      const app = document.createElement('div')
      app.id = APP_DEFAULT_TARGET_DOM
      document.body.appendChild(app)
      target = `#${APP_DEFAULT_TARGET_DOM}`
    }
    this.conversationApiConfig = deepmerge(DEFAULT_CONVERSATION_API_CONFIG, conversationApiConfig || {})
    this.modeConfig = deepmerge(DEFAULT_MODE_CONFIG, modeConfig)
    apiConfig = deepmerge(DEFAULT_API_CONFIG, apiConfig)
    this.apiConfig = getApiConfigByConfig(apiConfig)
    this.conversationApi = getConversationApiConfig(apiConfig, this.conversationApiConfig)
    gainChatDomain()
      .then(({ bizResult }) => {
        this.prefix = bizResult
        const provider = {
          modeConfig: this.modeConfig,
          setModeConfig: this.setModeConfig.bind(this),
          setModeConfigItem: this.setModeConfigItem.bind(this),
          setPageApp: this.setPageApp.bind(this),
          apiConfig: this.apiConfig,
          prefix: this.prefix,
          sseReqInterceptors: this.sseReqInterceptors,
          sseResInterceptors: this.sseResInterceptors,
          apiReqInterceptors: this.apiReqInterceptors,
          apiResInterceptors: this.apiResInterceptors,
          conversationApi: this.conversationApi,
          conversationApiConfig: this.conversationApiConfig,
          cb,
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
  useAPIRequestInterceptor(interceptor) {
    this.apiReqInterceptors.push(interceptor)
  }
  useAPIResponseInterceptor(interceptor) {
    this.apiResInterceptors.push(interceptor)
  }
  // 请求拦截器
  useSSERequestInterceptor(interceptor) {
    this.sseReqInterceptors.push(interceptor)
  }
  // 响应拦截器
  useSSEResponseInterceptor(interceptor) {
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
  setPageApp(pageApp) {
    console.log(`🚀 ~ pageApp:`, pageApp)
    this.pageApp = pageApp
  }
}

export default TbcAiApp
