<template>
  <div class="y-loading">
    <div class="y-loading-wrap" v-if="loading">
      <div class="y-loading-dots">
        <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YLoading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.y-loading {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 40px; /* 为了避免没有内容时布局破坏 */
}

.y-loading .y-loading-wrap {
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}

.y-loading-dots .dot {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 26px;
  height: 26px;
  transform: rotate(45deg);
  animation: yRotate 1.2s infinite linear;
}

.y-loading-dots .dot i {
  position: absolute;
  display: block;
  width: 12px;
  height: 12px;
  background-color: #0065cc;
  border-radius: 100%;
  opacity: 30%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  animation: ySpinMove 1s infinite linear alternate;
}

.y-loading-dots .dot i:nth-child(1) {
  top: 0;
  left: 0;
}

.y-loading-dots .dot i:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: 0.4s;
}

.y-loading-dots .dot i:nth-child(3) {
  right: 0;
  bottom: 0;
  animation-delay: 0.8s;
}

.y-loading-dots .dot i:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1.2s;
}

@keyframes yRotate {
  to {
    transform: rotate(405deg);
  }
}

@keyframes ySpinMove {
  to {
    opacity: 100%;
  }
}
</style>
