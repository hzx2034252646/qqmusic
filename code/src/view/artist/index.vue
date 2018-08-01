<template>
  <div id="artist">
    <div v-if="tag.index">
      <category :data="tag.index" :active="index" :setActive="setIndex"/>
      <category :data="tag.area" :active="area" :setActive="setArea"/>
      <category :data="tag.sex" :active="sex" :setActive="setSex"/>
      <category :data="tag.genre" :active="genre" :setActive="setGenre"/>
    </div>
    <artist :data="artist" />
    <loading v-show="loading" />
  </div>
</template>

<script>
import API from '@/api'
import artist from '@/components/artist'
import loading from '@/components/loading'
import category from '@/components/category'

export default {
  components: {
    artist,
    loading,
    category
  },
  data () {
    return {
      tag: {},
      artist: [],
      page: 0,
      index: -100,
      area: -100,
      sex: -100,
      genre: -100,
      loading: false
    }
  },
  computed: {
    params () {
      return {
        comm: {
          ct: 24,
          cv: 10000
        },
        singerList: {
          module: 'Music.SingerListServer',
          method: 'get_singer_list',
          param: {
            area: this.area,
            sex: this.sex,
            genre: this.genre,
            index: this.index,
            sin: (this.page - 1) * 80,
            cur_page: this.page
          }
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
        let arr = data.singerList.data.singerlist.map(item => {
          return {
            id: item.singer_mid,
            title: item.singer_name,
            pic: item.singer_pic
          }
        })
        this.artist = [...this.artist, ...arr]
        !this.tag.index && (this.tag = data.singerList.data.tags)
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    scroll () {
      let elem = document.getElementById('app')
      if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
        this.artist.length > 0 && this.loadData()
      }
    },
    async setIndex (id) {
      this.index = id
      this.page = 0
      this.artist = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setArea (id) {
      this.area = id
      this.page = 0
      this.artist = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setSex (id) {
      this.sex = id
      this.page = 0
      this.artist = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setGenre (id) {
      this.genre = id
      this.page = 0
      this.artist = []
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
  activated () {
    document.getElementById('app').addEventListener('scroll', this.scroll)
  },
  deactivated () {
    document.getElementById('app').removeEventListener('scroll', this.scroll)
  }
}
</script>
