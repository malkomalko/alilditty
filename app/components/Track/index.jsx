import React from 'react'
import {EventNames} from '../../events'

require('./style.sass')

var gridColors = [
  '#F58E99', '#6AC6D6', '#FFEE81', '#FCC886',
  '#88CCAC', '#A3A3C8', '#6AA7CE', '#A09C97',
]

var style = {
  base(self) {
    var currentlySelected = self.isCurrentSelection()
    var height = (100 / self.props.rows) + '%'
    var width = (100 / self.props.cols) + '%'
    var top = ~~(self.props.index / self.props.cols) / self.props.rows
    var left = (self.props.index % self.props.cols) / self.props.cols

    var styles = {
      backgroundColor: gridColors[self.props.index],
      height: currentlySelected ? '100%' : height,
      left: (left * 100) + '%',
      top: (top * 100) + '%',
      width: currentlySelected ? '100%' : width,
    }

    if (currentlySelected) {
      styles.top = 0
      styles.left = 0
      styles.zIndex = 100
    }

    return styles
  },
  trackNumber(self) {
    var currentlySelected = self.isCurrentSelection()
    var styles = {}

    if (currentlySelected) {
      styles.top = 100
    }

    return styles
  },
}

export default class Track extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="Track" style={style.base(this)}
      onClick={this.onClick.bind(this)}>
      <p className="trackNumber" style={style.trackNumber(this)}>
        {this.props.index + 1}
      </p>
    </div>
  }
  onClick(e) {
    var index = this.props.index
    if (this.isCurrentSelection()) {
      index = null
    }
    this.props.events.emit(EventNames.SELECTED_TRACK, index)
  }
  isCurrentSelection() {
    return this.props.index === this.props.selectedTrack
  }
}
