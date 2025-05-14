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
      return {
        width: this.modeConfig.modeIsFull ? this.modeConfig.modeModalFullWidth : this.modeConfig.modeModalNormalWidth,
        height: this.modeConfig.modeIsFull
          ? this.modeConfig.modeModalFullHeight
          : this.modeConfig.modeModalNormalHeight,
      }
    },
  },
  created() {
    console.log(`🚀 ~ modeConfig:`, this)
  },
  methods: {
    close() {
      this.setModeConfigItem('modeVisible', false)
    },
  },
}
</script>

<style lang="less" scoped></style>
