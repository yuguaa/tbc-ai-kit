const plugin = require('tailwindcss/plugin')
const spacings = []
for (let i = 0; i <= 100; i++) {
  spacings.push(i * 2)
}
const spacingsSettings = spacings.reduce((pre, cur) => {
  pre[cur] = cur + 'px'
  return pre
}, {})
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1888ff',
        gp: {
          content: '#D8E3F6',
          main: '#133f9e',
          sub: '#EDF1F8',
          cur: '#ED726E',
          dash: '#FF6969',
          dMain: '#1990FF',
          dSub: '#1DD5D6',
          dCur: '#3054EB'
        }
      }
    },
    spacing: {
      1: '1px',
      ...spacingsSettings
    }
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      // addBase({
      //   'html,body,#app': {
      //     fontFamily: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
      //     height: '100%',
      //     'line-height': '1.15'
      //   }
      // })
      addUtilities({
        '.scrollbar-common': {
          '&::-webkit-scrollbar-track-piece': {
            background: '#d3dce6'
          },
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#99a9bf',
            'border-radius': '20px'
          }
        }
      })
    })
  ]
}
