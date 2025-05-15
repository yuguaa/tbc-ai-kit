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
            <y-conversation :showIcon="!modeConfig.modeIsFull" :showBack="!modeConfig.modeIsFull" />
          </div>
        </div>
      </div>
      <div
        class="y-layout-main y-box-border y-flex y-h-full y-flex-1 y-flex-col y-overflow-hidden"
        :class="modeConfig.modeIsFull ? 'y-p-8' : ''"
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
              <div class="y-select-text y-text-[16px] y-font-[600]">当前对话的标题</div>
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
          <div class="y-box-border y-flex y-flex-1 y-flex-col y-items-center">
            <div class="y-relative y-box-border y-flex y-w-full y-flex-1 y-flex-col y-items-center y-overflow-hidden">
              <div
                class="y-absolute y-bottom-0 y-right-0 y-top-0 y-box-border y-flex y-h-full y-w-full y-flex-col-reverse y-items-center y-overflow-hidden y-overflow-y-auto y-scrollbar-common"
              >
                <div class="y-messages-holder y-flex-1"></div>
                <div
                  class="y-box-border y-flex y-flex-col"
                  :class="modeConfig.modeIsFull ? '' : 'y-px-20  y-pr-0'"
                  :style="getMessagesStyle"
                >
                  <y-messages :messages="bubbleList"></y-messages>
                </div>
              </div>
            </div>
            <div
              class="y-box-border"
              :class="modeConfig.modeIsFull ? 'y-pb-20' : 'y-px-20  y-pb-20'"
              :style="getMessagesStyle"
            >
              <y-sender ref="YSender" :sender.sync="sender" @submit="senderSubmit" @stop="senderStop">
                <div v-if="!modeConfig.modeIsFull" class="y-pb-12">
                  <div class="y-flex">
                    <y-button>
                      <template #icon>
                        <svg-icon icon-class="new-chat" />
                      </template>
                      <span>创建新对话</span>
                    </y-button>
                    <y-button class="y-ml-12">
                      <template #icon>
                        <svg-icon icon-class="history" />
                      </template>
                      <span>历史对话记录</span>
                    </y-button>
                  </div>
                </div>
              </y-sender>
            </div>
          </div>
        </div>
      </div>
    </div>
    <YMessage ref="YMessage" />
  </div>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import SvgIcon from '@/components/SvgIcon'
import YConversation from '@/components/YConversation'
import YPopper from '@/components/YPopper'
import YMessages from '@/components/YMessages'
import YSender from '@/components/YSender'
import YButton from '@/components/YButton'
import YMessage from '@/components/YMessage'
export default {
  name: 'YLayout',
  components: {
    SvgIcon,
    YConversation,
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
      bubbleList: [1, 2, 3],
    }
  },
  computed: {
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
  },
  mounted() {
    setInterval(() => {
      if (this.bubbleList.length < 50) {
        this.bubbleList.push(this.bubbleList.length + 1)
      }
    }, 100)
  },
  methods: {
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
      console.log('senderStop')
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
  background-image: url('~@/assets/main.png');
  background-size: cover;
}
</style>
