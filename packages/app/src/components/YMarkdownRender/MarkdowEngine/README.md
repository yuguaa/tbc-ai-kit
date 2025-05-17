# 自定义 `yugu` 插件

## 1. 使用方法

- 直接在 `markdown` 中使用 `yugu` 标签，标签的开始和结束都需要添加 `yugu-start` 和 `yugu-end`，中间可以放置任意内容。
- 支持自定义开始结束标签对应的`tag`, 例如`app`，`sub`，`yugu-start` 和 `yugu-end` 中的 `tag` 属性值需要一致。必须使用`[]`包裹
- 支持自定义数据，数据可以是字符串和 json 对象，json 对象需要转义。且数据必须用`$`包裹
- 支持自定义数据的回调函数，回调函数在 `yugu-start` 中的 `onDataExtract` 属性中传入，回调函数的参数为提取的数据。
- 支持嵌套标签，嵌套标签必须合并在一起，不能分开。
- 支持回调函数，回调函数在 `yugu-start` 中的 `onDataExtract` 属性中传入，回调函数的参数为提取的数据。

## 2. 依赖

插件依赖`markdown-it-attrs`，需要在 `markdown-it` 中注册该插件。

## 3. 示例

```js
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import yuguPlugin from '@yugu/yugu-plugin'
import { yuguPlugin } from '@yugu/yugu-plugin'
const md = new MarkdownIt()
  .use(markdownItAttrs)
  .use(yuguPlugin, {
    onDataExtract: (data) => {
      console.log('提取的 data:', data)
    },
  })
const result = md.render(`
# 这是一个标题
::: yugu-start[app]${"a":1,"b":[{"c":222}]}$
::: yugu-start[sub]${"a":1,"b":[{"c":222}]}$
::: yugu-end[sub]$支持嵌套，但必须合并标签嵌套$
::: yugu-end[app]$这里是数据，可以是字符串和json$
`)
console.log(result)

```
