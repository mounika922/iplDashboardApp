// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails

  return (
    <li>
      <Link to={`/team-matches/${id}`}>
        <div className="team-card">
          <img src={teamImageUrl} alt={name} className="team-image" />
          <p>{name}</p>
        </div>
      </Link>
    </li>
  )
}
export default TeamCard
