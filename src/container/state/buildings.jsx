import { useStore } from '@/store/main'
import BuildingButton from '@/components/building-button.jsx'

export default function Buildings () {
  const buildings = useStore(state => state.buildings)

  return (
    <div className='buildings'>
      {
        buildings.map((building) => {
          return (
            <BuildingButton key={building.name} building={building} />
          )
        })
      }
    </div>
  )
}
