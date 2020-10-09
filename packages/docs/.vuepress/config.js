// .vuepress/config.js
const configOdyssey = require('./config.odyssey')
const configNimatron = require('./config.nimatron')
const themeName = process.env.THEME || 'nimatron'
const config = themeName === 'odyssey' ? configOdyssey : configNimatron

module.exports = config
