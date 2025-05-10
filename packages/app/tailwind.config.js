/** @type {import('tailwindcss').Config} */
module.exports = {
  // 启用 Purge 功能
  content: ['./public/**/*.html', './src/**/*.vue'],
  prefix: 'y-', // 自定义前缀
  darkMode: 'media', // 或 'media' / 'class'
  presets: [require('./src/utils/tailwindcss-presets')],
  theme: {
    extend: {}
  }
}
