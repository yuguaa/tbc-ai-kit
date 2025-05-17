export default function markdownItYuguPlugin(md, options) {
  const opts = Object.assign(
    {
      closedAttr: ['data-closed', 'true'],
    },
    options,
  )

  md.block.ruler.after('fence', 'yugu_block', function (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let lineText = state.src.slice(pos, max)

    const startRegex = /^::: yugu-start\[([^\]]*)\](?:\$(.+?)\$)?/
    const startMatch = lineText.match(startRegex)
    if (!startMatch) return false
    if (silent) return true

    const startPrefix = startMatch[1].trim()
    const startDataRaw = startMatch[2]?.trim() || null

    let content = ''
    let endLineNum = startLine + 1
    let foundEnd = false
    let endSuffix = null
    let endDataRaw = null
    let nestingLevel = 1

    // 收集内容，保留原始缩进
    while (endLineNum < endLine) {
      pos = state.bMarks[endLineNum]
      max = state.eMarks[endLineNum]
      lineText = state.src.slice(pos, max)
      const nestedStartMatch = lineText.match(/^::: yugu-start\[([^\]]*)\](?:\$(.+?)\$)?/)
      if (nestedStartMatch) nestingLevel++

      const endMatch = lineText.match(/^::: yugu-end\[([^\]]*)\](?:\$(.+?)\$)?/)
      if (endMatch) {
        nestingLevel--
        if (nestingLevel === 0) {
          foundEnd = true
          endSuffix = endMatch[1].trim()
          endDataRaw = endMatch[2]?.trim() || null
          break
        }
      }

      content += state.src.slice(state.bMarks[endLineNum], max) + '\n'
      endLineNum++
    }

    if (!foundEnd) {
      while (endLineNum < endLine) {
        pos = state.bMarks[endLineNum]
        max = state.eMarks[endLineNum]
        content += state.src.slice(state.bMarks[endLineNum], max) + '\n'
        endLineNum++
      }
    }

    state.line = endLineNum + (foundEnd ? 1 : 0)

    const openToken = state.push('yugu_block_open', 'div', 1)
    openToken.attrs = openToken.attrs || []
    openToken.attrs.push(['class', 'yugu'])
    if (startDataRaw) openToken.attrs.push(['data-yugu-start', startDataRaw])
    openToken.attrs.push(['data-yugu-prefix', startPrefix])
    if (foundEnd && endSuffix) {
      if (endDataRaw) openToken.attrs.push(['data-yugu-end', endDataRaw])
      openToken.attrs.push(['data-yugu-suffix', endSuffix])
      if (endDataRaw) openToken.attrs.push(opts.closedAttr)
    }
    openToken.map = [startLine, endLineNum]

    openToken.meta = openToken.meta || {}
    openToken.meta.startPrefix = startPrefix
    try {
      openToken.meta.startData = startDataRaw ? JSON.parse(startDataRaw) : null
    } catch (e) {
      openToken.meta.startData = startDataRaw
    }
    if (foundEnd && endSuffix) {
      openToken.meta.endSuffix = endSuffix
      try {
        openToken.meta.endData = endDataRaw ? JSON.parse(endDataRaw) : null
      } catch (e) {
        openToken.meta.endData = endDataRaw
      }
    }

    if (content.trim()) {
      const tokens = []
      md.block.parse(content, md, state.env, tokens)
      state.tokens.push(...tokens)
    }

    state.push('yugu_block_close', 'div', -1)
    return true
  })

  md.renderer.rules.yugu_block_open = function (tokens, idx) {
    return `<div${md.renderer.renderAttrs(tokens[idx])}>`
  }
  md.renderer.rules.yugu_block_close = function () {
    return '</div>'
  }
}
