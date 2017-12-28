import React from 'react';

import Table from './table/Table.js';
import MedalsList from './MedalsList.js';

class ActivityReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.report);
    let report = this.props.report;

    return (
      <div className="activity-report">
        <div className="report-overview">
          <h4 className="report-title">Post Game Report</h4>
          <div className="team team--alpha {report.teams[0].standing.basic.displayValue}">
            <span className="team-score">
              { report.teams[0].score.basic.displayValue }
            </span>
          </div>
          <span className="score-divider">
            to
          </span>
          <div className="team team--bravo {report.teams[1].standing.basic.displayValue}">
            <span className="team-score">
              { report.teams[1].score.basic.displayValue }
            </span>
          </div>
        </div>
        <div className="report-scoreboard">
          <Table data={report.entries} 
            alphaScore={report.teams[0].score.basic.displayValue}
            bravoScore={report.teams[1].score.basic.displayValue}
          />
        </div>
        <MedalsList player={report.entries[0]}/>
      </div>
    )
  }
}

export default ActivityReport;
