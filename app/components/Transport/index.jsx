import React from 'react'
import {Events, EventNames} from '../../events'
import ClipSequencer from '../ClipSequencer'
import Icon from '../Icon'
import Mixer from '../Mixer'
import Modal from '../Modal'
import ToggleIcon from '../ToggleIcon'

require('./style.sass')
var _ = require('lodash')
var Tone = require('tone')
var Wad = require('wad')

Tone.Transport.bpm.value = 128

var metro = new Wad({ source: 'sine' })

export default class Transport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMixerOpen: false,
      isSequenceOpen: false,
    }

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
      <Icon ref="Mixer" className="MixerIcon"
        type="ion-levels" size="64px"
        color="#FFFFFF" hoverColor="#555555"
        onClick={this.onMixerClick.bind(this)} />
      <Icon ref="Sequence" className="SequenceIcon"
        type="ion-ios-keypad" size="64px"
        color="#FFFFFF" hoverColor="#555555"
        onClick={this.onSequenceClick.bind(this)} />
      <ToggleIcon ref="Record" className="Record"
        type="ion-record" size="64px"
        color="#FFFFFF" hoverColor={hoverColor} onColor={onColor}
        onToggle={this.onRecordClick.bind(this)} />
      <ToggleIcon ref="Metronome" className="Metronome"
        type="ion-ios-time-outline" size="64px"
        color="#FFFFFF" hoverColor="#555555" onColor="#111111"
        onToggle={this.onMetroClick.bind(this)} />
      <Modal isOpen={this.state.isMixerOpen}
        transitionName="modal-anim">
        <Icon className="MixerClose"
          type="ion-ios-close" size="64px"
          color="#FFFFFF" hoverColor="#F58E99"
          onClick={this.onCloseModalClick.bind(this, 'isMixerOpen')} />
        <Mixer {...this.props} />
      </Modal>
      <Modal isOpen={this.state.isSequenceOpen}
        transitionName="modal-anim">
        <Icon className="SequenceClose"
          type="ion-ios-close" size="64px"
          color="#FFFFFF" hoverColor="#F58E99"
          onClick={this.onCloseModalClick.bind(this, 'isSequenceOpen')} />
        <ClipSequencer {...this.props} />
      </Modal>
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
      window.recordingStartTime = Tone.context.currentTime
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
  onCloseModalClick(modalType) {
    this.setState({ [modalType]: false })
  }
  onMetroClick(isOn, component) {
    this.props.events.emit(EventNames.METRO_CHANGE)
  }
  onMixerClick(e) {
    this.setState({ isMixerOpen: true })
  }
  onRecordClick(isOn, component) {
    this.props.events.emit(EventNames.ARM_RECORD)
  }
  onSequenceClick(e) {
    this.setState({ isSequenceOpen: true })
  }
  playMetro(step) {
    metro.play({
      volume: 0.3,
      pitch: step === 0 ? 'C4' : 'C3',
      env: { hold: 0.3, release: 0.3 },
    })
  }
}
