<template>
  <y-modal :visible.sync="modalVisible" v-bind="config">{{ config }} </y-modal>
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
  computed: {
    modalVisible: {
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
