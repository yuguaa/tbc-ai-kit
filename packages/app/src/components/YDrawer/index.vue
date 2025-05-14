<template>
  <transition name="y-drawer" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-if="visible"
      class="y-drawer-overlay y-fixed y-inset-0 y-bg-black y-bg-opacity-85"
      :style="{ zIndex: zIndex }"
      @click="handleOverlayClick"
    >
      <div
        :style="drawerStyle"
        class="y-drawer-content y-ovderflow-hidden y-fixed y-bottom-0 y-right-0 y-top-0 y-overflow-auto y-bg-white y-shadow-lg"
        @click.stop
      >
        <slot v-if="showHeader" name="header">
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
  name: 'YDrawer',
  props: {
    showHeader: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '30%',
    },
    size: {
      type: String,
      default: 'medium', // small, medium, large
    },
  },
  data() {
    return {
      zIndex: 1000,
      isClosing: false, // 标记是否正在关闭（动画进行中）
    }
  },
  computed: {
    drawerStyle() {
      return {
        width: this.width || this.getDrawerWidth(),
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
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
    getDrawerWidth() {
      const widthMap = {
        small: '300px',
        medium: '500px',
        large: '800px',
      }
      return widthMap[this.size] || this.size
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
.y-drawer-enter-active,
.y-drawer-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.y-drawer-enter,
.y-drawer-leave-to {
  opacity: 0;
}

.y-drawer-enter .y-drawer-content,
.y-drawer-leave-to .y-drawer-content {
  transform: translateX(100%);
}

.y-drawer-enter-active .y-drawer-content,
.y-drawer-leave-active .y-drawer-content {
  transition: transform 0.3s ease-in-out;
}

.y-drawer-content {
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}
</style>
