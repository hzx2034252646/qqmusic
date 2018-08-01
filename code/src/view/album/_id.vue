<template>
  <div id="album-detail">
    <header v-if="data.list">
      <span class="back" @click="$router.back()"></span>
      <span class="title" ref="title">{{ data.name }}</span>
    </header>
    <div class="cover" v-if="data.list" ref="cover">
      <div class="wrapper">
        <div class="pic" @click="showInfo">
          <img :src="cover" alt="">
        </div>
        <div class="content">
          <p class="title">{{ data.name }}</p>
          <p class="singer" @click="$router.push('/artist/'+data.singermid)">
            <img :src="avatar" alt="">
            <span>{{ data.singername }}</span>
          </p>
        </div>
      </div>
      <div class="bg-mask"></div>
      <div class="bg-blur" :style="{'background-image': 'url(' + cover + ')' }"></div>
    </div>
    <div class="container" ref="scrollView" v-if="data.list">
      <song :data="song" :num="true" style="margin-top: 3.2rem" />
      <div class="list-wrapper" v-if="data.otherAlbums.length > 0">
        <div class="list-title">
          该歌手的其他专辑
        </div>
        <div class="list-item" v-for="(item,index) in data.otherAlbums" :key="index" @click="$router.push('/album/'+item.albumMid)">
          <img v-lazy="album_pic(item.albumMid)" alt="">
          <p>{{ item.title }}</p>
        </div>
      </div>
      <comment :data="comment_hot" :title="'最热评论 '+ comment_hot_count" style="padding-top: 1rem;">
        <router-link :to="/comment/ + data.id + '?type=album'">更多</router-link>
      </comment>
      <comment :data="comment_new" :title="'最新评论 '+ comment_new_count" style="padding-top: 1rem;">
        <router-link :to="/comment/ + data.id + '?type=album'">更多</router-link>
      </comment>
    </div>
    <loading v-show="loading" />
    <transition enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight" @enter="$refs['mask'].scrollTop = 0">
      <div class="album_info" v-show="visible" @click="$router.back()">
        <div class="bg-blur" :style="{'background-image': 'url('+ cover +')'}"></div>
        <div class="bg-mask" ref="mask">
          <div class="album_pic">
            <img :src="cover" alt="">
          </div>
          <p class="album_title">
            <span>专辑：</span>
            <span>{{ data.name }}</span>
          </p>
          <p>语种：{{ data.lan }}</p>
          <p>发行时间：{{ data.aDate }}</p>
          <p>唱片公司：{{ data.company }}</p>
          <p v-if="data.genre">流派：{{ data.genre }}</p>
          <p v-html="data.desc && data.desc.replace(/\n/g, '<br>')"></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import API from '@/api'
import loading from '@/components/loading'
import song from '@/components/song'
import comment from '@/components/comment'

export default {
  components: {
    loading,
    song,
    comment
  },
  data () {
    return {
      data: {},
      comment_hot: [],
      comment_new: [],
      comment_hot_count: 0,
      comment_new_count: 0,
      loading: true,
      visible: false
    }
  },
  computed: {
    song () {
      return this.data.list && this.data.list.map(item => {
        return {
          id: item.songid,
          mid: item.songmid,
          title: item.songname,
          singer: item.singer,
          album: {
            mid: item.albummid,
            title: item.albumname
          },
          mv: {
            vid: item.vid
          }
        }
      })
    },
    albumId () {
      return this.$route.params.id
    },
    cover () {
      return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.albumId + '.jpg'
    },
    avatar () {
      return 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + this.data.singermid + '.jpg'
    }
  },
  watch: {
    '$route': 'loadData'
  },
  methods: {
    album_pic (value) {
      return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + value + '.jpg'
    },
    async loadData () {
      this.loading = true
      this.data = {}
      let { data } = await this.$jsonp(API.GET_ALBUM_INFO, {
        albummid: this.albumId,
        callbackName: 'get_album_info'
      })
      this.loading = false
      this.data = data
      let { comment, hot_comment } = await this.$jsonp(API.GET_COMMENT, {
        pagenum: 0,
        cmd: 8,
        topid: data.id,
        biztype: 2
      })
      this.comment_new = comment.commentlist
      this.comment_hot = hot_comment.commentlist
      this.comment_new_count = comment.commenttotal
      this.comment_hot_count = hot_comment.commenttotal
      this.$nextTick(() => {
        let total = 3.2 * parseFloat(document.documentElement.style.fontSize)
        let elem = this.$refs['scrollView']
        elem.addEventListener('scroll', () => {
          let top = elem.scrollTop
          if (top < total) {
            this.$refs['title'].style.opacity = (top / total).toFixed(1)
          } else {
            this.$refs['title'].style.opacity = 1
          }
          this.$refs['cover'].style.zIndex = top === 0 ? 0 : -1
        })
      })
    },
    showInfo () {
      this.visible = true
      history.pushState(null, null, document.URL)
    },
    popstate () {
      this.visible && (this.visible = false)
    }
  },
  mounted () {
    this.loadData()
    window.addEventListener('popstate', this.popstate)
  },
  destroyed () {
    window.removeEventListener('popstate', this.popstate)
  }
}
</script>

<style lang="scss" scoped>
  #album-detail {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &:before {
      content: '';
      height: .8rem;
      display: block;
    }
    .container {
      flex: 1;
      overflow: auto;
    }
  }
  header {
    width: 100%;
    height: .8rem;
    text-align: center;
    line-height: .8rem;
    position: fixed;
    top: 0;
    z-index: 2;
    color: #fff;
    font-size: 1.2em;
    background: transparent;
    .title {
      opacity: 0;
      width: 5rem;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .back {
      width: .5rem;
      height: .5rem;
      display: block;
      position: absolute;
      left: .2rem;
      top: .15rem;
      background-image: url('../../assets/img/back.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .cover {
    width: 100%;
    height: 4rem;
    background: #fff;
    position: fixed;
    top: 0;
    overflow: hidden;
    color: #fff;
    .bg-blur {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: -2;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(40px);
      opacity: .6;
      overflow: hidden;
      transform: translateZ(0)
    }
    .bg-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: -1;
      background: rgba(0,0,0,0.5);
    }
    .wrapper {
      display: flex;
      align-items: center;
      padding: 0 .2rem;
      margin-top: 1rem;
      .pic {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 .2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        flex: 1;
        p {
          margin-bottom: .2rem;
          &.title {
            font-size: 1.2em;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          &.singer {
            img {
              width: .6rem;
              height: .6rem;
              border-radius: 50%;
              margin-right: .1rem;
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
              display: inline-block;
              width: 3rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  .list-wrapper {
    overflow: hidden;
    padding-top: 1rem;
    background: #fff;
    .list-title {
      padding: .3rem .2rem;
      font-size: 1.1em;
    }
    .list-item {
      width: 2.3rem;
      display: inline-block;
      margin-left: .15rem;
      margin-bottom: .3rem;
      vertical-align: top;
      img {
        width: 100%;
      }
      p {
        font-size: .9em;
        line-height: 1.5em;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .album_info {
    width: 100%;
    height: 100%;
    background: rgb(152, 180, 211);
    position: absolute;
    top: 0;
    z-index: 100;
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
      overflow: auto;
    }
    .album_pic {
      width: 4rem;
      height: 4rem;
      margin: 1rem auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      color: #ddd;
      padding: 0 .5rem;
      margin-bottom: .2rem;
      word-wrap: break-word;
      line-height: 1.8em;
      text-align: justify;
      &.album_title {
        display: -webkit-box;
        span {
          display: block;
        }
        span:nth-child(1) {
          width: 1rem;
        }
        span:nth-child(2) {
          width: 5rem;
        }
      }
    }
  }
</style>
