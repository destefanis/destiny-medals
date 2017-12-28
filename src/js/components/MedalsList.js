import React from 'react';
import ReactTooltip from 'react-tooltip'

import MedalsDefinition from '../data/DestinyMedals.json';

class MedalsList extends React.Component {
  constructor(props) {
    super(props);

    this.findMedalCount = this.findMedalCount.bind(this);
  }

  // Find the icon image path within our Medals json.
  findMedalImage(medal) {
    const host = "https://bungie.net/";

    let iconPath = MedalsDefinition[medal].iconImage;
    let fullIconPath = host + iconPath;

    return (fullIconPath);
  }

  findMedalData(medal) {
    let medalName = MedalsDefinition[medal].name;
    let medalDescription = MedalsDefinition[medal].description;
    let medalData = "<span><strong>" + medalName + "</strong><p>" + medalDescription + "</p></span>";

    return (medalData);
  }

  findMedalCount(medal) {
    let medalCount = this.props.player.extended.values[medal].basic.displayValue;
    return (medalCount);
  }

  render() {
    const player = this.props.player;
    const extendedValues = player.extended.values;

    const regex = new RegExp('^medal', 'g');
    const medalValues = Object.keys(extendedValues).filter((key) => key.match(regex));

    const medal = medalValues.map((medal, index) =>
      <div className="medal" key={index} data-tip={this.findMedalData(medal)}>
        <img className="medal-icon" key={index} src={this.findMedalImage(medal)} />
        <span className="medal-count">
          {this.findMedalCount(medal)}
        </span>
      </div>
    );

    return (
      <div className="medals">
        <h3 className="medals-header">
          Medals Earned {player.extended.values.allMedalsEarned.basic.displayValue}
        </h3>
        <div className="medals-earned">
          {medal}
        </div>
        <ReactTooltip data-event="mouseenter click" className="tooltip" effect="solid" html={true} />
      </div>
    )
  }
}

export default MedalsList;
