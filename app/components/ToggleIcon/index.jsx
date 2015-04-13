import React from 'react'
import {Events, EventNames} from '../../events'
import Icon from '../Icon'

export default class ToggleIcon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      on: false,
    }

    this.setupEvents()
  }
  render() {
    return <div className="ToggleIcon" onClick={this.onClick.bind(this)}>
      <Icon {...this.props} />
    </div>
  }
  setupEvents() { }
  componentDidMount() {
    this.el = React.findDOMNode(this)
  }
  componentWillReceiveProps(nextProps) { }
  componentDidUpdate(prevProps, prevState) {
    this.setupStyles()
  }
  componentWillUnmount() { }
  onClick(e) {
    this.setState({ on: !this.state.on })
  }
  setupStyles() {
    var icon = this.el.getElementsByClassName('icon')[0]
    if (this.state.on && this.props.onColor) {
      icon.style.color = this.props.onColor
    } else {
      icon.style.color = this.props.color
    }
  }
}
