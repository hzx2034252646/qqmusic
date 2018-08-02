<template>
  <div id="playerBar" @click="song.mid && (player.visible = true)">
    <div class="wrapper">
      <div class="cover">
        <img :src="pic" alt="">
      </div>
      <div class="content">
        <p class="title">{{ song.title }}</p>
        <p class="singer">{{ singer }}</p>
        <p class="default" v-if="!song.mid">QQ音乐 听我想听的歌</p>
      </div>
    </div>
    <div class="control">
      <div class="circle" @click.stop="play">
        <span :class="player.playing ? 'pause-icon' : 'play-icon'"></span>
      </div>
      <span class="play-list-icon" @click.stop="song.mid && (player.list = true)"></span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.state.player
    },
    song () {
      return this.$store.state.song
    },
    singer () {
      return this.song.singer && this.song.singer.map(item => item.title || item.name).join('、')
    },
    pic () {
      if (this.song.album) {
        return 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + this.song.album.mid + '.jpg'
      } else {
        return require('@/assets/img/music.png')
      }
    }
  },
  methods: {
    play () {
      let audio = document.getElementById('audio')
      if (!this.player.audio) {
        return
      }
      if (this.player.playing) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  },
  mounted () {
    let arr = JSON.parse(localStorage.getItem('qmusic')) || []
    arr[0] && this.$store.dispatch('PLAY_MUSIC', arr[0])
  }
}
</script>

<style lang="scss" scoped>
  #playerBar {
    width: 100%;
    height: 1rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 99;
    display: flex;
    border-top: 1px solid #ddd;
    .wrapper {
      flex: 2;
      display: flex;
      .cover {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        overflow: hidden;
        margin: .1rem .2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        width: 4rem;
        padding-top: .1rem;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.5em;
          &.title {
            color: #000;
          }
          &.singer {
            color: #31c27c;
            font-size: .9em;
          }
          &.default {
            color: #000;
            margin-top: .2rem;
          }
        }
      }
    }
    .control {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .circle {
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
        border: 3px solid #31c27c;
        display: inline-block;
        span {
          width: .4rem;
          height: .4rem;
          display: inline-block;
          background-size: contain;
          background-repeat: no-repeat;
          margin-top: .1rem;
        }
        .play-icon {
          background-image: url('../../assets/img/play_icon.png');
          margin-left: .13rem;
        }
        .pause-icon {
          background-image: url('../../assets/img/pause_icon.png');
          margin-left: .1rem;
        }
      }
      .play-list-icon {
        width: .6rem;
        height: .6rem;
        display: inline-block;
        background-image: url('../../assets/img/list_icon.png');
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
</style>
