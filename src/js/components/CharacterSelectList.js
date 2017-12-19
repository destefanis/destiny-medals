import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

import CharacterCard from './CharacterCard';

// @todo make into static/constants
const api_key = "b8f2f9674ea24761bfe8f0a49a84d3a3";
const host = 'https://www.bungie.net/Platform/Destiny2/';
const requestHeaders = {
  method: 'GET',
  mode: 'cors',
  headers: new Headers({
    "X-API-Key": api_key
  })
};

class CharacterSelectList extends React.Component {
  constructor(props) {
    super(props);

    this.fetchActivity = this.fetchActivity.bind(this);
  }

  determineClass(classID) {
    if (classID == 0) {
      return ("Titan");
    } else if (classID == 1)  {
      return ("Hunter");
    }
    else {
      return("Warlock");
    }
  }

  addImagePath(url) {
    let path = "https://www.bungie.net/";
    let newPath = path + url;

    return (newPath);
  }

  fetchActivity(characterId) {
    let endpoint = host + '4/Account/' + this.props.membershipId + '/Character/' + characterId + '/Stats/Activities/?mode=5';
    // let endpoint = host + '4/Account/' + this.props.membershipId + '/Character/' + characterId + '/Stats/?groups=3';

    let request = new Request(endpoint, requestHeaders);

    // Fetch the Bungie.net MembershipID for the user.
    fetch(request)
      .then(response => response.json())
      .then(data => {
        console.log('success');
        console.log(data);
        this.props.history.push('/character/activity/');
      })
      .catch(function(error) { 
        console.log('Requestfailed', error) 
      });
  }

  render() {
    let characterCards = this.props.characterData.map((character) => {
      return <CharacterCard 
              background={this.addImagePath(character.emblemBackgroundPath)}
              emblem={this.addImagePath(character.emblemPath)}
              class={this.determineClass(character.classType)}
              light={character.light}
              level={character.baseCharacterLevel}
              onCharacterSelect={this.fetchActivity}
              character={character.characterId}
              key={character.characterId} />
    });

    return (
      <div className="character-select">
        <label className="form-label form-label--transparent">
          Select Character
        </label>
        <ul className="character-list">
          {characterCards}
        </ul>
      </div>
    )
  }
}

export default withRouter(CharacterSelectList);

