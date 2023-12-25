import { Log } from '../log'
class Character {
  constructor (params) {
    const { profile = {} } = params
    this.ap = 1
    this.ap_increment = 0.1
    this.ap_max = 1
    this.profile = {
      name: profile.name || 'Neo',
    }
  }

  launch (task, modules) {
    this.recovery()
    if (this.ap < 1) return
    if (!task) return
    if (task.status === 'done') return

    this.ap--
    if (task.status === 'doing') {
      task.progress++
      if (task.progress >= task.total) {
        Log.info(`${this.profile.name} done ${task.schema.name}/${task.id}`)
        task.status = 'done'
      }
    }
    if (task.status === 'pending') {
      const required = task.data.stock.filter(stock => stock.count < stock.max)
      if (required.length > 0) {
        required.forEach(item => {
          const count = modules.inventory.take(item.name, item.max - item.count)
          stock.count += count
        })
      } else {
        Log.info(`${this.profile.name} doing ${task.schema.name}/${task.id}`)
        task.status = 'doing'
      }
    }
  }

  recovery () {
    this.ap+= this.ap_increment
    if (this.ap > this.ap_max) this.ap = this.ap_max
  }

  toJSON () {
    return {
      profile: this.profile,
    }
  }
}

export class CharacterModule  {
  name = 'character'
  constructor () {
    this.characters = []
  }

  dispatch (action) {

    switch (action.type) {
      case 'tick':
        this.characters.forEach(character => {
          character.launch(this.modules.task.queue[0], this.modules)
        })
        break
      default:
        break
    }
  }

  get () {
    return {
      characters: this.characters,
    }
  }

  init ({ character = {}}) {
    const characters = character.characters || []
    if (characters.length === 0) {
      this.characters.push(new Character({}))
    } else {
      this.characters = characters.map(character => new Character(character))
    }
  }

  save () {
    return {
      characters: this.characters.map(character => character.toJSON()),
    }
  }
}
