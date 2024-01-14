import { useStore } from '@/store/main'

function TaskRow (props) {
  const { index, type, schema, status, stock, progress, total } = props
  const summary = () => {
    switch (type) {
      case 'building':
        return 'Building ' + schema
      default:
        return 'Unknown'
    }
  }
  const progressText = () => {
    switch (status) {
      case 'pending':
        return JSON.stringify(stock)
      case 'doing':
        return `${progress}/${total}`
      default:
        return '-'
    }
  }
  return (
    <div className='task-item'>
      #{index}: {summary()}
      <span>
        {progressText()}
      </span>
    </div>
  )
}

export default function Task () {
  const queue = useStore(state => state.queue)
  if (!queue) return null

  return (
    <div className='tasks'>
      {
        queue.map((task, index) => {
          return (
            <TaskRow key={task.id} index={index} {...task} />
          )
        })
      }
    </div>
  )
}