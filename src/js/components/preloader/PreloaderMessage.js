import React from 'react'

class Preloader extends React.Component {
  constructor(props) {
    super(props);
  }

  onButtonPress() {
    window.history.back();
  }

  render() {
    const message = this.props.message;

    return (
      <div className="preloader-message"> 
        <p>{message}</p>
        <div className="button-wrapper">
          <button className="button" onClick={this.onButtonPress}>Go Back</button>
        </div>
      </div>
    );
  }
}

export default Preloader;
