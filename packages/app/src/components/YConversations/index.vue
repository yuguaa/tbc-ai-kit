<template>
  <div
    class="y-flex y-w-full y-flex-col"
    :class="{
      'y-h-full': !conversations.length,
    }"
  >
    <div class="y-flex y-shrink-0 y-justify-between">
      <div class="y-flex y-items-center">
        <svg-icon icon-class="chats" />
        <div class="y-ml-8">历史对话</div>
      </div>
      <div v-if="showBack" class="y-flex y-cursor-pointer y-items-center" @click="clickBack">
        <svg-icon icon-class="arrow-left" />
        <div class="y-ml-4">返回</div>
      </div>
    </div>
    <div class="y-flex-1 y-overflow-y-auto">
      <template v-if="conversations.length">
        <div class="y-mt-20 y-text-secondText" v-for="(list, key) in conversationGroup" :key="key">
          <div class="y-mb-4">{{ key }}</div>
          <div>
            <div
              class="y-flex y-cursor-pointer y-items-center y-rounded-[8px] y-px-12 y-py-8 hover:y-bg-borderLight"
              :class="{
                'y-bg-second': conversation.sessionId === value,
                'y-text-main': conversation.sessionId === value,
              }"
              v-for="conversation in list"
              :key="conversation.sessionId"
              @click="goSession(conversation)"
            >
              <div v-if="showIcon" class="y-mr-8 y-flex y-items-center y-justify-center">
                <svg-icon icon-class="comment-rectange" />
              </div>
              <div class="y-overflow-hidden y-text-ellipsis y-text-nowrap" :title="conversation.sessionName">
                {{ conversation.sessionName }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <y-no-data v-else text="暂无历史会话"></y-no-data>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import YNoData from '@/components/YNoData'
export default {
  name: 'YConversations',
  components: {
    SvgIcon,
    YNoData,
  },
  props: {
    conversations: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // 将 conversations 数组转换为按日期分组的对象
    conversationGroup() {
      return this.conversations.reduce((acc, conversation) => {
        const date = new Date(conversation.createTime)
        const dateString = date.toISOString().split('T')[0]
        if (!acc[dateString]) {
          acc[dateString] = []
        }
        acc[dateString].push(conversation) // 先正常 push
        acc[dateString].sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
        return acc
      }, {})
    },
  },
  methods: {
    clickBack() {
      this.$emit('back')
    },
    goSession(conversation) {
      this.$emit('go', conversation)
      this.$emit('input', conversation.sessionId)
    },
  },
}
</script>
