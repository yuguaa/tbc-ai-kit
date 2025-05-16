<template>
  <div
    class="y-think y-mb-12 y-rounded-md y-border y-border-solid y-border-borderLight y-p-12 y-text-[14px] y-text-secondText"
  >
    <div class="y-flex y-h-22 y-items-center">
      <div class="y-flex y-items-center">
        <span :class="{ 'deep-think': status !== 'END' }">
          <svg-icon icon-class="deep-think" />
        </span>
        <span class="y-ml-4">{{ statusName }}</span>
        <!-- <span class="y-ml-8 y-text-[12px]">耗时{{ time }}</span> -->
      </div>
      <div
        class="y-ml-12 y-flex y-cursor-pointer y-items-center y-justify-center y-rounded-[4px] y-px-4 hover:y-bg-borderLight"
        @click="toggle"
      >
        <div class="y-mr-4 y-select-none">{{ isCollapsed ? '展开' : '收起' }}</div>
        <div class="y-flex y-items-center y-justify-center" :style="getIconStyle">
          <svg-icon icon-class="arrow-up" />
        </div>
      </div>
    </div>
    <div
      :class="{
        'y-think-content y-h-0 y-overflow-hidden': isCollapsed,
        'y-think-content y-think-content-show': !isCollapsed,
      }"
    >
      <div>
        <slot />
      </div>
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
<style lang="less" scoped>
.y-think {
  p {
    margin: 0;
  }
  .deep-think {
    // 一直旋转动画
    animation: rotate 2s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .y-think-content {
    transition: all 0.3s linear;
    position: relative;
    padding-left: 14px;
    display: block;
    color: #8b8b8b;
    font-size: 12px;
    &::before {
      content: ' ';
      display: block;
      height: calc(100% - 8px);
      margin-top: 4px;
      width: 2px;
      background: #d9d9d9;
      position: absolute;
      left: 0;
      border-radius: 4px;
    }
    &-hide {
      height: 0;
      overflow: hidden;
    }
    &-show {
      margin-top: 4px;
      overflow: hidden;
    }
  }
}
</style>
