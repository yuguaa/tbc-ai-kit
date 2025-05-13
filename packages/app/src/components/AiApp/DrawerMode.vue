<template>
  <div>
    <!-- 页面模式 -->
    <div v-if="mode === 'page'" class="y-h-screen y-w-full y-bg-white">
      <div class="y-p-4">
        <Conversation />
        <Sender :mode="mode" />
      </div>
    </div>

    <!-- 弹窗模式 -->
    <div
      v-else-if="mode === 'modal'"
      class="y-fixed y-inset-0 y-flex y-items-center y-justify-center y-bg-black/50"
      v-show="isVisible"
    >
      <div class="y-relative y-rounded-lg y-bg-white y-shadow-lg" :style="{ width: computedWidth, padding: '1.5rem' }">
        <button class="y-absolute y-right-2 y-top-2 y-text-gray-500" @click="close">×</button>
        <Sender :mode="mode" />
      </div>
    </div>

    <!-- 抽屉模式 -->
    <div
      v-else-if="mode === 'drawer'"
      class="y-fixed y-inset-y-0 y-right-0 y-transform y-bg-white y-shadow-lg y-transition-transform"
      :class="{ 'y-translate-x-0': isVisible, 'y-translate-x-full': !isVisible }"
      :style="{ width: computedWidth }"
    >
      <div class="y-p-4">
        <button class="y-mb-4 y-text-gray-500" @click="close">关闭</button>
        <Sender :mode="mode" />
      </div>
    </div>
  </div>
</template>

<script>
import Sender from '@/components/Sender'
import Conversation from '@/components/Conversation'
export default {
  name: 'AiApp',
  components: {
    Sender,
    Conversation,
  },
  props: {
    mode: {
      type: String,
      default: 'page', // 支持 'page'、'modal'、'drawer'
    },
    width: {
      type: [String, Number],
      default: '70%', // 默认宽度
    },
    size: {
      type: String,
      default: '', // 可选值：'small'、'medium'、'large'
    },
  },
  data() {
    return {
      isVisible: true, // 控制弹窗或抽屉的显示状态
    }
  },
  computed: {
    computedWidth() {
      if (this.size === 'small') return '300px'
      if (this.size === 'medium') return '500px'
      if (this.size === 'large') return '800px'
      return typeof this.width === 'number' ? `${this.width}px` : this.width
    },
  },
  methods: {
    close() {
      this.isVisible = false // 关闭弹窗或抽屉
    },
  },
}
</script>

<style scoped>
/* 抽屉模式的过渡动画 */
.y-transition-transform {
  transition: transform 0.3s ease-in-out;
}
</style>
