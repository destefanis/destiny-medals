import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

import ActivityReport from './ActivityReport';

import requestHeader from '../constants/requestHeader.js';
import host from '../constants/host.js';

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isActive: false,
      report: null,
    };

    this.toggleActive = this.toggleActive.bind(this);
  }

  // Toggle Open the report and make a request.
  toggleActive(instanceId) {
    let endpoint = host + 'Stats/PostGameCarnageReport/' + instanceId + '/';
    let request = new Request(endpoint, requestHeader);

    if (this.state.isActive === false) {

      // Only make a request if the state is empty.
      if (this.state.report === null) {
        fetch(request)
          .then(response => response.json())
          .then(data => {
            this.setState({report: data.Response });
            this.setState({isActive: true });
          })
          .catch(function(error) { 
            console.log('Requestfailed', error) 
          });
      } else {
        this.setState({isActive: true });
      }
    } else {
      this.setState({isActive: false });
    }
  }

  render() {
    const isActive = this.state.isActive;
    const activityDefinition = this.props.activityDefinition;
    const modeData = this.props.modeData;
    const instanceId = this.props.instanceId;
    const activityIcon = 'https://www.bungie.net/' + modeData.displayProperties.icon; 

    const divStyle = {
      backgroundImage: 'url("https://www.bungie.net' + this.props.activityDefinition.pgcrImage + '")'
    };

    let report = null;

    // Conditionally render the activity report.
    if (isActive) {
      report = <ActivityReport report={this.state.report} characterId={this.props.characterId} />;
    } else {
      report = null;
    }

    return (
      <div className="activity">
        <div className="activity-card" style={divStyle} onClick={ () => {this.toggleActive(this.props.instanceId)}}>
          <div className="activity-card__details">
            <span className="activity-icon">
              <img src={activityIcon} />
            </span>
            <span className="details-mode">
              {modeData.displayProperties.name}
            </span>
            <span className="details-time">
              {this.props.date}
            </span>
          </div>
          <div className="card-title-wrapper">
            <h2 className="card__title">{activityDefinition.displayProperties.name}</h2>
          </div>
          <div className="activity-card__content">
            <span className="content-results">{this.props.condition}</span>
          </div>
        </div>
        {report}
      </div>
    )
  }
}

export default withRouter(ActivityCard);
