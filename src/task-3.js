import React from 'react';

export default class Tabs extends React.Component {

  render() {
    return (
      <div className="row">
        <ul className="col-3 list-group">
          <li className="list-group-item active">Tab 1</li>
          <li className="list-group-item">Tab 2</li>
          <li className="list-group-item">Tab 3</li>
        </ul>
        <div className="col-9">
          <div>Content 1</div>
          <div className="d-none">Content 2</div>
          <div className="d-none">Content 3</div>
        </div>
      </div>
    );
  }
}
