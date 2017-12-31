import React from 'react'
import { withRouter } from 'react-router-dom'

import PlatformSelect from './PlatformSelect';

import requestHeader from '../constants/requestHeader.js';
import host from '../constants/host.js';

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
    let request = new Request(endpoint, requestHeader);
    let membershipId;

    // Fetch the Bungie.net MembershipID for the user.
    fetch(request)
      .then(response => response.json())
      .then(data => {

        membershipId = data.Response[0].membershipId;
        // Update the parent state value.
        this.props.onMembershipChange(membershipId);

        // Update the router path with querys we can use
        // to re-request the information on reload.
        let selectedPlatform = '?platform=4';
        let membershipQuery = '&membershipId=' + membershipId;
        let routerQuery = selectedPlatform + membershipQuery;

        this.props.history.push({
          pathname: '/characters',
          search: routerQuery,
          state: { name: this.state.value }
        })
      })
      .catch(function(error) { 
        console.log('Requestfailed', error) 
      });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <PlatformSelect />
        <input className="form-input" type="text" placeholder="YourName#1377" value={this.state.value} onChange={this.handleChange} />
        <div className="button-wrapper">
          <button className="button" type="submit">Search</button>
        </div>
      </form>
    );
  }
}

export default withRouter(PlayerInfoForm);
