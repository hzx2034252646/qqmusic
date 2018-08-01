<template>
  <div id="newMV">
    <app-bar title="最新MV" />
    <Nav :data="nav" class="nav" />
    <div class="divider"></div>
    <mv :data="mv" v-if="mv.length > 0" />
    <loading v-show="mv.length == 0" />
  </div>
</template>

<script>
import API from '@/api'
import appBar from '@/components/appBar'
import Nav from '@/components/nav'
import mv from '@/components/mv/list'
import loading from '@/components/loading'

export default {
  components: {
    appBar,
    Nav,
    mv,
    loading
  },
  data () {
    return {
      nav: [
        { name: '推荐', path: '/newMV?type=all' },
        { name: '内地', path: '/newMV?type=neidi' },
        { name: '港台', path: '/newMV?type=gangtai' },
        { name: '欧美', path: '/newMV?type=oumei' },
        { name: '韩国', path: '/newMV?type=korea' },
        { name: '日本', path: '/newMV?type=janpan' }
      ],
      mv: []
    }
  },
  methods: {
    loadData () {
      this.mv = []
      this.$jsonp(API.GET_NEW_MV, {
        lan: this.$route.query.type,
        callbackName: 'get_new_mv'
      }).then(data => {
        this.mv = data.data.mvlist.map(item => {
          return {
            id: item.vid,
            title: item.mvtitle,
            pic: item.picurl,
            artist: item.singers.map(item => item.name).join('、')
          }
        })
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
