import React from 'react';

class ActivityReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('report');
    console.log(this.props.report);
    // let report = this.props.report;

    return (
      <div className="activity-report">
        Match Report
      </div>
    )
  }
}

export default ActivityReport;
