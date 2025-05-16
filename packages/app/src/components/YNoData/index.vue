<template>
  <!-- 空数据组件的模板部分 -->
  <div class="ai-no-data">
    <img class="no-data-icon" src="@/assets/no-data.png" />
    <div v-if="text" class="no-data-text">
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'YNoData',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped>
/* 外层容器样式 */
.ai-no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'PingFang SC';
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}

.no-data-icon {
  width: 120px;
}

.no-data-text {
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.5;
}
</style>
