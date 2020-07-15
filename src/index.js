import './styles/core.scss'
import './assets/favicon.ico'
import 'yuki-createjs/lib/easeljs-0.8.2.combined'
import Main from './js/main.js'

const defaultConfig = {
  maxPoints: 50,
  interval: 60,
  lineStroke: '#ffeb99',
}

const sizesConfig = [
  { width: 970, maxPoints: 45, interval: 60 },
  { width: 600, maxPoints: 40, interval: 70 },
  { width: 400, maxPoints: 30, interval: 80 },
]

const config = sizesConfig.reduce((prev, cur) => {
  if (window.innerWidth <= cur.width) {
    prev = Object.assign(defaultConfig, cur)
  }

  return prev
}, defaultConfig)

new Main(config)
