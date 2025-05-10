<template>
  <div v-if="status !== 'UN_START'">
    <div class="y-flex y-items-center">
      <div>
        <span v-if="status === 'THINKING'">思考中...</span>
        <span v-else-if="status === 'THINK_END'">思考结束</span>
      </div>
      <div
        @click="isCollapsed = !isCollapsed"
        class="y-cursor-pointer y-text-blue-500 y-text-sm y-ml-2 y-p-1 y-border y-border-blue-500 y-rounded-md"
      >
        {{ isCollapsed ? '展开' : '折叠' }}
      </div>
    </div>
    <div
      :class="{
        'y-h-4': isCollapsed,
        'y-h-auto': !isCollapsed,
        'y-overflow-hidden': isCollapsed
      }"
      v-html="content"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ThinkBlock',
  props: {
    status: {
      type: String,
      default: 'UN_START'
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>

<style scoped></style>
