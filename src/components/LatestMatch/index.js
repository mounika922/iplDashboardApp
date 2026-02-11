// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestDetails} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
    competingTeamLogo,
  } = latestDetails
  return (
    <div className="LatestMatch-container">
      <div className="sub">
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
        <p> {firstInnings}</p>
        <p> {secondInnings}</p>
        <p>{manOfTheMatch}</p>
        <p> {umpires}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="logo"
      />
    </div>
  )
}
export default LatestMatch
