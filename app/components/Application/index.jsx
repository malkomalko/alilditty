import React from 'react'
import {Events, EventNames} from '../../events'
import Grid from '../Grid'
import {HotKeys} from 'react-hotkeys';

require('./style.sass')

const keyMap = {
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
  render() {
    return <HotKeys keyMap={keyMap} handlers={this.handlers()}>
      <div className="Application" onWheel={this.onWheel}>
        <Grid {...this.state} rows={2} cols={4} />
      </div>
    </HotKeys>
  }
  setupEvents() {
    this.state.events.on(EventNames.STATE_SELECTED_TRACK, (index) => {
      this.setState({ selectedTrack: index })
    })
  }
  onWheel(e) {
    e.preventDefault()
  }
  handlers() {
    return {
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
