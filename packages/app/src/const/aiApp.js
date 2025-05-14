const AI_APP_PROPS = {
  modeConfig: {
    type: Object,
    default: () => {},
  },
  setModeConfig: {
    type: Function,
    default: () => {},
  },
  setModeConfigItem: {
    type: Function,
    default: () => {},
  },
  apiConfig: {
    type: Object,
    default: () => {
      return {
        beforeReq: () => {},
        beforeRes: () => {},
        apiFn: () => {
          return new Promise((resolve) => {
            resolve()
          })
        },
      }
    },
  },
}
const APP_MODE_MAP = {
  page: 'PageMode',
  modal: 'ModalMode',
  drawer: 'DrawerMode',
}
export { AI_APP_PROPS, APP_MODE_MAP }
