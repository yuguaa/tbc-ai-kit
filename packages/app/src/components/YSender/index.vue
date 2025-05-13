<template>
  <div class="qa-sender">
    <div class="y-pb-12" v-if="mode === 'drawer'">
      <div class="y-flex">
        <y-button>
          <template #icon>
            <svg-icon icon-class="new-chat" />
          </template>
          <span>切换企业知识库</span>
        </y-button>
        <y-button class="y-ml-12">
          <template #icon>
            <svg-icon icon-class="history" />
          </template>
          <span>上网搜索</span>
        </y-button>
      </div>
    </div>
    <div :class="['qa-sender__content', isFocus ? 'focus' : '']">
      <div class="qa-sender__input">
        <input-area
          ref="inputRef"
          v-model="senderContent.content"
          :placeholder="'请输入文字内容'"
          @focus="onFocus"
          @enter="onSubmit"
        ></input-area>
      </div>
      <div class="qa-sender__btns">
        <div class="qa-sender__actions">
          <y-button type="select" v-model="senderContent.useKnowledge">
            <template #icon>
              <svg-icon icon-class="controlplatform" />
            </template>
            <span>切换企业知识库</span>
          </y-button>
          <y-button class="y-ml-12" type="select" v-model="senderContent.useInternet">
            <template #icon>
              <svg-icon icon-class="internet" />
            </template>
            <span>上网搜索</span>
          </y-button>
        </div>
        <div class="qa-sender__submit">
          <svg-icon icon-class="pause" v-if="isGenerating" />
          <svg-icon icon-class="sending" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import YButton from '@/components/YButton'
import InputArea from './InputArea.vue'
export default {
  components: {
    SvgIcon,
    YButton,
    InputArea,
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
  },
  data() {
    return {
      senderContent: {
        content: '',
        useInternet: false,
        useKnowledge: false,
      },
      isFocus: false,
    }
  },
  methods: {
    onFocus(focus) {
      this.isFocus = focus
    },
    onSubmit() {
      if (this.senderContent.content.trim() !== '') {
        this.$refs.inputRef.clear()
        this.$emit('submit', this.senderContent)
      }
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
    /* margin-top: 20px; */
  }
  .qa-sender__actions {
    flex: 1;
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
    font-size: 32px;
    &:hover {
      color: #1159ff;
    }
  }
}
</style>
