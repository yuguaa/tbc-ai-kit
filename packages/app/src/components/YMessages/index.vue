<template>
  <div class="y-messages">
    <div class="y-flex y-flex-col">
      <div class="y-messages-item y-flex y-flex-col" v-for="(item, index) in messages" :key="index">
        <div class="y-messages-item-section y-mb-24 y-flex y-flex-col">
          <div
            class="y-messages-item-section-q y-ml-auto y-box-border y-rounded-l-[12px] y-rounded-br-[2px] y-rounded-tr-[20px] y-px-16 y-py-12 y-text-[16px] y-text-white"
          >
            {{ item.question }}
          </div>
        </div>
        <div class="y-messages-item-section y-mb-24 y-flex y-flex-col">
          <div class="y-mr-auto">
            <y-markdown-render v-if="item.answer" :content="item.answer" />
            <div class="y-dot-loading" v-else>
              正在加载中<span class="y-dot y-dot-1">.</span><span class="y-dot y-dot-2">.</span
              ><span class="y-dot y-dot-3">.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YMarkdownRender from '@/components/YMarkdownRender'
export default {
  components: {
    YMarkdownRender,
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },

  methods: {},
}
</script>
<style scoped lang="less">
.y-messages-item-section-q {
  background: linear-gradient(270deg, #1159ff 0%, #2d8cff 100%);
}
</style>
<style scoped>
.y-dot {
  display: inline-block;
  animation: y-jump 1.5s infinite;
}

.y-dot-1 {
  animation-delay: 0s;
}
.y-dot-2 {
  animation-delay: 0.2s;
}
.y-dot-3 {
  animation-delay: 0.4s;
}

@keyframes y-jump {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}
</style>
