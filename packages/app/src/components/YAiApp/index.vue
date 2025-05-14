<template>
  <page-mode v-if="$attrs.modeConfig.mode === 'page'" v-bind="$attrs" v-on="$listeners" />
  <modal-mode v-else-if="$attrs.modeConfig.mode === 'modal'" v-bind="$attrs" v-on="$listeners" />
  <drawer-mode v-else-if="$attrs.modeConfig.mode === 'drawer'" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import PageMode from './PageMode.vue'
import ModalMode from './ModalMode.vue'
import DrawerMode from './DrawerMode.vue'
export default {
  name: 'YAIApp',
  components: {
    PageMode,
    ModalMode,
    DrawerMode,
  },
}
</script>
