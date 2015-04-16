import React from 'react'
import {Events, EventNames} from '../../events'

require('./style.sass')
var _ = require('lodash')

export default class Mixer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.mouseState = {}

    this.setupEvents()
  }
  render() {
    return <div className="Mixer">
      {this.mixerStrips()}
    </div>
  }
  mixerStrips() {
    return _.map(this.props.tracks, (track, index) => {
      return <div className="MixerStrip"
        ref={"mixerStrip-" + index}
        key={"mixerStrip-" + index}
        onMouseDown={this.onMouseDown.bind(this, index)}
        onMouseLeave={this.onMouseLeave.bind(this, index)}
        onMouseMove={this.onMouseMove.bind(this, index)}
        onMouseUp={this.onMouseUp.bind(this, index)}>
        <div className="MixerStripHandle" />
      </div>
    })
  }
  setupEvents() {

  }
  onMouseDown(index, e) {
    // e.persist() <-- used to be able to log e
    this.mouseState[index] = true
    this.changeSlider(index, e)
  }
  onMouseLeave(index, e) {
    this.mouseState[index] = false
  }
  onMouseMove(index, e) {
    if (this.mouseState[index]) {
      this.changeSlider(index, e)
    }
  }
  onMouseUp(index, e) {
    this.mouseState[index] = false
  }
  changeSlider(index, e) {
    var el;
    if (e.target.className === 'MixerStrip') {
      el = e.target
    } else {
      el = e.target.parentElement
    }

    var rect = el.getBoundingClientRect()
    var base = ~~(rect.height) + ~~(rect.top) - e.clientY
    var percent = Math.round(base / ~~(rect.height) * 100) + '%'

    el.getElementsByClassName('MixerStripHandle')[0].style.height = percent
    var payload = { index, percent }
    this.props.events.emit(EventNames.MIXER_LEVEL_CHANGE, payload)
  }
  componentDidMount() {
    // called once after initial render => React.findDOMNode(this)
    this.setupUi()
  }
  componentWillReceiveProps(nextProps) {
    // use to set state before a render when props change
    this.setupUi(nextProps)
  }
  componentDidUpdate(prevProps, prevState) {
    // make dom updates
  }
  componentWillUnmount() {
    // clean up events
  }
  setupUi(props = this.props) {
    Object.keys(this.refs).forEach((key, index) => {
      var el = this.refs[key].getDOMNode()
      var percent = props.mixer.levels[index]
      el.getElementsByClassName('MixerStripHandle')[0].style.height = percent
    })
  }
}
