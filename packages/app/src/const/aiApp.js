const AI_APP_PROPS = {
  config: {
    type: Object,
    default: () => {
      return {
        mode: 'page', //page,modal,drawer
        size: 'large',
      }
    },
    validator: function (config) {
      const validModes = ['page', 'modal', 'drawer']
      const validSizes = ['full', 'large', 'medium', 'mini']
      const size = config.size

      // 验证 mode
      if (!validModes.includes(config.mode)) {
        console.warn(`Invalid mode: ${config.mode}. Must be one of ${validModes}.`)
        return false
      }

      // 验证 size
      if (
        !validSizes.includes(size) &&
        !/^\d+%$/.test(size) && // 百分比格式，如 50%
        !/^\d+px$/.test(size) // 像素格式，如 500px
      ) {
        console.warn(
          `Invalid size: ${size}. Must be one of ${validSizes}, a percentage (e.g., '50%'), or a pixel value (e.g., '500px').`,
        )
        return false
      }
      return true
    },
  },
  visible: {
    type: Boolean,
    default: true,
  },
}
const APP_MODE_MAP = {
  page: 'PageMode',
  modal: 'ModalMode',
  drawer: 'DrawerMode',
}
export { AI_APP_PROPS, APP_MODE_MAP }
