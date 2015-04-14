import React from 'react'
import {Events, EventNames} from '../../events'
import ToggleIcon from '../ToggleIcon'

require('./style.sass')
var _ = require('lodash')
var Tone = require('tone')
var Wad = require('wad')

var metro = new Wad({ source: 'sine' })

export default class Transport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.metroOn = false
    this.recordedMeasures = 0
    this.recording = false
    this.recordOn = false
    this.step = 0
    this.totalMeasures = [0, 0, 0, 0, 0, 0, 0, 0]

    this.startTransport()
  }
  render() {
    var onColor = this.props.isRecording ? '#FF0000' : '#111111'
    var hoverColor = this.props.selectedTrack == null ? '#FFFFFF' : '#555555'
    onColor = this.props.selectedTrack == null ? '#FFFFFF' : onColor

    return <div>
      <div className="Transport">
        <div className="step step1"></div>
        <div className="step step2"></div>
        <div className="step step3"></div>
        <div className="step step4"></div>
      </div>
      <ToggleIcon ref="Record" className="Record"
        type="ion-record" size="64px"
        color="#FFFFFF" hoverColor={hoverColor} onColor={onColor}
        onToggle={this.onRecordClick.bind(this)} />
      <ToggleIcon ref="Metronome" className="Metronome"
        type="ion-ios-time-outline" size="64px"
        color="#FFFFFF" hoverColor="#555555" onColor="#111111"
        onToggle={this.onMetroClick.bind(this)} />
    </div>
  }
  componentDidUpdate(prevProps, prevState) {
    this.metroOn = this.props.toggles.metro
    this.recordOn = this.props.toggles.recording
    this.refs.Metronome.setState({ on: this.props.toggles.metro })
    this.refs.Record.setState({ on: this.props.toggles.recording })
  }
  setActiveStyles() {
    var steps = document.querySelectorAll('.Transport .step')
    Array.prototype.slice.call(steps).forEach((step) => {
      step.classList.remove('active')
    })
    steps[this.step].classList.add('active')
  }
  startTransport() {
    Tone.Transport.setInterval((time) => {
      this.step = ((this.step + 1) % 4)
      if (this.step === 0) {
        this.onMeasure(time)
      }
      this.setActiveStyles()
      if (this.metroOn) {
        this.playMetro(this.step)
      }
    }, '4n')

    Tone.Transport.start()
  }
  onMeasure(time) {
    if (this.recording) { this.recordedMeasures += 1 }
    if (this.recordOn && !this.recording) {
      this.recording = true
      this.props.events.emit(EventNames.RECORD_CHANGE, {
        state: 'on', time,
      })
    } else if (!this.recordOn && this.recording) {
      this.recording = false
      this.props.events.emit(EventNames.RECORD_CHANGE, {
        state: 'off', time, measures: this.recordedMeasures,
      })
      this.recordedMeasures = 0
    }
    this.playClips()
  }
  playClips() {
    _.each(this.clipsToTrigger(), (clip) => {
      this.props.events.emit(EventNames.PLAY_CLIP_FOR_TRACK, clip)
    })
  }
  clipsToTrigger() {
    var clipSlots = _.map(this.props.activeClips, (clipSlot, index) => {
      var clipSlot = this.props.tracks[index][clipSlot]
      clipSlot.index = index
      return clipSlot
    })
    this.totalMeasures = _.map(this.totalMeasures, (measures, track) => {
      measures -= 1
      if (measures <= 0) {
        measures = clipSlots[track].measures || 0
      }
      return measures
    })
    return _.filter(clipSlots, (clipSlot, index) => {
      return this.totalMeasures[index] === clipSlot.measures
    })
  }
  onMetroClick(isOn, component) {
    this.metroOn = isOn
  }
  onRecordClick(isOn, component) {
    this.props.events.emit(EventNames.ARM_RECORD)
  }
  playMetro(step) {
    metro.play({
      volume: 0.3,
      pitch: step === 0 ? 'C4' : 'C3',
      env: { hold: 0.3, release: 0.3 },
    })
  }
}
