<template>
  <div class="y-flex y-h-screen y-flex-col y-items-center y-justify-center y-p-4">
    <button class="y-fixed y-right-10 y-top-10 y-shadow" @click="send">发送</button>
    <MarkdownRender :content="content" />
    <Sender />
  </div>
</template>

<script>
import TbcSSE from '@21tb/tbc-sse'
const tbcSSE = new TbcSSE({})
import MarkdownRender from '@/components/MarkdownRender/index.vue'
import Sender from '@/components/Sender/index.vue'
export default {
  name: 'AiApp',
  components: {
    MarkdownRender,
    Sender,
  },
  props: {},
  data() {
    return {
      html: '',
    }
  },
  computed: {
    content() {
      return this.html
    },
  },
  mounted() {
    tbcSSE.subscribe('onopen', (event) => {
      console.log('[SSE OPEN]', event)
    })
    tbcSSE.subscribe('onmessage', (event) => {
      const parsedData = JSON.parse(event.event.data)
      this.html += parsedData.answer || ''
    })
    tbcSSE.subscribe('onend', (event) => {
      console.log('[SSE END]', event)
    })
    tbcSSE.subscribe('onerror', (event) => {
      console.error('[SSE ERROR]', event)
    })
    tbcSSE.subscribe('onfinally', (event) => {
      console.log('[SSE FINALLY]', JSON.stringify(this.html))
      console.log('[SSE FINALLY]', event)
    })
  },
  methods: {
    send() {
      tbcSSE.sendSSE({
        url: 'https://test-gpt.21tb.com/gpt/chat/sendMsgSteam',
        params: {
          boxType: 'TC_045',
          types: 'SPARK',
          sendMsg: '返回一个url',
          elnSessionId: 'elnSessionId.2ea8ed2f153a4dddade7b25626399bbe',
          convId: '',
          resourceId: '',
          resourceType: '',
          sessionId: 'ai_search-uuid-1746861908840',
          inputs: {
            question: '返回一个url',
            domain_name: '172.16.31.213:9000',
            cookie:
              'local_=zh_CN; qimo_seosource_0=%E7%AB%99%E5%86%85; qimo_seokeywords_0=; uuid_02253ce0-2088-11ee-945f-f73ba1f1c579=838e9109-20a2-4972-86ac-7a4f0d7e8801; qimo_seosource_02253ce0-2088-11ee-945f-f73ba1f1c579=%E7%AB%99%E5%86%85; qimo_seokeywords_02253ce0-2088-11ee-945f-f73ba1f1c579=; qimo_xstKeywords_02253ce0-2088-11ee-945f-f73ba1f1c579=; href=http%3A%2F%2F172.16.31.213%3A9000%2Frtr-frontend%2F; accessId=02253ce0-2088-11ee-945f-f73ba1f1c579; tbc-ai-robot-name=%E5%B0%8F%E7%A6%BETbc%E4%BC%81%E4%B8%9A%E6%99%BA%E6%85%A7%E5%A4%A7%E8%84%910625; corp_code=shyf17; eln_session_id=elnSessionId.5f612f37bb684decb02de3beee3a41f8; pageViewNum=28',
            directAnswer: true,
          },
          aiSearchUuid: 'ai_search-uuid-1746861908840',
        },
        timeout: 180000,
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
