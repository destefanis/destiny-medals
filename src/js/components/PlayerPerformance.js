import React from 'react';
import ReactTooltip from 'react-tooltip'

class PlayerPerformance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const player = this.props.player;
    const values = this.props.player.values;

    return (
      <div className="report-performance">
        <div className="metrics-wrapper">
          <div className="performance-metric">
            <h6 className="metric-title">Opp. Defeated</h6>
            <p className="metric-value">{values.opponentsDefeated.basic.displayValue}</p>
          </div>
          <div className="performance-metric">
            <h6 className="metric-title">Kills</h6>
            <p className="metric-value">{values.kills.basic.displayValue}</p>
          </div>
          <div className="performance-metric">
            <h6 className="metric-title">Assists</h6>
            <p className="metric-value">{values.assists.basic.displayValue}</p>
          </div>
          <div className="performance-metric">
            <h6 className="metric-title">Deaths</h6>
            <p className="metric-value">{values.deaths.basic.displayValue}</p>
          </div>
          <div className="performance-metric">
            <h6 className="metric-title">KDA</h6>
            <p className="metric-value">{values.killsDeathsAssists.basic.displayValue}</p>
          </div>
          <div className="performance-metric">
            <h6 className="metric-title">KD:</h6>
            <p className="metric-value">{values.killsDeathsRatio.basic.displayValue}</p>
          </div>
          <div className="performance-metric">
            <h6 className="metric-title">Score</h6>
            <p className="metric-value">{values.score.basic.displayValue}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerPerformance;
