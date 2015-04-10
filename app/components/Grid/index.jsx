import React from 'react';

require('./style.sass');

var gridColors = [
  '#F58E99', '#6AC6D6', '#FFEE81', '#FCC886',
  '#88CCAC', '#A3A3C8', '#6AA7CE', '#A09C97',
]

class Track extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="Track" style={this.trackStyles(this.props.index)}>

    </div>
  }
  trackStyles(i) {
    return {
      backgroundColor: gridColors[i],
      height: (100 / this.props.rows) + '%',
      width: (100 / this.props.cols) + '%',
    }
  }
}

export default class Grid extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.state;
  }
  render() {
    const tracks = this.state.tracks.map((track, i) => {
      return <Track key={i} index={i}
        track={this.state.tracks[i]}
        cols={this.props.cols}
        rows={this.props.rows} />
    })
    return <div className="Grid">
      {tracks}
    </div>
  }
}

Grid.propTypes = {
  cols: React.PropTypes.number,
  rows: React.PropTypes.number,
}
