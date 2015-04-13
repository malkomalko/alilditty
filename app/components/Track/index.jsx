import React from 'react'
import {EventNames} from '../../events'
import KeysVisualizer from '../KeysVisualizer'
import MiniClips from '../MiniClips'

require('./style.sass')
var Wad = require('wad')

var rootUrl = 'https://dl.dropboxusercontent.com/u/49242076/alilditty'
var sources = [
  new Wad({ source: `${rootUrl}/piano.mp3` }),
  new Wad({ source: `${rootUrl}/guitarverb.mp3` }),
  new Wad({ source: `${rootUrl}/guitartremolo.mp3` }),
  new Wad({ source: `${rootUrl}/electricbass.mp3` }),
  new Wad({ source: `${rootUrl}/piano.mp3` }),
  new Wad({ source: `${rootUrl}/guitarverb.mp3` }),
  new Wad({ source: `${rootUrl}/guitartremolo.mp3` }),
  new Wad({ source: `${rootUrl}/electricbass.mp3` }),
]

var keyCodes = [
  81, 87, 69, 82, 84, 89, 85,
  65, 83, 68, 70, 71, 72, 74,
  90, 88, 67, 86, 66, 78, 77,
]

var noteNames = [
  'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
  'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2',
  'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1',
]

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

    sources[this.props.index].play({ env: { hold: 0 }})
    this.setupEvents()
  }
  render() {
    return <div className="Track" style={style.base(this)}
      onClick={this.onClick.bind(this)}>
      <p className="trackNumber" style={style.trackNumber(this)}>
        {this.props.index + 1}
      </p>
      {this.miniClips()}
      {this.keysVisualizer()}
    </div>
  }
  miniClips() {
    return this.isCurrentSelection()
      ? <MiniClips {...this.props} />
      : null
  }
  keysVisualizer() {
    return this.isCurrentSelection()
      ? <KeysVisualizer {...this.props} />
      : null
  }
  setupEvents() {
    var index = this.props.index

    this.props.events.on(`track:${index}:playNote`, (payload) => {
      this.playOrStopNote(payload)
    })

    this.props.events.on(EventNames.STATE_SELECTED_TRACK, (index) => {
      this.stopAllNotes(this.props.index)
    })
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
  playOrStopNote(payload) {
    var eventType = payload.e.type
    var keyCode = payload.e.keyCode
    var pitchIndex = keyCodes.indexOf(keyCode)
    if (pitchIndex < 0) { return }
    var label = noteNames[pitchIndex]
    var pitch = Wad.pitches[label]

    if (eventType === 'keydown') {
      this.playNote(pitch, label)
    } else {
      this.stopNote(pitch, label)
    }
  }
  playNote(pitch, label) {
    var rate = (pitch / Wad.pitches.C2)

    sources[this.props.index].play({
      label: label,
      rate: rate,
      env: { hold: 15, release: 0.4 },
    })
  }
  stopNote(pitch, label) {
    sources[this.props.index].stop(label)
  }
  stopAllNotes(index) {
    noteNames.forEach((label) => {
      sources[index].stop(label)
    })
  }
}