import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let divStyle = {
      backgroundImage: 'url("https://www.bungie.net/' + this.props.activityDefinition.pgcrImage + '")'
    };

    let activityDefinition = this.props.activityDefinition;
    console.log(activityDefinition.displayProperties.icon);
    let activityIcon = 'https://www.bungie.net/' + activityDefinition.displayProperties.icon; 

    return (
      <div className="activity-card" style={divStyle}>
        <span className="card__condition">{this.props.condition}</span>
        <span className="card__activity-icon">
          <img src={activityIcon} />
        </span>
        <h2 className="card__title">{activityDefinition.displayProperties.name}</h2>
        <div className="activity-card__content">
          <p className="card__details">
            Kills: {this.props.kills}
            Assists: {this.props.assists}
            Deaths: {this.props.deaths}
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityCard);
