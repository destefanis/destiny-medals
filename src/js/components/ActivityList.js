import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';
import moment from 'moment';

import ActivityCard from './ActivityCard';

import PvpActivityDefinition from '../data/DestinyActivityDefinition.json';
import ActivityModeDefinition from '../data/DestinyActivityModeDefinition.json';

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.activityHistoryData[0])
    // console.log(ActivityModeDefinition[470484296].pgcrImage);
  }

  // Find the name of the activity/map within our definition json.
  findActivityData(referenceId) {
    let activityDefinition = PvpActivityDefinition[referenceId];
    return (activityDefinition);
  }

  findModeData(directorActivityHash, modeNumber) {
    // Find the playlist.
    let directoryActivity = PvpActivityDefinition[directorActivityHash];

    // Reference the mode to find the mode's hash number.
    let playlistItem = directoryActivity.playlistItems.find(item => item.directActivityModeType === modeNumber);

    // The mode is always the first in this array.
    let mode = playlistItem.activityModeHashes[0];
    let modeData = ActivityModeDefinition[mode];

    return (modeData);
  }

  parseDate(date) {
    var difference = moment().diff(date, 'days');
    let newDate;

    if (difference <= 8) {
      newDate = moment(date, moment.ISO_8601).fromNow();
    } else {
      newDate = moment(date, moment.ISO_8601).format('h:mma, MMM Do');
    }

    return (newDate);
  }

  // let endpoint = host + 'Stats/PostGameCarnageReport/1153307306/';

  render() {
    let listSize = 30;
    let activities = this.props.activityHistoryData[0].slice(0, listSize).map((activity, index) => {
      return <ActivityCard
              activityDefinition={this.findActivityData(activity.activityDetails.referenceId)}
              modeData={this.findModeData(activity.activityDetails.directorActivityHash, activity.activityDetails.mode)}
              kills={activity.values.kills.basic.displayValue}
              deaths={activity.values.deaths.basic.displayValue}
              assists={activity.values.assists.basic.displayValue}
              condition={activity.values.standing.basic.displayValue}
              date={this.parseDate(activity.period)}
              instanceId={activity.activityDetails.instanceId}
              key={index} />
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
