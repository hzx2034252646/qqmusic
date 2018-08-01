<template>
  <div id="app">
    <keep-alive include="home">
      <router-view class="page"/>
    </keep-alive>
    <player />
    <player-bar />
    <player-list />
    <player-singer />
    <player-option />
  </div>
</template>

<script>
import playerBar from '@/components/player/bar'
import player from '@/components/player/index'
import playerList from '@/components/player/list'
import playerSinger from '@/components/player/singer'
import playerOption from '@/components/player/option'

export default {
  components: {
    playerBar,
    player,
    playerList,
    playerSinger,
    playerOption
  },
  methods: {
    switchSize () {
      let devicePixelRatio = window.devicePixelRatio
      let dpr
      if (devicePixelRatio >= 3) {
        dpr = 3
      } else if (devicePixelRatio >= 2) {
        dpr = 2
      } else {
        dpr = 1
      }
      let scale = 1 / dpr
      let docEl = document.documentElement
      docEl.setAttribute('data-dpr', dpr)
      let meta = document.querySelector('meta[name=viewport]')
      meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
      let clientWidth = docEl.clientWidth
      docEl.style.fontSize = clientWidth / 7.5 + 'px'
    }
  },
  watch: {
    '$route' () {
      document.getElementById('app').scrollTop = 0
    }
  },
  mounted () {
    this.switchSize()
    window.onresize = this.switchSize
  }
}
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;
    overflow: auto;
    .page:after {
      content: '';
      width: 100%;
      height: 1rem;
      display: block;
    }
  }
</style>
