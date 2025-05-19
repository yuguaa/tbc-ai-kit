// main.js
import Vue from 'vue'
import '@/icons'
import '@/styles/tailwindcss.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false
import TbcAiApp from './core'

if (process.env.NODE_ENV === 'development') {
  window.$cookies.set('corp_code', 'lyv4')
  window.$cookies.set('eln_session_id', 'elnSessionId.f90cb7c333a348deb8d5a1dccb9630bf')

  // 开发模式下，body margin 0
  document.body.style.margin = '0'
  document.body.style.height = '100vh'
  new Vue({
    data() {
      return {
        pageConfig: {
          mode: 'page',
          modeFull: {
            size: {
              width: '100%',
              height: '100%',
            },
          },
          modeNormal: {
            size: {
              width: '50%',
              height: '100%',
            },
          },
          modeVisible: false,
          isShowSidebar: true,
          isFullMode: true,
          showHeaderCloseIcon: false,
          showHeaderToggleScreenIcon: true,
          showHeaderAvatarIcon: true,
          showHeaderMoreIcon: true,
          useSender: false,
        },
        modalConfig: {
          mode: 'modal',
          modeFull: {
            size: {
              width: '100%',
              height: '100%',
            },
          },
          modeNormal: {
            size: {
              width: '50%',
              height: '50%',
            },
          },
          modeVisible: true,
          isShowSidebar: true,
          isFullMode: false,
          showHeaderAvatarIcon: false,
        },
        drawerConfig: {
          mode: 'drawer',
          modeFull: {
            size: {
              width: '100%',
              height: '100%',
            },
          },
          modeNormal: {
            size: {
              width: '500px',
              height: '100%',
            },
          },
          modeVisible: true,
          isShowSidebar: true,
          isFullMode: false,
          showHeaderAvatarIcon: false,
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
        apiConfig: {
          params: {
            boxType: 'AT_017',
            // boxType: 'AT_004',
            types: 'SPARK',
          },
        },
        conversationApiConfig: {
          pageSize: 2,
        },
      })
      // 特殊模式
      // this.specialApp = new TbcAiApp(
      //   {
      //     target: '#special-app',
      //     modeConfig: {
      //       mode: 'page',
      //       modeFull: {
      //         size: {
      //           width: '100%',
      //           height: '100%',
      //         },
      //       },
      //       modeNormal: {
      //         size: {
      //           width: '50%',
      //           height: '100%',
      //         },
      //       },
      //       modeVisible: false,
      //       isShowSidebar: false,
      //       isFullMode: false,
      //       showHeaderCloseIcon: false,
      //       useSender: false,
      //       showHeaderSiderbarIcon: false,
      //       showHeaderNewChatIcon: false,
      //       showHeaderToggleScreenIcon: false,
      //       showHeaderMoreIcon: false,
      //     },
      //   },
      //   (pageApp) => {
      //     pageApp.sendMsg({
      //       params: {
      //         sendMsg: 'sdafasd ',
      //         sessionId: '26d1790a-4c9e-4d01-96dc-302121add0cd',
      //         types: 'SPARK',
      //         resourceType: '',
      //         resourceId: '',
      //         convId: '',
      //         boxType: 'AT_017',
      //         inputs: {
      //           cookie:
      //             'rtas_device_id=bb92c4ab-b339-4af3-a7b2-d2f7b783a9f2; local_=zh_CN; proStartMsg_e0aeebce5f2e45ef97f17c3f805968df_5736209990e74074b2e1a16815ebedf0=e0aeebce5f2e45ef97f17c3f805968df_5736209990e74074b2e1a16815ebedf0; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22196a8c96d8010c8-0209eba1e33452e-26011f51-2359296-196a8c96d811a9c%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk2YThjOTZkODAxMGM4LTAyMDllYmExZTMzNDUyZS0yNjAxMWY1MS0yMzU5Mjk2LTE5NmE4Yzk2ZDgxMWE5YyJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%7D; uuid_f05eae40-9a31-11e5-83f6-57006c315d67=ac3a85b1-f425-4cc6-a8f4-83f123892acf; uuid_02253ce0-2088-11ee-945f-f73ba1f1c579=9cfe4d4c-940f-4e86-a5b4-44f47bc9b421; changId=393b8894a2c9eb3c165eb4405bf5fa06; eln_session_id=elnSessionId.035824c66db14d45bf170e406820ee30; corp_code=jinj; nxYongdaoIp=; qimo_seosource_0=%E7%AB%99%E5%86%85; qimo_seokeywords_0=; qimo_seosource_f05eae40-9a31-11e5-83f6-57006c315d67=%E7%AB%99%E5%86%85; qimo_seokeywords_f05eae40-9a31-11e5-83f6-57006c315d67=; qimo_xstKeywords_f05eae40-9a31-11e5-83f6-57006c315d67=; href=https%3A%2F%2Fcloud.21tb.com%2Frtr-admin-frontend%2Findex%3F_%3Da7d702d0ab1a47399327d5645a439868; tbc-ai-robot-name=%E5%B0%8F%E7%A6%BE; qimo_seosource_02253ce0-2088-11ee-945f-f73ba1f1c579=%E7%AB%99%E5%86%85; qimo_seokeywords_02253ce0-2088-11ee-945f-f73ba1f1c579=; qimo_xstKeywords_02253ce0-2088-11ee-945f-f73ba1f1c579=; accessId=02253ce0-2088-11ee-945f-f73ba1f1c579; pageViewNum=8',
      //           domain_name: 'cloud.21tb.com',
      //           question: 'sdafasd ',
      //         },
      //         elnSessionId: 'elnSessionId.f90cb7c333a348deb8d5a1dccb9630bf',
      //       },
      //     })
      //   },
      // )
      // this.specialApp.useSSERequestInterceptor((params) => {
      //   console.log('请求拦截器', params)
      //   return params
      // })
      // this.specialApp.useSSEResponseInterceptor((params) => {
      //   console.log('响应拦截器', params)
      //   return params
      // })
      // sse请求和响应拦截器
      // this.pageApp.useSSERequestInterceptor((params) => {
      //   console.log('请求拦截器', params)
      //   return params
      // })
      // this.pageApp.useSSEResponseInterceptor((params) => {
      //   console.log('响应拦截器', params)
      //   return params
      // })
      // // api请求和响应拦截器
      // this.pageApp.useAPIRequestInterceptor((params, type) => {
      //   console.log('请求拦截器', params, type)
      //   return params
      // })
      // this.pageApp.useAPIResponseInterceptor((params, type) => {
      //   console.log('响应拦截器', params, type)
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

    render(h) {
      return h('div', { class: 'y-h-screen' }, [
        h('div', { attrs: { id: 'special-app' } }),
        h('div', { attrs: { id: 'modal-app' } }),
        h('div', { attrs: { id: 'page-app' } }),
        h('div', { attrs: { id: 'drawer-app' } }),
        //特殊模式
      ])
    },
  }).$mount('#app')
}

export default TbcAiApp
