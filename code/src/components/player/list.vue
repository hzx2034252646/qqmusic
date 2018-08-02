<template>
  <transition name="playlist" @enter="enter">
    <div id="playlist" v-show="player.list" @click.self="player.list = false">
      <div class="playlist">
        <div class="top">
          <div class="control" @click="setPlayerType">
            <span class="icon" :class="['single_loop','list_loop',
            'random_play'][player.type]"></span>
            <span>{{ ['单曲循环','列表循环','随机播放'][player.type] }}</span>
          </div>
          <span class="delete" @click="deleteAll"></span>
        </div>
        <div class="container" ref="container">
          <div class="list">
            <div class="list-item" v-for="(item,index) in player.music" :key="index"
            :class="{'active': item.mid == $store.state.song.mid }" @click="PLAY_MUSIC(item)">
              <p>{{ item.title }} - {{ item.singer.map(item => item.title || item.name).join('、')}}</p>
              <span class="delete" @click.stop="deleteMusic(index)"></span>
            </div>
          </div>
        </div>
        <div class="bottom" @click="player.list = false">关闭</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    ...mapActions(['PLAY_MUSIC']),
    enter () {
      // eslint-disable-next-line
      let elem = $('.container').find('.active')
      if (elem[0]) {
        this.$refs['container'].scrollTop = this.$refs['container'].scrollTop + elem.position().top - elem.height()
      }
    },
    setPlayerType () {
      if (this.player.type === 2) {
        this.player.type = 0
      } else {
        this.player.type++
      }
    },
    deleteMusic (index) {
      this.player.music.splice(index, 1)
      if (this.player.music.length === 0) {
        this.deleteAll()
      } else {
        localStorage.setItem('qmusic', JSON.stringify(this.player.music))
      }
    },
    deleteAll () {
      this.player.visible = false
      this.player.list = false
      this.player.music = []
      this.$store.state.song = {}
      this.player.audio = ''
      localStorage.setItem('qmusic', JSON.stringify(this.player.music))
    }
  }
}
</script>

<style lang="scss" scoped>
  .playlist-enter-active {
    animation: slideInUp 0.5s;
  }
  .playlist-leave-active {
    animation: slideOutDown 0.5s;
  }
  #playlist {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 101;
  }
  .playlist {
    width: 100%;
    height: 60%;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.9);
    display: flex;
    flex-direction: column;
    color: #fff;
    .delete {
      width: .5rem;
      height: .5rem;
      float: right;
      background-image: url('../../assets/img/delete.png');
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: .25rem;
      margin-right: .2rem;
    }
    .top {
      height: 1rem;
      border-bottom: 1px solid #333;
      .control {
        height: 100%;
        display: inline-block;
        line-height: 1rem;
        span {
          vertical-align: middle;
        }
        .icon {
          width: .5rem;
          height: .5rem;
          display: inline-block;
          margin-left: .3rem;
          margin-right: .1rem;
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
      }
    }
    .container {
      flex: 1;
      overflow: auto;
      .list {
        .list-item {
          width: 100%;
          height: 1rem;
          border-bottom: 1px solid #333;
          p {
            width: 6rem;
            font-size: 1.1em;
            line-height: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            float: left;
            padding-left: .2rem;
          }
          &.active {
            color: #31c27c;
          }
        }
      }
    }
    .bottom {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-top: 1px solid #333;
    }
  }
</style>
