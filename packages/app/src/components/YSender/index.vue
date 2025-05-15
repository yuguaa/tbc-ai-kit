<template>
  <div class="qa-sender">
    <slot></slot>
    <div :class="['qa-sender__content', isFocus ? 'focus' : '']">
      <div class="qa-sender__input">
        <input-area
          ref="inputRef"
          v-model="msg"
          :placeholder="'请输入文字内容'"
          @focus="onFocus"
          @enter="onSubmit"
        ></input-area>
      </div>
      <div class="qa-sender__btns">
        <div class="qa-sender__actions">
          <y-button type="select" v-model="deepThink">
            <template #icon>
              <svg-icon icon-class="deep-think" />
            </template>
            <span>深度思考</span>
          </y-button>
        </div>
        <div class="y-flex y-flex-1 y-items-center y-justify-end y-px-12 y-text-right">
          <y-popper
            mode="light"
            :visibleArrow="false"
            :options="{
              placement: 'top',
              modifiers: { offset: { offset: '0,0' } },
            }"
          >
            <div class="y-flex y-flex-col y-p-8 y-shadow-custom">
              <div
                @click="change('LOCAL')"
                class="y-cursor-pointer y-rounded-[4px] y-px-12 y-py-[5px] y-text-[14px] hover:y-bg-borderLight"
                :class="[sender.useType === 'LOCAL' ? 'y-bg-second y-text-main' : 'y-text-mainText']"
              >
                企业知识库答案
              </div>
              <div
                @click="change('SPARK')"
                class="y-cursor-pointer y-rounded-[4px] y-px-12 y-py-[5px] y-text-[14px] hover:y-bg-borderLight"
                :class="[sender.useType === 'SPARK' ? 'y-bg-second y-text-main' : 'y-text-mainText']"
              >
                AI认知模型答案
              </div>
            </div>
            <span slot="reference" class="y-mr-16 y-box-border y-flex y-rounded-[4px] y-p-4 hover:y-bg-borderLight">
              <svg-icon class="y-cursor-pointer" icon-class="setup"></svg-icon>
            </span>
          </y-popper>
          <div class="y-h-16 y-w-1 y-bg-borderDark"></div>
        </div>
        <div>
          <div class="qa-sender__submit" v-if="isGenerating">
            <svg-icon icon-class="pause" @click="onStop" />
          </div>
          <div class="qa-sender__submit" :class="{ disabled: !this.sender.content.trim() }" v-else>
            <svg-icon icon-class="sending" @click="onSubmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import YButton from '@/components/YButton'
import InputArea from './InputArea.vue'
import YPopper from '@/components/YPopper'
export default {
  components: {
    SvgIcon,
    YButton,
    InputArea,
    YPopper,
  },
  props: {
    isGenerating: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: '',
    },
    sender: {
      type: Object,
      default: () => {
        return {
          content: '',
          deepThink: false,
          useType: 'LOCAL', // LOCAL or SPARK
        }
      },
    },
  },
  data() {
    return {
      isFocus: false,
    }
  },
  computed: {
    deepThink: {
      get() {
        return this.sender.deepThink
      },
      set(value) {
        this.$emit('update:sender', {
          ...this.sender,
          deepThink: value,
        })
      },
    },
    msg: {
      get() {
        return this.sender.content
      },
      set(value) {
        this.$emit('update:sender', {
          ...this.sender,
          content: value,
        })
      },
    },
  },
  methods: {
    change(type) {
      this.$emit('update:sender', {
        ...this.sender,
        useType: type,
      })
    },
    onFocus(focus) {
      this.isFocus = focus
    },
    clear() {
      this.$refs.inputRef.clear()
    },
    onSubmit() {
      this.$emit('submit')
    },
    onStop() {
      this.$emit('stop')
    },
  },
}
</script>
<style lang="less" scoped>
.qa-sender {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  /* height: 118px; */
  // padding: 0 24px 20px;
  font-family: 'PingFang SC';
  box-sizing: border-box;
  &__content {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 12px 16px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
    &.focus {
      border: 1px solid #1159ff;
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
    }
  }
  &__input {
    position: relative;
    flex: 1;
    min-height: 32px;
    max-height: 100px;
    overflow: auto;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    color: #262626;
    word-break: break-all;
    outline: none;
    &:empty::before {
      position: absolute;
      left: 0;
      color: #333;
      pointer-events: none;
      content: attr(data-placeholder);
    }
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    /* margin-top: 20px; */
  }
  .qa-sender__actions {
    display: flex;
    align-items: center;
  }
  &__btn {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    font-size: 14px;
    font-weight: normal;
    // line-height: 20px;
    color: #262626;
    cursor: pointer;
    user-select: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    margin-left: 12px;
    &:nth-of-type(1) {
      margin-left: 0px;
    }
    &.active {
      color: #1159ff;
      background: #e8f3ff;
      border-color: #1159ff;
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      line-height: unset;
    }
  }
  &__submit {
    transition: all 0.3s;
    cursor: pointer;
    color: #bfbfbf;
    height: 32px;
    width: 32px;
    ::v-deep {
      svg {
        width: 32px;
        height: 32px;
      }
    }
    &:hover {
      color: #1159ff;
    }
    &.disabled {
      color: #bfbfbf;
      pointer-events: none;
    }
  }
}
</style>
