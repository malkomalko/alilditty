import React from 'react'
import {Events, EventNames} from '../../events'

require('./style.sass')
var colorUtils = require('../../utilities/color')

export default class Icon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setupEvents()
  }
  render() {
    return <i className="icon"
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
    </i>
  }
  setupEvents() { }
  onMouseEnter(e) {
    this.oldColor = colorUtils.rgb2hex(this.el.style.color)
    this.el.style.cursor = 'pointer'
    if (this.props.hoverColor) {
      this.el.style.color = this.props.hoverColor
    }
  }
  onMouseLeave(e) {
    this.el.style.cursor = 'auto'
    var color = colorUtils.rgb2hex(this.el.style.color)
    if (color === this.props.hoverColor) {
      this.el.style.color = this.oldColor
    }
  }
  componentDidMount() {
    this.el = React.findDOMNode(this)
    this.el.classList.add(this.props.type)
    this.el.classList.add(this.props.className)
    this.el.style.color = this.props.color
    this.el.style.fontSize = this.props.size
  }
  componentWillReceiveProps(nextProps) { }
  componentDidUpdate(prevProps, prevState) { }
  componentWillUnmount() { }
}
