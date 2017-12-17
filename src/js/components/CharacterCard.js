import React from 'react';

class CharacterCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let divStyle = {
      color: 'white',
      // backgroundImage: 'url(' + { this.props.background } + ')',
    };

    return (
      <li className="character" style={divStyle}>
        <img src={ this.props.emblem } />
        <h3>{ this.props.class }</h3>
        <span>{ this.props.level }</span>
        <span>{ this.props.light }</span>
      </li>
    )
  }
}

export default CharacterCard;


