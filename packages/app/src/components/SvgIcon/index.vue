<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon tbc-ai-app-icon-svg" v-on="$listeners" />
  <svg v-else :class="svgClass" :style="wrapStyle" aria-hidden="true" v-on="$listeners" :width="size" :height="size">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '16',
    },
    wrapStyle: {
      type: String,
      default: '',
    },
  },
  computed: {
    isExternal() {
      return /^(https?:|mailto:|tel:)/.test(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      const baseClass = 'tbc-ai-app-icon-svg '
      if (this.className) {
        return baseClass + this.className
      } else {
        return baseClass
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
      }
    },
  },
}
</script>

<style lang="less" scoped>
.tbc-ai-app-icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
