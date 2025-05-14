<template>
  <div class="y-messages">
    <div class="y-flex y-flex-col">
      <div v-for="(item, index) in messages" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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

<style lang="less" scoped></style>
