import React from 'react';

class Notification extends React.Component {
  constructor() {
    super();
    this.wasMounted = true;
    this.key = 0;
    this.state = {};
  }

  componentWillUnmount() {
    this.wasMounted = false;
  }

  error(message, time) {
    this.addNotify(message, time, 'error');
  }

  addNotify(message, time, theme) {
    const key = this.key++;
    const state = Object.assign(this.state, { [key]: {message, time, theme} });

    this.setState(state, () => this.countToHide(time, key));
  }

  countToHide(duration, key) {
    setTimeout(() => {
      this.hideNotification(key);
    }, duration);
  }

  hideNotification(key) {
    if( !this.wasMounted ) {
      return;
    }

    this.setState((state) => {
      delete state[key];
      return state;
    });
  }

  item(key) {
    const { theme, message } = this.state[key];

    return (
      <div key={key} className={`notification ${theme}`} onClick={() => this.hideNotification(key)}>
        <p className="notify-body">{message}</p>
      </div>
    );
  }

  render() {
    const { state } = this;
    const keys = Object.keys(state);
    const el = keys.map((key) => this.item(key));

    return <div className="notify-container">{el}</div>;
  }
}

export default Notification;
