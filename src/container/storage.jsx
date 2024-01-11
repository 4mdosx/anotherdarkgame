import { useStore } from '@/store/main.js'
import { getGameStatus } from '@/game/utils/index.js'

export default function Storage () {
  const items = useStore((state) => state.items)
  if (items.length === 0) return null

  return (
    <div className="storage">
      <h1>Items</h1>
      {
        items.map(([key, count]) => {
          return (
            <div key={key} className="w-full flex justify-between">
              <span>{key}</span>
              <span>{count}/{ getGameStatus('MAX_STORAGE/' + key) }</span>
            </div>
          )
        })
      }
    </div>
  )
}
