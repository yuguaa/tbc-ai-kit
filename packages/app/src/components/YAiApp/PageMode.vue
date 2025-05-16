<template>
  <div
    class="y-layout y-relative y-box-border y-flex y-h-full y-w-full y-flex-col y-bg-[#F5F7FB] y-text-mainText y-transition-all y-duration-300"
    :style="getLayoutStyle"
  >
    <div class="y-layout-container y-flex y-h-full y-flex-1 y-overflow-hidden">
      <div
        v-if="modeConfig.modeIsFull"
        :class="[
          'y-layout-sidebar y-h-full  y-shrink-0 y-flex-col y-transition-all y-duration-300',
          !modeConfig.modeShowSidebar ? 'y-w-0' : 'y-w-[280px]',
        ]"
      >
        <div
          class="y-relative y-flex y-h-full y-w-[280px] y-shrink-0 y-flex-col y-transition-all y-duration-300"
          :class="{
            'y-sidebar-main': !modeConfig.modeShowSidebar,
          }"
        >
          <div class="y-layout-sidebar-header y-shrink-0 y-px-20">
            <div class="y-mt-20 y-flex y-items-center y-justify-between y-text-[16px]">
              <span>AI智能助手</span>
              <svg-icon class="y-cursor-pointer y-text-[20px]" icon-class="leftside" @click="closeSiderbar"></svg-icon>
            </div>
            <div
              class="y-mt-20 y-flex y-cursor-pointer y-items-center y-rounded-[8px] y-border y-border-solid y-border-borderDark y-bg-white y-px-16 y-py-[7px] y-text-secondText y-transition-all y-duration-300 hover:y-shadow-custom"
            >
              <svg-icon class="y-text-[14px]" icon-class="new-chat"></svg-icon>
              <span class="y-ml-4">新会话</span>
            </div>
          </div>
          <div class="y-layout-sidebar-content y-overflow-auto y-p-20 y-scrollbar-common">
            <y-conversations
              :showIcon="!modeConfig.modeIsFull"
              :showBack="!modeConfig.modeIsFull"
              :conversations="conversations"
              :value="currentSessionId"
              @go="changeSession"
            />
          </div>
        </div>
      </div>
      <div
        class="y-layout-main y-box-border y-flex y-h-full y-flex-1 y-flex-col y-overflow-hidden y-transition-all y-duration-300"
        :class="modeConfig.modeIsFull ? 'y-p-8 y-pl-0' : ''"
      >
        <div class="y-layout-content y-flex y-flex-1 y-flex-col y-overflow-hidden y-rounded-[8px]">
          <div
            class="y-layout-header y-box-border y-flex y-h-52 y-shrink-0 y-select-none y-items-center y-justify-between y-px-20 y-py-12 y-text-[20px]"
          >
            <div class="y-flex y-items-center y-gap-12" v-if="modeConfig.modeIsFull">
              <template v-if="!modeConfig.modeShowSidebar">
                <span class="y-p-4">
                  <svg-icon class="y-cursor-pointer" icon-class="leftside" @click="openSiderbar"></svg-icon>
                </span>
                <y-popper
                  :options="{
                    placement: 'bottom',
                    modifiers: { offset: { offset: '0,5px' } },
                  }"
                >
                  <span>新对话</span>
                  <span slot="reference" class="y-box-border y-flex y-rounded-[4px] y-p-4 hover:y-bg-borderLight">
                    <svg-icon class="y-cursor-pointer" icon-class="new-chat" @click="newChat"></svg-icon>
                  </span>
                </y-popper>
              </template>
              <div class="y-select-text y-text-[16px] y-font-[600]">{{ currentConversationName }}</div>
            </div>
            <div class="y-flex y-items-center y-text-[16px]" v-else>
              <span>AI智能助手</span>
            </div>
            <div class="y-flex y-items-center y-gap-20">
              <span class="y-p-4">
                <svg-icon class="y-cursor-pointer" icon-class="more"></svg-icon>
              </span>
              <y-popper
                :options="{
                  placement: 'bottom',
                  modifiers: { offset: { offset: '0,5px' } },
                }"
              >
                <span>{{ modeConfig.modeIsFull ? '小屏幕' : '全屏' }}</span>
                <span
                  slot="reference"
                  class="y-box-border y-flex y-rounded-[4px] y-p-4 hover:y-bg-borderLight"
                  @click="toggleScreen"
                >
                  <svg-icon
                    class="y-cursor-pointer"
                    :icon-class="modeConfig.modeIsFull ? 'launchscreen' : 'fullscreen'"
                  ></svg-icon>
                </span>
              </y-popper>
              <span class="y-p-4">
                <svg-icon class="y-cursor-pointer" icon-class="close"></svg-icon>
              </span>
              <div class="y-flex y-h-28 y-w-28 y-items-center y-justify-center y-rounded-full">
                <img
                  class="y-h-28 y-w-28 y-rounded-full y-bg-borderDark"
                  src="https://www.picsum.photos/100/100"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>
          <div class="y-page-main y-relative y-box-border y-flex y-flex-1 y-flex-col y-items-center">
            <template>
              <div class="y-relative y-box-border y-flex y-w-full y-flex-1 y-flex-col y-items-center y-overflow-hidden">
                <div
                  class="y-absolute y-bottom-0 y-right-0 y-top-0 y-box-border y-flex y-h-full y-w-full y-flex-col-reverse y-items-center y-overflow-hidden y-overflow-y-auto y-scrollbar-common"
                >
                  <div class="y-messages-holder y-flex-1"></div>
                  <div
                    class="y-box-border y-flex y-flex-col"
                    :class="modeConfig.modeIsFull ? '' : 'y-px-20'"
                    :style="getMessagesStyle"
                  >
                    <y-messages :messages="messages"></y-messages>
                  </div>
                </div>
              </div>
              <div
                class="y-box-border"
                :class="modeConfig.modeIsFull ? 'y-pb-20' : 'y-px-20  y-pb-20'"
                :style="getMessagesStyle"
              >
                <y-sender
                  ref="YSender"
                  :sender.sync="sender"
                  :isGenerating="isGenerating"
                  @submit="senderSubmit"
                  @stop="senderStop"
                >
                  <div v-if="!modeConfig.modeIsFull" class="y-pb-12">
                    <div class="y-flex">
                      <y-button>
                        <template #icon>
                          <svg-icon icon-class="new-chat" />
                        </template>
                        <span>创建新对话</span>
                      </y-button>
                      <y-button
                        class="y-ml-12"
                        @click="
                          () => {
                            showMiniConversations = true
                          }
                        "
                      >
                        <template #icon>
                          <svg-icon icon-class="history" />
                        </template>
                        <span>历史对话记录</span>
                      </y-button>
                    </div>
                  </div>
                </y-sender>
              </div>
            </template>
            <transition name="y-conversations-mini">
              <div
                v-if="!modeConfig.modeIsFull && showMiniConversations"
                class="y-absolute y-box-border y-flex y-h-full y-w-full y-flex-1 y-flex-col y-items-center y-overflow-hidden y-bg-white"
              >
                <div
                  class="y-conversations-mini-content y-absolute y-bottom-0 y-right-0 y-top-0 y-box-border y-flex y-h-full y-w-full y-flex-col y-items-center y-overflow-hidden y-overflow-y-auto y-p-20 y-scrollbar-common"
                >
                  <!-- 非全屏状态下的conversations -->
                  <y-conversations
                    :showIcon="!modeConfig.modeIsFull"
                    :showBack="!modeConfig.modeIsFull"
                    :conversations="conversations"
                    :value="currentSessionId"
                    @back="showMiniConversations = false"
                    @go="changeSession"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <YMessage ref="YMessage" />
  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import { APP_NEW_SESSTION_ID, NORMAL_BOX_TYPES, WORK_FLOW_BOX_TYPES, AI_APP_PROPS } from '@/const/aiApp'

import SvgIcon from '@/components/SvgIcon'
import YConversations from '@/components/YConversations'
import YPopper from '@/components/YPopper'
import YMessages from '@/components/YMessages'
import YSender from '@/components/YSender'
import YButton from '@/components/YButton'
import YMessage from '@/components/YMessage'
export default {
  name: 'YLayout',
  components: {
    SvgIcon,
    YConversations,
    YPopper,
    YMessages,
    YSender,
    YButton,
    YMessage,
  },
  props: AI_APP_PROPS,
  data() {
    return {
      sender: {
        content: '',
        deepThink: false,
        useType: 'LOCAL', // LOCAL or SPARK
      },
      conversations: [],
      currentSessionId: APP_NEW_SESSTION_ID,
      currentConversation: {},
      page: {
        pageSize: 0,
        pageNum: 1,
      },
      pageCount: 0,
      defaultPageSize: 30,
      showMiniConversations: false,
    }
  },
  computed: {
    isGenerating() {
      return this.conversations.some((item) => {
        return item && item.messages && item.messages.some((message) => message && message.isGenerating)
      })
    },
    messages() {
      return this.conversations.find((item) => item.sessionId === this.currentSessionId)?.messages || []
    },
    getLayoutStyle() {
      if (this.modeConfig.mode === 'modal' || this.modeConfig.mode === 'drawer') {
        return {
          width: '100%',
          height: '100%',
        }
      }
      if (this.modeConfig.modeIsFull) {
        return this.modeConfig.modeFull[this.modeConfig.mode]
      } else {
        return this.modeConfig.modeNormal[this.modeConfig.mode]
      }
    },
    getMessagesStyle() {
      if (this.modeConfig.modeIsFull) {
        return this.modeConfig.modeFull.messages
      } else {
        return this.modeConfig.modeNormal.messages
      }
    },
    currentConversationName() {
      return this.currentConversation.sessionName
    },
  },
  mounted() {
    this.page.pageSize = this.modeConfig.pageSize || this.defaultPageSize
    this.subscribeSSEEvents()
    this.getConversationList()
  },
  methods: {
    getConversationList() {
      const params = {
        boxType: this.apiConfig.params.boxType,
      }
      if (this.modeConfig.historyType === 'limit') {
        //限制获取30条
      }
      if (this.modeConfig.historyType === 'page') {
        //分页获取
        this.pageCount++
        params.pageNum = this.page.pageSize * this.pageCount
      }
      this.conversationApi(params)
        .then(({ bizResult }) => {
          this.conversations = bizResult
        })
        .catch((err) => {
          console.error(err)
          this.$refs.YMessage.addMessage('获取对话列表失败', 'error')
        })
    },
    closeSiderbar() {
      this.setModeConfigItem('modeShowSidebar', false)
    },
    openSiderbar() {
      this.setModeConfigItem('modeShowSidebar', true)
    },
    newChat() {
      console.log('newChat')
    },
    toggleScreen() {
      this.setModeConfigItem('modeIsFull', !this.modeConfig.modeIsFull)
    },
    senderSubmit() {
      if (this.sender.content.trim() !== '') {
        this.$refs.YSender.clear()
        const params = {
          sendMsg: this.sender.content,
          types: this.sender.useType,
          resourceType: '',
          resourceId: '',
          convId: '',
          inputs: {
            question: this.sender.content,
          },
        }
        this.sendMsg({ params })
      } else {
        this.$refs.YMessage.addMessage('请先填写内容', 'warning')
      }
    },
    senderStop() {
      this.tbcSSE.terminateRequest(JSON.stringify({ close: true }))
    },
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
    },
    // 处理SSE事件
    handleSSEEvent(eventType, data) {
      const lastBubble = this.currentConversation.messages[this.currentConversation.messages.length - 1]
      let parsedData
      switch (eventType) {
        case 'onopen':
          break
        case 'onmessage':
          parsedData = JSON.parse(data.event.data)
          lastBubble.id = parsedData.conversation_id
          lastBubble.answer += data.data || ''
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
          lastBubble.isGenerating = false
          break
        default:
          console.warn(`未知事件类型: ${eventType}`, data)
      }
    },
    // 发送对话消息
    sendMsg(payload) {
      this.senderStop()
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
      if (this.currentSessionId === APP_NEW_SESSTION_ID) {
        //新对话需要添加对话
        const hasNewConversation = this.conversations.some((item) => item.sessionId === APP_NEW_SESSTION_ID)
        if (!hasNewConversation) {
          this.conversations.push({
            sessionId: APP_NEW_SESSTION_ID,
            sessionName: payload.params.sendMsg,
            messages: [],
            createTime: Date.now(),
          })
        }
      }
      this.currentConversation = this.conversations.find((item) => item.sessionId === this.currentSessionId)
      console.log(`🚀 ~ this.currentConversation:`, this.currentConversation)
      const newMessage = {
        question: payload.params.sendMsg,
        answer: '',
        id: 'bubble-' + Date.now(),
        isGenerating: true,
      }
      this.currentConversation.messages.push(newMessage)

      this.tbcSSE.sendSSE(processedPayload)
    },
    // 新增：终止SSE连接的方法
    terminateSSE() {
      this.tbcSSE.terminateWorker()
      console.log('SSE WORKER 连接已终止')
    },
    changeSession({ sessionId }) {
      if (sessionId === this.currentSessionId) {
        return
      }
      this.showMiniConversations = false
      this.currentSessionId = sessionId
      this.currentConversation = this.conversations.find((item) => item.sessionId === sessionId)
      this.getConversationMessages()
    },
    getConversationMessages() {},
  },
}
</script>
<style lang="less" scoped>
.y-layout {
  box-sizing: border-box;
}
.y-sidebar-main {
  transform: translate(-100%);
}
.y-layout-content {
  // background-image: url('~@/assets/main.png');
  background-image: linear-gradient(to bottom, #e8f3ff, white 10%, white);
  background-size: cover;
}

.y-conversations-mini-enter-active,
.y-conversations-mini-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.y-conversations-mini-enter,
.y-conversations-mini-leave-to {
  opacity: 0;
}

.y-conversations-mini-enter .y-conversations-mini-content,
.y-conversations-mini-leave-to .y-conversations-mini-content {
  transform: translateX(100%);
}

.y-conversations-mini-enter-active .y-conversations-mini-content,
.y-conversations-mini-leave-active .y-conversations-mini-content {
  transition: transform 0.3s ease-in-out;
}

.y-conversations-mini-content {
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}
</style>
