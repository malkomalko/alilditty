import React from 'react'
import {Events, EventNames} from '../../events'

require('./style.sass')

export default class Icon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setupEvents()
  }
  render() {
    return <i className="icon"
      onClick={this.props.onClick}
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
    </i>
  }
  setupEvents() { }
  onMouseEnter(e) {
    this.el.style.cursor = 'pointer'
    if (this.props.hoverColor) {
      this.el.style.color = this.props.hoverColor
    }
  }
  onMouseLeave(e) {
    this.el.style.cursor = 'auto'
    this.el.style.color = this.props.color
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
