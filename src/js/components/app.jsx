import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Link
} from 'react-router-dom'

import PlayerInfoForm from './PlayerInfoForm';
import CharacterSelectList from './CharacterSelectList';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'test',
      userPlatform: '4',
      membershipId: '1',
      characterIds: [],
      characterId: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMembershipChange = this.handleMembershipChange.bind(this);
    this.handleCharacterListChange = this.handleCharacterListChange.bind(this);
  }

  // Update state from child callback.
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

  handleCharacterListChange(characterIds) {
    this.setState({
      characterIds: characterIds
    });
  }

  render () {
    return (
      <div>
        <nav className="nav">
          <h1 className="h1">
            Destiny Medals
          </h1>
        </nav>
        <Router>
          <section className="main">
            <Switch>
              <Route exact path="/" render={ () => 
                <PlayerInfoForm 
                  onCharacterListChange={this.handleCharacterListChange}
                  onMembershipChange={this.handleMembershipChange}
                  onHandleInputChange={this.handleInputChange}  /> 
                } />
              <Route path="/character" render={ () => <CharacterSelectList /> } />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}

