// Import React.
import React from 'react'

const api_key = "b8f2f9674ea24761bfe8f0a49a84d3a3";
const host = 'https://www.bungie.net/Platform/Destiny2/';
const requestHeaders = {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        "X-API-Key": api_key
      })
    };

class PlatformSelect extends React.Component {
  render() {
    return (
      <div>
        <label className="form-label form-label--transparent">
          Platform
        </label>
        <div>
          <input type="radio" id="platform-1" name="platform" value="4" />
          <label htmlFor="platform-1">PC</label>
          <input type="radio" id="platform-2" name="platform" value="1" />
          <label htmlFor="platform-2">PS4</label>
          <input type="radio" id="platform-3"  name="platform" value="2" />
          <label htmlFor="platform-3">Xbox</label>
        </div>
      </div>
    );
  }
}

class PlayerInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedName: '',
      submittedPlatform: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({submittedName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    let playerName = encodeURIComponent(this.state.submittedName);
    let endpoint = host + 'SearchDestinyPlayer/4/' + playerName + '/';
    let request = new Request(endpoint, requestHeaders);

    // Fetch the MembershipID for the user.
    // The membership ID is used to access the bungie.net profile and game activity.
    fetch(request)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        let membershipId = data.Response[0].membershipId;
        // Update the endpoint to request the users profile.
        endpoint = host + '4/Profile/' + membershipId + '/?components=100';
        // Create a new request with the update endpoint.
        let userRequest = new Request(endpoint, requestHeaders);

        return fetch(userRequest)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(function(error) { 
        console.log('Requestfailed', error) 
      });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <PlatformSelect />
        <input type="text" placeholder="YourName#1377" value={this.state.playerName} onChange={this.handleChange} />
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}

export class DefaultComponent extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div>
        <nav className="nav">
          <h1 className="h1">Destiny Medals</h1>
        </nav>
        <section className="main">
          <PlayerInfoForm />
        </section>
      </div>
    )
  }
}

