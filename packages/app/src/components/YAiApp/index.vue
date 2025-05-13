<template>
  <div>
    <page-mode v-if="config.mode === 'page'" v-bind="$attrs" v-on="$listeners" />
    <modal-mode v-else-if="config.mode === 'modal'" :visible.sync="visibleFlag" v-bind="$attrs" v-on="$listeners" />
    <drawer-mode v-else-if="config.mode === 'drawer'" :visible.sync="visibleFlag" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import PageMode from './PageMode.vue'
import ModalMode from './ModalMode.vue'
import DrawerMode from './DrawerMode.vue'
import { AI_APP_PROPS } from '@/const/aiApp'
export default {
  name: 'YAIApp',
  components: {
    PageMode,
    ModalMode,
    DrawerMode,
  },
  props: AI_APP_PROPS,
  computed: {
    visibleFlag: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      },
    },
  },
}
</script>
