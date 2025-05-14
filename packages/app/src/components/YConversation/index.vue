<template>
  <div class="y-flex y-flex-col">
    <div class="y-flex y-shrink-0 y-justify-between">
      <div class="y-flex y-items-center">
        <svg-icon icon-class="chats" />
        <div class="y-ml-8">历史对话</div>
      </div>
      <div v-if="showBack" class="y-flex y-cursor-pointer y-items-center" @click="clickBack">
        <svg-icon icon-class="arrow-left" />
        <div>返回</div>
      </div>
    </div>
    <div class="y-flex-1 y-overflow-y-auto">
      <template v-if="Object.keys(conversationGroup).length">
        <div class="y-mt-20 y-text-secondText" v-for="(value, key) in conversationGroup" :key="key">
          <div class="y-mb-4">{{ key }}</div>
          <div>
            <div
              class="y-flex y-cursor-pointer y-items-center y-rounded-[8px] y-px-12 y-py-8 hover:y-bg-borderLight"
              :class="{
                'y-bg-second': conversation.sessionId === activeSessionId,
                'y-text-main': conversation.sessionId === activeSessionId,
              }"
              v-for="conversation in value"
              :key="conversation.sessionId"
              @click="goSession(conversation.sessionId)"
            >
              <svg-icon v-if="showIcon" class-name="y-mr-8" icon-class="comment-rectange" />
              <div>{{ conversation.sessionName }}</div>
            </div>
          </div>
        </div>
      </template>
      <div v-else>222</div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'YConversation',
  components: {
    SvgIcon,
  },
  props: {
    activeSessionId: {
      type: String,
      default: '11',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    conversationGroup: {
      type: Object,
      default: () => {
        return {
          '2025-04-03': [
            {
              sessionId: '11',
              sessionName: '历史对话标题',
            },
            {
              sessionId: '12',
              sessionName: '历史对话标题',
            },
          ],
          '2025-04-04': [
            {
              sessionId: '21',
              sessionName: '历史对话标题',
            },
            {
              sessionId: '22',
              sessionName: '历史对话标题',
            },
          ],
        }
      },
    },
  },
  methods: {
    // 点击返回按钮时触发的事件，向父组件发送 click-back 事件
    clickBack() {
      this.$emit('click-back')
    },
    // 点击会话项时触发的事件，向父组件发送 go-session 事件并传递 sessionId
    goSession(sessionId) {
      this.$emit('go-session', sessionId)
    },
  },
}
</script>
