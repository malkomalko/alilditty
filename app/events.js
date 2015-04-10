import EventEmitter from 'events'

export const EventNames = {
  SELECTED_TRACK: 'selectedTrack',

  STATE_SELECTED_TRACK: 'state:selectedTrack',
}

export class Events extends EventEmitter {
  constructor() {
    super()

    this.setupEvents()
  }
  setupEvents() {
    this.on(EventNames.SELECTED_TRACK, (index) => {
      this.emit(EventNames.STATE_SELECTED_TRACK, index)
    })
  }
}
