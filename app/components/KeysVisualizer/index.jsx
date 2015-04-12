import React from 'react'
import {Events, EventNames} from '../../events'

require('./style.sass')

var keyCodes = [
  [81, 87, 69, 82, 84, 89, 85],
  [65, 83, 68, 70, 71, 72, 74],
  [90, 88, 67, 86, 66, 78, 77],
]

var keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

export default class KeysVisualizer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setupEvents()
  }
  render() {
    var renderedKeys = keys.map((keyRow, row) => {
      var keyForRow = `row-${row}`
      var keysForRow = keyRow.map((key, index) => {
        return <div className='key ' key={key} ref={keyCodes[row][index]}>
          <p>{key}</p>
        </div>
      })
      return <div className='keyRow' key={keyForRow} ref={keyForRow}>
        {keysForRow}
      </div>
    })
    return <div className="KeysVisualizer">
      {renderedKeys}
    </div>
  }
  setupEvents() {
    var index = this.props.index

    this.onPlayNote = (payload) => {
      var ref = this.refs[payload.e.keyCode]
      var el = ref.getDOMNode()
      if (payload.e.type === 'keydown') {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    }

    this.props.events.on(`track:${index}:playNote`, this.onPlayNote)
  }
  componentDidMount() {
    this.animateUp()
  }
  componentWillReceiveProps(nextProps) {
    // use to set state before a render when props change
  }
  componentDidUpdate(prevProps, prevState) {
    // make dom updates
  }
  componentWillUnmount() {
    var index = this.props.index
    this.props.events.removeListener(`track:${index}:playNote`, this.onPlayNote)
  }
  animateUp() {
    setTimeout(() => {
      React.findDOMNode(this).style.bottom = '100px'
    }, 300)
  }
}
