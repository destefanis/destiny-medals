import React from 'react';

const PlatformSelect = () => (
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

export default PlatformSelect;
