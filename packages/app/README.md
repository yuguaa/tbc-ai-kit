# TbcAiApp 使用文档

`TbcAiApp` 是一个用于挂载智能对话应用（如聊天机器人界面）的封装类，基于 Vue 构建，并支持灵活配置 API、模式和拦截器。

---

## 📦 引入方式

```ts
import TbcAiApp from '@21tb/tbc-ai-app'
```

---

## 🏗️ 初始化

```ts
const app = new TbcAiApp(
  {
    target: '#your-container-id', // 可选：挂载 DOM 的选择器，默认自动插入 body
    modeConfig: {
      // 可选：业务模式配置，支持自定义字段
    },
    apiConfig: {
      // 可选：API 请求配置，如 baseURL、token 等
    },
    conversationApiConfig: {
      // 可选：聊天接口额外配置
    },
  },
  (pageApp) => {},
)
```

> ⚠️ 若未传入 `target`，则自动在 `body` 中添加一个默认容器并挂载。

---

## 🔧 属性说明

| 属性名                  | 类型     | 说明                |
| ----------------------- | -------- | ------------------- |
| `vm`                    | `Vue`    | Vue 实例            |
| `modeConfig`            | `object` | 模式配置对象        |
| `apiConfig`             | `object` | API 请求配置        |
| `conversationApiConfig` | `object` | 会话 API 的配置参数 |

---

## 🔌 拦截器注册

用于扩展 SSE 或 API 请求的前置/后置逻辑：

```ts
// 注册 API 请求拦截器
app.useAPIRequestInterceptor((config) => {
  config.headers.Authorization = 'Bearer xxx'
  return config
})

// 注册 API 响应拦截器
app.useAPIResponseInterceptor((response) => {
  return response
})

// 注册 SSE 请求拦截器
app.useSSERequestInterceptor((payload) => {
  return payload
})

// 注册 SSE 响应拦截器
app.useSSEResponseInterceptor((data) => {
  return data // 内部依据响应type是否是message_end和workflow_finished来判定结束
})
```

---

## 🧩 动态更新配置

支持在运行时更新模式配置，例如：

> 但是最好不要这样做，除非你非常了解配置间的关系

```ts
// 替换整个 modeConfig
app.setModeConfig({
  mode: 'page',
  modeFull: {
    size: {
      width: '100%',
      height: '100%',
    },
  },
  modeNormal: {
    size: {
      width: '50%',
      height: '100%',
    },
  },
  modeVisible: false,
  isShowSidebar: true,
  isFullMode: true,
  showHeaderCloseIcon: false,
  showHeaderToggleScreenIcon: true,
  showHeaderAvatarIcon: true,
  showHeaderMoreIcon: true,
})

// 更新某个配置项
app.setModeConfigItem('isFullMode', true)
```

---

## 📎 注意事项

- 所有 `setModeConfig` 的更新是异步的（使用了 `Promise.resolve().then(...)`）
- 所有拦截器注册支持多次调用，追加处理
- 若需使用 Vue 组件提供的能力，可访问 `app.vm`

# 📦 TbcAiApp 配置项与默认常量说明

---

## ✅ 组件 Props 配置（AI_APP_PROPS）

```ts
{
  modeConfig: Object              // 模式配置（mode + 尺寸等）
  setModeConfig: Function         // 外部更新整个 modeConfig
  setModeConfigItem: Function     // 外部更新单项 modeConfig
  apiConfig: Object               // API 配置参数（boxType 等），与平台发送ai请求的参数一致，其中params.types决定初始化使用LOCAL还是SPARK
  prefix: String                  // sse请求domain，内部获取，可以覆盖（无须关注）
  sseResInterceptors: Function[] // SSE 响应拦截器列表
  sseReqInterceptors: Function[] // SSE 请求拦截器列表
  apiReqInterceptors: Function[] // API 请求拦截器列表
  apiResInterceptors: Function[] // API 响应拦截器列表
  conversationApi: Function      // 自定义会话接口（覆盖内置逻辑）可在new TbcAiApp后修改
  conversationApiConfig: Object  // 会话接口分页配置
}
```

---

---

## 🧱 默认配置项

### DEFAULT_MODE_CONFIG

```ts
{
  mode: 'page',
  modeFull: {
    size: { width: '100%', height: '100%' },
    messages: {
      minWidth: '800px',
      maxWidth: '1200px',
      width: '50%',
    },
  },
  modeNormal: {
    size: { width: '50%', height: '100%' },
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
  showHeaderSiderbarIcon: true,
  useSender: true, // 是否使用 sender 组件
}
```

### DEFAULT_API_CONFIG

```ts
{
  params: {
    boxType: 'AT_017',
    types: 'LOCAL', // LOCAL / SPARK，传入决定sender高亮button
  },
  timeout: 1000 * 60 * 3, // 3 分钟
}
```

### DEFAULT_CONVERSATION_API_CONFIG

```ts
{
  mode: '', // 获取会话列表的模式，page/limit,可以指定，不指定依据boxType类型判断，不一定准确
  pageSize: 20, // 每页条数，仅page模式下生效
}
```

---

## 🌐 API 接口配置常量

### API 地址

```ts
const NORMAL_API_URL = '/gpt/chat/difySendMsgSteam'
const WORK_FLOW_API_URL = '/gpt/chat/sendMsgSteam'
const API_TIMEOUT = 1000 * 60 * 3
```

### NORMAL_API_INTERFACE

```ts
{
  url: '/gpt/chat/difySendMsgSteam',
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
```

### WORK_FLOW_API_INTERFACE

```ts
{
  url: '/gpt/chat/sendMsgSteam',
  params: { 同 NORMAL_API_INTERFACE },
  timeout: API_TIMEOUT,
}
```

---

## 🗂 boxType 分类（用于区分接口模式）

### WORK_FLOW_BOX_TYPES

```ts
;['AT_004', 'AT_005', 'AT_006', 'AT_017']
```

### NORMAL_BOX_TYPES

```ts
;[
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
```

---

## 🗃 会话列表展示策略（分页 / 限制）

### HISTROY_LIST_LIMIT_TYPES

```ts
;['AT_017']
```

### HISTROY_PAGE_TYPES

```ts
;[
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
```

---

# 📚使用示例

### 1️⃣ 页面模式（Page Mode）使用示例

```ts
this.pageApp = new TbcAiApp({
  target: '#page-app',
  modeConfig: {
    mode: 'page',
    modeFull: {
      size: {
        width: '100%',
        height: '100%',
      },
    },
    modeNormal: {
      size: {
        width: '50%',
        height: '100%',
      },
    },
    modeVisible: false,
    isShowSidebar: true,
    isFullMode: true,
    showHeaderCloseIcon: false,
    showHeaderToggleScreenIcon: true,
    showHeaderAvatarIcon: true,
    showHeaderMoreIcon: true,
  },
  apiConfig: {
    params: {
      boxType: 'AT_017',
      types: 'SPARK',
    },
  },
  conversationApiConfig: {
    pageSize: 2,
  },
})
```

### 2️⃣ 弹窗模式（Modal Mode）使用示例

```ts
this.modalApp = new TbcAiApp({
  target: '#modal-app',
  modeConfig: {
    mode: 'modal',
    modeFull: {
      size: {
        width: '100%',
        height: '100%',
      },
    },
    modeNormal: {
      size: {
        width: '50%',
        height: '50%',
      },
    },
    modeVisible: true,
    isShowSidebar: true,
    isFullMode: false,
    showHeaderAvatarIcon: false,
  },
})
```

### 3️⃣ 抽屉模式（Drawer Mode）使用示例

```ts
this.drawerApp = new TbcAiApp({
  target: '#drawer-app',
  modeConfig: {
    mode: 'drawer',
    modeFull: {
      size: {
        width: '100%',
        height: '100%',
      },
    },
    modeNormal: {
      size: {
        width: '500px',
        height: '100%',
      },
    },
    modeVisible: true,
    isShowSidebar: true,
    isFullMode: false,
    showHeaderAvatarIcon: false,
  },
})
```

### 3️⃣ 特殊模式（Page Mode）使用示例,只有对话渲染

> 仅仅做页面的渲染，发送请求和请求响应数据通过拦截器处理

```ts
this.specialApp = new TbcAiApp(
  {
    target: '#special-app',
    modeConfig: {
      mode: 'page',
      modeFull: {
        size: {
          width: '100%',
          height: '100%',
        },
      },
      modeNormal: {
        size: {
          width: '50%',
          height: '100%',
        },
      },
      modeVisible: false,
      isShowSidebar: false,
      isFullMode: false,
      showHeaderCloseIcon: false,
      useSender: false,
      showHeaderSiderbarIcon: false,
      showHeaderNewChatIcon: false,
      showHeaderToggleScreenIcon: false,
      showHeaderMoreIcon: false,
    },
  },
  (pageApp) => {
    pageApp.sendMsg({
      params: {
        sendMsg: 'sdafasd ',
        sessionId: '26d1790a-4c9e-4d01-96dc-302121add0cd',
        types: 'SPARK',
        resourceType: '',
        resourceId: '',
        convId: '',
        boxType: 'AT_017',
        elnSessionId: 'elnSessionId.f90cb7c333a348deb8d5a1dccb9630bf',
      },
    })
  },
)
this.specialApp.useSSERequestInterceptor((params) => {
  console.log('请求拦截器', params)
  return params
})
this.specialApp.useSSEResponseInterceptor((params) => {
  console.log('响应拦截器', params)
  return params
})
```
