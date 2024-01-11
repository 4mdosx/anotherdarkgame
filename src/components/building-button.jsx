import { buildings } from '@/game/schema/building'
import { getContext } from '@/game/utils'
import { useState } from 'react'

function FuelIndicator ({ building }) {
  const width = building.fuel.count / building.fuel.max * 100
  return (
    <div className='fuel-indicator' style={{ width: width + '%' }}></div>
  )
}

function BonfireBuildingButton({ building }) {
  const schema = buildings[building.name]
  const [animated, setAnimated] = useState(false)
  const onEvent = (event) => {
    getContext().dispatch({ type: 'building/event', name: building.name, event })
    setAnimated(true)
    setTimeout(() => {
      setAnimated(false)
    }, 1000)
  }

  return (
    <div className={`button building ${building.name} ${animated ? 'animated' : ''}`}>
      <span className='name'>{schema.name}</span>
      {schema.menu.map((menu) => {
        return (
          <div
            className='menu'
            key={menu.name}
            onClick={() => {
              onEvent(menu.event)
            }}
          >
            {menu.name}
          </div>
        )
      })}
      {
        building.fuel ? <FuelIndicator building={building}></FuelIndicator> : null
      }
    </div>
  )
}

function BaseBuildingButton({ building }) {
  const schema = buildings[building.name]
  const onEvent = (event) => {
    getContext().dispatch({ type: 'building/event', name: building.name, event })
  }

  return (
    <div className={`button building ${building.name}`}>
      <span className='name'>{schema.name}</span>
      {schema.menu.map((menu) => {
        return (
          <div
            className='menu'
            key={menu.name}
            onClick={() => {
              onEvent(menu.event)
            }}
          >
            {menu.name}
          </div>
        )
      })}
    </div>
  )
}

const buildingMap = {
  bonfire: BonfireBuildingButton
}
export default function BuildingButton({ building }) {
  const name = building.name
  if (buildingMap[name]) {
    return buildingMap[name]({ building })
  }

  return <BaseBuildingButton building={building} />
}
