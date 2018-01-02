import React from 'react';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';

import CharacterCard from './CharacterCard';

import requestHeader from '../constants/requestHeader.js';
import host from '../constants/host.js';


class CharacterSelectList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      membershipId: this.props.membershipId,
      platform: this.props.platform,
    };

    this.fetchCharacterData = this.fetchCharacterData.bind(this);
    this.characterSelected = this.characterSelected.bind(this);
    this.updateCharacterList = this.updateCharacterList.bind(this);
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

  updateCharacterList(newCharacterData, membershipId, platform) {
    this.setState({
      characters: [...this.state.characters, newCharacterData],
      membershipId: membershipId,
      platform: platform,
    });

    this.props.onCharacterListChange(newCharacterData);
  }

  fetchCharacterData(platform, membershipId) {
    // Request the characters the belong to player.
    let endpoint = host + platform + '/Profile/' + membershipId + '/?components=100';
    let request = new Request(endpoint, requestHeader);

    fetch(request)
      .then(response => response.json())
      .then(data => {
        let characterIds = data.Response.profile.data.characterIds;

        // Request character data for each character.
        for (let characterId of characterIds) {

          endpoint = host + platform + '/Profile/' + membershipId + '/Character/' + characterId + '/?components=200';
          let characterRequest = new Request(endpoint, requestHeader);

          fetch(characterRequest)
            .then(response => response.json())
            .then(data => {
              // Updated local state in order to map the characters array.
              this.updateCharacterList(data.Response.character.data, membershipId, platform);
            })
        }
      })
      .catch(function(error) { 
        console.log('Requestfailed', error) 
      });
  }

  characterSelected(characterId) {
    this.props.onCharacterSelected(characterId);

    // Update the router path with querys we can use
    // to re-request the information on reload.
    let selectedPlatform = '?platform=' + this.state.platform;
    let characterQuery = '&characterId=' + characterId;
    let membershipQuery = '&membershipId=' + this.state.membershipId;
    let routerQuery = selectedPlatform + membershipQuery + characterQuery;

    this.props.history.push({
      pathname: '/character/activity',
      search: routerQuery
    })
  }

  componentDidMount(props) {
    let membershipId = this.state.membershipId;

    // If the user reloads or visits this page with a copied address,
    // then use the query parameters for our requests.
    if (this.props.membershipId === '') {
      let parsed = queryString.parse(this.props.location.search);
      membershipId = parsed.membershipId;
      this.fetchCharacterData(parsed.platform, parsed.membershipId);
    } else {
      this.fetchCharacterData(this.props.platform, this.props.membershipId);
    }
  }

  render() {
    let characterData = this.state.characters;

    let characterCards = characterData.map((character) => {
      return <CharacterCard 
              background={this.addImagePath(character.emblemBackgroundPath)}
              emblem={this.addImagePath(character.emblemPath)}
              class={this.determineClass(character.classType)}
              light={character.light}
              level={character.baseCharacterLevel}
              onCharacterSelect={this.characterSelected}
              character={character.characterId}
              key={character.characterId} />
    });

    return (
      <div className="view-container view-container--short">
        <div className="character-select">
          <label className="form-label">
            Select Character
          </label>
          <ul className="character-list">
            {characterCards}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(CharacterSelectList);

