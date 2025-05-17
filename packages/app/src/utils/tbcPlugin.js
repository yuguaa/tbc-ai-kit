export function tbcPlugin(md, options) {
  // 默认选项
  const opts = Object.assign(
    {
      onDataExtract: null, // 回调函数，接收 { startPrefix, startData, endSuffix, endData, startJson, endJson }
      closedAttr: ['data-closed', 'true'], // 结束标记存在时添加的属性
    },
    options,
  )

  // 块级 TBC 规则
  md.block.ruler.before('paragraph', 'tbc_block', function (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let lineText = state.src.slice(pos, max)

    // 检查是否以 ::: tbc-start[prefix]{{data}} 开头
    const startMatch = lineText.match(/^::: tbc-start\[([^\]]*)\]{{([^}]*)}}/)
    if (!startMatch) return false

    if (silent) return true

    const startPrefix = startMatch[1].trim()
    const startData = startMatch[2].trim()

    let content = ''
    let endLineNum = startLine + 1
    let foundEnd = false
    let endSuffix = null
    let endData = null

    // 嵌套计数器，当前块起始为1
    let nestingLevel = 1

    while (endLineNum < endLine) {
      pos = state.bMarks[endLineNum] + state.tShift[endLineNum]
      max = state.eMarks[endLineNum]
      lineText = state.src.slice(pos, max)

      // 检测嵌套的开始标记
      const nestedStartMatch = lineText.match(/^::: tbc-start\[([^\]]*)\]{{([^}]*)}}/)
      if (nestedStartMatch) {
        nestingLevel++
      }

      // 检测结束标记
      const endMatch = lineText.match(/^::: tbc-end\[([^\]]*)\]{{([^}]*)}}/)
      if (endMatch) {
        nestingLevel--
        if (nestingLevel === 0) {
          foundEnd = true
          endSuffix = endMatch[1].trim()
          endData = endMatch[2].trim()
          break
        }
      }

      content += lineText + '\n'
      endLineNum++
    }

    // 如果没有找到结束标记，收集到 endLine
    if (!foundEnd) {
      while (endLineNum < endLine) {
        pos = state.bMarks[endLineNum] + state.tShift[endLineNum]
        max = state.eMarks[endLineNum]
        content += state.src.slice(pos, max) + '\n'
        endLineNum++
      }
    }

    // 更新 state
    state.line = endLineNum + (foundEnd ? 1 : 0)

    // 创建开始 token
    let openToken = state.push('tbc_block_open', 'div', 1)
    openToken.attrs = openToken.attrs || []
    openToken.attrs.push(['class', 'tbc'])
    openToken.attrs.push(['data-tbc-start', startData])
    openToken.attrs.push(['data-tbc-prefix', startPrefix])
    if (foundEnd && endData && endSuffix) {
      openToken.attrs.push(['data-tbc-end', endData])
      openToken.attrs.push(['data-tbc-suffix', endSuffix])
      openToken.attrs.push(opts.closedAttr)
    }
    openToken.map = [startLine, endLineNum]

    // 存储数据到 token.meta
    openToken.meta = openToken.meta || {}
    openToken.meta.startPrefix = startPrefix
    openToken.meta.startData = startData
    if (foundEnd && endData && endSuffix) {
      openToken.meta.endSuffix = endSuffix
      openToken.meta.endData = endData
    }

    // 尝试解析 JSON
    let startJson = null
    let endJson = null
    try {
      startJson = JSON.parse(startData)
      openToken.meta.startData = startJson
    } catch (e) {
      // 保留原始 startData
    }
    if (foundEnd && endData) {
      try {
        endJson = JSON.parse(endData)
        openToken.meta.endData = endJson
      } catch (e) {
        // 保留原始 endData
      }
    }

    // 调用回调函数
    if (opts.onDataExtract) {
      opts.onDataExtract({
        startPrefix,
        startData,
        endSuffix,
        endData,
      })
    }

    // 解析内部 Markdown 内容
    if (content.trim()) {
      const tokens = []
      md.block.parse(content, md, state.env, tokens)
      state.tokens.push(...tokens)
    }

    // 结束 token
    state.push('tbc_block_close', 'div', -1)
    return true
  })

  // 渲染规则
  md.renderer.rules.tbc_block_open = function (tokens, idx) {
    return `<div${md.renderer.renderAttrs(tokens[idx])}>`
  }
  md.renderer.rules.tbc_block_close = function () {
    return '</div>'
  }
}
