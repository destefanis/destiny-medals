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

    return (
      <div className="activity-card" style={divStyle}>
        <span className="card__condition">{this.props.condition}</span>
        <h2 className="card__title">{this.props.activityDefinition.displayProperties.name}</h2>
        <p className="card__details">Kills: {this.props.kills}</p>
      </div>
    )
  }
}

export default withRouter(ActivityCard);
