import { materials } from "../schema/material"

export class WorldModule  {
  name = 'world'
  constructor () {
    this.map = {}
  }

  dispatch (action) {
    switch (action.type) {
      case 'character/gathering':
        this.map[action.position].resources[action.itemName] -= action.quantity
        if (this.map[action.position].resources[action.itemName] <= 0) {
          delete this.map[action.position].resources[action.itemName]
        }
        break
      case 'world/survey':
        this.survey(action.position)
        break
      case 'world/home_expend':
        if (!this.map['0,0']) this.map['0,0'] = { resources: {} }

        this.map['0,0'].resources[action.name] = 1000
        this.context.dispatch({ type: 'discovery', name: action.name })
        break
      default:
    }
  }

  get blockResources () {
    const availablePositions = Object.values(this.modules.character.characters).map(character => character.position).join(',')
    return Object.entries(this.map).filter(entries => {
      return availablePositions.includes(entries[0])
    })
  }

  calDistance (positionA, positionB) {
    return Math.sqrt(Math.pow(positionA[0] - positionB[0], 2) + Math.pow(positionA[1] - positionB[1], 2))
  }

  survey ([x, y]) {
    // 通过坐标获取地块信息
    const key = `${x},${y}`
    if (!this.map[key]) this.map[key] = { resources: {} }
    const distance = this.calDistance([x, y], [0, 0])
    const pool = []
    Object.entries(materials).forEach(([name, material]) => {
      if (material.distance <= distance) {
        pool.push(name)
      }
    })

    // 随机一种资源
    const name = pool[Math.floor(Math.random() * pool.length)]
    if (!this.map[key].resources[name]) this.map[key].resources[name] = 0
    this.map[key].resources[name] += 1000
    this.context.dispatch({ type: 'discovery', name })
  }

  valueOf () {
    return {
      map: this.map,
    }
  }

  init ({ world = {} }) {
    Object.assign(this, world)
  }
}
