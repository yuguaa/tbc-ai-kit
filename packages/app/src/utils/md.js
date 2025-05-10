import MarkdownIt from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItIns from 'markdown-it-ins'
import markdownItMark from 'markdown-it-mark'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItToc from 'markdown-it-toc-done-right'

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  langPrefix: 'lang-',
  linkify: false,
  typographer: true
})
  .use(emoji)
  .use(markdownItAbbr)
  .use(markdownItFootnote)
  .use(markdownItDeflist)
  .use(markdownItIns)
  .use(markdownItMark)
  .use(markdownItToc)
  .use(markdownItTaskLists, { enabled: true })

// 添加自定义解析规则
md.core.ruler.push('think', function (state) {
  const tokens = state.tokens
  console.log(`🚀 ~ tokens:`, tokens)
  const thinkTokens = []
  let insideThink = false
  let content = ''
  let status = 'UN_START' // 默认状态
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    // 如果是开始的 <think> 标签
    if ((token.type === 'html_block' || token.type === 'html_inline') && token.content.startsWith('<think>')) {
      insideThink = true
      content = token.content.slice(7) // 移除 <think> 标签
      const match = token.content.match(/<think\s+status="(.*?)">/)
      status = match ? match[1] : 'START'
      continue // 跳过此 token，继续处理后面的内容
    }

    // 如果是在 <think> 标签内
    if (insideThink) {
      // 如果遇到结束的 </think> 标签，停止
      if ((token.type === 'html_block' || token.type === 'html_inline') && token.content.startsWith('</think>')) {
        insideThink = false
        content += token.content.slice(8) // 移除 </think> 标签
        const thinkToken = new state.Token('think', 'div', 0)
        thinkToken.meta = { status: 'END' }
        thinkToken.content = content
        thinkTokens.push(thinkToken)
        continue // 跳过此 token，继续处理后面的内容
      } else {
        // 如果是 <think> 内部的其他节点
        content += token.content
      }
    } else {
      thinkTokens.push(token)
    }
  }

  // 如果没有遇到 </think> 结束标签，我们将剩余内容视为 think 标签内容
  if (insideThink) {
    const thinkToken = new state.Token('think', 'div', 0)
    thinkToken.content = content
    thinkToken.meta = { status }
    thinkTokens.push(thinkToken)
  }

  // 用新的 tokens 替换旧的 tokens
  state.tokens = thinkTokens
})

export default md
