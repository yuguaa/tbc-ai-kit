export function yuguPlugin(md, options) {
  const opts = Object.assign(
    {
      onDataExtract: null, // 回调函数，接收 { startPrefix, startData, endSuffix, endData }
      closedAttr: ['data-closed', 'true'], // 结束标记存在时添加的属性
    },
    options,
  )

  md.block.ruler.before('paragraph', 'yugu_block', function (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let lineText = state.src.slice(pos, max)

    // 支持非必须 $json$，正则可选捕获数据部分
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

    while (endLineNum < endLine) {
      pos = state.bMarks[endLineNum] + state.tShift[endLineNum]
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

      content += lineText + '\n'
      endLineNum++
    }

    if (!foundEnd) {
      while (endLineNum < endLine) {
        pos = state.bMarks[endLineNum] + state.tShift[endLineNum]
        max = state.eMarks[endLineNum]
        content += state.src.slice(pos, max) + '\n'
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
    if (startDataRaw) {
      try {
        openToken.meta.startData = JSON.parse(startDataRaw)
      } catch (e) {
        openToken.meta.startData = startDataRaw
      }
    } else {
      openToken.meta.startData = null
    }

    if (foundEnd && endSuffix) {
      openToken.meta.endSuffix = endSuffix
      if (endDataRaw) {
        try {
          openToken.meta.endData = JSON.parse(endDataRaw)
        } catch (e) {
          openToken.meta.endData = endDataRaw
        }
      } else {
        openToken.meta.endData = null
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
