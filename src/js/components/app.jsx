import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Link
} from 'react-router-dom'

// Component Imports
import ActivityList from './ActivityList';
import CharacterSelectList from './CharacterSelectList';
import PlayerInfoForm from './PlayerInfoForm';
import Navigation from './Navigation';

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

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'test',
      userPlatform: '4',
      membershipId: '1',
      characterData: [],
      activityHistory: [],
      characterId: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMembershipChange = this.handleMembershipChange.bind(this);
    this.handleCharacterListChange = this.handleCharacterListChange.bind(this);
    this.handleActivityHistoryChange = this.handleActivityHistoryChange.bind(this);
  }

  // Callback methods
  handleInputChange(userName) {
    this.setState({
      userName: userName
    });
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

  handleActivityHistoryChange(activityHistory) {
    this.setState({
      activityHistory: [...this.state.activityHistory, activityHistory]
    });
  }

  render () {
    return (
      <div>
        <Navigation />
        <Router>
          <section className="main">
            <Switch>
              <Route exact path="/" render={ () => 
                <PlayerInfoForm 
                  onCharacterListChange={this.handleCharacterListChange}
                  onMembershipChange={this.handleMembershipChange}
                  onHandleInputChange={this.handleInputChange}
                /> 
              } />
              <Route exact path="/character" render={ () => 
                <CharacterSelectList 
                  membershipId={this.state.membershipId}
                  characterData={this.state.characterData}
                  onActivityHistoryUpdate={this.handleActivityHistoryChange} /> 
                } />
              <Route path="/character/activity" render={ () => <ActivityList activityHistoryData={this.state.activityHistory} /> } />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}

// {this.state.membershipId}
