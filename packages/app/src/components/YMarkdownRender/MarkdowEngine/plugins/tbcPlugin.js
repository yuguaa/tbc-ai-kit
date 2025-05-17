export function tbcPlugin(md, options) {
  // 默认选项
  const opts = Object.assign(
    {
      onDataExtract: null, // 回调函数，接收 { startPrefix, startData, endSuffix, endData }
      closedAttr: ['data-closed', 'true'], // 结束标记存在时添加的属性
    },
    options,
  )

  // 块级 TBC 规则
  md.block.ruler.before('paragraph', 'tbc_block', function (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let lineText = state.src.slice(pos, max)

    // 正则改为匹配 ::: tbc-start[prefix]$json_data$
    // 注意 $ 需要转义，且用非贪婪模式匹配数据部分
    const startMatch = lineText.match(/^::: tbc-start\[([^\]]*)\]\$(.+?)\$/)
    if (!startMatch) return false

    if (silent) return true

    const startPrefix = startMatch[1].trim()
    const startDataRaw = startMatch[2].trim()

    let content = ''
    let endLineNum = startLine + 1
    let foundEnd = false
    let endSuffix = null
    let endDataRaw = null

    // 嵌套计数器，当前块起始为1
    let nestingLevel = 1

    while (endLineNum < endLine) {
      pos = state.bMarks[endLineNum] + state.tShift[endLineNum]
      max = state.eMarks[endLineNum]
      lineText = state.src.slice(pos, max)

      // 嵌套开始标记
      const nestedStartMatch = lineText.match(/^::: tbc-start\[([^\]]*)\]\$(.+?)\$/)
      if (nestedStartMatch) {
        nestingLevel++
      }

      // 结束标记
      const endMatch = lineText.match(/^::: tbc-end\[([^\]]*)\]\$(.+?)\$/)
      if (endMatch) {
        nestingLevel--
        if (nestingLevel === 0) {
          foundEnd = true
          endSuffix = endMatch[1].trim()
          endDataRaw = endMatch[2].trim()
          break
        }
      }

      content += lineText + '\n'
      endLineNum++
    }

    // 如果没找到结束标记，收集到文档末尾
    if (!foundEnd) {
      while (endLineNum < endLine) {
        pos = state.bMarks[endLineNum] + state.tShift[endLineNum]
        max = state.eMarks[endLineNum]
        content += state.src.slice(pos, max) + '\n'
        endLineNum++
      }
    }

    state.line = endLineNum + (foundEnd ? 1 : 0)

    let openToken = state.push('tbc_block_open', 'div', 1)
    openToken.attrs = openToken.attrs || []
    openToken.attrs.push(['class', 'tbc'])
    openToken.attrs.push(['data-tbc-start', startDataRaw])
    openToken.attrs.push(['data-tbc-prefix', startPrefix])
    if (foundEnd && endDataRaw && endSuffix) {
      openToken.attrs.push(['data-tbc-end', endDataRaw])
      openToken.attrs.push(['data-tbc-suffix', endSuffix])
      openToken.attrs.push(opts.closedAttr)
    }
    openToken.map = [startLine, endLineNum]

    openToken.meta = openToken.meta || {}
    openToken.meta.startPrefix = startPrefix
    try {
      openToken.meta.startData = JSON.parse(startDataRaw)
    } catch (e) {
      console.warn('[tbcPlugin] startData JSON parse error:', startDataRaw, e)
      openToken.meta.startData = startDataRaw
    }
    if (foundEnd && endDataRaw && endSuffix) {
      openToken.meta.endSuffix = endSuffix
      try {
        openToken.meta.endData = JSON.parse(endDataRaw)
      } catch (e) {
        console.warn('[tbcPlugin] endData JSON parse error:', endDataRaw, e)
        openToken.meta.endData = endDataRaw
      }
    }

    if (opts.onDataExtract) {
      opts.onDataExtract({
        startPrefix,
        startData: openToken.meta.startData,
        endSuffix,
        endData: openToken.meta.endData,
      })
    }

    if (content.trim()) {
      const tokens = []
      md.block.parse(content, md, state.env, tokens)
      state.tokens.push(...tokens)
    }

    state.push('tbc_block_close', 'div', -1)
    return true
  })

  md.renderer.rules.tbc_block_open = function (tokens, idx) {
    return `<div${md.renderer.renderAttrs(tokens[idx])}>`
  }
  md.renderer.rules.tbc_block_close = function () {
    return '</div>'
  }
}
