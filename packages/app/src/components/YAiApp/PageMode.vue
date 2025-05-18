<template>
  <div
    class="y-layout y-relative y-m-auto y-box-border y-flex y-h-full y-w-full y-flex-col y-bg-[#F5F7FB] y-text-mainText y-transition-all y-duration-300"
    :style="getLayoutStyle"
  >
    <div class="y-layout-container y-flex y-h-full y-flex-1 y-overflow-hidden">
      <div
        v-if="modeConfig.isFullMode"
        :class="[
          'y-layout-sidebar y-h-full  y-shrink-0 y-flex-col y-transition-all y-duration-300',
          !modeConfig.isShowSidebar ? 'y-w-0' : 'y-w-[280px]',
        ]"
      >
        <div
          class="y-relative y-flex y-h-full y-w-[280px] y-shrink-0 y-flex-col y-transition-all y-duration-300"
          :class="{
            'y-sidebar-main': !modeConfig.isShowSidebar,
          }"
        >
          <div class="y-layout-sidebar-header y-shrink-0 y-px-20">
            <div class="y-mt-20 y-flex y-items-center y-justify-between y-text-[16px]">
              <span>AI智能助手</span>
              <svg-icon class="y-cursor-pointer y-text-[20px]" icon-class="leftside" @click="closeSiderbar"></svg-icon>
            </div>
            <div
              class="y-mt-20 y-flex y-cursor-pointer y-items-center y-rounded-[8px] y-border y-border-solid y-border-borderDark y-bg-white y-px-16 y-py-[7px] y-text-secondText y-transition-all y-duration-300 hover:y-shadow-custom"
              @click="newChat"
            >
              <svg-icon class="y-text-[14px]" icon-class="new-chat"></svg-icon>
              <span class="y-ml-4">新会话</span>
            </div>
          </div>
          <div
            v-if="conversations.length"
            class="y-layout-sidebar-content y-layout-conversation-scroll-el y-overflow-auto y-p-20 y-scrollbar-common"
            @scroll="onConversationsScroll"
          >
            <y-conversations
              :showIcon="!modeConfig.isFullMode"
              :showBack="!modeConfig.isFullMode"
              :conversations="conversations"
              :value="currentSessionId"
              @go="changeSession"
            />
          </div>
          <y-no-data v-else text="暂无历史会话"></y-no-data>
        </div>
      </div>
      <div
        class="y-layout-main y-box-border y-flex y-h-full y-flex-1 y-flex-col y-overflow-hidden y-transition-all y-duration-300"
        :class="modeConfig.isFullMode ? 'y-p-8 y-pl-0' : ''"
      >
        <div class="y-layout-content y-flex y-flex-1 y-flex-col y-overflow-hidden y-rounded-[8px]">
          <div
            class="y-layout-header y-box-border y-flex y-h-52 y-shrink-0 y-select-none y-items-center y-justify-between y-px-20 y-py-12 y-text-[20px]"
          >
            <div class="y-flex y-items-center y-gap-12" v-if="modeConfig.isFullMode">
              <template v-if="!modeConfig.isShowSidebar">
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
                v-if="modeConfig.showHeaderToggleScreenIcon"
                :options="{
                  placement: 'bottom',
                  modifiers: { offset: { offset: '0,5px' } },
                }"
              >
                <span>{{ modeConfig.isFullMode ? '小屏幕' : '全屏' }}</span>
                <span
                  slot="reference"
                  class="y-box-border y-flex y-rounded-[4px] y-p-4 hover:y-bg-borderLight"
                  @click="toggleScreen"
                >
                  <svg-icon
                    class="y-cursor-pointer"
                    :icon-class="modeConfig.isFullMode ? 'launchscreen' : 'fullscreen'"
                  ></svg-icon>
                </span>
              </y-popper>
              <span class="y-p-4" v-if="modeConfig.showHeaderCloseIcon">
                <svg-icon class="y-cursor-pointer" icon-class="close" @click="closePage"></svg-icon>
              </span>
              <div
                v-if="modeConfig.showHeaderAvatarIcon"
                class="y-flex y-h-28 y-w-28 y-items-center y-justify-center y-rounded-full"
              >
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
                    :class="modeConfig.isFullMode ? '' : 'y-px-20'"
                    :style="getMessagesStyle"
                  >
                    <y-messages :messages="messages"></y-messages>
                  </div>
                </div>
              </div>
              <div
                class="y-box-border"
                :class="modeConfig.isFullMode ? 'y-pb-20' : 'y-px-20  y-pb-20'"
                :style="getMessagesStyle"
              >
                <y-sender
                  ref="YSender"
                  :sender.sync="sender"
                  :isGenerating="currentIsGenerating"
                  @submit="senderSubmit"
                  @stop="stopSendMsg"
                >
                  <div v-if="!modeConfig.isFullMode" class="y-pb-12">
                    <div class="y-flex">
                      <y-button>
                        <template #icon>
                          <svg-icon icon-class="new-chat" />
                        </template>
                        <span>创建新对话</span>
                      </y-button>
                      <y-button class="y-ml-12" @click="showConversation">
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
                v-if="!modeConfig.isFullMode && showMiniConversations"
                class="y-absolute y-box-border y-flex y-h-full y-w-full y-flex-1 y-flex-col y-items-center y-overflow-hidden y-bg-white"
              >
                <div
                  class="y-conversations-mini-content y-layout-conversation-scroll-el y-absolute y-bottom-0 y-right-0 y-top-0 y-box-border y-flex y-h-full y-w-full y-flex-col y-items-center y-overflow-hidden y-overflow-y-auto y-p-20 y-scrollbar-common"
                  @scroll="onConversationsScroll"
                >
                  <!-- 非全屏状态下的conversations -->
                  <y-conversations
                    :showIcon="!modeConfig.isFullMode"
                    :showBack="!modeConfig.isFullMode"
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
class RetriableError extends Error {}
class FatalError extends Error {}
import axios from 'axios'
import deepmerge from 'deepmerge'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { APP_NEW_SESSTION_ID, NORMAL_BOX_TYPES, WORK_FLOW_BOX_TYPES, AI_APP_PROPS } from '@/const/aiApp'
import { queryChatLogList, getJSONData, saveChat } from '@/api'
import SvgIcon from '@/components/SvgIcon'
import YConversations from '@/components/YConversations'
import YPopper from '@/components/YPopper'
import YMessages from '@/components/YMessages'
import YSender from '@/components/YSender'
import YButton from '@/components/YButton'
import YMessage from '@/components/YMessage'
import YNoData from '@/components/YNoData'
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
    YNoData,
  },
  props: AI_APP_PROPS,
  data() {
    return {
      sender: {
        content: '',
        deepThink: false,
        useType: this.apiConfig.params.types, // LOCAL or SPARK
      },
      newSesstionId: APP_NEW_SESSTION_ID, // 会话并没有真正创建成功，临时存储
      conversations: [],
      currentSessionId: APP_NEW_SESSTION_ID,
      currentConversation: {
        messages: [],
        sources: [],
        sessionName: '新会话',
        createTime: new Date().getTime(),
        sessionId: APP_NEW_SESSTION_ID,
      },
      page: {
        pageSize: this.conversationApiConfig.pageSize,
        pageNum: 1,
      },
      isConversationsLoading: false,
      hasMore: true,
      pageCount: 0,
      total: 0,
      showMiniConversations: false,
    }
  },
  computed: {
    currentIsGenerating() {
      return this.currentConversation.messages?.some((message) => message && message.isGenerating)
    },
    isGenerating() {
      return this.conversations.some((item) => {
        return item && item.messages && item.messages.some((message) => message && message.isGenerating)
      })
    },
    messages() {
      return (this.currentConversation && this.currentConversation.messages) || []
    },
    getLayoutStyle() {
      if (this.modeConfig.mode === 'modal' || this.modeConfig.mode === 'drawer') {
        return {
          width: '100%',
          height: '100%',
        }
      }
      if (this.modeConfig.isFullMode) {
        return this.modeConfig.modeFull.size
      } else {
        return this.modeConfig.modeNormal.size
      }
    },
    getMessagesStyle() {
      if (this.modeConfig.isFullMode) {
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
    this.getConversations()
  },
  methods: {
    createSource() {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      if (!this.currentConversation.sources) {
        this.currentConversation.sources = []
      }
      this.currentConversation.sources.push(source)
      return source
    },
    cancelRequest() {
      const sources = this.currentConversation.sources
      if (sources && sources.length > 0) {
        sources.forEach((source) => {
          source.cancel({
            type: 'TBC_AI_APP_CANCEL',
          })
        })
        this.currentConversation.sources = []
      }
    },
    executeInterceptors(interceptorName, interceptorType, data) {
      return this[interceptorName].reduce((acc, interceptor) => {
        return interceptor(acc, interceptorType) || acc
      }, data)
    },
    onConversationsScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        this.getConversations()
      }
    },
    showConversation() {
      this.showMiniConversations = true
      this.checkConversationFull()
    },
    getConversations() {
      if (this.isConversationsLoading || !this.hasMore) {
        return
      }
      this.isConversationsLoading = true
      const params = {
        boxType: this.apiConfig.params.boxType,
      }
      if (this.conversationApiConfig.mode === 'limit') {
        //限制获取30条
      }
      if (this.conversationApiConfig.mode === 'page') {
        //分页获取
        this.pageCount++
        params['page.pageSize'] = this.page.pageSize * this.pageCount
        params['page.pageNo'] = 1
        params.searchBySelf = true
      }
      const postData = this.executeInterceptors('apiReqInterceptors', 'getConversations', params)
      this.conversationApi(postData)
        .then((res) => {
          this.isConversationsLoading = false
          const result = this.executeInterceptors('apiResInterceptors', 'getConversations', res)
          this.conversations = result.bizResult || result.data.items || []
          if (this.conversationApiConfig.mode === 'page') {
            this.total = result.data.total
          } else {
            this.total = result.bizResult.length
          }
          this.hasMore = this.conversations.length < this.total
          this.checkConversationFull()
        })
        .catch((err) => {
          this.isConversationsLoading = false
          console.error(err)
          this.$refs.YMessage.addMessage('获取对话列表失败', 'error')
        })
    },
    checkConversationFull() {
      // 检测是否撑满容器
      this.$nextTick(() => {
        const scrollEl = document.querySelector('.y-layout-conversation-scroll-el')
        if (!scrollEl) return
        if (scrollEl.scrollHeight <= scrollEl.clientHeight && this.hasMore) {
          this.getConversations() // 自动加载下一页
        }
      })
    },
    closeSiderbar() {
      this.setModeConfigItem('isShowSidebar', false)
    },
    openSiderbar() {
      this.setModeConfigItem('isShowSidebar', true)
      this.checkConversationFull()
    },
    closePage() {
      this.setModeConfigItem('modeVisible', false)
    },
    newChat() {
      if (this.currentSessionId === APP_NEW_SESSTION_ID) {
        this.$refs.YMessage.addMessage('已在新会话', 'warning')
        return
      } else {
        this.cancelRequest()
        this.currentSessionId = APP_NEW_SESSTION_ID
        this.currentConversation = {
          //创建新对话，但是不展示在侧边栏，当第一条请求结束再展示
          messages: [],
          sources: [],
          sessionName: '新会话',
          createTime: new Date().getTime(),
          sessionId: APP_NEW_SESSTION_ID,
        }
      }
    },
    toggleScreen() {
      this.setModeConfigItem('isFullMode', !this.modeConfig.isFullMode)
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
        this.$refs.YMessage.addMessage('请先输入想要问的问题~', 'warning')
      }
    },
    stopSendMsg() {
      const currentIsGenerating = this.currentConversation.messages.some((item) => item.isGenerating)
      if (currentIsGenerating) {
        this.currentConversation.abortController?.abort()
        this.currentConversation.abortController = null
        this.currentConversation.messages.forEach((item) => {
          if (item.isGenerating) {
            item.isGenerating = false
          }
        })
      }
    },
    // 发送对话消息
    async sendMsg(payload) {
      payload = deepmerge(this.apiConfig, payload)
      payload.params.sessionId = this.currentSessionId === APP_NEW_SESSTION_ID ? '' : this.currentSessionId
      payload.params.convId =
        this.currentConversation.sessionId === APP_NEW_SESSTION_ID ? '' : this.currentConversation.sessionId
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
      const processedPayload = this.executeInterceptors('sseReqInterceptors', 'sendMsg', payload)
      if (this.currentSessionId === APP_NEW_SESSTION_ID) {
        // 新会话需要先创建一个会话id
        const newChatParams = {
          sessionId: '',
          sessionName: payload.params.sendMsg,
        }
        const newChatPostData = this.executeInterceptors('apiReqInterceptors', 'newChat', newChatParams)
        const { bizResult } = await saveChat(newChatPostData)
        this.newSesstionId = bizResult.sessionId // 会话并没有真正创建成功，临时存储
        payload.params.sessionId = this.newSesstionId
        this.currentConversation.sessionName = payload.params.sendMsg
      }
      const newMessage = {
        question: payload.params.sendMsg,
        answer: '',
        id: 'message-' + Date.now(),
        isGenerating: true,
      }
      // 兼容报错没有拉取到messages
      if (!this.currentConversation.messages) {
        this.currentConversation.messages = []
      }
      this.currentConversation.messages.push(newMessage)
      this.currentConversation.abortController = new AbortController()
      fetchEventSource(processedPayload.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedPayload.params),
        signal: this.currentConversation.abortController.signal,

        // 连接打开时回调, 解决重复请求问题，传递onopen参数
        onopen(response) {
          if (response.ok) {
            return // everything's good
          } else if (response.status !== 200) {
            throw new FatalError()
          } else {
            throw new RetriableError()
          }
        },
        // 收到事件时调用
        onmessage: (event) => {
          event = this.executeInterceptors('sseResInterceptors', 'onmessage', event)
          let data, lastMessage, currentMessageConversationId, currentMessageConversation
          try {
            data = JSON.parse(event.data)
          } catch (error) {
            data = event.data
          }
          if (data.event === 'message') {
            // FIXME: 由于自定义返回div导致数据格式不统一，没有conversation_id导致报错，正常应该只保留下一行
            console.log(`🚀 ~ data.conversation_id:`, data.conversation_id)
            currentMessageConversationId = data.conversation_id
            // FIXME:如果没有conversation_id，使用当前会话id,需要处理,防止报错的临时写法
            if (!currentMessageConversationId) {
              currentMessageConversationId = this.currentSessionId
            }
            if (
              currentMessageConversationId &&
              this.currentSessionId === APP_NEW_SESSTION_ID &&
              this.newSesstionId !== APP_NEW_SESSTION_ID
            ) {
              this.currentSessionId = currentMessageConversationId
              this.currentConversation.sessionId = currentMessageConversationId
              this.newSesstionId = APP_NEW_SESSTION_ID
              this.conversations.push(this.currentConversation)
            } else {
              currentMessageConversation = this.conversations.find(
                (item) => item.sessionId === currentMessageConversationId,
              )
              // FIXME:如果没有conversation_id，使用当前会话id,需要处理,防止报错的临时写法
              if (!currentMessageConversation) {
                currentMessageConversation = this.conversations.find((item) => item.sessionId === APP_NEW_SESSTION_ID)
              }
              if (currentMessageConversation) {
                lastMessage = currentMessageConversation.messages[currentMessageConversation.messages.length - 1]
                lastMessage.answer += data.answer || ''
              }
            }
          } else if (data.event === 'message_end' || data.event === 'workflow_finished') {
            currentMessageConversationId = data.conversation_id
            currentMessageConversation = this.conversations.find(
              (item) => item.sessionId === currentMessageConversationId,
            )
            if (currentMessageConversation) {
              lastMessage = currentMessageConversation.messages[currentMessageConversation.messages.length - 1]
            }
            if (lastMessage) {
              lastMessage.isGenerating = false
            }
          } else {
            // console.log('未知事件类型:', data.event)
          }
        },
        // 连接关闭时调用
        onclose: () => {
          this.currentConversation.abortController = null
          this.currentConversation.messages.forEach((item) => {
            if (item.isGenerating) {
              item.isGenerating = false
            }
          })
        },

        // 请求发生错误时调用
        onerror: (error) => {
          console.error('发生错误:', error)
          this.currentConversation.abortController = null
          this.currentConversation.messages.forEach((item) => {
            if (item.isGenerating) {
              item.isGenerating = false
            }
          })
          // 这里抛出错误，fetchEventSource 会自动尝试重连
          throw error
        },
        openWhenHidden: true,
        headersTimeout: processedPayload.timeout,
      })
    },
    changeSession({ sessionId }) {
      if (sessionId === this.currentSessionId) {
        return
      }
      // FIXME: 由于后端返回的会话id和当前会话id不一致，导致报错，临时处理
      this.currentConversation.abortController?.abort()
      this.currentConversation.messages.forEach((item) => {
        if (item.isGenerating) {
          item.isGenerating = false
        }
      })

      this.cancelRequest()
      this.showMiniConversations = false
      this.currentSessionId = sessionId
      this.newSesstionId = APP_NEW_SESSTION_ID
      this.currentConversation = this.conversations.find((item) => item.sessionId === sessionId)
      const currentIsGenerating = this.currentConversation.messages?.some((item) => item.isGenerating)
      if (!currentIsGenerating) {
        this.getConversationMessages()
      }
    },
    getConversationMessages() {
      const params = {
        sessionId: this.currentSessionId,
      }
      const postData = this.executeInterceptors('apiReqInterceptors', 'getConversationMessages', params)
      queryChatLogList(postData, this.createSource)
        .then(async ({ bizResult }) => {
          const jsonList = bizResult.map((el) => el.fileTextUrl)
          const jsonData = await Promise.all(jsonList.map((url) => getJSONData(url, this.createSource)))
          const messages = jsonData.reduce((acc, cur, index) => {
            const bubble = {
              ...cur,
              id: 'message-' + index,
            }
            acc.push(bubble)
            return acc
          }, [])
          this.$set(this.currentConversation, 'messages', messages || [])
        })
        .catch((err) => {
          console.error(err)
          if (err.message.type === 'TBC_AI_APP_CANCEL') {
            return
          }
          this.$refs.YMessage.addMessage('获取会话历史消息失败', 'error')
        })
    },
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
  background-image: linear-gradient(to bottom, #e8f3ff, white 60px, white);
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
