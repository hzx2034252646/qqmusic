<template>
  <div id="search">
    <header>
      <span class="back" @click="$router.push('/')"></span>
      <input type="text" class="search-input" placeholder="搜索歌曲、歌手、专辑"
      @keyup.enter="search(s)" v-model.trim="s" ref="search" />
      <span class="cancel" v-show="s" @click="cancel">&times;</span>
    </header>
    <div v-if="visible">
      <div class="search-hot">
        <p>热门搜索</p>
        <span class="search-hot-item" :class="{'active': index == 0}"
        v-for="(item,index) in search_hot" :key="index" @click="search(item.k)">
          {{ item.k }}
        </span>
      </div>
      <div class="search-history" v-if="search_history.length > 0">
        <p>
          <span>搜索历史</span>
          <span class="clearHistory" @click="clearHistory">清空历史</span>
        </p>
        <div class="search-history-list">
          <div class="search-history-item"
          v-for="(item,index) in search_history" :key="index" @click="search(item)">
            <p>{{ item }}</p>
            <span class="clear" @click.stop="clear(index)">&times;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="search-content" v-else>
      <Nav :data="nav" class="nav"/>
      <div class="divider"></div>
      <song :data="song" v-if="song.length > 0" />
      <artist :data="artist" v-if="artist.length > 0" />
      <album :data="album" v-if="album.length > 0" />
      <mv :data="mv" v-if="mv.length > 0" />
      <loading v-show="loading" />
    </div>
  </div>
</template>

<script>
import API from '@/api'
import song from '@/components/song'
import artist from '@/components/artist'
import album from '@/components/album'
import mv from '@/components/mv/list'
import Nav from '@/components/nav'
import loading from '@/components/loading'

export default {
  components: {
    song,
    artist,
    album,
    mv,
    Nav,
    loading
  },
  data () {
    return {
      visible: true,
      loading: false,
      search_hot: [],
      search_history: [],
      type: 0,
      keyword: '',
      s: '',
      page: 1,
      song: [],
      artist: [],
      album: [],
      mv: []
    }
  },
  computed: {
    nav () {
      return [
        { name: '单曲', path: '/search?type=song&s=' + this.keyword },
        { name: '歌手', path: '/search?type=singer&s=' + this.keyword },
        { name: '专辑', path: '/search?type=album&s=' + this.keyword },
        { name: 'MV', path: '/search?type=mv&s=' + this.keyword }
      ]
    }
  },
  methods: {
    cancel () {
      this.s = ''
      this.visible = true
      this.$refs['search'].blur()
      this.$router.push('/search')
    },
    clearHistory () {
      localStorage.removeItem('search')
      this.search_history = []
    },
    clear (index) {
      this.search_history.splice(index, 1)
      localStorage.setItem('search', JSON.stringify(this.search_history))
    },
    scroll () {
      let elem = document.getElementById('app')
      if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
        switch (this.$route.query.type) {
          case 'song':
            this.song.length > 0 && this.searchSong()
            break
          case 'singer':
            this.artist.length > 0 && this.searchArtist()
            break
          case 'album':
            this.album.length > 0 && this.searchAlbum()
            break
          case 'mv':
            this.mv.length > 0 && this.searchMV()
            break
        }
      }
    },
    searchSong () {
      document.getElementById('app').removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_SEARCH, {
        t: this.type,
        w: this.keyword,
        p: this.page++,
        callbackName: 'get_search'
      }).then(data => {
        let arr = data.data.song.list
        this.song = [...this.song, ...arr]
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    searchArtist () {
      document.getElementById('app').removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_SEARCH, {
        t: this.type,
        w: this.keyword,
        p: this.page++,
        callbackName: 'get_search'
      }).then(data => {
        let arr = data.data.singer.list.map(item => {
          return {
            id: item.singerMID,
            title: item.singerName,
            pic: item.singerPic
          }
        })
        this.artist = [...this.artist, ...arr]
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    searchAlbum () {
      document.getElementById('app').removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_SEARCH, {
        t: this.type,
        w: this.keyword,
        p: this.page++,
        callbackName: 'get_search'
      }).then(data => {
        let arr = data.data.album.list.map(item => {
          return {
            id: item.albumMID,
            title: item.albumName,
            artist: item.singer_list.map(item => item.name).join('、'),
            pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.albumMID + '.jpg'
          }
        })
        this.album = [...this.album, ...arr]
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    searchMV () {
      document.getElementById('app').removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_SEARCH, {
        t: this.type,
        w: this.keyword,
        p: this.page++,
        callbackName: 'get_search'
      }).then(data => {
        let arr = data.data.mv.list.map(item => {
          return {
            id: item.v_id,
            title: item.mv_name,
            artist: item.singer_list.map(item => item.name).join('、'),
            pic: item.mv_pic_url
          }
        })
        this.mv = [...this.mv, ...arr]
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    search (s) {
      if (!s) {
        return
      }
      this.$refs['search'].blur()
      this.$router.push({ path: '/search', query: { type: 'song', s } })
      let arr = JSON.parse(localStorage.getItem('search')) || []
      let index = arr.findIndex(item => item === s)
      index > -1 && arr.splice(index, 1)
      arr.unshift(s)
      localStorage.setItem('search', JSON.stringify(arr))
    },
    async loadData () {
      this.page = 1
      this.visible = !this.$route.query.type
      this.loading = true
      this.s = this.$route.query.s
      this.keyword = this.s
      this.song = []
      this.artist = []
      this.album = []
      this.mv = []
      this.search_history = JSON.parse(localStorage.getItem('search')) || []
      switch (this.$route.query.type) {
        case 'song':
          this.type = 0
          await this.searchSong()
          this.loading = false
          break
        case 'singer':
          this.type = 9
          await this.searchArtist()
          this.loading = false
          break
        case 'album':
          this.type = 8
          await this.searchAlbum()
          this.loading = false
          break
        case 'mv':
          this.type = 12
          await this.searchMV()
          this.loading = false
          break
      }
    }
  },
  watch: {
    '$route': 'loadData'
  },
  mounted () {
    this.$jsonp(API.GET_SEARCH_HOT, {
      callbackName: 'get_search_hot'
    }).then(data => {
      this.search_hot = data.data.hotkey.slice(0, 8)
    })
    this.loadData()
    this.search_history = JSON.parse(localStorage.getItem('search')) || []
  }
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: .88rem;
    background: #31c27c;
    position: fixed;
    top: 0;
    z-index: 99;
    .back {
      width: .5rem;
      height: .5rem;
      display: block;
      background-image: url('../assets/img/back.svg');
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      left: .2rem;
      top: .19rem;
    }
    .search-input {
      color: #fff;
      font-size: 1.2em;
      width: 5.5rem;
      height: 100%;
      margin-left: 1rem;
      background: none;
      outline: none;
      border: none;
      &::-webkit-input-placeholder {
        color: #eee;
      }
    }
    .cancel {
      font-size: 2.2em;
      padding: 0 .2rem;
      color: #fff;
      position: absolute;
      right: 0;
      top: .1rem;
      line-height: 1em;
    }
  }
  .search-hot {
    margin-top: 1.5rem;
    padding: 0 .3rem;
    p {
      margin-bottom: .2rem;
      color: #999;
      font-size: 1.1em;
    }
    .search-hot-item {
      display: inline-block;
      padding: .1rem .2rem;
      border-radius: 99px;
      border: 1px solid rgb(112, 78, 78);
      margin-right: .1rem;
      margin-top: .2rem;
      &.active {
        color: #31c27c;
        border-color: #31c27c;
      }
    }
  }
  .search-history {
    padding: 0 .3rem;
    margin-top: .5rem;
    > p {
      padding: .2rem 0;
      margin-bottom: .2rem;
      color: #999;
      font-size: 1.1em;
      .clearHistory {
        color: #31c27c;
        float: right;
      }
    }
    .search-history-list {
      margin-bottom: .2rem;
      &:before {
        content: '';
        width: 100%;
        height: 1px;
        background: #ddd;
        display: block;
      }
      .search-history-item {
        width: 100%;
        padding: .3rem 0;
        border-bottom: 1px solid #ddd;
        font-size: 1.1em;
        overflow: hidden;
        line-height: 1.5em;
        p {
          width: 6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
        }
        .clear {
          float: right;
          font-size: 1.5em;
          color: #999;
          padding: 0 .2rem;
        }
      }
    }
  }
  .nav {
    position: fixed;
    top: .88rem;
    z-index: 99;
  }
  .divider {
    margin-top: 1.68rem;
  }
</style>
