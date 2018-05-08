import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import ReactTooltip from 'react-tooltip'
import { CSSTransition } from 'react-transition-group'
import anime from 'animejs'

import PlatformSelect from './PlatformSelect';

import requestHeader from '../../constants/requestHeader.js';
import host from '../../constants/host.js';

const animateIn = () => {
  const form = document.querySelector('.form')
  anime({
    targets: form,
    duration: 1000,
    easing: 'easeInOutQuart',
    opacity: [0, 1],
    translateY: [20, 0]
  })
}

class PlayerInfoForm extends React.Component {
  constructor(props) {
    super(props);

    // Set local state so we can update this value for form submission.
    this.state = {
      value: '',
      errorMessage: '',
      platform: this.props.defaultPlatform,
      placeholderText: "YourName#1337",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlatformChange = this.handlePlatformChange.bind(this);
  }

  handlePlatformChange(selectedPlatform) {
    this.setState({platform: selectedPlatform});

    if (selectedPlatform === '2') {
      this.setState({placeholderText: "PSN Name"});
    }
    else if (selectedPlatform === '1') {
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
    // Hide the tooltip/error message.
    ReactTooltip.hide(this.refs.input);
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
        this.props.onViewChange('character-view input-leave');

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
      .catch(error => {
        if (error === 5) {
          this.setState({
            errorMessage: "Sorry, the Bungies servers are down for maintenance. Try again later!",
          });
        } else {
          this.setState({
            errorMessage: "Oops! Couldn't find a player by that name on this platform.",
          });
        }
        ReactTooltip.show(this.refs.input)
      });
  }

  showNotification(message, time) {
    this.refs.notify.error(message, time);
  }

  componentDidMount(props) {
    // Update the form to use url parameters if the exist.
    let parsed = queryString.parse(this.props.location.search);
    let userName = parsed.name;

    if (userName) {
      this.setState({value: userName});
    }

    animateIn();
  }

  render() {
    return (
      <div className="view-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <PlatformSelect onPlatformSelected={this.handlePlatformChange}/>
          <label className="form-label">
            Name
          </label>
          <p data-tip={this.state.errorMessage} ref='input' data-event='mouseenter' data-event-off='click'></p>
          <input className="form-input" type="text" placeholder={this.state.placeholderText} value={this.state.value} onChange={this.handleChange} />
          <div className="button-wrapper">
            <button className="button" type="submit" disabled={!this.state.value}>
              Search
            </button>
          </div>
        </form>
        <ReactTooltip className="tooltip tooltip--error" place="top" effect="static" html={true} />
      </div>
    );
  }
}

export default withRouter(PlayerInfoForm);
