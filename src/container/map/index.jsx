import { useEffect, useRef, useState } from 'react'
import './map.sass'

const map = [
  [{ coordinates: [0, 0] }, { coordinates: [0, 1] }, { coordinates: [0, 2] }, { coordinates: [0, 3] }, { coordinates: [0, 4] }, { coordinates: [0, 5] }],
  [{ coordinates: [1, 0] }, { coordinates: [1, 1] }, { coordinates: [1, 2] }, { coordinates: [1, 3] }, { coordinates: [1, 4] }, { coordinates: [1, 5] }],
  [{ coordinates: [2, 0] }, { coordinates: [2, 1] }, { coordinates: [2, 2] }, { coordinates: [2, 3] }, { coordinates: [2, 4] }, { coordinates: [2, 5] }],
  [{ coordinates: [3, 0] }, { coordinates: [3, 1] }, { coordinates: [3, 2] }, { coordinates: [3, 3] }, { coordinates: [3, 4] }, { coordinates: [3, 5] }],
  [{ coordinates: [4, 0] }, { coordinates: [4, 1] }, { coordinates: [4, 2] }, { coordinates: [4, 3] }, { coordinates: [4, 4] }, { coordinates: [4, 5] }],
]

export default function Map() {
  const mapDom = useRef(null)

  useEffect(() => {
    if (!mapDom.current) return
    window.mapDom = mapDom.current
    mapDom.current.scrollTo(mapDom.current.scrollHeight / 3, mapDom.current.scrollWidth / 4)
  })

  return (
    <div className="map-box" ref={mapDom}>
      <div className="map">
        {map.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cell, j) => (
              <div className="cell" key={j}>
                {cell.coordinates.join(',')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
