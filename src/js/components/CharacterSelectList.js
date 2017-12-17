import React from 'react';

class CharacterSelectList extends React.Component {
  constructor(props) {
    super(props);

    // Set local state so we can update this value for form submission.
    this.state = {value: ''};
  }

  render() {
    return (
      <div>
        <label className="form-label form-label--transparent">
          Select Character
        </label>
        <ul>
          <li>test</li>
        </ul>
      </div>
    )
  }
}

export default CharacterSelect;

// for (let characterID of data.Response.profile.data.characterIds) {
//   console.log(characterID);
// }

// endpoint = host + '4/Profile/' + membershipId + '/Character/' + characterId + '/';
// let request = new Request(endpoint, requestHeaders);
