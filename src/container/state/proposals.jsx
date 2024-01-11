import { useStore } from '@/store/main'
import { doProposal, buildingIsExist } from '@/game/interface'

function ProposalRow (props) {
  const { id, schema, type } = props
  if (type === 'building') {
    const isExist = buildingIsExist(schema)
    return (
      <div className='proposal-item'>
        { schema }
        <button onClick={() => doProposal(id)}>
          { isExist ? 'Upgrade' : 'Build'}
        </button>
      </div>
    )
  }

  return (
    <div onClick={() => doProposal(id)}>
      {type}: {schema}
    </div>
  )
}

export default function Proposals () {
  const proposals = useStore(state => state.proposals)
  return (
    <div className='proposals'>
      {
        proposals.map((proposal) => {
          return (
            <ProposalRow key={proposal.id} {...proposal} />
          )
        })
      }
    </div>
  )
}
