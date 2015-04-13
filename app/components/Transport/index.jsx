import React from 'react'
import {Events, EventNames} from '../../events'
import ToggleIcon from '../ToggleIcon'

require('./style.sass')
var Tone = require('tone')
var Wad = require('wad')

var metro = new Wad({ source: 'sine' })

export default class Transport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.metroOn = false
    this.recordOn = false
    this.step = 0

    this.startTransport()
  }
  render() {
    return <div>
      <div className="Transport">
        <div className="step step1"></div>
        <div className="step step2"></div>
        <div className="step step3"></div>
        <div className="step step4"></div>
      </div>
      <ToggleIcon ref="Record" className="Record"
        type="ion-record" size="64px"
        color="#FFFFFF" hoverColor="#555555" onColor="#111111"
        onToggle={this.onRecordClick.bind(this)} />
      <ToggleIcon className="Metronome"
        type="ion-ios-time-outline" size="64px"
        color="#FFFFFF" hoverColor="#555555" onColor="#111111"
        onToggle={this.onMetroClick.bind(this)} />
    </div>
  }
  componentDidUpdate(prevProps, prevState) {
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
      this.setActiveStyles()
      if (this.metroOn) {
        this.playMetro(this.step)
      }
    }, '4n')

    Tone.Transport.start()
  }
  onMetroClick(isOn, component) {
    this.metroOn = isOn
  }
  onRecordClick(isOn, component) {
    this.recordOn = isOn
  }
  playMetro(step) {
    metro.play({
      volume: 0.4,
      pitch: step === 0 ? 'C4' : 'C3',
      env: { hold: 0.3, release: 0.3 },
    })
  }
}
