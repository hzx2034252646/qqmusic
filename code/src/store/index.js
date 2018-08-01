import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/api'

Vue.use(Vuex)

var lyric = {}

const state = {
  player: {
    visible: false,
    playing: false,
    type: 0,
    audio: '',
    lyric: [],
    tlyric: [],
    list: false,
    singer: false,
    option: false,
    music: []
  },
  song: {}
}

const mutations = {

}

const actions = {
  GET_LYRIC ({ state }, str) {
    lyric = {}
    let lyric_arr = str.replace(/\[([a-z]*):.*]/g, '').split(/\n/g).filter(item => !!item)
    lyric_arr.forEach(item => {
      if (item.match(/\d*:\d*\.\d*/)) {
        let arr = item.match(/\d*:\d*\.\d*/)[0].split(/[:.]/g).map(item => parseInt(item))
        let time = (arr[0] * 60 + arr[1] + arr[2] / 1000).toFixed(1)
        let content = item.split(/\d*]/)[1]
        if (content !== '' && content !== ' ') {
          content = content === '//' ? '' : content
          lyric[time] = content
        }
      }
    })
  },
  PLAY_MUSIC ({ state, dispatch }, song) {
    state.song = song
    document.getElementById('audio').pause()
    Vue.jsonp(API.GET_SONG_DETAIL, {
      types: 'url',
      id: song.mid
    }).then(data => {
      state.player.audio = data.url
    })
    Vue.jsonp(API.GET_SONG_DETAIL, {
      types: 'lyric',
      id: song.mid
    }).then(data => {
      dispatch('GET_LYRIC', data.lyric)
      state.player.lyric = lyric
      if (data.tlyric) {
        dispatch('GET_LYRIC', data.tlyric)
        state.player.tlyric = lyric
      } else {
        state.player.tlyric = []
      }
    })
    let arr = JSON.parse(localStorage.getItem('music')) || []
    let index = arr.findIndex(item => item.mid === song.mid)
    if (index === -1) {
      arr.unshift(song)
    }
    state.player.music = arr
    localStorage.setItem('music', JSON.stringify(arr))
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
