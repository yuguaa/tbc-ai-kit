<template>
  <div
    class="input-area"
    ref="editable"
    contenteditable="true"
    :class="{ 'is-empty': isEmpty }"
    :data-placeholder="placeholder"
    @input="onInput"
    @blur="onBlur"
    @paste="onPaste"
    @focus="onFocus"
    @keydown.enter="onEnter"
  ></div>
</template>

<script>
export default {
  name: 'InputArea',
  props: {
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: 500,
    },
    placeholder: {
      type: String,
      default: function () {
        return '输入想问的问题吧~'
      },
    },
  },
  data() {
    return {
      innerText: '', // 内部值，不再强制 set innerText 每次更新
      isFocus: false, // 🔸内部 isFocus 状态
    }
  },
  computed: {
    isEmpty() {
      return this.innerText.trim() === ''
    },
  },
  mounted() {
    this.innerText = this.value
    this.setInnerText(this.value)
  },
  watch: {
    value(newVal) {
      if (newVal !== this.innerText) {
        this.innerText = newVal
        this.setInnerText(newVal) // 外部变更时才设置 DOM
      }
    },
    isFocus(newVal) {
      this.$emit('focus', newVal)
    },
  },
  methods: {
    clear() {
      this.innerText = ''
      this.setInnerText('')
    },
    onFocus() {
      this.isFocus = true
    },
    setInnerText(text) {
      const el = this.$refs.editable
      if (el && el.innerText !== text) {
        el.innerText = text
        this.setCursorToEnd(el)
      }
    },
    setCursorToEnd(el) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(el)
      range.collapse(false) // false 表示光标移到内容末尾
      sel.removeAllRanges()
      sel.addRange(range)
    },
    onInput() {
      const el = this.$refs.editable
      let val = el.innerText
      if (val.length > this.maxLength) {
        val = val.slice(0, this.maxLength)
        this.setInnerText(val) // ⚠️ 回写 DOM 内容
      }

      this.innerText = val
      this.$emit('input', val) // v-model 同步
    },
    onBlur() {
      this.isFocus = false
      this.onInput()
    },
    onPaste(e) {
      e.preventDefault()
      const pasteText = e.clipboardData?.getData('text/plain') || ''
      const currentText = this.$refs.editable.innerText
      const total = (currentText + pasteText).slice(0, this.maxLength)
      document.execCommand('insertText', false, total.slice(currentText.length))
    },
    onEnter(e) {
      e.preventDefault()
      this.$emit('enter')
    },
  },
}
</script>

<style lang="less" scoped>
.input-area {
  position: relative;
  padding-bottom: 20px;
  outline: none;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    color: #aaa;
    pointer-events: none;
    content: attr(data-placeholder);
  }

  &:not(.is-empty)::before {
    content: '';
  }
}
</style>
