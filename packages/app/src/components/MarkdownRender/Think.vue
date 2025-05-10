<template>
  <div class="think-block">
    <div class="think-header">
      <span>{{ status }}</span>
      <button class="toggle-btn" @click="toggle">
        {{ isCollapsed ? '展开' : '折叠' }}
      </button>
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
