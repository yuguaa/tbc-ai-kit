<template>
  <y-drawer :visible="modeConfig.modeVisible" v-bind="{ ...$props, ...getDrawerStyle }" @update:visible="close">
    <page-mode v-bind="$props" v-on="$listeners" />
  </y-drawer>
</template>

<script>
import { AI_APP_PROPS } from '@/const/aiApp'
import YDrawer from '@/components/YDrawer'
import PageMode from './PageMode.vue'
export default {
  components: {
    YDrawer,
    PageMode,
  },
  props: AI_APP_PROPS,
  data() {
    return {}
  },
  computed: {
    getDrawerStyle() {
      if (this.modeConfig.isFullMode) {
        return this.modeConfig.modeFull.size
      }
      return this.modeConfig.modeNormal.size
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
