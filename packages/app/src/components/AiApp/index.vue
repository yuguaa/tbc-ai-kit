<template>
  <div class="y-p-4 y-flex y-flex-col y-items-center y-justify-center y-h-screen">
    <button class="y-fixed" @click="send">发送</button>
    <MarkdownRender :content="html" />
  </div>
</template>

<script>
import TbcSSE from '@21tb/tbc-sse'
const tbcSSE = new TbcSSE({})
import MarkdownRender from '@/components/MarkdownRender/index.vue'
export default {
  name: 'AiApp',
  components: {
    MarkdownRender
  },
  props: {},
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    tbcSSE.subscribe('onopen', event => {
      this.html += '\n\n' // 这里处理是因为think标签会被tokenize到上次尾token的child节点中
      console.log('[SSE OPEN]', event)
    })
    tbcSSE.subscribe('onmessage', event => {
      const parsedData = JSON.parse(event.event.data)
      this.html += parsedData.answer
      console.log(`🚀 ~ this.html:`, JSON.stringify(this.html))
    })
    tbcSSE.subscribe('onend', event => {
      console.log('[SSE END]', event)
    })
    tbcSSE.subscribe('onerror', event => {
      console.error('[SSE ERROR]', event)
    })
    tbcSSE.subscribe('onfinally', event => {
      console.log('[SSE FINALLY]', event)
    })
  },
  methods: {
    send() {
      tbcSSE.sendSSE({
        url: 'https://test-gpt.21tb.com/gpt/chat/sendMsgSteam',
        params: {
          convId: '',
          boxType: 'TC_042',
          types: 'LOCAL',
          sendMsg: '请分享一个关于个人信息保护的真实案例。给我一些tdolist',
          resourceType: 'live',
          resourceId: '3151677c82f14f149de9956e6149406b',
          elnSessionId: 'elnSessionId.bd773a3e38fe4ee1ac22065b91c5f356'
        },
        timeout: 180000
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
