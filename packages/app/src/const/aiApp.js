import deepmerge from 'deepmerge'
import { queryChatListLimit, queryChatPageList } from '@/api/index.js'
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
  prefix: {
    type: String,
    default: '',
  },
  sseResInterceptors: {
    type: Array,
    default: () => [],
  },
  sseReqInterceptors: {
    type: Array,
    default: () => [],
  },
  apiReqInterceptors: {
    type: Array,
    default: () => [],
  },
  apiResInterceptors: {
    type: Array,
    default: () => [],
  },
  tbcSSE: {
    type: Object,
    default: () => {},
  },
  conversationApi: {
    type: Function,
  },
  conversationApiConfig: {
    type: Object,
    default: () => {},
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
    size: {
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
    size: {
      width: '50%',
      height: '100%',
    },
    messages: {
      minWidth: '422px',
      maxWidth: '1200px',
      width: '100%',
    },
  },
  isFullMode: true,
  modeVisible: false,
  isShowSidebar: true,
  showHeaderCloseIcon: true,
  showHeaderToggleScreenIcon: true,
  showHeaderAvatarIcon: true,
  showHeaderMoreIcon: true,
}
const DEFAULT_API_CONFIG = {
  params: {
    boxType: 'AT_017',
    types: 'LOCAL',
  },
  timeout: 1000 * 60 * 3,
}
const NORMAL_API_URL = '/gpt/chat/difySendMsgSteam'
const WORK_FLOW_API_URL = '/gpt/chat/sendMsgSteam'
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
// AT_004 AI通用问答
// AT_005 AI知识库
// AT_006 AI课程导师
// AT_007 AI文档解析
// AT_017 AI直播智能套件
// TC_001 自我认知
// TC_002 MBTI性格测试
// TC_003 职业规划设计
// TC_004 个人能力提升
// TC_005 商业计划书
// TC_007 工作复盘总结
// TC_008 快速了解他人
// TC_011 个人教练
// TC_012 心理导师
// TC_013 健康顾问
// TC_014 文案编写
// TC_017 岗位画像建模
// TC_018 员工培训计划
// TC_019 会议纪要

const WORK_FLOW_BOX_TYPES = ['AT_004', 'AT_005', 'AT_006', 'AT_017']
const NORMAL_BOX_TYPES = [
  'TC_001',
  'TC_002',
  'TC_003',
  'TC_004',
  'TC_005',
  'TC_007',
  'TC_008',
  'TC_011',
  'TC_012',
  'TC_013',
  'TC_014',
  'TC_017',
  'TC_018',
  'TC_019',
]
const HISTROY_LIST_LIMIT_TYPES = ['AT_017']
const HISTROY_PAGE_TYPES = [
  'AT_004',
  'AT_005',
  'AT_006',
  'AT_007',
  'TC_001',
  'TC_002',
  'TC_003',
  'TC_004',
  'TC_005',
  'TC_007',
  'TC_008',
  'TC_011',
  'TC_012',
  'TC_013',
  'TC_014',
  'TC_017',
  'TC_018',
  'TC_019',
]

const APP_NEW_SESSTION_ID = 'APP_NEW_SESSTION_ID'
const APP_DEFAULT_TARGET_DOM = 'APP_DEFAULT_TARGET_DOM'

const getApiConfigByConfig = (config) => {
  console.log(`🚀 ~ config.params.boxType:`, config.params.boxType)
  if (WORK_FLOW_BOX_TYPES.includes(config.params.boxType)) {
    return deepmerge(WORK_FLOW_API_INTERFACE, config)
  }
  if (NORMAL_BOX_TYPES.includes(config.params.boxType)) {
    return deepmerge(NORMAL_API_INTERFACE, config)
  }
  console.log(`没有匹配到 boxType`)
  return config
}
const getConversationApiConfig = (config, conversationApiConfig) => {
  if (conversationApiConfig.mode === 'limit') {
    return queryChatListLimit
  }
  if (conversationApiConfig.mode === 'page') {
    return queryChatPageList
  }
  if (HISTROY_LIST_LIMIT_TYPES.includes(config.params.boxType)) {
    conversationApiConfig.mode = 'limit'
    return queryChatListLimit
  }
  if (HISTROY_PAGE_TYPES.includes(config.params.boxType)) {
    conversationApiConfig.mode = 'page'
    return queryChatPageList
  }
}
export {
  AI_APP_PROPS,
  APP_MODE_MAP,
  APP_NEW_SESSTION_ID,
  APP_DEFAULT_TARGET_DOM,
  DEFAULT_MODE_CONFIG,
  DEFAULT_API_CONFIG,
  WORK_FLOW_API_URL,
  NORMAL_API_URL,
  WORK_FLOW_API_INTERFACE,
  NORMAL_API_INTERFACE,
  WORK_FLOW_BOX_TYPES,
  NORMAL_BOX_TYPES,
  getApiConfigByConfig,
  getConversationApiConfig,
}
