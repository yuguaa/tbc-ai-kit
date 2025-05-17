export default function markdownItThinkPlugin(md) {
  md.core.ruler.push('think', function (state) {
    const tokens = state.tokens
    const thinkTokens = []
    let insideThink = false
    let content = ''
    let status = 'UN_START' // 默认状态
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'html_block' && token.content.startsWith('<div')) {
        const index = token.content.indexOf('<think>')
        if (index !== -1) {
          token.content = token.content.slice(index)
        } else {
          token.content = ''
        }
      }
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
    if (insideThink) {
      const thinkToken = new state.Token('think', 'div', 0)
      thinkToken.content = content
      thinkToken.meta = { status }
      thinkTokens.push(thinkToken)
    }

    // 用新的 tokens 替换旧的 tokens
    state.tokens = thinkTokens
  })
}
