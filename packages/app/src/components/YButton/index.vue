<template>
  <div
    class="y-box-border y-flex y-cursor-pointer y-select-none y-items-center y-rounded-[4px] y-border-solid y-px-12 y-py-[5px] y-text-[14px] y-transition-all y-duration-300 hover:y-bg-borderLight"
    :class="[type === 'select' && value ? 'y-border-main y-bg-second y-text-main' : 'y-border-borderDark']"
    :style="{ 'border-width': showBorder ? '1px' : '0px' }"
    @click="handleClick"
  >
    <div class="y-mr-4" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    showBorder: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'action',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (this.type === 'select') {
        this.$emit('input', !this.value)
      } else {
        this.$emit('click')
      }
    },
  },
}
</script>
