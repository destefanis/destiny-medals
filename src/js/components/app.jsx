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
      userPlatform: '4',
      membershipId: '',
      characterData: [],
      activityHistory: [],
      characterId: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
      <div>
        <Navigation />
        <HashRouter>
          <section className="main">
            <Switch>
              <Route exact path="/" render={ () => 
                <PlayerInfoForm 
                  onMembershipChange={this.handleMembershipChange}
                  onHandleInputChange={this.handleInputChange}
                /> 
              } />
              <Route exact path="/characters" render={ () => 
                <CharacterSelectList
                  onCharacterListChange={this.handleCharacterListChange}
                  membershipId={this.state.membershipId}
                  onCharacterSelected={this.handleCharacterSelected} /> 
                } />
              <Route path="/character/activity" render={ () => 
                <ActivityList 
                  characterId={this.state.characterId} 
                  membershipId={this.state.membershipId} 
                  onActivityHistoryUpdate={this.handleActivityHistoryChange} /> 
              } />
            </Switch>
          </section>
        </HashRouter>
      </div>
    )
  }
}

// {this.state.membershipId}
