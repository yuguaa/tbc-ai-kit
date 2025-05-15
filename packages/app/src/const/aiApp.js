import deepmerge from 'deepmerge'

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
    default: () => {},
  },
  sendMsg: {
    type: Function,
    default: () => {},
  },
  prefix: {
    type: String,
    default: '',
  },
  conversations: {
    type: Array,
    default: () => [],
  },
  currentSessionId: {
    type: String,
    default: '',
  },
}
const APP_MODE_MAP = {
  page: 'PageMode',
  modal: 'ModalMode',
  drawer: 'DrawerMode',
}

const DEFAULT_MODE_CONFIG = {
  mode: 'page',
  modeFull: {
    page: {
      width: '100%',
      height: '100%',
    },
    modal: {
      width: '100%',
      height: '100%',
    },
    drawer: {
      width: '100%',
      height: '100%',
    },
    messages: {
      minWidth: '800px',
      maxWidth: '1200px',
      width: '50%',
    },
  },
  modeNormal: {
    page: {
      width: '50%',
      height: '100%',
    },
    modal: {
      width: '80%',
      height: '80%',
    },
    drawer: {
      width: '50%',
      height: '100%',
    },
    messages: {
      minWidth: '422px',
      maxWidth: '1200px',
      width: '100%',
    },
  },
  modeIsFull: true,
  modeVisible: false,
  modeShowSidebar: true,
}

const WORK_FLOW_API_URL = '/gpt/chat/difySendMsgSteam'
const NORMAL_API_URL = '/gpt/chat/difySendMsgSteam'
const API_TIMEOUT = 1000 * 60 * 3
const WORK_FLOW_API_INTERFACE = {
  url: WORK_FLOW_API_URL,
  params: {
    sendMsg: '',
    sessionId: '',
    types: 'LOCAL',
    resourceType: '',
    resourceId: '',
    convId: '',
    boxType: '',
    inputs: {
      cookie: '',
      domain_name: '',
      question: '',
    },
    elnSessionId: '',
  },
  timeout: API_TIMEOUT,
}
const NORMAL_API_INTERFACE = {
  url: NORMAL_API_URL,
  params: {
    sendMsg: '',
    sessionId: '',
    types: 'LOCAL',
    resourceType: '',
    resourceId: '',
    convId: '',
    boxType: '',
    inputs: {
      cookie: '',
      domain_name: '',
      question: '',
    },
    elnSessionId: '',
  },
  timeout: API_TIMEOUT,
}

const WORK_FLOW_BOX_TYPES = ['AT_017']
const NORMAL_BOX_TYPES = ['AT_004']
const APP_NEW_SESSTION_ID = 'APP_NEW_SESSTION_ID'
const APP_DEFAULT_TARGET_DOM = 'APP_DEFAULT_TARGET_DOM'

const getApiConfigByConfig = (config) => {
  if (WORK_FLOW_BOX_TYPES.includes(config.params.boxType)) {
    return deepmerge(WORK_FLOW_API_INTERFACE, config)
  }
  if (NORMAL_BOX_TYPES.includes(config.params.boxType)) {
    return deepmerge(NORMAL_API_INTERFACE, config)
  }
  console.log(`没有匹配到 boxType`)
  return config
}
export {
  AI_APP_PROPS,
  APP_MODE_MAP,
  APP_NEW_SESSTION_ID,
  APP_DEFAULT_TARGET_DOM,
  DEFAULT_MODE_CONFIG,
  WORK_FLOW_API_URL,
  NORMAL_API_URL,
  WORK_FLOW_API_INTERFACE,
  NORMAL_API_INTERFACE,
  WORK_FLOW_BOX_TYPES,
  NORMAL_BOX_TYPES,
  getApiConfigByConfig,
}
