<template>
  <transition name="y-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-if="visible"
      class="y-modal-overlay y-fixed y-inset-0 y-flex y-items-center y-justify-center y-bg-black y-bg-opacity-85"
      :style="{ zIndex: zIndex }"
      @click="handleOverlayClick"
    >
      <div
        :style="modalStyle"
        class="y-modal-content y-relative y-rounded y-bg-white y-shadow-lg y-transition-all y-duration-300"
        @click.stop
      >
        <slot name="header" v-if="showHeader">
          <button
            class="close-btn y-absolute y-right-2 y-top-2 y-cursor-pointer y-rounded y-bg-gray-100 y-px-2 y-py-1 y-text-sm hover:y-bg-gray-200"
            @click="close"
          >
            关闭
          </button>
        </slot>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { modalUtils } from '@/utils/modalUtils'

export default {
  name: 'YModal',
  props: {
    width: {
      type: String,
      default: '80%',
    },
    height: {
      type: String,
      default: '100px',
    },
    showHeader: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '80%',
    },
  },
  data() {
    return {
      zIndex: 1000,
      isClosing: false, // 标记是否正在关闭（动画进行中）
    }
  },
  computed: {
    modalStyle() {
      return {
        width: this.width || this.getModalWidth(),
        height: this.height || '100%',
      }
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.isClosing = false // 重置关闭状态
        this.zIndex = modalUtils.openModal() // 打开时获取 z-index
      } else {
        this.isClosing = true // 标记为关闭中，等待动画结束
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    getModalWidth() {
      const sizeMap = {
        small: '300px',
        medium: '500px',
        large: '800px',
      }
      return sizeMap[this.size] || this.size
    },
    handleOverlayClick() {
      this.close()
    },
    afterEnter() {
      // 动画进入完成，可用于其他逻辑（此处无需额外处理）
    },
    afterLeave() {
      // 动画离开完成后解除滚动
      if (this.isClosing) {
        modalUtils.closeModal()
        this.isClosing = false // 重置状态
      }
    },
  },
  beforeDestroy() {
    if (this.visible || this.isClosing) {
      modalUtils.closeModal() // 清理状态
    }
  },
}
</script>

<style scoped>
.y-fade-enter-active,
.y-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.y-fade-enter,
.y-fade-leave-to {
  opacity: 0;
}
</style>
