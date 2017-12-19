import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="activity-list">
        My Activity List
      </div>
    )
  }
}

export default withRouter(ActivityList);


