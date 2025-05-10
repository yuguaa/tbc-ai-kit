<script>
import Think from './Think.vue'
import md from '@/utils/md'

export default {
  name: 'MdRenderer',
  components: {
    Think
  },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    tokens() {
      return md.parse(this.content, {})
    }
  },
  methods: {
    renderTokens(h, tokens, keyPrefix = '') {
      const result = []
      const stack = []
      const tagMap = {
        paragraph_open: 'p',
        heading_open: 'h1',
        bullet_list_open: 'ul',
        ordered_list_open: 'ol',
        list_item_open: 'li',
        image: 'img',
        link_open: 'a',
        code_inline: 'code',
        strong_open: 'strong',
        em_open: 'em',
        del_open: 'del',
        blockquote_open: 'blockquote',
        table_open: 'table',
        thead_open: 'thead',
        tbody_open: 'tbody',
        tr_open: 'tr',
        th_open: 'th',
        td_open: 'td',
        hr: 'hr',
        fence: 'pre',
        hardbreak: 'br',
        inline: 'span',
        text: 'span',
        think: Think // 处理 think 标签
      }
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        // 处理 think 标签
        if (token.type === 'think') {
          const vnode = h(
            Think,
            {
              class: 'think-inline',
              props: {
                status: token.meta?.status || 'UN_START'
              }
            },
            this.renderTokens(h, md.parse(token.content, {}), `${keyPrefix}-think`)
          )
          result.push(vnode)
        } else if (/_open$/.test(token.type)) {
          stack.push({ token, children: [] })
        } else if (/_close$/.test(token.type)) {
          const { token: openToken, children } = stack.pop()
          const tag = openToken.tag || tagMap[openToken.type] || 'div'
          const attrs = {}

          if (openToken.attrs) {
            openToken.attrs.forEach(([k, v]) => (attrs[k] = v))
          }

          const vnode = h(tag, { key: `${keyPrefix}-${i}`, attrs }, children)

          if (stack.length) {
            stack[stack.length - 1].children.push(vnode)
          } else {
            result.push(vnode)
          }
        } else if (token.type === 'inline') {
          const children = this.renderTokens(h, token.children || [], `${keyPrefix}-inline-${i}`)
          const span = h('span', { key: `${keyPrefix}-inline-${i}` }, children)
          if (stack.length) {
            stack[stack.length - 1].children.push(span)
          } else {
            result.push(span)
          }
        } else if (token.type === 'text') {
          const vnode = token.content
          if (stack.length) {
            stack[stack.length - 1].children.push(vnode)
          } else {
            result.push(vnode)
          }
        } else {
          const tag = token.tag || tagMap[token.type] || 'span'
          const attrs = {}

          if (token.attrs) {
            token.attrs.forEach(([k, v]) => (attrs[k] = v))
          }

          const vnode = h(tag, { key: `${keyPrefix}-${i}`, attrs }, token.content || [])
          if (stack.length) {
            stack[stack.length - 1].children.push(vnode)
          } else {
            result.push(vnode)
          }
        }
      }
      return result
    }
  },
  render(h) {
    return h('div', { class: 'markdown-body y-text-[14px]' }, this.renderTokens(h, this.tokens))
  }
}
</script>

<style scoped>
@import 'github-markdown-css/github-markdown.css';
</style>
