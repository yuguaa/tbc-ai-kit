<template>
  <y-modal :visible="modeConfig.modeVisible" v-bind="$attrs" @update:visible="close">{{ modeConfig }} </y-modal>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import YModal from '@/components/YModal'
export default {
  components: {
    YModal,
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
