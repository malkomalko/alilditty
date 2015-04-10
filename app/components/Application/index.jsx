import React from 'react'
import {Events, EventNames} from '../../events'
import Grid from '../Grid'

var Mousetrap = require('mousetrap')
require('./style.sass')

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
  }
  onWheel(e) {
    e.preventDefault()
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
      },
    }
  }
}
