<template>
  <div id="newAlbum">
    <app-bar title="专辑" />
    <Nav :data="nav" class="nav" />
    <div class="divider"></div>
    <div v-if="tag.area">
      <category :data="tag.area" :active="area" :setActive="setArea"/>
      <category :data="tag.genre" :active="genre" :setActive="setGenre"/>
      <category :data="tag.type" :active="type" :setActive="setType"/>
      <category :data="tag.year" :active="year" :setActive="setYear"/>
      <category :data="tag.company" :active="company" :setActive="setCompany"/>
    </div>
    <album :data="album" />
    <loading v-show="loading" style="top: 60%" />
  </div>
</template>

<script>
import API from '@/api'
import appBar from '@/components/appBar'
import Nav from '@/components/nav'
import album from '@/components/album'
import loading from '@/components/loading'
import category from '@/components/category'

export default {
  components: {
    appBar,
    Nav,
    album,
    loading,
    category
  },
  data () {
    return {
      nav: [
        { name: '最新', path: '/album?type=new' },
        { name: '最热', path: '/album?type=hot' }
      ],
      album: [],
      tag: {},
      area: 1,
      genre: -1,
      type: -1,
      year: -1,
      company: -1,
      page: 0,
      loading: false
    }
  },
  computed: {
    sort () {
      return this.$route.query.type === 'new' ? 2 : 5
    },
    params () {
      return {
        albumlib: {
          method: 'get_album_by_tags',
          param: {
            area: this.area,
            company: this.company,
            genre: this.genre,
            type: this.type,
            year: this.year,
            sort: this.sort,
            get_tags: 1,
            sin: (this.page - 1) * 20,
            num: 19,
            click_albumid: 0
          },
          module: 'music.web_album_library'
        }
      }
    }
  },
  methods: {
    loadData () {
      this.page++
      document.getElementById('app').removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_MUSIC, {
        data: JSON.stringify(this.params)
      }).then(data => {
        let arr = data.albumlib.data.list.map(item => {
          return {
            id: item.album_mid,
            title: item.album_name,
            artist: item.singers.map(item => item.singer_name).join('、'),
            pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.album_mid + '.jpg'
          }
        })
        this.album = [...this.album, ...arr]
        !this.tag.area && (this.tag = data.albumlib.data.tags)
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    scroll () {
      let elem = document.getElementById('app')
      if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
        this.album.length > 0 && this.loadData()
      }
    },
    async setArea (id) {
      this.area = id
      this.page = 0
      this.album = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setGenre (id) {
      this.genre = id
      this.page = 0
      this.album = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setType (id) {
      this.type = id
      this.page = 0
      this.album = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setYear (id) {
      this.year = id
      this.page = 0
      this.album = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setCompany (id) {
      this.company = id
      this.page = 0
      this.album = []
      this.loading = true
      await this.loadData()
      this.loading = false
    }
  },
  watch: {
    async '$route' () {
      this.page = 0
      this.album = []
      this.loading = true
      await this.loadData()
      this.loading = false
    }
  },
  async mounted () {
    this.loading = true
    await this.loadData()
    this.loading = false
  },
  destroyed () {
    document.getElementById('app').removeEventListener('scroll', this.scroll)
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    position: fixed;
    top: .88rem;
    z-index: 99;
  }
  .divider {
    margin-top: 1.68rem;
  }
</style>
