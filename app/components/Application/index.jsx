import React from 'react'
import {Events, EventNames} from '../../events'
import Grid from '../Grid'
import Transport from '../Transport'

require('./style.sass')
require('../../css/ionicons.css')
var Mousetrap = require('mousetrap')

var pressedKeys = {}

const keyMap = {
  'armMetro': { type: 'toggle', keys: ['ctrl+m'] },
  'armRecord': { type: 'toggle', keys: ['space'] },
  'playNote': [
    'q', 'w', 'e', 'r', 't', 'y', 'u',
    'a', 's', 'd', 'f', 'g', 'h', 'j',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
  ],
  'selectTrack': {
    type: 'toggle',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8'],
  },
}

export default class Application extends React.Component {
  constructor(props) {
    super(props)

    var sl = '75%'

    this.state = {
      activeClips: [
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      events: new Events(),
      isRecording: false,
      mixer: {
        levels: [sl, sl, sl, sl, sl, sl, sl, sl],
      },
      selectedTrack: null,
      sequenceActiveClips: [
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      toggles: {
        metro: false,
        recording: false,
      },
      tracks: [
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
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
    </div>
  }
  setupEvents() {
    var handlers = this.handlers()

    Object.keys(keyMap).forEach((key) => {
      if (Array.isArray(keyMap[key])) {
        Mousetrap.bind(keyMap[key], handlers[key], 'keydown')
        Mousetrap.bind(keyMap[key], handlers[key], 'keyup')
      } else {
        Mousetrap.bind(keyMap[key].keys, handlers[key], 'keyup')
      }
    })

    this.state.events.on(EventNames.STATE_ARM_RECORD, () => {
      handlers.armRecord()
    })

    this.state.events.on(EventNames.STATE_CLIP_CHANGE, (payload) => {
      var activeClips = this.state.activeClips.slice()
      activeClips[payload.track] = payload.clip
      this.setState({ activeClips: activeClips })
    })

    this.state.events.on(EventNames.STATE_METRO_CHANGE, (payload) => {
      handlers.armMetro()
    })

    this.state.events.on(EventNames.STATE_MIXER_LEVEL_CHANGE, (payload) => {
      var mixer = this.state.mixer
      mixer.levels[payload.index] = payload.percent
      this.setState({ mixer })
    })

    this.state.events.on(EventNames.STATE_RECORD_CHANGE, (payload) => {
      var track = this.state.selectedTrack
      if (track == null) { return }

      var clipSlot = this.state.activeClips[track]
      var tracks = this.state.tracks.slice()
      var state = {
        isRecording: payload.state === 'on',
      }
      if (state.isRecording) {
        tracks[track][clipSlot] = {}
        state.tracks = tracks
      } else {
        tracks[track][clipSlot].measures = payload.measures
      }
      this.setState(state)
    })

    this.state.events.on(EventNames.STATE_RECORD_NOTE, (payload) => {
      var track = this.state.selectedTrack
      if (track == null) { return }

      var clipSlot = this.state.activeClips[track]
      var tracks = this.state.tracks.slice()
      var clip = tracks[track][clipSlot]
      clip.notes = clip.notes || []
      clip.notes.push(payload)

      this.setState({ tracks })
    })

    this.state.events.on(EventNames.STATE_SELECTED_TRACK, (index) => {
      this.setState({ selectedTrack: index })
    })

    this.state.events.on(EventNames.STATE_SEQUENCE_CLIP_CHANGE, (payload) => {
      var clips = this.state.sequenceActiveClips.slice()
      clips[payload.track] = payload.clip
      this.setState({ sequenceActiveClips: clips })
    })

  }
  onWheel(e) {
    e.preventDefault()
  }
  handlers() {
    return {
      'armMetro': (e) => {
        var toggles = this.state.toggles
        toggles.metro = !this.state.toggles.metro
        this.setState({ toggles: toggles })
      },
      'armRecord': (e) => {
        if (this.state.selectedTrack == null) { return }

        var toggles = this.state.toggles
        toggles.recording = !this.state.toggles.recording
        this.setState({ toggles: toggles })
      },
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
        var trackNumber = e.keyCode - 49
        if (this.state.selectedTrack === trackNumber) {
          trackNumber = null
        }
        this.setState({ selectedTrack: trackNumber })
      },
    }
  }
}
