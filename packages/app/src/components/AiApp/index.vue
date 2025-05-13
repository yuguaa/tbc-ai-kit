<!-- AIApp.vue -->
<template>
  <div class="ai-app y-relative y-h-full y-w-full">
    <!-- page 模式：直接渲染在 DOM 上，无动画 -->
    <div
      v-if="config.mode === 'page' && visible"
      :style="sizeStyle"
      class="page-content y-rounded y-border y-border-gray-200 y-bg-white y-p-4"
    >
      <slot></slot>
    </div>

    <!-- modal 模式：自定义弹窗，带淡入淡出动画 -->
    <transition name="fade">
      <div
        v-if="config.mode === 'modal' && visible"
        class="modal-overlay y-fixed y-inset-0 y-z-50 y-flex y-items-center y-justify-center y-bg-black y-bg-opacity-50"
      >
        <div
          :style="modalStyle"
          class="modal-content y-relative y-overflow-auto y-rounded y-bg-white y-p-4 y-shadow-lg"
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

    <!-- drawer 模式：自定义抽屉，带滑入滑出动画 -->
    <transition name="slide">
      <div v-if="config.mode === 'drawer' && visible" class="drawer-container y-fixed y-inset-0 y-z-50">
        <div :style="drawerStyle" class="drawer-content y-overflow-auto y-bg-white y-p-4 y-shadow-lg">
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
  </div>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'

export default {
  name: 'AIApp',
  props: AI_APP_PROPS,
  computed: {
    // page 模式的样式
    sizeStyle: function () {
      const size = this.config.size
      const sizeMap = {
        full: '100%',
        large: '80%',
        medium: '60%',
        mini: '40%',
      }

      const width = sizeMap[size] || (/^\d+%$/.test(size) || /^\d+px$/.test(size) ? size : '80%')
      const height = size === 'full' || size === '100%' ? '100%' : 'auto'

      return {
        width: width,
        height: height,
        boxSizing: 'border-box',
      }
    },
    // modal 模式的样式
    modalStyle: function () {
      const size = this.config.size
      const sizeMap = {
        full: '100%',
        large: '80%',
        medium: '60%',
        mini: '40%',
      }

      const width = sizeMap[size] || (/^\d+%$/.test(size) || /^\d+px$/.test(size) ? size : '80%')
      const height = size === 'full' || size === '100%' ? '100%' : 'auto'

      return {
        width: width,
        height: height,
        maxHeight: '80vh', // 限制最大高度，避免溢出
        minHeight: '300px',
        position: 'relative',
      }
    },
    // drawer 模式的样式
    drawerStyle: function () {
      const size = this.config.size
      const sizeMap = {
        full: '100%',
        large: '80%',
        medium: '50%',
        mini: '30%',
      }

      const width = sizeMap[size] || (/^\d+%$/.test(size) || /^\d+px$/.test(size) ? size : '50%')

      return {
        width: width,
        height: '100%',
        position: 'fixed',
        top: '0',
        right: '0',
      }
    },
  },
  watch: {
    // 监听 visible 变化，控制页面滚动
    visible: function (val) {
      document.body.style.overflow =
        val && (this.config.mode === 'modal' || this.config.mode === 'drawer') ? 'hidden' : ''
    },
  },
  methods: {
    // 关闭 modal 或 drawer
    close: function () {
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style scoped>
/* modal 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* drawer 滑入滑出动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
