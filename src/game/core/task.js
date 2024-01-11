import { buildings, Building } from '../schema/building'
import { buildingIsExist } from '../interface'
import _ from 'lodash'

class Task {
  constructor (params) {
    this.data = {
      type: params.type,
      schema: params.schema,
      stock: params.stock,
      proposal: params.proposal,
    }
    if (params.type === 'building') {
      this.schema = buildings[params.schema]
    } else {
      this.schema = {}
    }

    this.id = params.id
    this.progress = params.progress || 0
    this.total = this.schema.time || 1
    this.status = params.status || 'pending' // pending, doing, done
    if (!this.data.stock) this.initStock()
  }

  toJSON () {
    return {
      ...this.data,
      status: this.status,
      progress: this.progress,
      id: this.id,
    }
  }

  initStock () {
    this.data.stock = []
    Object.entries(this.schema.cost || []).forEach((key, val) => {
      this.data.stock.push({
        name: key,
        count: 0,
        max: val
      })
    })
  }
}

export class TaskModule  {
  name = 'task'
  constructor () {
    this.queue = []
  }

  dispatch (action) {
    switch (action.type) {
      case 'tick':
        if (this.queue[0]) {
          const task = this.queue[0]
          if (task.status === 'done') {
            this.queue.shift()
            if (task.data.type === 'building') {
              this.context.dispatch({
                type: 'building/completed',
                building: new Building({
                  status: 'normal',
                  name: task.data.schema,
                })
              })
            }
            this.context.dispatch({ type: 'system/sync' })
          }
        }
        break
      default:
        break
    }
  }

  doProposal (proposalId) {
    const proposal = this.modules.inventory.proposals.find(proposal => proposal.id === proposalId)
    if (this.queue.find(task => task.id === proposal.id)) return
    this.context.dispatch({
      type: 'inventory/removeProposal',
      proposalId,
    })
    this.queue.push(new Task({
      id: proposalId,
      type: proposal.type,
      schema: proposal.schema,
      proposal: proposalId,
      is_upgrade: buildingIsExist(proposal.schema),
    }))
  }

  valueOf () {
    return {
      queue: this.queue.map(task => task.toJSON()),
    }
  }

  init ({ task } = {}) {
    if (!task) return
    if (task.queue) this.queue = task.queue.map(t => new Task(t))
  }
}
