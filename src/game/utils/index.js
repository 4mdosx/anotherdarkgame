export function getContext () {
  return globalThis.game
}

export function getGameStore () {
  return globalThis.game.modules.system.store
}

export function getGameStatus (key) {
  return globalThis.game.modules.system.get(key)
}

