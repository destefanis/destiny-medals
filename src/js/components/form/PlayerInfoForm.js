import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';

import PlatformSelect from './PlatformSelect';

import requestHeader from '../../constants/requestHeader.js';
import host from '../../constants/host.js';

class PlayerInfoForm extends React.Component {
  constructor(props) {
    super(props);

    // Set local state so we can update this value for form submission.
    this.state = {
      value: '',
      platform: this.props.defaultPlatform,
      placeholderText: "YourName#1337",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
  }

  handlePlatformChange(selectedPlatform) {
    this.setState({platform: selectedPlatform});

    if (selectedPlatform === '1') {
      this.setState({placeholderText: "PSN Name"});
    }
    else if (selectedPlatform === '2') {
      this.setState({placeholderText: "Your Gamertag"});
    }
    else {
      this.setState({placeholderText: "YourName#1337"});
    }
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
    this.props.onPlatformSelect(this.state.platform);

    let playerName = encodeURIComponent(this.state.value);
    let playerPlatform = this.state.platform;
    let endpoint = host + 'SearchDestinyPlayer/' + playerPlatform + '/' + playerName + '/';

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
        let selectedPlatform = '?platform=' + playerPlatform;
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

  componentDidMount(props) {
    // Update the form to use url parameters if the exist.
    let parsed = queryString.parse(this.props.location.search);
    let userName = parsed.name;

    if (userName) {
      this.setState({value: userName});
    }
  }

  render() {
    return (
      <div className="view-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <PlatformSelect onPlatformSelected={this.handlePlatformChange}/>
          <label className="form-label">
            Name
          </label>
          <input className="form-input" type="text" placeholder={this.state.placeholderText} value={this.state.value} onChange={this.handleChange} />
          <div className="button-wrapper">
            <button className="button" type="submit">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(PlayerInfoForm);
