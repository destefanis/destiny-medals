import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

import ActivityCard from './ActivityCard';

import PvpActivityDefinition from '../data/DestinyActivityDefinition.js';

class ActivityList extends React.Component {
  constructor(props) {
    super(props);

    const map = PvpActivityDefinition.find(map => map.hash === 374818561);
    console.log(map);
    console.log(map.pgcrImage);
  }

  // let endpoint = host + 'Stats/PostGameCarnageReport/1153307306/';

  render() {
    return (
      <div className="activity-history">
        <ul className="activity-list">
          <li>
           History Goes Here
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(ActivityList);
