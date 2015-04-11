import React from 'react'
import {Events, EventNames} from '../../events'

var Tone = require('tone')
require('./style.sass')

export default class Transport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 0,
    }

    this.startTransport()
  }
  render() {
    return <div className="Transport">
      <div className="step step1"></div>
      <div className="step step2"></div>
      <div className="step step3"></div>
      <div className="step step4"></div>
    </div>
  }
  componentDidUpdate(prevProps, prevState) {
    this.setActiveStyles()
  }
  setActiveStyles() {
    var steps = document.querySelectorAll('.Transport .step')
    Array.prototype.slice.call(steps).forEach((step) => {
      step.classList.remove('active')
    })
    steps[this.state.step].classList.add('active')
  }
  startTransport() {
    Tone.Transport.setInterval((time) => {
      var step = ((this.state.step + 1) % 4)
      this.setState({ step: step })
    }, '4n')

    Tone.Transport.start()
  }
}
