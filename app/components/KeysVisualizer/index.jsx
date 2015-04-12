import React from 'react'
import {Events, EventNames} from '../../events'

require('./style.sass')

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
      var keysForRow = keyRow.map((key) => {
        return <div className='key ' key={key} ref={key}>
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

  }
  componentDidMount() {
    // called once after initial render => React.findDOMNode(this)
    this.animateUp()
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
  animateUp() {
    setTimeout(() => {
      React.findDOMNode(this).style.bottom = '100px'
    }, 300)
  }
}
