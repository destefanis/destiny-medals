import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Link
} from 'react-router-dom'

import PlayerInfoForm from './PlayerInfoForm';
import PlatformSelect from './PlatformSelect';
import CharacterSelect from './CharacterSelect';

export class App extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div>
        <nav className="nav">
          <h1 className="h1">Destiny Medals</h1>
        </nav>
        <Router>
          <section className="main">
            <Switch>
              <Route exact path="/" component={PlayerInfoForm} />
              <Route path="/character" render={ () => <CharacterSelect title='About' /> }/>
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}

