// modalUtils.js
let openCount = 0 // 跟踪打开的弹窗数量（包括嵌套）
let currentZIndex = 1000 // 初始 z-index
let originalOverflow = null // 缓存 <body> 原始 overflow 样式

export const modalUtils = {
  // 打开弹窗时调用
  openModal() {
    openCount++
    if (openCount === 1) {
      // 仅在第一个弹窗打开时缓存并禁止 <body> 滚动
      originalOverflow = document.body.style.overflow || getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
    }
    currentZIndex += 10 // 递增 z-index
    return currentZIndex
  },
  // 关闭弹窗时调用
  closeModal() {
    openCount--
    if (openCount <= 0) {
      openCount = 0 // 防止负数
      // 最后一个弹窗关闭时恢复 <body> 原始 overflow
      document.body.style.overflow = originalOverflow || ''
      originalOverflow = null // 清理缓存
    }
    currentZIndex -= 10 // 减少 z-index
  },
}
