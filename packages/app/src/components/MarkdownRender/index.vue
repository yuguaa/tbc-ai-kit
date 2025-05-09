<template>
  <div class="markdown-body">
    <think :status="thinkStatus" :content="thinkContent" />
    <div v-html="renderedHtml"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import Think from './Think.vue'
export default {
  name: 'MarkdownRender',
  components: {
    Think
  },
  props: {
    source: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      md: null,
      thinkStatus: 'UN_START',
      thinkContent: '',
      mainContent: ''
    }
  },
  computed: {
    renderedHtml() {
      return this.md.render(this.mainContent)
    }
  },
  watch: {
    source(val) {
      if (val.includes('<think>')) {
        this.thinkStatus = 'THINKING'
        if (val.includes('</think>')) {
          this.thinkStatus = 'THINK_END'
          const temp = val.substring(val.indexOf('<think>') + 7, val.indexOf('</think>'))
          this.thinkContent = this.md.render(temp)
          this.mainContent = val.substring(val.indexOf('</think>') + 8)
        }
        if (!val.includes('</think>')) {
          this.thinkStatus = 'THINKING'
          const temp = val.substring(val.indexOf('<think>') + 7)
          this.thinkContent = this.md.render(temp)
        }
      } else {
        this.mainContent = val
      }
    }
  },
  created() {
    this.md = new MarkdownIt({
      linkify: true,
      typographer: true,
      html: true
    }).use(emoji)
  }
}
</script>

<style lang="less" scoped>
.markdown-body {
  box-sizing: border-box;
  font-size: 14px;
  background-color: transparent;

  /* stylelint-disable */
  think {
    position: relative;
    padding-left: 8px;
    display: block;
    color: #8b8b8b;
    font-size: 12px;

    &::before {
      content: ' ';
      display: block;
      height: calc(100% - 8px);
      margin-top: 4px;
      width: 1.5px;
      background: #e5e5e5;
      position: absolute;
      left: 0;
    }
  }
}

.markdown-body pre {
  overflow: auto;
}
</style>
