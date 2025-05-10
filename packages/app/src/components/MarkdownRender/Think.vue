<template>
  <div class="y-mt-2 y-p-2 y-border y-border-red-300 y-rounded-md y-border-solid y-bg-red-50">
    <div class="y-flex y-items-center y-justify-between">
      <h3 class="y-text-lg y-font-bold">Think vue comp</h3>
      <div class="y-text-sm y-bg-red-200 y-cursor-pointer y-p-2 y-rounded-sm" @click="toggle">
        {{ isCollapsed ? '展开' : '折叠' }}
      </div>
    </div>
    <div :class="{ 'y-h-50 y-overflow-hidden': isCollapsed }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThinkBlock',
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  methods: {
    toggle() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
