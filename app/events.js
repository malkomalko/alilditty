import EventEmitter from 'events'

export const EventNames = {
  CLIP_CHANGE: 'clipChange',
  PLAY_NOTE_FOR_TRACK: 'playNoteForTrack',
  SELECTED_TRACK: 'selectedTrack',

  STATE_CLIP_CHANGE: 'state:clipChange',
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

    this.on(EventNames.CLIP_CHANGE, (payload) => {
      this.emit(EventNames.STATE_CLIP_CHANGE, payload)
    })

    this.on(EventNames.PLAY_NOTE_FOR_TRACK, (payload) => {
      this.emit(`track:${payload.index}:playNote`, payload)
    })
  }
}
