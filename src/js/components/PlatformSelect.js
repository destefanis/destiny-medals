import React from 'react';

class PlatformSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="platform-select">
        <label className="form-label form-label--transparent">
          Platform
        </label>
        <div className="platform-select__buttons">
          <input type="radio" id="platform-1" name="platform" value="4" />
          <label className="radio-label" htmlFor="platform-1">PC</label>
          <input type="radio" id="platform-2" name="platform" value="1" />
          <label className="radio-label radio-label--center" htmlFor="platform-2">PS4</label>
          <input type="radio" id="platform-3"  name="platform" value="2" />
          <label className="radio-label" htmlFor="platform-3">Xbox</label>
        </div>
      </div>
    )
  }
}

export default PlatformSelect;
