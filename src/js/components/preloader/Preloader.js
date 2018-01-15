import React from 'react'
import anime from 'animejs'

import PreloaderIcon from './PreloaderIcon'
import PreloaderMessage from './PreloaderMessage'

class Preloader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageVisible: false,
    }
  }

  countToHide(duration) {
    setTimeout(() => {
      const icon = document.querySelector('.icon-wrapper')
      let animationPromise = anime({
        targets: icon,
        duration: 1200,
        opacity: [1, 0],
        translateY: [0, -30],
        elasticity: 0,
      })

      animationPromise.finished.then(this.displayMessage());
    }, duration);
  }

  displayMessage() {
    setTimeout(() => {
      this.setState({
        messageVisible: true,
      })
    }, 1000);
  }

  componentDidMount(props) {
    this.countToHide(3000);
    const icon = document.querySelector('.icon-wrapper')
    anime({
      targets: icon,
      duration: 1200,
      opacity: [0, 1],
      translateY: [30, 0],
      elasticity: 0,
    })
  }

  render() {
    const isMessageVisible = this.state.messageVisible;

    return (
      <div className="preloader">
        {isMessageVisible ? <PreloaderMessage message={this.props.message} /> : <PreloaderIcon /> }
      </div>
    );
  }
}

export default Preloader;
