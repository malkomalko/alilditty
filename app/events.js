import EventEmitter from 'events'

export const EventNames = {
  ARM_RECORD: 'armRecord',
  CLIP_CHANGE: 'clipChange',
  METRO_CHANGE: 'metroChange',
  MIXER_LEVEL_CHANGE_FOR_TRACK: 'mixerLevelChangeForTrack',
  PLAY_CLIP_FOR_TRACK: 'playClipForTrack',
  PLAY_NOTE_FOR_TRACK: 'playNoteForTrack',
  RECORD_CHANGE: 'recordChange',
  RECORD_NOTE: 'recordNote',
  SELECTED_TRACK: 'selectedTrack',

  STATE_ARM_RECORD: 'state:armRecord',
  STATE_CLIP_CHANGE: 'state:clipChange',
  STATE_METRO_CHANGE: 'state:metroChange',
  STATE_RECORD_CHANGE: 'state:recordChange',
  STATE_RECORD_NOTE: 'state:recordNote',
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
    triggerStateEvent(this, 'ARM_RECORD')
    triggerStateEvent(this, 'CLIP_CHANGE')
    triggerStateEvent(this, 'METRO_CHANGE')
    triggerStateEvent(this, 'RECORD_CHANGE')
    triggerStateEvent(this, 'RECORD_NOTE')
    triggerStateEvent(this, 'SELECTED_TRACK')

    this.on(EventNames.PLAY_CLIP_FOR_TRACK, (payload) => {
      this.emit(`track:${payload.index}:playClip`, payload)
    })

    this.on(EventNames.MIXER_LEVEL_CHANGE_FOR_TRACK, (payload) => {
      this.emit(`track:${payload.index}:levelChange`, payload)
    })

    this.on(EventNames.PLAY_NOTE_FOR_TRACK, (payload) => {
      this.emit(`track:${payload.index}:playNote`, payload)
    })
  }
}
