<template>
  <div id="video">
    <div class="cover" v-if="visible">
      <img :src="data.cover" alt="">
      <div class="mask">
        <span class="play-btn" @click="videoVisible = true"></span>
      </div>
    </div>
    <div class="video" v-if="videoVisible">
      <video :src="videoUrl[quality]" autoplay ref="video" @click="showControl" webkit-playsinline></video>
      <div class="mask" v-show="maskVisible" @click="showControl">
        <span :class="playing ? 'pause-btn' : 'play-btn'" @click.stop="play"></span>
        <div class="control">
          <span class="time">{{ current_time }}</span>
          <div class="wrapper" ref="progress" @click="setProgress($event)">
            <div class="progress">
              <div class="play-bar" :style="{ width: played_length + 'px' }"></div>
              <div class="buffer-bar" :style="{ width: buffered_length + 'px' }"></div>
              <div class="ball" ref="ball" :style="{ left: played_length + 'px' }"></div>
            </div>
          </div>
          <span class="time">{{ total_time }}</span>
          <span class="text" @click="qualityVisible = true">{{ quality | quality_filter }}</span>
          <span class="fullscreen" @click="fullScreen"></span>
        </div>
      </div>
      <transition enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight">
        <div class="quality" v-show="qualityVisible" @click="qualityVisible = false">
          <div class="quality-wrapper">
            <ul class="quality-list">
              <li class="quality-item" :class="{'active': quality === '1080'}"
              @click="quality='1080'">蓝光 1080p</li>
              <li class="quality-item" :class="{'active': quality === '720'}"
              @click="quality='720'">超清 720p</li>
              <li class="quality-item" :class="{'active': quality === '480'}"
              @click="quality='480'">高清 480p</li>
              <li class="quality-item" :class="{'active': quality === '360'}"
              @click="quality='360'">标清 360p</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  props: ['data'],
  data () {
    return {
      visible: true,
      maskVisible: true,
      videoVisible: false,
      playing: false,
      played_length: 0,
      buffered_length: 0,
      current_time: '00:00',
      total_time: '00:00',
      timeout: null,
      quality: '480',
      qualityVisible: false
    }
  },
  computed: {
    videoUrl () {
      let mv_url = this.data.mv_url
      return {
        '360': mv_url[1].url[0] + mv_url[1].cn + '?vkey=' + mv_url[1].vkey,
        '480': mv_url[2].url[0] + mv_url[2].cn + '?vkey=' + mv_url[2].vkey,
        '720': mv_url[3].url[0] + mv_url[3].cn + '?vkey=' + mv_url[3].vkey,
        '1080': mv_url[4].url[0] + mv_url[4].cn + '?vkey=' + mv_url[4].vkey
      }
    }
  },
  filters: {
    quality_filter (value) {
      switch (value) {
        case '360':
          return '标清'
        case '480':
          return '高清'
        case '720':
          return '超清'
        case '1080':
          return '蓝光'
      }
    }
  },
  methods: {
    play () {
      let video = this.$refs['video']
      if (this.playing) {
        video.pause()
        clearTimeout(this.timeout)
      } else {
        video.play()
        this.maskVisible = false
      }
    },
    showControl () {
      this.maskVisible = true
      if (!this.playing) {
        return
      }
      if (this.timeout != null) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.maskVisible = false
      }, 3000)
    },
    fullScreen () {
      this.$refs['video'].webkitRequestFullScreen()
    },
    progress () {
      let video = this.$refs['video']
      let barWidth = this.$refs['progress'].offsetWidth
      let timeRanges = video.buffered
      try {
        var timeBuffered = timeRanges.end(timeRanges.length - 1)
      } catch (err) {}
      this.played_length = video.currentTime / video.duration * barWidth
      this.buffered_length = timeBuffered / video.duration * barWidth
      this.current_time = formatTime(video.currentTime)
      this.total_time = formatTime(video.duration)
      this.playing = !video.paused
    },
    setProgress (ev) {
      let video = this.$refs['video']
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
      video.currentTime = played_length / barWidth * video.duration
    }
  },
  watch: {
    videoVisible (value) {
      if (value) {
        this.$nextTick(() => {
          let video = this.$refs['video']
          video.addEventListener('canplay', () => {
            this.visible = false
            this.maskVisible = false
          })
          video.addEventListener('error', () => {
            this.visible = true
            this.videoVisible = false
            this.quality = '480'
          })
          video.addEventListener('timeupdate', this.progress)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #video {
    width: 100%;
    height: 4.22rem;
    overflow: hidden;
    position: relative;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .play-btn {
      width: .7rem;
      height: .7rem;
      background-image: url('../../assets/img/play_btn.svg');
      background-size: contain;
    }
    .pause-btn {
      width: .7rem;
      height: .7rem;
      background-image: url('../../assets/img/pause_btn.svg');
      background-size: contain;
    }
    .control {
      width: 100%;
      height: .5rem;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: .15rem;
      left: 0;
      .time {
        padding-left: .2rem;
        padding-right: .2rem;
        font-size: .85em;
        color: #ccc;
      }
      .wrapper {
        flex: 1;
        .progress {
          width: 100%;
          height: .03rem;
          background: #aaa;
          position: relative;
          .play-bar {
            width: 50%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            background: #31c27c;
          }
          .buffer-bar {
            width: 80%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background: #ccc;
          }
          .ball {
            width: .25rem;
            height: .25rem;
            border-radius: 50%;
            background: #31c27c;
            position: absolute;
            left: 0;
            top: -.11rem;
            z-index: 3;
          }
        }
      }
      .text {
        color: #31c27c;
        padding: 0 .1rem;
      }
      .fullscreen {
        width: .5rem;
        height: .5rem;
        display: inline-block;
        background-image: url('../../assets/img/fullscreen.svg');
        background-size: contain;
        margin: 0 .2rem;
      }
    }
  }
  .cover {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
  .video {
    width: 100%;
    height: 100%;
    video {
      width: 100%;
      height: 100%;
    }
    .quality {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      .quality-wrapper {
        width: 3rem;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background: rgba(0, 0, 0, .7);
        display: flex;
        justify-content: center;
        align-items: center;
        .quality-list {
          color: #eee;
          .quality-item {
            padding: .1rem .3rem;
            margin-top: .2rem;
            &.active {
              border: 1px solid #31c27c;
              border-radius: 99px;
              color: #31c27c;
            }
          }
        }
      }
    }
  }
</style>
