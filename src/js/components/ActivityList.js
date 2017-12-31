import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';
import moment from 'moment';
import queryString from 'query-string';

import ActivityCard from './ActivityCard';

import PvpActivityDefinition from '../data/DestinyActivityDefinition.json';
import ActivityModeDefinition from '../data/DestinyActivityModeDefinition.json';

import requestHeader from '../constants/requestHeader.js';
import host from '../constants/host.js';

class ActivityList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characterId: this.props.characterId,
      membershipId: this.props.membershipId,
      activityHistoryData: [],
    };

    this.fetchActivityHistory = this.fetchActivityHistory.bind(this);
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

  // Request the activity history for the specific character.
  fetchActivityHistory(platform, membershipId, characterId) {
    let endpoint = host + platform + '/Account/' + membershipId + '/Character/' + characterId + '/Stats/Activities/?mode=5';
    let request = new Request(endpoint, requestHeader);
    
    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.props.onActivityHistoryUpdate(data.Response.activities);
        this.setState({
          activityHistoryData: [...this.state.activityHistoryData, data.Response.activities]
        });
      })
      .catch(function(error) { 
        console.log('Requestfailed', error) 
      });
  }

  componentDidMount(props) {
    let characterId = this.state.characterId;
    let membershipId = this.state.membershipId;

    if (this.props.membershipId === '') {
      let parsed = queryString.parse(this.props.location.search);
      membershipId = parsed.membershipId;
      this.fetchActivityHistory(parsed.platform, parsed.membershipId, parsed.characterId);
    } else {
      this.fetchActivityHistory('4', membershipId, characterId);
    }
  }

  render() {
    let listSize = 30;
    let activityHistory = this.state.activityHistoryData;
    var merged = [].concat.apply([], activityHistory);
    console.log(merged);

    let activities = merged.slice(0, listSize).map((activity, index) => {
      console.log(activity);
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
