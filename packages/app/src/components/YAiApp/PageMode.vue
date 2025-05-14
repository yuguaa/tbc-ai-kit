<template>
  <div class="y-layout y-relative y-box-border y-flex y-h-full y-w-full y-flex-col y-bg-[#F5F7FB]">
    <div class="y-layout-container y-flex y-h-full y-flex-1 y-overflow-hidden">
      <div class="y-layout-sidebar y-flex y-h-full y-w-[280px] y-shrink-0 y-flex-col">
        <div class="y-layout-sidebar-header y-shrink-0 y-px-20">
          <div class="y-mt-20 y-flex y-items-center y-justify-between y-text-[16px]">
            <span>AI智能助手</span>
            <svg-icon class="y-text-[20px]" icon-class="leftside"></svg-icon>
          </div>
        </div>
        <div class="y-layout-sidebar-content y-overflow-auto y-scrollbar-common">
          <div v-for="(item, index) in 100" :key="index">{{ item }}</div>
        </div>
      </div>
      <div class="y-layout-main y-box-border y-flex y-h-full y-flex-1 y-flex-col y-overflow-hidden y-p-4">
        <div class="y-layout-content y-flex y-flex-1 y-flex-col y-overflow-hidden y-rounded-[8px]">
          <div class="y-layout-header y-flex y-h-52 y-shrink-0 y-items-center">
            <slot name="header">
              <div class="y-header-title">Header</div>
            </slot>
          </div>

          <div class="y-layout-content y-flex-1 y-overflow-auto y-scrollbar-common">
            <div class="y-layout-content-inner">
              <slot name="content">
                <div v-for="(item, index) in 100" :key="index">{{ item }}</div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'YLayout',
  components: {
    SvgIcon,
  },
  props: AI_APP_PROPS,
  data() {
    return {}
  },

  methods: {},
}
</script>
<style lang="less" scoped>
.y-layout {
  box-sizing: border-box;
}
.y-layout-content {
  background-image: url('~@/assets/main.png');
  background-size: cover;
}
</style>
