import { Building } from "../schema/building"

export class HomeModule  {
  name = 'home'
  constructor () {
    this.blockStatus = {}
    this.buildings = []
  }

  dispatch (action) {
    switch (action.type) {
      case 'building/event':
        const building = this.buildings.find(building => building.data.name === action.name)
        building[action.event] && building[action.event](action)
        break
      case 'building/completed':
        if (!action.is_upgrade) this.buildings.push(action.building)
        break
      case 'tick':
        break
      default:
    }
  }

  init ({ home = {}}) {
    if (home.buildings) this.buildings = home.buildings.map(building => new Building(building))
  }

  valueOf () {
    return {
      buildings: this.buildings.map(building => building.valueOf()),
    }
  }
}

// 大地图模式，设定一个地块面积为 2km * 2km，在营地视图下，地块最小单位为 4m * 4m
// 坐标始终以篝火为中心，x，y 正负250，x 轴向东，y 轴向北
// 以地块坐标'x,k'为key，存储地块信息
