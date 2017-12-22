import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

import ActivityCard from './ActivityCard';

import PvpActivityDefinition from '../data/DestinyActivityDefinition.js';

class ActivityList extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.activityHistoryData[0])
    const map = PvpActivityDefinition.find(map => map.hash === 374818561);
    console.log(map);
  }

  // Find the name of the activity/map within our definition object.
  findActivityInfo(referenceId) {
    let activityDefinition = PvpActivityDefinition.find(map => map.hash === referenceId);
    return (activityDefinition);
  }

  parseDate(dateString) {
    // let date = Date.parse(dateString);
    // let activityDate = date.toUTCString();;
    // console.log(activityDate);
    // return (activityDate);
  }

  // let endpoint = host + 'Stats/PostGameCarnageReport/1153307306/';

  render() {
    let listSize = 30;
    let activities = this.props.activityHistoryData[0].slice(0, listSize).map((activity) => {
      return <ActivityCard
              activityDefinition={this.findActivityInfo(activity.activityDetails.referenceId)}
              kills={activity.values.kills.basic.displayValue}
              deaths={activity.values.deaths.basic.displayValue}
              assists={activity.values.assists.basic.displayValue}
              condition={activity.values.standing.basic.displayValue} 
              key={activity.activityDetails.instanceId}
              date={this.parseDate(activity.period)} />
    });

    return (
      <div className="activity-history">
        <div className="activity-list">
          {activities}
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityList);
