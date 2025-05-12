<template>
  <!-- 使用 template 模板渲染 TbcAiApp 组件 -->
  <TbcAiApp :config="config" ref="tbcAiAppRef" @init="init" />
</template>

<script>
import TbcAiApp from '@/components/AiApp/index.vue'

export default {
  components: {
    TbcAiApp, // 注册 TbcAiApp 组件
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          mode: 'mini', // full hide mini
        }
      },
    },
  },
  data() {
    return {
      tbcAiApp: null, // 用于存储 TbcAiApp 实例的引用
    }
  },
  mounted() {
    // 组件挂载时的生命周期钩子
  },
  methods: {
    init(tbcAiApp) {
      // 初始化方法，用于设置 tbcAiApp 的引用
      this.tbcAiApp = tbcAiApp
    },
  },
}
</script>

<style lang="less">
html,
body {
  width: 100%; /* 设置页面宽度为 100% */
  height: 100%; /* 设置页面高度为 100% */
  padding: 0; /* 去除内边距 */
  margin: 0; /* 去除外边距 */
  background: white; /* 设置背景颜色为白色 */
  overflow: hidden;
}
</style>
