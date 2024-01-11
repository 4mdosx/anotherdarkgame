'use client'
import Nav from '@/container/nav.jsx'
import State from '@/container/state/index.jsx'
import Storage from '@/container/storage.jsx'
import Game from '@/game/core/main.js'
import Console from '@/container/console'
import { useState, useEffect } from 'react'
import { useStore } from '@/store/main'

export default function Home() {
  const [state, setState] = useState({ inited: false })
  const render = useStore(state => state.mapGameStatusToStore)

  useEffect(() => {
    if (!state.inited) {
      globalThis.game = new Game({ render })
      const gameSave = JSON.parse(localStorage.getItem('the-sunken-ancient-world')) || {}
      globalThis.game.init(gameSave)
      setState({ inited: true })
    }
  }, [state.inited, setState, render])

  function save () {
    localStorage.setItem('the-sunken-ancient-world', JSON.stringify(globalThis.game.valueOf()))
  }
  function reset () {
    localStorage.removeItem('the-sunken-ancient-world')
    window.location.reload()
  }
  if (!state.inited) return <p>loading...</p>
  setInterval(() => save(), 1000 * 120)

  return (
    <main className="overview_page grid grid-cols-12 gap-4 pt-2">
      <div className="col-span-3 nav_wrapper">
        <Nav></Nav>
      </div>
      <div className="col-span-6 env_wrapper">
        <div className="flex gap-2 flex-col h-full">
          <div className="basis-2/3">
            <State></State>
          </div>
        </div>
      </div>
      <div className="col-span-3 monitor_wrapper">
        <div className="grid grid-rows-2 gap-2 h-full">
          <Storage></Storage>
        </div>
      </div>
      <Console></Console>
      <footer className='fixed right-0 top-0'>
        <button onClick={save} className='mr-2'>save</button>
        <button onClick={reset}>reset</button>
      </footer>
    </main>
  )
}
