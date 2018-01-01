import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // @todo split into subcomponent
    const alphaTeam = this.props.data.filter(player => player.standing === 0);
    const bravoTeam = this.props.data.filter(player => player.standing === 1);

    const alphaTableRow = alphaTeam.map((player) =>
      <tr className="table-row" key={player.player.destinyUserInfo.displayName}>
        <td className="table-column" key={player.player.destinyUserInfo.displayName}>{player.player.destinyUserInfo.displayName}</td>
        <td className="table-column" key={player.values.opponentsDefeated.basic.displayValue}>{player.values.opponentsDefeated.basic.displayValue}</td>
        <td className="table-column" key={player.values.assists.basic.displayValue}>{player.values.assists.basic.displayValue}</td>
        <td className="table-column" key={player.values.deaths.basic.displayValue}>{player.values.deaths.basic.displayValue}</td>
        <td className="table-column" key={player.values.efficiency.basic.displayValue}>{player.values.efficiency.basic.displayValue}</td>
      </tr>
    );

    const bravoTableRow = bravoTeam.map((player) =>
      <tr className="table-row" key={player.player.destinyUserInfo.displayName}>
        <td className="table-column" key={player.player.destinyUserInfo.displayName}>{player.player.destinyUserInfo.displayName}</td>
        <td className="table-column" key={player.values.opponentsDefeated.basic.displayValue}>{player.values.opponentsDefeated.basic.displayValue}</td>
        <td className="table-column" key={player.values.assists.basic.displayValue}>{player.values.assists.basic.displayValue}</td>
        <td className="table-column" key={player.values.deaths.basic.displayValue}>{player.values.deaths.basic.displayValue}</td>
        <td className="table-column" key={player.values.efficiency.basic.displayValue}>{player.values.efficiency.basic.displayValue}</td>
      </tr>
    );

    return (
      <div>
        <header className="score-board__team score-board__team--alpha">
          <h3 className="team-name team-name--alpha">Alpha Team</h3>
          <span className="score-divider score-divider--alpha">
          </span>
          <span className="score-board__total score-board__total--alpha">
            {this.props.alphaScore}
          </span>
        </header>
        <table className="table">
          <tbody>
            <tr>
              <th className="table-header">
                Name
              </th>
              <th className="table-header">
                Opp. Defeated
              </th>
              <th className="table-header">
                Assists
              </th>
              <th className="table-header">
                Deaths
              </th>
              <th className="table-header">
                Efficiency
              </th>
            </tr>
            {alphaTableRow}
          </tbody>
        </table>

        <header className="score-board__team">
          <h3 className="team-name">Bravo Team</h3>
          <span className="score-divider">
          </span>
          <span className="score-board__total score-board__total--bravo">
            {this.props.bravoScore}
          </span>
        </header>
        <table className="table">
          <tbody>
            <tr>
              <th className="table-header">
                Name
              </th>
              <th className="table-header">
                Opp. Defeated
              </th>
              <th className="table-header">
                Assists
              </th>
              <th className="table-header">
                Deaths
              </th>
              <th className="table-header">
                Efficiency
              </th>
            </tr>
            {bravoTableRow}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;
