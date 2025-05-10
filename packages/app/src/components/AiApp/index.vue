<template>
  <div class="y-p-4 y-flex y-flex-col y-items-center y-justify-center y-h-screen">
    <button class="y-fixed y-top-10 y-right-10 y-shadow" @click="send">发送</button>
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
    })
    tbcSSE.subscribe('onend', event => {
      console.log('[SSE END]', event)
    })
    tbcSSE.subscribe('onerror', event => {
      console.error('[SSE ERROR]', event)
    })
    tbcSSE.subscribe('onfinally', event => {
      console.log('[SSE FINALLY]', JSON.stringify(this.html))
      console.log('[SSE FINALLY]', event)
    })
  },
  methods: {
    send() {
      tbcSSE.sendSSE({
        url: 'https://test-gpt.21tb.com/gpt/chat/sendMsgSteam',
        params: {
          sendMsg: '要求给出markdown链接外连接,http和https都要,并且大概100万字文章',
          sessionId: '87658c4a-055f-4c48-b401-ec6d327f54d7',
          types: 'SPARK',
          resourceType: '',
          resourceId: '',
          convId: '',
          boxType: 'AT_004',
          elnSessionId: 'elnSessionId.805b506f55584fbc8689ec97720df3c5'
        },
        timeout: 180000
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
