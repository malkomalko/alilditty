import React from 'react'
import {Events, EventNames} from '../../events'
import MiniClips from '../MiniClips'

require('./style.sass')
var _ = require('lodash')

var gridColors = [
  '#F58E99', '#6AC6D6', '#FFEE81', '#FCC886',
  '#88CCAC', '#A3A3C8', '#6AA7CE', '#A09C97',
]

export default class ClipSequencer extends React.Component {
  constructor(props) {
    super(props)

    this.setupEvents()
  }
  render() {
    return <div className="ClipSequencer">
      <div className="clipTriggers">
        {this.clipTriggers()}
      </div>
      <div className="sequences">
        {this.sequences()}
      </div>
    </div>
  }
  setupEvents() {

  }
  componentDidMount() {
    // called once after initial render => React.findDOMNode(this)
  }
  componentWillReceiveProps(nextProps) {
    // use to set state before a render when props change
  }
  componentDidUpdate(prevProps, prevState) {
    // make dom updates
  }
  componentWillUnmount() {
    // clean up events
  }
  clipTriggers() {
    return _.map(this.props.tracks, (track, index) => {
      return <div className="Trigger"
        ref={"trigger-" + index}
        key={"trigger-" + index}>
        <div className="trackBackground"
          style={this.pStyles.call(this, index)}>
          <p className="trackNumber">{index + 1}</p>
        </div>
        <MiniClips {...this.props} className={"TriggerMiniClips c" + index}
          selectedTrack={index} onClick={this.onClick.bind(this, index)}
          activeClips={this.props.sequenceActiveClips}/>
      </div>
    })
  }
  sequences() {
  }
  pStyles(index) {
    return {
      backgroundColor: gridColors[index],
    }
  }
  onClick(index, clip, e) {
    this.props.events.emit(EventNames.SEQUENCE_CLIP_CHANGE, {
      clip, track: index,
    })
    e.stopPropagation()
  }
}
