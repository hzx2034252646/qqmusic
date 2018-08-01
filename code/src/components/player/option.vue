<template>
  <transition name="playerOption">
    <div id="playerOption" v-show="player.option" @click.self="player.option = false">
      <div class="playerOption">
        <div class="container">
          <div class="list">
            <div class="list-item" @click="showSinger">
              <div class="icon">
                <img src="../../assets/img/user.png" alt="">
              </div>
              <p>查看歌手</p>
            </div>
            <div class="list-item" @click="showAlbum">
              <div class="icon">
                <img src="../../assets/img/album.png" alt="">
              </div>
              <p>查看专辑</p>
            </div>
            <div class="list-item" @click="showComment">
              <div class="icon">
                <img src="../../assets/img/comment.png" alt="">
              </div>
              <p>查看评论</p>
            </div>
            <div class="list-item" @click="showMV" v-show="song.mv && song.mv.vid">
              <div class="icon">
                <img src="../../assets/img/mv_icon.png" alt="">
              </div>
              <p>播放MV</p>
            </div>
          </div>
        </div>
        <div class="bottom" @click="player.option = false">关闭</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.state.player
    },
    song () {
      return this.$store.state.song
    }
  },
  methods: {
    showSinger () {
      this.player.option = false
      if (this.song.singer.length > 1) {
        this.player.singer = true
      } else {
        this.player.visible = false
        this.$router.push('/artist/' + this.song.singer[0].mid)
      }
    },
    showAlbum () {
      this.player.option = false
      this.player.visible = false
      this.$router.push('/album/' + this.song.album.mid)
    },
    showComment () {
      this.player.option = false
      this.player.visible = false
      this.$router.push('/comment/' + this.song.id + '?type=song')
    },
    showMV () {
      this.player.option = false
      this.player.visible = false
      this.$router.push('/mv/' + this.song.mv.vid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .playerOption-enter-active {
    animation: slideInUp 0.5s;
  }
  .playerOption-leave-active {
    animation: slideOutDown 0.5s;
  }
  #playerOption {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 101;
  }
  .playerOption {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.9);
    display: flex;
    flex-direction: column;
    color: #fff;
    .container {
      flex: 1;
      .list {
        display: -webkit-box;
        .list-item {
          width: 1.3rem;
          border-bottom: 1px solid #333;
          text-align: center;
          font-size: 1.1em;
          padding: .3rem 0;
          margin-left: .45rem;
          .icon {
            width: 1.3rem;
            height: 1.3rem;
            background: rgba(255,255,255,.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: .2rem;
            img {
              width: 1rem;
              height: 1rem;
            }
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
