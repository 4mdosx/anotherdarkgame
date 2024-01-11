import React, { useState } from 'react'
import { useStore } from '@/store/main'
import { getContext } from '@/game/utils'

export default function BIOS () {
  const [focus, setFocus] = useState(false)
  const cyborg = useStore(state => state.cyborg)
  if (!cyborg) return null

  return (
    <div className='bios'>
      <div
        className={`screen ${focus ? 'focus' : ''}`}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <p className='title'>Cyberia <span>B</span>asic <span>I</span>nput/<span>O</span>utput <span>S</span>ystem</p>
        <p>-------------------------------------------------------</p>
        <ul className='command'>
          <li>1.[B]oot</li>
          <li onClick={() => getContext().dispatch({ type: 'system/research' })}>2.[D]ata restore</li>
        </ul>
        <p>-------------------------------------------------------</p>
        <p className='state'>
          <span>
            Mem: {cyborg.mem.val}/{cyborg.mem.max} {cyborg.mem.unit}
          </span>
          <span>
            Power: {cyborg.power.val.toFixed(1)}/{cyborg.power.max.toFixed(1)}
          </span>
          <span>
            Computing Benchmark: {cyborg.performance.max}
          </span>
        </p>
      </div>
    </div>
  )
}