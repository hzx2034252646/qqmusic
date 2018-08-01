<template>
  <transition name="singer">
    <div id="singer" v-show="player.singer" @click.self="player.singer = false">
      <div class="singer">
        <div class="top">查看歌手</div>
        <div class="container">
          <div class="list" v-if="player.singer">
            <div class="list-item" v-for="(item,index) in song.singer" :key="index"
            @click="loadSingerDetail(item.mid)">
              <img v-lazy="{src: singer_pic(item.mid), error: require('../../assets/img/person.png'), loading: require('../../assets/img/person.png')}" alt="">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div class="bottom" @click="player.singer = false">关闭</div>
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
    singer_pic (value) {
      return 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + value + '.jpg'
    },
    loadSingerDetail (id) {
      this.player.visible = false
      this.player.singer = false
      this.$router.push('/artist/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer-enter-active {
    animation: slideInUp 0.5s;
  }
  .singer-leave-active {
    animation: slideOutDown 0.5s;
  }
  #singer {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 101;
  }
  .singer {
    width: 100%;
    max-height: 60%;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.9);
    display: flex;
    flex-direction: column;
    color: #fff;
    .top {
      height: 1rem;
      border-bottom: 1px solid #333;
      line-height: 1rem;
      text-align: center;
    }
    .container {
      flex: 1;
      overflow: auto;
      .list {
        .list-item {
          width: 100%;
          height: 1.3rem;
          border-bottom: 1px solid #333;
          display: flex;
          align-items: center;
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-left: .3rem;
          }
          p {
            width: 5.5rem;
            font-size: 1.1em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: .3rem;
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
