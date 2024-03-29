import { getGameStore, getContext } from '../utils'

export const buildings = {
  bonfire: {
    name: '篝火',
    size: 'standard',
    keywords: ['consume_fuel'],
    time: 1,
    effect: {}
  }
}

export class Building {
  constructor (data) {
    this.data = data
    this.schema = buildings[data.name]
    this.create()
  }

  run () {
    for (const runner of this.runners) {
      runner()
    }
  }

  create () {
    this.runners = []
    this.schema.keywords.forEach(keyword => {
      const decorator = decorators[keyword]
      if (decorator) decorator(this)
    })
  }

  getEffect () {
    return this.schema.effect
  }

  toJSON () {
    return this.data
  }

  get () {
    return this.data
  }
}

function consume_fuel (building) {
  if (!building.data.fuel) {
    building.data.fuel = {
      count: 10,
      max: 50,
    }
    if (building.data.name === 'bonfire' && building.data.hope_count === undefined) {
      building.data.hope_count = 4
    }
  }

  building.runners.push(() => {
    if (building.data.fuel.count > 0) {
      building.data.fuel.count--
      const store = getGameStore()
      const territorial_radius = store.territorial_radius
      if (territorial_radius > 1000) return
      if (territorial_radius % 100 === 0 || territorial_radius === 30) {
        if (building.data.hope_count > 0) {
          let name = ''
          if (building.data.hope_count === 4) name = 'stick'
          if (building.data.hope_count === 3) name = 'stone'
          if (building.data.hope_count === 2) name = 'wood'
          if (building.data.hope_count === 1) name = 'ora'

          getContext().dispatch({ type: 'world/home_expend', name })
          building.data.hope_count--
        } else {
          getContext().dispatch({ type: 'world/survey', position: [0, 0] })
        }
      }
      store.territorial_radius++
    }
  })
}

const decorators = {
  consume_fuel
}
