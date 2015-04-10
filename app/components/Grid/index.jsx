import React from 'react'
import {EventNames} from '../../events'

require('./style.sass')

var gridColors = [
  '#F58E99', '#6AC6D6', '#FFEE81', '#FCC886',
  '#88CCAC', '#A3A3C8', '#6AA7CE', '#A09C97',
]

class Track extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="Track" style={this.trackStyles(this.props.index)}
      onClick={this.onClick.bind(this)}>
      <p className="trackNumber">{this.props.index + 1}</p>
    </div>
  }
  onClick(e) {
    var index = this.props.index
    this.props.events.emit(EventNames.SELECTED_TRACK, index)
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
  }
  render() {
    const tracks = this.props.tracks.map((track, i) => {
      return <Track {...this.props} key={i} index={i} />
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
