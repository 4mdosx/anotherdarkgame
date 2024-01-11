import { getGameStatus, getGameStore } from '@/game/utils/index.js'
import { materials } from '../schema/material'
export class InventoryModule  {
  name = 'inventory'
  constructor () {
    this.items = {}
    this.proposals = []
    this.blueprints = []
  }

  dispatch (action) {
    switch (action.type) {
      case 'character/gathering':
        const { itemName } = action
        if (!this.items[itemName]) this.items[itemName] = 0
        if (this.items[itemName] > getGameStatus('MAX_STORAGE/' + itemName)) return
        this.items[action.itemName] += action.quantity
        break
      case 'inventory/removeProposal':
        this.proposals = this.proposals.filter(proposal => proposal.id !== action.proposalId)
        break
      case 'discovery':
        const store = getGameStore()
        if (!store['MAX_STORAGE/' + action.name]) store['MAX_STORAGE/' + action.name] = 100
        break
      case 'tick':
        break
      default:
    }
  }

  match (keyword) {
    return Object.keys(this.items).map((key, val) => {
      const material = materials[key]
      if (!material) return false
      if(material.keywords.includes(keyword)) return [key, material]
      return false
    }).filter(Boolean)
  }

  consume (itemName, quantity) {
    if (!this.items[itemName]) return false
    if (this.items[itemName] < quantity) return false
    this.items[itemName] -= quantity
    return true
  }

  addProposal (proposal) {
    if (this.proposals.find(p => p.id === proposal.id)) return
    if (this.proposals.length === 3) {
      this.proposals.shift()
    }
    this.proposals.push(proposal)
  }

  valueOf () {
    return {
      items: this.items,
      proposals: [...this.proposals],
      blueprints: this.blueprints,
    }
  }

  init ({ inventory = {}, home}) {
    Object.assign(this, inventory)
    if (!home) {
      this.proposals.push({
        id: 'bonfire',
        type: 'building',
        schema: 'bonfire',
      })
    }
  }
}
