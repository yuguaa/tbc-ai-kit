<!-- Message.vue -->
<template>
  <transition-group
    name="message"
    tag="div"
    class="y-fixed y-left-1/2 y-top-8 y-z-50 y-mt-16 y-flex y-w-full y-max-w-2xl y-flex-col y-space-y-2"
    style="transform: translate(-50%)"
  >
    <div v-for="message in messages" :key="message.id" class="y-flex y-w-full y-justify-center">
      <div class="y-flex y-space-x-2 y-rounded-[4px] y-px-12 y-py-4 y-shadow-custom" :style="getStyle(message.type)">
        <div class="y-text-[14px]">{{ message.content }}</div>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'YMessage',
  data() {
    return {
      messages: [],
      maxCount: 3, // 最大显示数量
    }
  },
  methods: {
    addMessage(content, type = 'info', duration = 3) {
      if (typeof content !== 'string' || !content) return
      if (!['success', 'error', 'info', 'warning', 'loading'].includes(type)) {
        type = 'info'
      }

      // 限制最大显示数量
      if (this.messages.length >= this.maxCount) {
        this.messages.shift()
      }

      const id = Date.now()
      this.messages.push({ id, content, type })

      if (duration > 0 && type !== 'loading') {
        setTimeout(() => {
          this.removeMessage(id)
        }, duration * 1000)
      }

      // 对于 loading 状态，返回手动关闭函数
      if (type === 'loading') {
        return () => this.removeMessage(id)
      }
    },
    removeMessage(id) {
      this.messages = this.messages.filter((message) => message.id !== id)
    },
    getStyle(type) {
      switch (type) {
        case 'success':
          return { background: '#36AD6A', color: '#fff' }
        case 'error':
          return { background: '#DE576D', color: '#fff' }
        case 'info':
          return { background: '#2080F0', color: '#fff' }
        case 'warning':
          return { background: '#F0A020', color: '#fff' }
        case 'loading':
          return { background: '#a3a6ab', color: '#fff' }
        default:
          return { background: '#dcdfe6', color: '#fff' }
      }
      // switch (type) {
      //   case 'success':
      //     return { background: 'rgba(24,160, 88, 0.2)', color: '#606266' } //border: '1px solid #36AD6A'
      //   case 'error':
      //     return { background: 'rgba(222, 87,109, 0.2)', color: '#606266' } //border: '1px solid #DE576D'
      //   case 'info':
      //     return { background: 'rgba(32,128,240, 0.2)', color: '#606266' } //border: '1px solid #2080F0'
      //   case 'warning':
      //     return { background: 'rgba(240,160, 32, 0.2)', color: '#606266' } //border: '1px solid #F0A020'
      //   case 'loading':
      //     return { background: 'rgba(144, 147, 153, 0.2)', color: '#606266' } //border: '1px solid #a3a6ab'
      //   default:
      //     return { background: 'rgba(220, 223, 230, 0.2)', color: '#606266' } //border: '1px solid #dcdfe6'
      // }
    },
  },
}
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}
.message-enter,
.message-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
