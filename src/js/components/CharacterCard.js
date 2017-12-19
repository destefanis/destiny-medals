import React from 'react';

class CharacterCard extends React.Component {
  constructor(props) {
    super(props);

    this.characterSelected = this.characterSelected.bind(this);
  }

  characterSelected() {
    this.props.onCharacterSelect(this.props.character);
  }

  render() {

    let divStyle = {
      backgroundImage: 'url(' + this.props.background + ')'
    };

    return (
      <li className="character-list__item" style={divStyle} onClick={this.characterSelected}>
        <div className="character">
          <div className="character-content">
            <h4 className="character-class">
              { this.props.class }
            </h4>
            <div className="character-details">
              <span className="character-detail character-detail--level">
                Level { this.props.level }
              </span>
              <span className="character-detail">
                <span className="light-icon">
                  &#57426;
                </span>
                { this.props.light } Light
              </span>
              <div className="character-arrow">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 477.175 477.175'>
                    <path d='M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z'
                    />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CharacterCard;


