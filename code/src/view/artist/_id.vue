<template>
  <div id="artist-detail">
    <header ref="header" v-show="artistName">
      <span class="back" @click="$router.back()"></span>
      <span class="title" ref="title">{{ artistName }}</span>
    </header>
    <div class="cover" :style="{'background-image': 'url(' + cover + ')'}"
    v-show="artistName" ref="cover"></div>
    <div class="container" ref="scrollView" v-show="artistName">
      <div style="margin-top: 4.2rem"></div>
      <tab-bar :data="tab" @setActive="setActive" :class="{'fixed': tabFixed }"/>
      <song :data="music" />
      <album :data="album" />
      <mv :data="mv" />
      <div class="desc" v-if="type === 'detail'">
        <p v-html="artistDesc"></p>
      </div>
    </div>
    <loading v-if="!artistName" />
    <loading v-show="loading" style="top: 60%" />
  </div>
</template>

<script>
import API from '@/api'
import loading from '@/components/loading'
import song from '@/components/song'
import album from '@/components/album'
import mv from '@/components/mv/list'
import tabBar from '@/components/tabBar'

export default {
  components: {
    loading,
    song,
    album,
    mv,
    tabBar
  },
  data () {
    return {
      loading: false,
      type: 'music',
      artistName: '',
      artistDesc: '',
      music: [],
      album: [],
      mv: [],
      page: 1,
      tab: [
        { name: '单曲', active: 'music' },
        { name: '专辑', active: 'album' },
        { name: 'MV', active: 'mv' },
        { name: '详情', active: 'detail' }
      ],
      tabFixed: false
    }
  },
  computed: {
    cover () {
      return 'http://y.gtimg.cn/music/photo_new/T001R500x500M000' + this.$route.params.id + '.jpg'
    },
    artistId () {
      return this.$route.params.id
    }
  },
  methods: {
    async setActive (type) {
      this.type = type
      this.page = 1
      this.music = []
      this.album = []
      this.mv = []
      this.loading = true
      switch (type) {
        case 'music':
          await this.loadMusic()
          break
        case 'album':
          await this.loadAlbum()
          break
        case 'mv':
          await this.loadMV()
          break
      }
      this.loading = false
    },
    scroll () {
      let elem = this.$refs['scrollView']
      if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
        switch (this.type) {
          case 'music':
            this.music.length > 0 && this.loadMusic()
            break
          case 'album':
            this.album.length > 0 && this.loadAlbum()
            break
          case 'mv':
            this.mv.length > 0 && this.loadMV()
            break
        }
      }
    },
    loadMusic () {
      this.$refs['scrollView'] && this.$refs['scrollView'].removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_ARTIST_MUSIC, {
        singermid: this.artistId,
        begin: (this.page++ - 1) * 20,
        from: 'h5',
        callbackName: 'get_artist_music'
      }).then(data => {
        let arr = (data.data.list && data.data.list.map(item => {
          return {
            id: item.musicData.songid,
            mid: item.musicData.songmid,
            title: item.musicData.songname,
            singer: item.musicData.singer,
            album: {
              mid: item.musicData.albummid,
              title: item.musicData.albumname
            },
            mv: {
              vid: item.musicData.vid
            }
          }
        })) || []
        this.music = [...this.music, ...arr]
        !this.artistName && (this.artistName = data.data.singer_name)
        !this.artistDesc && (this.artistDesc = data.data.SingerDesc)
        this.$nextTick(() => {
          arr.length > 0 && this.$refs['scrollView'].addEventListener('scroll', this.scroll)
        })
      })
    },
    loadAlbum () {
      this.$refs['scrollView'].removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_ARTIST_ALBUM, {
        singermid: this.artistId,
        begin: (this.page++ - 1) * 20,
        callbackName: 'get_artist_album'
      }).then(data => {
        let arr = (data.data.list && data.data.list.map(item => {
          return {
            id: item.albumMID,
            title: item.albumName,
            artist: item.singers.map(item => item.singer_name).join('、'),
            pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.albumMID + '.jpg'
          }
        })) || []
        this.album = [...this.album, ...arr]
        arr.length > 0 && this.$refs['scrollView'].addEventListener('scroll', this.scroll)
      })
    },
    loadMV () {
      this.$refs['scrollView'].removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_ARTIST_MV, {
        singermid: this.artistId,
        begin: (this.page++ - 1) * 20,
        callbackName: 'get_artist_mv'
      }).then(data => {
        let arr = (data.data.list && data.data.list.map(item => {
          return {
            id: item.vid,
            title: item.title,
            artist: item.singer_name,
            pic: item.pic
          }
        })) || []
        this.mv = [...this.mv, ...arr]
        arr.length > 0 && this.$refs['scrollView'].addEventListener('scroll', this.scroll)
      })
    }
  },
  watch: {
    '$route' () {
      this.page = 1
      this.type = 'music'
      this.music = []
      this.artistName = ''
      this.artistDesc = ''
      this.$refs['scrollView'].scrollTop = 0
      this.loadMusic()
    }
  },
  async mounted () {
    await this.loadMusic()
    let total = 4.2 * parseFloat(document.documentElement.style.fontSize)
    let elem = this.$refs['scrollView']
    elem.addEventListener('scroll', () => {
      let top = elem.scrollTop
      if (top <= total) {
        this.$refs['title'].style.opacity = (top / total).toFixed(1)
        this.$refs['header'].style.background = 'rgba(0,0,0,' + (1 / 2 * top / total).toFixed(1) + ')'
        this.tabFixed = false
      } else {
        this.$refs['title'].style.opacity = 1
        this.$refs['header'].style.background = 'rgba(0,0,0,0.5)'
        this.tabFixed = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
    top: .8rem;
    z-index: 1;
  }
  #artist-detail {
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
    height: 5rem;
    position: fixed;
    top: 0;
    z-index: -1;
    overflow: hidden;
    color: #fff;
    background-size: cover;
    background-position: center;
  }
  .desc {
    padding: .2rem;
    line-height: 1.8em;
    background: #fff;
    word-wrap: break-word;
    text-align: justify;
  }
</style>
