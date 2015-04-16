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
      return <div className="MixerStrip" key={"mixerStrip-" + index}
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
    e.persist()
    this.mouseState[index] = true
  }
  onMouseLeave(index, e) {
    this.mouseState[index] = false
  }
  onMouseMove(index, e) {
    if (this.mouseState[index]) {
      e.persist()

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
    }
  }
  onMouseUp(index, e) {
    e.persist()
    this.mouseState[index] = false
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
}
