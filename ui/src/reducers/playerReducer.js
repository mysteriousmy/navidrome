import { v4 as uuidv4 } from 'uuid'
import subsonic from '../subsonic'
import {
  PLAYER_ADD_TRACKS,
  PLAYER_CLEAR_QUEUE,
  PLAYER_CURRENT,
  PLAYER_PLAY_NEXT,
  PLAYER_PLAY_TRACKS,
  PLAYER_SET_TRACK,
  PLAYER_SET_VOLUME,
  PLAYER_SYNC_QUEUE,
} from '../actions'
import config from '../config'

const initialState = {
  queue: [],
  current: {},
  clear: false,
  volume: config.defaultUIVolume / 100,
  savedPlayIndex: 0,
}

const mapToAudioLists = (item) => {
  // If item comes from a playlist, trackId is mediaFileId
  const trackId = item.mediaFileId || item.id
  const { lyrics } = item
  const timestampRegex =
    /(\[([0-9]{1,2}:)?([0-9]{1,2}:)([0-9]{1,2})(\.[0-9]{1,2})?\])/g
  return {
    trackId,
    uuid: uuidv4(),
    song: item,
    name: item.title,
    lyric: timestampRegex.test(lyrics) ? lyrics : '',
    singer: item.artist,
    duration: item.duration,
    musicSrc: subsonic.streamUrl(trackId),
    cover: subsonic.getCoverArtUrl(
      {
        coverArtId: config.devFastAccessCoverArt ? item.albumId : trackId,
        updatedAt: item.updatedAt,
      },
      300
    ),
  }
}

const reduceClearQueue = () => ({ ...initialState, clear: true })

const reducePlayTracks = (state, { data, id }) => {
  let playIndex = 0
  const queue = Object.keys(data).map((key, idx) => {
    if (key === id) {
      playIndex = idx
    }
    return mapToAudioLists(data[key])
  })
  return {
    ...state,
    queue,
    playIndex,
    clear: true,
  }
}

const reduceSetTrack = (state, { data }) => {
  return {
    ...state,
    queue: [mapToAudioLists(data)],
    playIndex: 0,
    clear: true,
  }
}

const reduceAddTracks = (state, { data }) => {
  const queue = state.queue
  Object.keys(data).forEach((id) => {
    queue.push(mapToAudioLists(data[id]))
  })
  return { ...state, queue, clear: false }
}

const reducePlayNext = (state, { data }) => {
  const newQueue = []
  const current = state.current || {}
  let foundPos = false
  state.queue.forEach((item) => {
    newQueue.push(item)
    if (item.uuid === current.uuid) {
      foundPos = true
      Object.keys(data).forEach((id) => {
        newQueue.push(mapToAudioLists(data[id]))
      })
    }
  })
  if (!foundPos) {
    Object.keys(data).forEach((id) => {
      newQueue.push(mapToAudioLists(data[id]))
    })
  }

  return {
    ...state,
    queue: newQueue,
    clear: true,
  }
}

const reduceSetVolume = (state, { data: { volume } }) => {
  return {
    ...state,
    volume,
  }
}

const reduceSyncQueue = (state, { data: { audioInfo, audioLists } }) => {
  return {
    ...state,
    queue: audioLists,
    clear: false,
    playIndex: undefined,
  }
}

const reduceCurrent = (state, { data }) => {
  const current = data.ended ? {} : data
  const savedPlayIndex = state.queue.findIndex(
    (item) => item.uuid === current.uuid
  )
  return {
    ...state,
    current,
    playIndex: undefined,
    savedPlayIndex,
    volume: data.volume,
  }
}

export const playerReducer = (previousState = initialState, payload) => {
  const { type } = payload
  switch (type) {
    case PLAYER_CLEAR_QUEUE:
      return reduceClearQueue()
    case PLAYER_PLAY_TRACKS:
      return reducePlayTracks(previousState, payload)
    case PLAYER_SET_TRACK:
      return reduceSetTrack(previousState, payload)
    case PLAYER_ADD_TRACKS:
      return reduceAddTracks(previousState, payload)
    case PLAYER_PLAY_NEXT:
      return reducePlayNext(previousState, payload)
    case PLAYER_SET_VOLUME:
      return reduceSetVolume(previousState, payload)
    case PLAYER_SYNC_QUEUE:
      return reduceSyncQueue(previousState, payload)
    case PLAYER_CURRENT:
      return reduceCurrent(previousState, payload)
    default:
      return previousState
  }
}
