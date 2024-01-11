import { WorldModule } from './world'
import { HomeModule } from './home'
import { CharacterModule } from './character'
import { TaskModule } from './task'
import { InventoryModule } from './inventory'
import { SystemModule } from './system'

export default class Game {
  constructor({ render } = {}) {
    this.modules = {}
    this.stopMain = null
    this.lastTick = null
    this.tickLength = 100
    this.render = render
    this.renderTime = performance.now()
    this.register('world', new WorldModule())
    this.register('home', new HomeModule())
    this.register('character', new CharacterModule())
    this.register('task', new TaskModule())
    this.register('inventory', new InventoryModule())
    this.register('system', new SystemModule())
  }

  register(name, module) {
    module.context = this
    module.modules = this.modules
    this.modules[name] = module
  }

  init(payload = {}, params = {}) {
    if (payload.version) {
      // 版本升级
    }

    // 模块从存档恢复状态
    Object.values(this.modules).forEach((module) => {
      module.init && module.init(payload)
    })

    if (!params.offlineProgress) payload.lastTick = performance.now()
    this.lastTick = payload.lastTick || performance.now()

    // 开始主循环
    this.main(this.lastTick)
  }

  main (tFrame) {
    this.stopMain = setTimeout(() => this.main(performance.now()), this.tickLength)
    const nextTick = this.lastTick + this.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
      const timeSinceTick = tFrame - this.lastTick
      numTicks = Math.floor(timeSinceTick / this.tickLength)
    }

    for (let i = 0; i < numTicks; i++) {
      this.lastTick += this.tickLength
      this.dispatch({ type: 'tick' })
    }

    if (tFrame - this.renderTime > 1000) {
      this.render && this.render(this.modules)
      this.renderTime = tFrame
    }
  }

  dispatch(action) {
    Object.values(this.modules).forEach((module) => {
      module.dispatch && module.dispatch(action)
    })
  }

  valueOf () {
    const payload = { lastTick: this.lastTick }
    Object.values(this.modules).forEach((module) => {
      payload[module.name] = module.valueOf()
    })
    return payload
  }
}
