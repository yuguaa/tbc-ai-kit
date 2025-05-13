<template>
  <y-drawer :visible.sync="drawerVisible" v-bind="config">
    {{ config }}
  </y-drawer>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import YDrawer from '@/components/YDrawer'
export default {
  components: {
    YDrawer,
  },
  props: AI_APP_PROPS,
  data() {
    return {}
  },
  computed: {
    drawerVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      },
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped></style>
