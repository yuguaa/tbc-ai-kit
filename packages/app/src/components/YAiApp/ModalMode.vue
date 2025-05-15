<template>
  <y-modal :visible="modeConfig.modeVisible" v-bind="{ ...$props, ...getModalStyle }" @update:visible="close">
    <page-mode v-bind="$props" v-on="$listeners" />
  </y-modal>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import YModal from '@/components/YModal'
import PageMode from './PageMode.vue'
export default {
  components: {
    YModal,
    PageMode,
  },
  props: AI_APP_PROPS,
  data() {
    return {}
  },
  computed: {
    getModalStyle() {
      if (this.modeConfig.modeIsFull) {
        return this.modeConfig.modeFull[this.modeConfig.mode]
      } else {
        return this.modeConfig.modeNormal[this.modeConfig.mode]
      }
    },
  },
  methods: {
    close() {
      this.setModeConfigItem('modeVisible', false)
    },
  },
}
</script>

<style lang="less" scoped></style>
