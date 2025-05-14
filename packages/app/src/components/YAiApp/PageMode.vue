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
              <span class="y-ml-4">AI智能助手</span>
            </div>
          </div>
          <div class="y-layout-sidebar-content y-overflow-auto y-p-20 y-scrollbar-common">
            <YConversation :showIcon="!modeConfig.modeIsFull" :showBack="!modeConfig.modeIsFull" />
          </div>
        </div>
      </div>
      <div class="y-layout-main y-box-border y-flex y-h-full y-flex-1 y-flex-col y-overflow-hidden y-p-8">
        <div class="y-layout-content y-flex y-flex-1 y-flex-col y-overflow-hidden y-rounded-[8px]">
          <div
            class="y-layout-header y-box-border y-flex y-h-52 y-shrink-0 y-select-none y-items-center y-justify-between y-px-20 y-py-12 y-text-[20px]"
          >
            <div class="y-flex y-items-center y-gap-12">
              <template v-if="modeConfig.modeIsFull && !modeConfig.modeShowSidebar">
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
                <img class="y-h-28 y-w-28 y-rounded-full" src="https://www.picsum.photos/100/100" alt="" srcset="" />
              </div>
            </div>
          </div>
          <div class="y-flex-1 y-overflow-auto y-scrollbar-common">
            <div class="y-layout-content-inner">
              <y-messages :messages="bubbleList"></y-messages>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import SvgIcon from '@/components/SvgIcon'
import YConversation from '@/components/YConversation'
import YPopper from '@/components/YPopper'
import YMessages from '@/components/YMessages'
export default {
  name: 'YLayout',
  components: {
    SvgIcon,
    YConversation,
    YPopper,
    YMessages,
  },
  props: AI_APP_PROPS,
  data() {
    return {
      bubbleList: [],
    }
  },
  computed: {
    getLayoutStyle() {
      if (this.modeConfig.mode === 'page') {
        return {
          width: this.modeConfig.modeIsFull ? this.modeConfig.modeFullSize : this.modeConfig.modeNormalSize,
        }
      } else if (this.modeConfig.mode === 'modal') {
        return {
          width: '100%',
          height: '100%',
        }
      } else if (this.modeConfig.mode === 'drawer') {
        return {
          width: '100%',
          height: '100%',
        }
      }
      return {}
    },
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
