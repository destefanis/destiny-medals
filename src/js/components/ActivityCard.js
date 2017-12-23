import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let divStyle = {
      backgroundImage: 'url("https://www.bungie.net' + this.props.activityDefinition.pgcrImage + '")'
    };

    let activityDefinition = this.props.activityDefinition;
    let modeData = this.props.modeData;
    let activityIcon = 'https://www.bungie.net/' + modeData.displayProperties.icon; 

    return (
      <div className="activity-card" style={divStyle}>
        <div className="activity-card__details">
          <span className="activity-icon">
            <img src={activityIcon} />
          </span>
          <span className="details-mode">
            {modeData.displayProperties.name}
          </span>
          <span className="details-time">
            {modeData.displayProperties.date}
          </span>
        </div>
        <div className="title-wrapper">
          <h2 className="card__title">{activityDefinition.displayProperties.name}</h2>
        </div>
        <div className="activity-card__content">
          <span className="content-results">{this.props.condition}</span>
          <span className="content-results">Kills: {this.props.kills}</span>
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityCard);
