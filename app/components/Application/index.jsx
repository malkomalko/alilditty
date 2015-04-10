import React from 'react';
import Grid from '../Grid';

require('./style.sass');

export default class Application extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tracks: [
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
      ],
    }
  }
  render() {
    return <div className="Application" onWheel={this.onWheel}>
      <Grid rows={2} cols={4} state={this.state} />
    </div>
  }
  onWheel(e) {
    e.preventDefault()
  }
}
