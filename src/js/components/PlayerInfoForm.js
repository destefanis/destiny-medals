import React from 'react'
import {
  Route,
  withRouter,
  Link
} from 'react-router-dom'

import PlatformSelect from './PlatformSelect';

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

class PlayerInfoForm extends React.Component {
  constructor(props) {
    super(props);

    // Set local state so we can update this value for form submission.
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // Set local state
    this.setState({value: e.target.value});
    // Callback to parent state.
    this.props.onHandleInputChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();

    // Update the state in the parent based on this components local state.
    this.props.onHandleInputChange(this.state.value);

    let playerName = encodeURIComponent(this.state.value);
    let endpoint = host + 'SearchDestinyPlayer/4/' + playerName + '/';
    let request = new Request(endpoint, requestHeaders);

    // Fetch the Bungie.net MembershipID for the user.
    fetch(request)
      .then(response => response.json())
      .then(data => {

        let membershipId = data.Response[0].membershipId;
        this.props.onMembershipChange(membershipId);

        // Update the endpoint to request the users profile.
        endpoint = host + '4/Profile/' + membershipId + '/?components=100';
        let userRequest = new Request(endpoint, requestHeaders);

        return fetch(userRequest)
      })
      .then(response => response.json())
      .then(data => {

        let characterIds = data.Response.profile.data.characterIds;
        this.props.onCharacterListChange(characterIds);

        // @todo update route to pass state info to my characterSelect component
        this.props.history.push('/character');
      })
      .catch(function(error) { 
        console.log('Requestfailed', error) 
      });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <PlatformSelect />
          <input type="text" placeholder="YourName#1377" value={this.state.value} onChange={this.handleChange} />
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(PlayerInfoForm);
