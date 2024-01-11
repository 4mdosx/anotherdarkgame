'use client'
import WorldMap from '@/container/map'

export default function LabMap() {
  return (
    <main className="overview_page grid grid-cols-12 gap-4 pt-2">
      <div className="col-span-12 border-red-100">
        <WorldMap />
      </div>
    </main>
  )
}