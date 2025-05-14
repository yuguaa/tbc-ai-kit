<template>
  <component :is="tagName" :class="{ 'y-popper-active': showPopper }">
    <transition
      :name="transition"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      @after-leave="doDestroy"
    >
      <span ref="popper" :class="rootClassComputed" v-show="!disabled && showPopper">
        <slot>{{ content }}</slot>
      </span>
    </transition>
    <slot name="reference"></slot>
  </component>
</template>

<script>
import Popper from 'popper.js'

function on(element, event, handler) {
  if (element && event && handler) {
    document.addEventListener
      ? element.addEventListener(event, handler, false)
      : element.attachEvent('on' + event, handler)
  }
}

function off(element, event, handler) {
  if (element && event) {
    document.removeEventListener
      ? element.removeEventListener(event, handler, false)
      : element.detachEvent('on' + event, handler)
  }
}

export default {
  props: {
    mode: {
      type: String,
      default: 'dark',
    },
    tagName: {
      type: String,
      default: 'span',
    },
    trigger: {
      type: String,
      default: 'hover',
      validator: (value) =>
        [
          'clickToOpen',
          'click', // Same as clickToToggle, provided for backwards compatibility.
          'clickToToggle',
          'hover',
          'focus',
        ].indexOf(value) > -1,
    },
    delayOnMouseOver: {
      type: Number,
      default: 10,
    },
    delayOnMouseOut: {
      type: Number,
      default: 10,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    content: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    boundariesSelector: String,
    reference: {},
    forceShow: {
      type: Boolean,
      default: false,
    },
    dataValue: {
      default: null,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    visibleArrow: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: String,
      default: '',
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    preventDefault: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
    rootClass: {
      type: String,
      default: 'y-tbc-popper',
    },
  },
  computed: {
    rootClassComputed() {
      return [this.rootClass, this.mode]
    },
  },
  data() {
    return {
      referenceElm: null,
      popperJS: null,
      showPopper: false,
      currentPlacement: '',
      popperOptions: {
        placement: 'bottom',
        computeStyle: {
          gpuAcceleration: false,
        },
      },
    }
  },

  watch: {
    showPopper(value) {
      if (value) {
        this.$emit('show', this)
        if (this.popperJS) {
          this.popperJS.enableEventListeners()
        }
        this.updatePopper()
      } else {
        if (this.popperJS) {
          this.popperJS.disableEventListeners()
        }
        this.$emit('hide', this)
      }
    },

    forceShow: {
      handler(value) {
        this[value ? 'doShow' : 'doClose']()
      },
      immediate: true,
    },

    disabled(value) {
      if (value) {
        this.showPopper = false
      }
    },
  },

  created() {
    this.appendedArrow = false
    this.appendedToBody = false
    this.popperOptions = Object.assign(this.popperOptions, this.options)
  },

  mounted() {
    this.referenceElm = this.reference || this.$slots.reference[0].elm
    this.popper = this.$slots.default[0].elm
    this.popper.classList.add('y-popper')

    switch (this.trigger) {
      case 'clickToOpen':
        on(this.referenceElm, 'click', this.doShow)
        on(document, 'click', this.handleDocumentClick)
        on(document, 'touchstart', this.handleDocumentClick)
        break
      case 'click': // Same as clickToToggle, provided for backwards compatibility.
      case 'clickToToggle':
        on(this.referenceElm, 'click', this.doToggle)
        on(document, 'click', this.handleDocumentClick)
        on(document, 'touchstart', this.handleDocumentClick)
        break
      case 'hover':
        on(this.referenceElm, 'mouseover', this.onMouseOver)
        on(this.popper, 'mouseover', this.onMouseOver)
        on(this.referenceElm, 'mouseout', this.onMouseOut)
        on(this.popper, 'mouseout', this.onMouseOut)
        break
      case 'focus':
        on(this.referenceElm, 'focus', this.onMouseOver)
        on(this.popper, 'focus', this.onMouseOver)
        on(this.referenceElm, 'blur', this.onMouseOut)
        on(this.popper, 'blur', this.onMouseOut)
        break
    }
  },

  methods: {
    doToggle(event) {
      if (this.stopPropagation) {
        event.stopPropagation()
      }

      if (this.preventDefault) {
        event.preventDefault()
      }

      if (!this.forceShow) {
        this.showPopper = !this.showPopper
      }
    },

    doShow() {
      this.showPopper = true
    },

    doClose() {
      this.showPopper = false
    },

    doDestroy() {
      if (this.showPopper) {
        return
      }

      if (this.popperJS) {
        this.popperJS.destroy()
        this.popperJS = null
      }

      if (this.appendedToBody) {
        this.appendedToBody = false
        document.body.removeChild(this.popper.parentElement)
      }
    },

    createPopper() {
      this.$nextTick(() => {
        if (this.visibleArrow) {
          this.appendArrow(this.popper)
        }

        if (this.appendToBody && !this.appendedToBody) {
          this.appendedToBody = true
          document.body.appendChild(this.popper.parentElement)
        }

        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy()
        }

        if (this.boundariesSelector) {
          const boundariesElement = document.querySelector(this.boundariesSelector)

          if (boundariesElement) {
            this.popperOptions.modifiers = Object.assign({}, this.popperOptions.modifiers)
            this.popperOptions.modifiers.preventOverflow = Object.assign(
              {},
              this.popperOptions.modifiers.preventOverflow,
            )
            this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement
          }
        }

        this.popperOptions.onCreate = () => {
          this.$emit('created', this)
          this.$nextTick(this.updatePopper)
        }

        this.popperJS = new Popper(this.referenceElm, this.popper, this.popperOptions)
      })
    },

    destroyPopper() {
      off(this.referenceElm, 'click', this.doToggle)
      off(this.referenceElm, 'mouseup', this.doClose)
      off(this.referenceElm, 'mousedown', this.doShow)
      off(this.referenceElm, 'focus', this.doShow)
      off(this.referenceElm, 'blur', this.doClose)
      off(this.referenceElm, 'mouseout', this.onMouseOut)
      off(this.referenceElm, 'mouseover', this.onMouseOver)
      off(document, 'click', this.handleDocumentClick)

      this.showPopper = false
      this.doDestroy()
    },

    appendArrow(element) {
      if (this.appendedArrow) {
        return
      }

      this.appendedArrow = true

      const arrow = document.createElement('div')
      arrow.setAttribute('y-x-arrow', '')
      arrow.className = 'y-popper__arrow'
      element.appendChild(arrow)
    },

    updatePopper() {
      this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper()
    },

    onMouseOver() {
      clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        this.showPopper = true
      }, this.delayOnMouseOver)
    },

    onMouseOut() {
      clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        this.showPopper = false
      }, this.delayOnMouseOut)
    },

    handleDocumentClick(e) {
      if (
        !this.$el ||
        !this.referenceElm ||
        this.elementContains(this.$el, e.target) ||
        this.elementContains(this.referenceElm, e.target) ||
        !this.popper ||
        this.elementContains(this.popper, e.target)
      ) {
        return
      }

      this.$emit('documentClick', this)

      if (this.forceShow) {
        return
      }
      this.showPopper = false
    },

    elementContains(elm, otherElm) {
      if (typeof elm.contains === 'function') {
        return elm.contains(otherElm)
      }

      return false
    },
  },

  destroyed() {
    this.destroyPopper()
  },
}
</script>

<style lang="less">
.y-tbc-popper {
  &.dark {
    .y-popper {
      background: #000000;
      color: #ffffff;
    }
    .y-popper[x-placement^='top'] .y-popper__arrow {
      border-color: #000 transparent transparent transparent;
    }
    .y-popper[x-placement^='bottom'] .y-popper__arrow {
      border-color: transparent transparent #000 transparent;
    }
    .y-popper[x-placement^='right'] .y-popper__arrow {
      border-color: transparent #000 transparent transparent;
    }
    .y-popper[x-placement^='left'] .y-popper__arrow {
      border-color: transparent transparent transparent #000;
    }
  }
  &.light {
    .y-popper {
      background: #ffffff;
      color: #000000;
    }
    .y-popper[x-placement^='top'] .y-popper__arrow {
      border-color: #ffffff transparent transparent transparent;
    }
    .y-popper[x-placement^='bottom'] .y-popper__arrow {
      border-color: transparent transparent #ffffff transparent;
    }
    .y-popper[x-placement^='right'] .y-popper__arrow {
      border-color: transparent #ffffff transparent transparent;
    }
    .y-popper[x-placement^='left'] .y-popper__arrow {
      border-color: transparent transparent transparent #ffffff;
    }
  }
  .y-popper {
    width: auto;
    display: inline-block;
    border-radius: 8px;
    position: absolute;
    font-size: 14px;
    padding: 5px 8px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    z-index: 200000;
  }

  .y-popper .y-popper__arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }

  .y-popper[x-placement^='top'] {
    margin-bottom: 5px;
  }

  .y-popper[x-placement^='top'] .y-popper__arrow {
    border-width: 5px 5px 0 5px;
    border-color: #000 transparent transparent transparent;
    bottom: -5px;
    left: calc(50% - 7.5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .y-popper[x-placement^='bottom'] {
    margin-top: 5px;
  }

  .y-popper[x-placement^='bottom'] .y-popper__arrow {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #000 transparent;
    top: -5px;
    left: calc(50% - 7.5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .y-popper[x-placement^='right'] {
    margin-left: 5px;
  }

  .y-popper[x-placement^='right'] .y-popper__arrow {
    border-width: 5px 5px 5px 0;
    border-color: transparent #000 transparent transparent;
    left: -5px;
    top: calc(50% - 7.5px);
    margin-left: 0;
    margin-right: 0;
  }

  .y-popper[x-placement^='left'] {
    margin-right: 5px;
  }

  .y-popper[x-placement^='left'] .y-popper__arrow {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #000;
    right: -5px;
    top: calc(50% - 7.5px);
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
