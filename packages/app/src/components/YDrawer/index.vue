<template>
  <transition name="y-drawer">
    <div
      v-if="visible"
      class="y-drawer-overlay y-fixed y-inset-0 y-z-50 y-bg-black y-bg-opacity-85"
      @click="handleOverlayClick"
    >
      <div
        :style="drawerStyle"
        class="y-drawer-content y-fixed y-bottom-0 y-right-0 y-top-0 y-overflow-auto y-bg-white y-shadow-lg"
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
  name: 'YDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '30%', // 默认宽度为屏幕的30%
    },
  },
  computed: {
    drawerStyle() {
      return {
        width: this.getDrawerWidth(),
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
      return widthMap[this.width] || this.width
    },
    handleOverlayClick() {
      // 点击遮罩层直接关闭抽屉
      this.close()
    },
  },
}
</script>

<style scoped>
/* 抽屉滑入滑出动画 */
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

/* 确保内容区域支持滚动 */
.y-drawer-content {
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}
</style>
