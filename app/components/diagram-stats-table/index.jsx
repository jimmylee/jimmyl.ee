import React from 'react';

export default class DiagramStatsTable extends React.Component {
  render() {
    const elements = this.props.data.map(s => {
      return (
        <div className="diagram-stats-table-item" key={s.name}>
          <div className="diagram-stats-table-name">
            {s.name}
          </div>
          <div className="diagram-stats-table-data">
            {s.data}
          </div>
        </div>
      );
    });

    return <section className="diagram-stats-table">{elements}</section>;
  }
}
