import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="activity-history">
        <ul class="activity-list">
          {this.props.activityHistoryData}
        </ul>
      </div>
    )
  }
}

export default withRouter(ActivityCard);
