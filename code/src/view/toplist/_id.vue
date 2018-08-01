<template>
  <div id="toplist-detail">
    <header v-if="data.topinfo">
      <span class="back" @click="$router.back()"></span>
      <span class="title" ref="title">{{ data.topinfo.ListName }}</span>
    </header>
    <div class="cover" v-if="data.topinfo" ref="cover">
      <div class="wrapper">
        <div class="pic">
          <img :src="data.topinfo.pic_v12" alt="">
        </div>
        <div class="content">
          <p class="title">{{ data.topinfo.ListName }}</p>
          <p v-if="data.day_of_year != '1'">第{{ data.day_of_year ? data.day_of_year + '天' : data.date.slice(-2) + '周'}}</p>
          <p v-if="data.update_time ">{{ data.update_time }} 更新</p>
        </div>
      </div>
      <div class="bg-mask"></div>
      <div class="bg-blur" :style="{'background-image': 'url(' + data.topinfo.pic_v12 + ')' }"></div>
    </div>
    <div class="container" ref="scrollView" v-if="data.topinfo">
      <song :data="song" style="margin-top: 3.2rem" />
      <tab-bar :data="tab" @setActive="setActive" v-if="listId === '201'"
      :class="{'fixed': tabFixed }"/>
      <div class="mv-list">
        <div class="mv-list-item" v-for="(item,index) in mv" :key="index" @click="$router.push('/mv/'+item.info.Fvid)">
          <img v-lazy="{src: item.info.Fpic, error: require('../../assets/img/mv.png'), loading: require('../../assets/img/mv.png')}" alt="">
          <div class="mask">
            <span class="rank">{{ index + 1 }}</span>
            <span class="score">{{ item.score }}</span>
            <p class="title">{{ item.info.Fmv_title }} - {{ item.singers.map(item => item.name).join(' / ') }}</p>
          </div>
        </div>
      </div>
    </div>
    <loading v-show="loading" />
  </div>
</template>

<script>
import API from '@/api'
import loading from '@/components/loading'
import song from '@/components/song'
import tabBar from '@/components/tabBar'

export default {
  components: {
    loading,
    song,
    tabBar
  },
  data () {
    return {
      data: {},
      loading: true,
      mv: [],
      tab: [
        { name: '总榜', active: 'all' },
        { name: '内地', active: 'mainland' },
        { name: '港台', active: 'hktw' },
        { name: '欧美', active: 'euus' },
        { name: '韩国', active: 'kr' },
        { name: '日本', active: 'jp' }
      ],
      tabFixed: false
    }
  },
  computed: {
    song () {
      return this.data.songlist && this.data.songlist.map(item => {
        return {
          id: item.data.songid,
          mid: item.data.songmid,
          title: item.data.songname,
          singer: item.data.singer,
          album: {
            mid: item.data.albummid,
            title: item.data.albumname
          },
          mv: {
            vid: item.data.vid
          }
        }
      })
    },
    listId () {
      return this.$route.params.id
    }
  },
  methods: {
    loadMVToplist (type) {
      this.loading = true
      this.mv = []
      this.$jsonp(API.GET_MV_TOPLIST, {
        listtype: type,
        callbackName: 'get_mv_toplist'
      }).then(data => {
        this.mv = data.data.list
        this.loading = false
      })
    },
    setActive (type) {
      this.loadMVToplist(type)
    }
  },
  mounted () {
    this.loading = true
    this.$jsonp(API.GET_TOPLIST_INFO, {
      topid: this.listId,
      callbackName: 'get_toplist_info'
    }).then(data => {
      this.data = data
      this.loading = false
      this.$nextTick(() => {
        let total = 3.2 * parseFloat(document.documentElement.style.fontSize)
        let elem = this.$refs['scrollView']
        elem.addEventListener('scroll', () => {
          let top = elem.scrollTop
          if (top <= total) {
            this.$refs['title'].style.opacity = (top / total).toFixed(1)
            this.tabFixed = false
          } else {
            this.$refs['title'].style.opacity = 1
            this.tabFixed = true
          }
          this.$refs['cover'].style.zIndex = top === 0 ? 0 : -1
        })
      })
    })
    if (this.listId === '201') {
      this.loadMVToplist('all')
    }
  }
}
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
    top: .8rem;
    z-index: 1;
  }
  #toplist-detail {
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
          }
        }
      }
    }
  }
  .mv-list {
    width: 100%;
    background: #fff;
    .mv-list-item {
      width: 100%;
      height: 4.22rem;
      position: relative;
      margin-bottom: .1rem;
      img {
        width: 100%;
        height: 100%;
      }
      .mask {
        width: 100%;
        position: absolute;
        bottom: 0;
        background: linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,.4));
        color: #eee;
        padding-bottom: .2rem;
        .rank {
          font-size: 2em;
          margin-left: .2rem;
        }
        .score {
          color: #000;
          background: #ccc;
          font-size: .9em;
          padding: 0 .1rem;
        }
        .title {
          padding-left: .2rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
</style>
