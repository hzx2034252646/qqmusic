<template>
  <div id="newSong">
    <app-bar title="新歌首发"/>
    <Nav :data="nav" class="nav" />
    <div class="divider"></div>
    <song :data="song" v-if="song.length > 0" />
    <loading v-show="song.length == 0" />
  </div>
</template>

<script>
import API from '@/api'
import appBar from '@/components/appBar'
import Nav from '@/components/nav'
import song from '@/components/song'
import loading from '@/components/loading'

export default {
  components: {
    appBar,
    Nav,
    song,
    loading
  },
  data () {
    return {
      nav: [],
      song: []
    }
  },
  computed: {
    params () {
      return {
        comm: {
          ct: 24
        },
        new_song: {
          module: 'QQMusic.MusichallServer',
          method: 'GetNewSong',
          param: {
            type: Number(this.$route.query.id)
          }
        }
      }
    }
  },
  methods: {
    loadData () {
      this.song = []
      this.$jsonp(API.GET_MUSIC, {
        data: JSON.stringify(this.params)
      }).then(data => {
        this.nav = data.new_song.data.type_info.map(item => {
          return {
            name: item.title,
            path: '/newSong?id=' + item.id
          }
        })
        this.song = data.new_song.data.song_list
      })
    }
  },
  watch: {
    '$route': 'loadData'
  },
  mounted () {
    this.loadData()
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
