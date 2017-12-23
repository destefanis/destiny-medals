import React from 'react';
import { withRouter } from 'react-router-dom'
import Transition from 'react-transition-group/Transition';

import CharacterCard from './CharacterCard';

import requestHeader from '../constants/requestHeader.js';
import host from '../constants/host.js';


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
    let request = new Request(endpoint, requestHeader);

    // Fetch the players recent activity.
    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.props.onActivityHistoryUpdate(data.Response.activities);
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

