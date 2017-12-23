import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

class ActivityCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false };
    this.fetchReport = this.fetchReport.bind(this);
  }

  fetchReport(instanceId) {
    if (this.state.isActive === false) {
      this.setState({isActive: true });
    } else {
      this.setState({isActive: false });
    }
    
    console.log(instanceId);
    console.log(this.state.isActive);
  }

  render() {

    let divStyle = {
      backgroundImage: 'url("https://www.bungie.net' + this.props.activityDefinition.pgcrImage + '")'
    };

    const activityDefinition = this.props.activityDefinition;
    const modeData = this.props.modeData;
    const activityIcon = 'https://www.bungie.net/' + modeData.displayProperties.icon; 

    return (
      <div className="activity-card" style={divStyle} onClick={ () => {this.fetchReport(this.props.instanceId)}}>
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
          <span className="content-results">Kills: {this.props.kills}</span>
        </div>
      </div>
    )
  }
}

export default withRouter(ActivityCard);
