import React from 'react'
import {Events, EventNames} from '../../events'
import Grid from '../Grid'
import Transport from '../Transport'
import ToggleIcon from '../ToggleIcon'

require('./style.sass')
require('../../css/ionicons.css')
var Mousetrap = require('mousetrap')

var pressedKeys = {}

const keyMap = {
  'playNote': [
    'q', 'w', 'e', 'r', 't', 'y', 'u',
    'a', 's', 'd', 'f', 'g', 'h', 'j',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
  ],
  'selectTrack': ['1', '2', '3', '4', '5', '6', '7', '8'],
}

export default class Application extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeClips: [
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      events: new Events(),
      selectedTrack: null,
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

    this.setupEvents()
  }
  componentDidMount() {
    React.findDOMNode(this).focus()
  }
  render() {
    return <div className="Application" onWheel={this.onWheel}>
      <Grid {...this.state} rows={2} cols={4} />
      <Transport {...this.state} />
      <ToggleIcon className="metro" onClick={this.onMetroClick.bind(this)}
        type="ion-ios-time-outline" size="64px"
        color="#FFFFFF" hoverColor="#555555" onColor="#111111" />
    </div>
  }
  setupEvents() {
    var handlers = this.handlers()
    Object.keys(keyMap).forEach((key) => {
      Mousetrap.bind(keyMap[key], handlers[key], 'keydown')
      Mousetrap.bind(keyMap[key], handlers[key], 'keyup')
    })

    this.state.events.on(EventNames.STATE_SELECTED_TRACK, (index) => {
      this.setState({ selectedTrack: index })
    })

    this.state.events.on(EventNames.STATE_CLIP_CHANGE, (payload) => {
      var activeClips = this.state.activeClips.slice()
      activeClips[payload.track] = payload.clip
      this.setState({ activeClips: activeClips })
    })
  }
  onWheel(e) {
    e.preventDefault()
  }
  onMetroClick(e) {
    console.log('on metro click')
  }
  handlers() {
    return {
      'playNote': (e) => {
        if (e.type === 'keydown' && pressedKeys[e.keyCode]) { return }
        pressedKeys[e.keyCode] = e.type === 'keydown'

        if (this.state.selectedTrack == null) { return }
        var index = this.state.selectedTrack
        this.state.events.emit(EventNames.PLAY_NOTE_FOR_TRACK, {
          index, e,
        })
      },
      'selectTrack': (e) => {
        if (e.type === 'keydown' && pressedKeys[e.keyCode]) { return }
        pressedKeys[e.keyCode] = e.type === 'keydown'
        if (e.type === 'keyup') { return }

        var trackNumber = e.keyCode - 49
        if (this.state.selectedTrack === trackNumber) {
          trackNumber = null
        }
        this.setState({ selectedTrack: trackNumber })
        this.state.events.emit(EventNames.STATE_SELECTED_TRACK, trackNumber)
      },
    }
  }
}
