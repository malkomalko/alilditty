import EventEmitter from 'events'

export const EventNames = {
  CLIP_CHANGE: 'clipChange',
  PLAY_NOTE_FOR_TRACK: 'playNoteForTrack',
  RECORD_CHANGE: 'recordChange',
  SELECTED_TRACK: 'selectedTrack',

  STATE_CLIP_CHANGE: 'state:clipChange',
  STATE_RECORD_CHANGE: 'state:recordChange',
  STATE_SELECTED_TRACK: 'state:selectedTrack',
}

function triggerStateEvent(self, event) {
  self.on(EventNames[event], (...args) => {
    self.emit(EventNames[`STATE_${event}`], ...args)
  })
}

export class Events extends EventEmitter {
  constructor() {
    super()

    this.setupEvents()
  }
  setupEvents() {
    triggerStateEvent(this, 'CLIP_CHANGE')
    triggerStateEvent(this, 'RECORD_CHANGE')
    triggerStateEvent(this, 'SELECTED_TRACK')

    this.on(EventNames.PLAY_NOTE_FOR_TRACK, (payload) => {
      this.emit(`track:${payload.index}:playNote`, payload)
    })
  }
}
