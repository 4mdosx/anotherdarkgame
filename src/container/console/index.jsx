import './console.sass'
import BIOS from './bios.jsx'

export default function Console() {
  const system = <BIOS></BIOS>
  return (
    <div className="console_wrap">
      { system }
    </div>
  )
}
