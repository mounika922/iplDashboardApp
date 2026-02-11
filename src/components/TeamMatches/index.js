import Loader from 'react-loader-spinner'
import {PieChart, Pie, Tooltip, Legend, Cell} from 'recharts'
import './index.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

const COLORS = ['#4CAF50', '#F44336', '#FFC107']

class TeamMatches extends Component {
  state = {teamMatch: {}, latestMatch: {}, recentMatch: [], isLoading: true}

  componentDidMount() {
    this.getMatchDetailsData()
  }

  getMatchDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const latestData = {
      umpires: updatedData.latestMatchDetails.umpires,
      result: updatedData.latestMatchDetails.result,
      manOfTheMatch: updatedData.latestMatchDetails.man_of_the_match,
      id: updatedData.latestMatchDetails.id,
      date: updatedData.latestMatchDetails.date,
      venue: updatedData.latestMatchDetails.venue,
      competingTeam: updatedData.latestMatchDetails.competing_team,
      firstInnings: updatedData.latestMatchDetails.first_innings,
      secondInnings: updatedData.latestMatchDetails.second_innings,
      competingTeamLogo: updatedData.latestMatchDetails.competing_team_logo,
      matchStatus: updatedData.latestMatchDetails.match_status,
    }
    const recentData = updatedData.recentMatches.map(each => ({
      umpires: each.umpires,
      result: each.result,
      manOfTheMatch: each.man_of_the_match,
      id: each.id,
      date: each.date,
      competingTeamLogo: each.competing_team_logo,
      venue: each.venue,
      competingTeam: each.competing_team,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }))
    this.setState({
      teamMatch: updatedData,
      latestMatch: latestData,
      recentMatch: recentData,
      isLoading: false,
    })
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {teamMatch, latestMatch, recentMatch, isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    const wins = recentMatch.filter(each => each.matchStatus === 'Won').length
    const losses = recentMatch.filter(each => each.matchStatus === 'Lost')
      .length
    const draws = recentMatch.length - (wins + losses)

    const chartData = [
      {name: 'Won', value: wins},
      {name: 'Lost', value: losses},
      {name: 'Draw', value: draws},
    ]
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className={`match-container ${id}`}>
            <img
              src={teamMatch.teamBannerUrl}
              alt="team banner"
              className="banner"
            />
            <p>Latest Matches</p>
            <ul>
              <li>
                <LatestMatch latestDetails={latestMatch} key={latestMatch.id} />
              </li>
            </ul>
            <div>
              <ul className="matchcard-list">
                {recentMatch.map(each => (
                  <MatchCard recentDetails={each} key={each.id} />
                ))}
              </ul>
              {recentMatch.length > 0 && (
                <PieChart width={400} height={300}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </div>
            <button type="button" onClick={this.onClickBack}>
              Back
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
