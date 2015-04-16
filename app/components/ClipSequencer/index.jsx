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
    return <div className="sequenceWrap">
      <button className="addSequence" onClick={this.addSequence.bind(this)}>
        Add Sequence
      </button>
      <div className="sequenceList">
        {this.sequenceList()}
      </div>
    </div>
  }
  sequenceList() {
    return _.map(this.props.sequences, (sequence, index) => {
      return <div className="sequenceItem" key={"sequence-" + index}
        onClick={this.playSequence.bind(this, sequence)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
        <p>{sequence}</p>
      </div>
    })
  }
  onMouseEnter(e) {
    if (e.target.className === 'sequenceItem') {
      this.lastEl = e.target
    } else {
      this.lastEl = e.target.parentElement
    }
    this.lastEl.style.cursor = 'pointer'
    this.lastEl.style.borderColor = '#DF828B'
  }
  onMouseLeave(e) {
    this.lastEl.style.cursor = 'auto'
    this.lastEl.style.borderColor = '#88CCAC'
  }
  pStyles(index) {
    return {
      backgroundColor: gridColors[index],
    }
  }
  addSequence(e) {
    var clips = this.props.sequenceActiveClips
    this.props.events.emit(EventNames.ADD_SEQUENCE, clips)
    e.stopPropagation()
  }
  playSequence(sequence, e) {
    console.log(sequence)
  }
  onClick(index, clip, e) {
    this.props.events.emit(EventNames.SEQUENCE_CLIP_CHANGE, {
      clip, track: index,
    })
    e.stopPropagation()
  }
}
