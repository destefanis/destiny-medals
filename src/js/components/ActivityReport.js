import React from 'react';

import Table from './table/Table.js';

class ActivityReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.report);
    let report = this.props.report;

    return (
      <div className="activity-report">
        <div className="report-header">
          Match Results
        </div>
        <div className="report-results">
          <div className="team team--alpha {report.teams[0].standing.basic.displayValue}">
            <h3 className="team-name">Alpha</h3> 
            <span className="team-score">
              { report.teams[0].score.basic.displayValue }
            </span>
          </div>
          <div className="team team--bravo {report.teams[1].standing.basic.displayValue}">
            <h3 className="team-name">Bravo</h3> 
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
      </div>
    )
  }
}

export default ActivityReport;
