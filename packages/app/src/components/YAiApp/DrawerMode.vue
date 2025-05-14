<template>
  <y-drawer :visible="modeConfig.modeVisible" v-bind="$attrs" @update:visible="close">
    {{ modeConfig }}
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
  methods: {
    close() {
      this.setModeConfigItem('modeVisible', false)
    },
  },
}
</script>

<style lang="less" scoped></style>
