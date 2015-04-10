import React from 'react'
import Track from '../Track'

require('./style.sass')

export default class Grid extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const tracks = this.props.tracks.map((track, i) => {
      return <Track {...this.props} key={i} index={i} />
    })
    return <div className="Grid">
      {tracks}
    </div>
  }
}

Grid.propTypes = {
  cols: React.PropTypes.number,
  rows: React.PropTypes.number,
}
