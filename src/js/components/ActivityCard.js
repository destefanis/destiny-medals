import React from 'react';
import { withRouter } from 'react-router-dom'

import ActivityReport from './ActivityReport';

import requestHeader from '../constants/requestHeader.js';
import host from '../constants/host.js';

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isActive: false,
      isLoading: false,
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
        this.setState({
          isLoading: true,
        });
        fetch(request)
          .then(response => response.json())
          .then(data => {
            this.setState({
              report: data.Response,
              isActive: true,
              isLoading: false,
            });
          })
          .catch(error => { 
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
    let buttonText;

    // Conditionally render the activity report.
    if (isActive) {
      report = <ActivityReport report={this.state.report} characterId={this.props.characterId} instanceId={this.props.instanceId} />;
      buttonText = "Close";
    } else {
      report = null;
      buttonText = "View";
    }

    if (this.state.isLoading) {
      buttonText = "Loading";
    }

    return (
      <div className={isActive ? 'activity activity--is-active': 'activity'}>
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
            <span className="content-results">— {this.props.condition}</span>
          </div>
          <button className="card__toggle-button">{buttonText}</button>
        </div>
        {report}
        <div className="activity-close">
          <span className="close-button" onClick={ () => {this.toggleActive(this.props.instanceId)}}>
            Close Report
          </span>
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityCard);
