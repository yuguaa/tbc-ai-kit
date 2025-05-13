<template>
  <transition name="y-fade">
    <div
      v-if="visible"
      class="y-modal-overlay y-fixed y-inset-0 y-z-50 y-flex y-items-center y-justify-center y-bg-black y-bg-opacity-85"
      @click="handleOverlayClick"
    >
      <div
        :style="modalStyle"
        class="y-modal-content y-relative y-overflow-auto y-rounded y-bg-white y-p-4 y-shadow-lg"
        @click.stop
      >
        <button
          class="close-btn y-absolute y-right-2 y-top-2 y-cursor-pointer y-rounded y-bg-gray-100 y-px-2 y-py-1 y-text-sm hover:y-bg-gray-200"
          @click="close"
        >
          关闭
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'YModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '80%',
    },
    maxHeight: {
      type: String,
      default: '80vh',
    },
    minHeight: {
      type: String,
      default: '500px',
    },
  },
  computed: {
    modalStyle() {
      return {
        width: this.getModalWidth(),
        maxHeight: this.maxHeight,
        minHeight: this.minHeight,
        height: 'auto',
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
      // 直接关闭模态框，因为内容区域的点击已被阻止冒泡
      this.close()
    },
  },
}
</script>

<style scoped>
/* modal 淡入淡出动画 */
.y-fade-enter-active,
.y-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.y-fade-enter,
.y-fade-leave-to {
  opacity: 0;
}

/* 确保模态框内容区域支持滚动 */
.y-modal-content {
  box-sizing: border-box;
}
</style>
