import { useState } from 'react'
import Proposals from './proposals.jsx'
import Buildings from './buildings.jsx'
import Overview from './overview.jsx'
import Resources from './resources.jsx'

function Tabs (props) {
  const { onChange } = props
  return (
    <div>
      <span onClick={() => onChange('state')}>A Dark Where</span>
      <span className='ml-2'  onClick={() => onChange('resources')}>Resources</span>
      <span className='ml-2' onClick={() => onChange('overview')}>Overview</span>
    </div>
  )
}

function StateTabContent () {
  return (
    <div className='state'>
      <Proposals />
      <Buildings />
    </div>
  )
}


export default function State () {
  const [state, setState] = useState({ activeTab: 'state' })
  return (
    <div>
      <Tabs activeTab={state.activeTab} onChange={activeTab => setState({ activeTab })} />
      <div className="tab_content">
        { state.activeTab === 'state' && <StateTabContent /> }
        { state.activeTab === 'resources' && <Resources /> }
        { state.activeTab === 'overview' && <Overview /> }
      </div>
    </div>
  )
}
