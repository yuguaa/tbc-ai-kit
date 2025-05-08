<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon tbc-ai-app-icon-svg" v-on="$listeners" />
  <svg v-else :class="svgClass" :style="wrapStyle" aria-hidden="true" v-on="$listeners" :width="size" :height="size">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: '16',
    },
    wrapStyle: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return /^(https?:|mailto:|tel:)/.test(this.iconClass);
    },
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      const baseClass = "tbc-ai-app-icon-svg ";
      if (this.className) {
        return baseClass + this.className;
      } else {
        return baseClass;
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.name}) no-repeat 50% 50%`,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.tbc-ai-app-icon-svg {
  display: inline-block;
  color: rgba(0, 0, 0, 0.85);
  overflow: hidden;
  line-height: 1;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>