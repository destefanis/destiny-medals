import React from 'react';

class CharacterCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let divStyle = {
      backgroundImage: 'url(' + this.props.background + ')'
    };

    // <div className="character-emblem">
    //   <img className="character-emblem__icon" src={ this.props.emblem } />
    // </div>

    return (
      <li className="character-list__item" style={divStyle}>
        <div className="character">
          <div className="character-content">
            <h4 className="character-class">
              { this.props.class }
            </h4>
            <div class="character-details">
              <span className="character-detail character-detail--level">
                Level { this.props.level }
              </span>
              <span className="character-detail">
                <span className="light-icon">
                  &#57426;
                </span>
                { this.props.light }
              </span>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CharacterCard;


