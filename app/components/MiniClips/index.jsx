import React from 'react'
import {Events, EventNames} from '../../events'

require('./style.sass')

export default class MiniClips extends React.Component {
  constructor(props) {
    super(props)

    this.setupEvents()
  }
  render() {
    this.className = this.props.className || "MiniClips"
    return <div className={this.className}>
      <div className="clip clip1" onClick={this.onClick.bind(this, 0)}></div>
      <div className="clip clip2" onClick={this.onClick.bind(this, 1)}></div>
      <div className="clip clip3" onClick={this.onClick.bind(this, 2)}></div>
      <div className="clip clip4" onClick={this.onClick.bind(this, 3)}></div>
    </div>
  }
  setupEvents() {

  }
  componentDidMount() {
    // called once after initial render => React.findDOMNode(this)
    this.setActiveStyles()
  }
  componentWillReceiveProps(nextProps) {
    // use to set state before a render when props change
    this.setActiveStyles(nextProps)
  }
  componentDidUpdate(prevProps, prevState) {
    // make dom updates
  }
  componentWillUnmount() {
    // clean up events
  }
  onClick(clip, e) {
    if (this.props.onClick) {
      this.props.onClick(clip, e)
    } else {
      var track = this.props.selectedTrack
      this.props.events.emit(EventNames.CLIP_CHANGE, {
        clip, track,
      })
      e.stopPropagation()
    }
  }
  setActiveStyles(props) {
    props = props || this.props
    var selectedTrack = props.selectedTrack
    var selectedClip = props.activeClips[selectedTrack]
    var className = this.className.split(' ').join('.')
    var clips = document.querySelectorAll(`.${className} .clip`)
    Array.prototype.slice.call(clips).forEach((clip) => {
      clip.classList.remove('active')
    })
    clips[selectedClip].classList.add('active')
  }
}
