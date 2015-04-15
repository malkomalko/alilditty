import React from 'react'
import {Events, EventNames} from '../../events'

require('react/addons')
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

require('./style.sass')

export default class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setupEvents()
  }
  render() {
    if(this.props.isOpen){
      return (
        <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
          <div className="Modal">
            {this.props.children}
          </div>
        </ReactCSSTransitionGroup>
      );
    } else {
      return <ReactCSSTransitionGroup
        transitionName={this.props.transitionName} />
    }
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
}
