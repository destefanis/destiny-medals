import React from 'react';

import MedalsDefinition from '../data/DestinyMedals.json';

class MedalsList extends React.Component {
  constructor(props) {
    super(props);

    this.findMedalCount = this.findMedalCount.bind(this);
  }

  // Find the icon image path within our Medals json.
  findMedalData(medal) {
    const host = "https://bungie.net/";
    console.log(medal);

    let iconPath = MedalsDefinition[medal].iconImage;
    let fullIconPath = host + iconPath;

    return (fullIconPath);
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
      <figure className="medal" key={index}>
        <img className="medal-icon" key={index} src={this.findMedalData(medal)} />
        <span className="medal-count">
          {this.findMedalCount(medal)}
        </span>
      </figure>
    );

    return (
      <div className="medals">
        <h3 className="medals-header">
          Medals Earned {player.extended.values.allMedalsEarned.basic.displayValue}
        </h3>
        <div className="medals-earned">
          {medal}
        </div>
      </div>
    )
  }
}

export default MedalsList;
