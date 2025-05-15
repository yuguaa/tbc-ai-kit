<template>
  <div
    class="y-think y-mb-12 y-rounded-md y-border y-border-solid y-border-borderLight y-p-12 y-text-[14px] y-text-secondText"
  >
    <div class="y-flex y-h-22 y-items-center y-justify-between">
      <div class="y-flex y-items-center">
        <svg-icon icon-class="deep-think" />
        <span class="y-ml-4">{{ statusName }}</span>
        <!-- <span class="y-ml-8 y-text-[12px]">耗时{{ time }}</span> -->
      </div>
      <div
        class="y-flex y-h-22 y-w-22 y-cursor-pointer y-items-center y-justify-center y-rounded-[4px] hover:y-bg-borderLight"
        :style="getIconStyle"
        @click="toggle"
      >
        <svg-icon icon-class="arrow-up" />
      </div>
    </div>
    <div :class="{ 'y-h-0 y-overflow-hidden': isCollapsed, 'y-mt-4': !isCollapsed }">
      <slot />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/index.vue'
export default {
  name: 'ThinkBlock',
  components: {
    SvgIcon,
  },
  props: {
    status: {
      type: String,
      default: '',
    },
    startTime: {
      type: Number,
      default: 0,
    },
    endTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isCollapsed: false,
    }
  },
  computed: {
    time() {
      const duration = this.endTime - this.startTime
      const minutes = Math.floor(duration / 60000)
      const seconds = Math.floor((duration % 60000) / 1000)
      return `${minutes}分${seconds}秒`
    },
    getIconStyle() {
      return this.isCollapsed ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }
    },
    statusName() {
      const statusMap = {
        END: '已完成思考',
        START: '思考中...',
      }
      return statusMap[this.status] || '未知'
    },
  },
  methods: {
    toggle() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>
<style scoped lang="less">
.y-think {
  p {
    margin: 0;
  }
}
</style>
