<template>
  <transition
    name="player" @enter="enter">
    <div id="player" v-show="player.visible">
      <div class="bg-blur" :style="{'background-image': 'url('+ pic +')'}"></div>
      <div class="bg-mask">
        <transition enter-active-class="animated bounceInDown">
          <header v-show="player.visible">
            <span class="down-icon" @click="player.visible = false"></span>
            <div class="title" ref="title">
              <marquee v-if="isTitleScroll">
                <span ref="title_content">{{ song.title }}</span>
              </marquee>
              <span ref="title_content" v-else>{{ song.title }}</span>
            </div>
            <span class="dot-icon" @click="player.option = true">...</span>
          </header>
        </transition>
        <div class="container" v-show="visible" @click="visible=false">
          <transition enter-active-class="animated bounceInDown">
            <div class="singer" v-show="player.visible" @click.stop="showSinger">
              —
              <marquee v-if="isSingerScroll">
                <span ref="singer">{{ singer }}</span>
              </marquee>
              <span ref="singer" v-else>{{ singer }}</span>
              —
            </div>
          </transition>
          <div class="pic">
            <transition enter-active-class="animated rollIn" @after-enter="rotate = true">
              <div class="cover" v-show="player.visible"
              :class="{'rotate-on': rotate && player.playing, 'rotate-off': rotate && !player.playing }">
                <img :src="pic" alt="">
              </div>
            </transition>
          </div>
        </div>
        <div class="lyric-wrapper" ref="lyric" v-show="!visible" @click="visible=true">
          <div class="lyric">
            <p class="lyric-item" v-for="(item,index) in player.lyric" :key="index"
            :class="{'lyric-active': lyric_active == index}" :data-time="index">
              {{ item }}
              <br />
              {{ player.tlyric[index] }}
            </p>
          </div>
        </div>
        <transition enter-active-class="animated bounceInUp">
          <div class="control" v-show="player.visible">
            <div class="progress">
              <span class="time">{{ current_time }}</span>
              <div class="wrapper" @click="setProgress($event)" ref="progress">
                <div class="progressbar">
                  <div class="play-bar" :style="{ width: played_length + 'px' }"></div>
                  <div class="buffer-bar" :style="{ width: buffered_length + 'px' }"></div>
                  <div class="ball" ref="ball" :style="{ left: played_length + 'px' }"></div>
                </div>
              </div>
              <span class="time">{{ total_time }}</span>
            </div>
            <div class="btn">
              <span class="icon" :class="['single_loop','list_loop',
              'random_play'][player.type]" @click="setPlayerType"></span>
              <span class="icon prev" @click="prev"></span>
              <span class="icon" @click="play"
              :class="player.playing ? 'pause' : 'play'"></span>
              <span class="icon next" @click="next"></span>
              <span class="icon list" @click="player.list=true"></span>
            </div>
          </div>
        </transition>
      </div>
      <audio ref="audio" id="audio" :src="player.audio" autoplay loop></audio>
    </div>
  </transition>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  data () {
    return {
      visible: true,
      rotate: false,
      isTitleScroll: false,
      isSingerScroll: false,
      played_length: 0,
      buffered_length: 0,
      current_time: '00:00',
      total_time: '00:00',
      lyric_active: 0
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    song () {
      return this.$store.state.song
    },
    singer () {
      if (this.song.singer) {
        return this.song.singer.map(item => item.title || item.name).join(' / ')
      }
    },
    pic () {
      return this.song.album && 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.song.album.mid + '.jpg'
    }
  },
  methods: {
    enter () {
      this.rotate = false
      this.visible = true
    },
    showSinger () {
      if (this.song.singer.length > 1) {
        this.player.singer = true
      } else {
        this.player.visible = false
        this.$router.push('/artist/' + this.song.singer[0].mid)
      }
    },
    play () {
      let audio = this.$refs['audio']
      if (this.player.playing) {
        audio.pause()
      } else {
        audio.play()
      }
    },
    prev () {
      let music = this.player.music
      let index = music.findIndex(item => item.mid === this.song.mid)
      if (index === 0) {
        index = music.length
      }
      this.$store.dispatch('PLAY_MUSIC', music[index - 1])
    },
    next () {
      let music = this.player.music
      let index = music.findIndex(item => item.mid === this.song.mid)
      if (index === music.length - 1) {
        index = -1
      }
      this.$store.dispatch('PLAY_MUSIC', music[index + 1])
    },
    random () {
      let music = this.player.music
      let index = Math.floor(Math.random() * music.length)
      this.$store.dispatch('PLAY_MUSIC', music[index])
    },
    setPlayerType () {
      if (this.player.type === 2) {
        this.player.type = 0
      } else {
        this.player.type++
      }
    },
    setProgress (ev) {
      let audio = this.$refs['audio']
      let ballWidth = this.$refs['ball'].offsetWidth
      let barLeft = this.$refs['progress'].offsetLeft
      let barWidth = this.$refs['progress'].offsetWidth
      let played_length = ev.clientX - barLeft - ballWidth / 2
      if (played_length < 0) {
        played_length = 0
      } else if (played_length > barWidth) {
        played_length = barWidth
      } else if (this.buffered_length > 0 && played_length > this.buffered_length) {
        played_length = this.buffered_length
      }
      this.played_length = played_length
      audio.currentTime = played_length / barWidth * audio.duration
    },
    moveLyric () {
      let audio = this.$refs['audio']
      let t = audio.currentTime
      let $lyric = this.$refs['lyric']
      let h = $lyric.offsetHeight
      let lyric = this.player.lyric
      let time = Object.keys(lyric)
      let $lyric_active = $lyric.getElementsByClassName('lyric-active')[0]
      for (let i = 0; i < time.length; i++) {
        if ((time[i] <= t && t < time[i + 1] && i < time.length - 1) || (i === time.length - 1 && t >= time[i])) {
          this.lyric_active = time[i]
          let top = $lyric_active && $lyric_active.offsetTop
          let dis = (1 / 2) * h
          // eslint-disable-next-line
          $('.lyric-wrapper').stop().animate({
            scrollTop: top - dis
          }, 200)
          return
        }
      }
    }
  },
  updated () {
    let audio = this.$refs['audio']
    switch (this.player.type) {
      case (0):
        audio.loop = true
        audio.removeEventListener('ended', this.next)
        audio.removeEventListener('ended', this.random)
        break
      case (1):
        audio.loop = false
        audio.removeEventListener('ended', this.random)
        audio.addEventListener('ended', this.next)
        break
      case (2):
        audio.loop = false
        audio.removeEventListener('ended', this.next)
        audio.addEventListener('ended', this.random)
        break
    }
    this.$nextTick(() => {
      this.isTitleScroll = this.$refs['title'].offsetWidth < this.$refs['title_content'].offsetWidth
      this.isSingerScroll = this.$refs['singer'].offsetWidth > window.innerWidth * 0.8
    })
  },
  mounted () {
    let audio = this.$refs['audio']
    audio.addEventListener('timeupdate', () => {
      let barWidth = this.$refs['progress'].offsetWidth
      let timeRanges = audio.buffered
      try {
        var timeBuffered = timeRanges.end(timeRanges.length - 1)
      } catch (err) {}
      this.played_length = audio.currentTime / audio.duration * barWidth
      this.buffered_length = timeBuffered / audio.duration * barWidth
      this.current_time = formatTime(audio.currentTime)
      this.total_time = formatTime(audio.duration)
      this.player.playing = !audio.paused
    })
    audio.addEventListener('timeupdate', this.moveLyric)
    let timeout = null
    // eslint-disable-next-line
    $('.lyric-wrapper').scroll(() => {
      if (timeout != null) {
        clearTimeout(timeout)
      }
      audio.removeEventListener('timeupdate', this.moveLyric)
      timeout = setTimeout(() => {
        audio.addEventListener('timeupdate', this.moveLyric)
      }, 1000)
    })
  }
}
</script>

<style lang="scss" scoped>
  .player-enter-active {
    animation: slideInUp 0.5s;
  }
  .player-leave-active {
    animation: slideOutDown 0.5s;
  }
  #player {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 100;
    background: rgb(152, 180, 211);
    color: #eee;
    overflow: hidden;
    .bg-blur {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 100;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(30px);
      opacity: .6;
      transform: translateZ(0)
    }
    .bg-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 100;
      background: rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
    }
    header {
      width: 100%;
      height: .8rem;
      display: flex;
      align-items: center;
      .down-icon {
        width: .5rem;
        height: .5rem;
        display: inline-block;
        background-image: url('../../assets/img/down.png');
        background-repeat: no-repeat;
        background-size: contain;
        margin: 0 .2rem;
      }
      .title {
        width: 5.5rem;
        font-size: 1.2em;
        text-align: center;
        white-space: nowrap;
      }
      .dot-icon {
        font-size: 2.5em;
        display: inline-block;
        height: .5rem;
        line-height: .1rem;
        margin: 0 .2rem;
      }
    }
    .container {
      flex: 2;
      display: flex;
      flex-direction: column;
      .singer {
        text-align: center;
        font-size: 1.1em;
        margin: .2rem 0;
        marquee {
          width: 80%;
          vertical-align: middle;
        }
      }
      .pic {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .cover {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: .1rem solid #333;
          img {
            width: 100%;
          }
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          &.rotate-on {
            animation: rotate 20s linear infinite running;
          }
          &.rotate-off {
            animation: rotate 20s linear infinite paused;
          }
        }
      }
    }
    .lyric-wrapper {
      flex: 2;
      overflow: auto;
      .lyric {
        color: #ddd;
        text-align: center;
        font-size: 1.1em;
        .lyric-item {
          line-height: 1.8em;
          margin: .4rem 0;
          &.lyric-active {
            color: #31c27c;
          }
        }
      }
    }
    .control {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .progress {
        height: .5rem;
        color: #ddd;
        display: flex;
        align-items: center;
        .time {
          padding-left: .5rem;
          padding-right: .5rem;
        }
        .wrapper {
          flex: 1;
          .progressbar {
            width: 100%;
            height: .05rem;
            background: #aaa;
            position: relative;
            .play-bar {
              width: 0;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              background: #31c27c;
            }
            .buffer-bar {
              width: 0;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              background: #ccc;
            }
            .ball {
              width: .3rem;
              height: .3rem;
              border-radius: 50%;
              background: #eee;
              position: absolute;
              left: 0;
              top: -.13rem;
              z-index: 3;
            }
          }
        }
      }
      .btn {
        height: 1.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
          width: .6rem;
          height: .6rem;
          display: inline-block;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .single_loop {
          background-image: url('../../assets/img/single_loop.png');
        }
        .list_loop {
          background-image: url('../../assets/img/list_loop.png');
        }
        .random_play {
          background-image: url('../../assets/img/random_play.png');
        }
        .prev {
          width: .8rem;
          height: .8rem;
          background-image: url('../../assets/img/prev.png');
        }
        .play {
          width: 1.1rem;
          height: 1.1rem;
          background-image: url('../../assets/img/play.png');
        }
        .pause {
          width: 1.1rem;
          height: 1.1rem;
          background-image: url('../../assets/img/pause.png');
        }
        .next {
          width: .8rem;
          height: .8rem;
          background-image: url('../../assets/img/next.png');
        }
        .list {
          background-image: url('../../assets/img/list.png');
        }
      }
    }
  }
</style>
