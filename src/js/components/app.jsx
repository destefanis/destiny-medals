import React from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  withRouter,
  Switch,
  Link,

} from 'react-router-dom'

// Component Imports
import ActivityList from './ActivityList';
import CharacterSelectList from './CharacterSelectList';
import PlayerInfoForm from './PlayerInfoForm';
import Navigation from './Navigation';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      platform: 4,
      membershipId: '',
      characterData: [],
      activityHistory: [],
      characterId: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePlatformSelect = this.handlePlatformSelect.bind(this);
    this.handleMembershipChange = this.handleMembershipChange.bind(this);
    this.handleCharacterListChange = this.handleCharacterListChange.bind(this);
    this.handleCharacterSelected = this.handleCharacterSelected.bind(this);
    this.handleActivityHistoryChange = this.handleActivityHistoryChange.bind(this);
  }

  // Callback methods
  handleInputChange(userName) {
    this.setState({
      userName: userName
    });
  }

  handlePlatformSelect(platform) {
    this.setState({
      platform: platform
    });
    console.log(platform);
  }

  handleMembershipChange(membershipId) {
    this.setState({
      membershipId: membershipId
    });
  }

  handleCharacterListChange(characterData) {
    this.setState({
      characterData: [...this.state.characterData, characterData]
    });
  }

  handleCharacterSelected(characterId) {
    this.setState({
      characterId: characterId
    });
  }

  handleActivityHistoryChange(activityHistory) {
    this.setState({
      activityHistory: [...this.state.activityHistory, activityHistory]
    });
  }

  render () {
    return (
      <HashRouter>
          <div>
          <Navigation />
          <section className="main">
            <Switch>
              <Route exact path="/" render={ () => 
                <PlayerInfoForm 
                  onPlatformSelect={this.handlePlatformSelect}
                  defaultPlatform={this.state.platform}
                  onMembershipChange={this.handleMembershipChange}
                  onHandleInputChange={this.handleInputChange}
                /> 
              } />
              <Route exact path="/characters" render={ () => 
                <CharacterSelectList
                  platform={this.state.platform}
                  onCharacterListChange={this.handleCharacterListChange}
                  membershipId={this.state.membershipId}
                  onCharacterSelected={this.handleCharacterSelected} /> 
                } />
              <Route path="/character/activity" render={ () => 
                <ActivityList 
                  platform={this.state.platform}
                  characterId={this.state.characterId} 
                  membershipId={this.state.membershipId} 
                  onActivityHistoryUpdate={this.handleActivityHistoryChange} /> 
              } />
            </Switch>
          </section>
        </div>
      </HashRouter>
    )
  }
}

// {this.state.membershipId}
