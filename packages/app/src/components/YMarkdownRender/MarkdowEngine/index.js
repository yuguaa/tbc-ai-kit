import MarkdownIt from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItIns from 'markdown-it-ins'
import markdownItMark from 'markdown-it-mark'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItToc from 'markdown-it-toc-done-right'
import mila from 'markdown-it-link-attributes'
import Shiki from '@shikijs/markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItThinkPlugin from './plugins/thinkPlugin'
import markdownItYuguPlugin from './plugins/yuguPlugin'
const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: false,
  typographer: true,
})
  .use(emoji)
  .use(markdownItAttrs)
  .use(markdownItAbbr)
  .use(markdownItFootnote)
  .use(markdownItDeflist)
  .use(markdownItIns)
  .use(markdownItMark)
  .use(markdownItToc)
  .use(markdownItTaskLists, { enable: true })
  .use(mila, {
    matcher(href) {
      return href.startsWith('https:') || href.startsWith('http:')
    },
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  })
  .use(
    await Shiki({
      themes: {
        light: 'vitesse-light',
      },
    }),
  )
  .use(markdownItThinkPlugin)
  .use(markdownItYuguPlugin)
export default md
