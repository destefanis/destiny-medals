import React from 'react'
import { withRouter } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import moment from 'moment'
import queryString from 'query-string'
import anime from 'animejs'

import ActivityCard from './ActivityCard'
import Preloader from './preloader/Preloader'

import PvpActivityDefinition from '../data/DestinyActivityDefinition.json'
import ActivityModeDefinition from '../data/DestinyActivityModeDefinition.json'

import requestHeader from '../constants/requestHeader.js'
import host from '../constants/host.js'

const animateIn = () => {
  const activityCards = document.querySelectorAll('.activity')
  let currentAnimation = anime.timeline()
  .add({
    targets: activityCards,
    duration: 500,
    opacity: [0, 1],
    translateY: [50, 0],
    easing: 'easeInOutCubic',
    elasticity: 0,
    delay: function (el, i, l) {
      return i * 300
    }
  })
}

class ActivityList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characterId: this.props.characterId,
      membershipId: this.props.membershipId,
      platform: this.props.platform,
      activityHistoryData: [],
      preloaderVisible: false,
      listVisible: false,
    };

    this.determinePreloader = this.determinePreloader.bind(this);
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
          characterId: characterId,
          platform: platform,
          activityHistoryData: [...this.state.activityHistoryData, data.Response.activities]
        });
        this.determinePreloader(data.Response.activities);
      })
      .catch(error => { 
        console.log('Requestfailed', error) 
      });
  }

  // Show the preloader if the activity history doesn't exist.
  determinePreloader(data) {
    if (data === undefined) {
      this.setState({
        preloaderVisible: true,
      });
    } else {
      animateIn();
    }
  }

  componentDidMount(props) {
    let characterId = this.state.characterId;
    let membershipId = this.state.membershipId;
    let platform = this.state.platform;

    if (this.props.membershipId === '') {
      let parsed = queryString.parse(this.props.location.search);
      membershipId = parsed.membershipId;
      this.fetchActivityHistory(parsed.platform, parsed.membershipId, parsed.characterId);
    } else {
      this.fetchActivityHistory(platform, membershipId, characterId);
    }
  }

  render() {
    let listSize = 20;
    let activityHistory = this.state.activityHistoryData;
    let merged = [].concat.apply([], activityHistory);
    let activities = null;

    if (merged.length > 1) {
      activities = merged.slice(0, listSize).map((activity, index) => {
        return <ActivityCard
                activityDefinition={this.findActivityData(activity.activityDetails.referenceId)}
                modeData={this.findModeData(activity.activityDetails.directorActivityHash, activity.activityDetails.mode)}
                kills={activity.values.kills.basic.displayValue}
                deaths={activity.values.deaths.basic.displayValue}
                assists={activity.values.assists.basic.displayValue}
                condition={activity.values.standing.basic.displayValue}
                date={this.parseDate(activity.period)}
                instanceId={activity.activityDetails.instanceId}
                characterId={this.state.characterId}
                key={index} />
      });
    }

    return (
      <div className="activity-history">
        <div className="activity-list">
          {this.state.preloaderVisible &&
            <Preloader message="Sorry, there is no multiplayer history for this character." />
          }
          <TransitionGroup>
            {activities}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityList);
