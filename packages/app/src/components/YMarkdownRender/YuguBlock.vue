<template>
  <div>
    <div>自定义渲染块</div>
    <div>{{ $attrs }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped></style>
