import React from 'react';

class PlatformSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radioChecked: "4",
    }

    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleRadioChange(e) {
    this.setState({radioChecked: e.target.value});
    this.props.onPlatformSelected(e.target.value);
  }

  render() {
    return (
      <div className="platform-select">
        <label className="form-label">
          Platform
        </label>
        <div className="platform-select__buttons">
          <div className="radio-wrapper">
            <input type="radio" id="platform-1" name="platform" value="4" checked={this.state.radioChecked === '4'} onChange={this.handleRadioChange} />
            <label className="radio-label" htmlFor="platform-1">PC</label>
          </div>
          <div className="radio-wrapper">
            <input type="radio" id="platform-2" name="platform" value="2" checked={this.state.radioChecked === '2'} onChange={this.handleRadioChange}/>
            <label className="radio-label radio-label--center" htmlFor="platform-2">PS4</label>
          </div>
          <div className="radio-wrapper">
            <input type="radio" id="platform-3"  name="platform" value="1" checked={this.state.radioChecked === '1'} onChange={this.handleRadioChange}/>
            <label className="radio-label" htmlFor="platform-3">Xbox</label>
          </div>
        </div>
      </div>
    )
  }
}

export default PlatformSelect;
