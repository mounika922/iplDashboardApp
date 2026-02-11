// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentDetails} = props
  const {competingTeam, result, matchStatus, competingTeamLogo} = recentDetails
  return (
    <li>
      <div className="match-card">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="logo"
        />
        <p>{competingTeam}</p>
        <p>{result}</p>
        <p>{matchStatus}</p>
      </div>
    </li>
  )
}
export default MatchCard
