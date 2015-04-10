import React from 'react'
import {Events, EventNames} from '../../events'
import Grid from '../Grid'

require('./style.sass')

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
    return <div className="Application" onWheel={this.onWheel}>
      <Grid {...this.state} rows={2} cols={4} />
    </div>
  }
  setupEvents() {
    this.state.events.on(EventNames.STATE_SELECTED_TRACK, (index) => {
      this.setState({ selectedTrack: index })
    })
  }
  onWheel(e) {
    e.preventDefault()
  }
}
