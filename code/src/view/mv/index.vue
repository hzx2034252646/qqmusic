<template>
  <div id="mv">
    <div v-if="tag.area">
      <category :data="tag.area" :active="area" :setActive="setArea"/>
      <category :data="tag.tag" :active="type" :setActive="setType"/>
      <category :data="tag.year" :active="year" :setActive="setYear"/>
    </div>
    <mv :data="mv" />
    <loading v-show="loading" />
  </div>
</template>

<script>
import API from '@/api'
import mv from '@/components/mv/list'
import loading from '@/components/loading'
import category from '@/components/category'

export default {
  components: {
    mv,
    loading,
    category
  },
  data () {
    return {
      mv: [],
      tag: {},
      area: 0,
      type: 0,
      year: 0,
      page: -1,
      loading: false
    }
  },
  methods: {
    loadData () {
      this.page++
      document.getElementById('app').removeEventListener('scroll', this.scroll)
      return this.$jsonp(API.GET_MV, {
        year: this.year,
        area: this.area,
        tag: this.type,
        pageno: this.page,
        callbackName: 'getMvlist'
      }).then(data => {
        let arr = data.data.mvlist.map(item => {
          return {
            id: item.vid,
            title: item.mvtitle,
            pic: item.picurl,
            artist: item.singers.map(item => item.name).join('、')
          }
        })
        this.mv = [...this.mv, ...arr]
        !this.tag.area && (this.tag = data.data.taglist)
        arr.length > 0 && document.getElementById('app').addEventListener('scroll', this.scroll)
      })
    },
    scroll () {
      let elem = document.getElementById('app')
      if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
        this.mv.length > 0 && this.loadData()
      }
    },
    async setArea (id) {
      this.area = id
      this.page = -1
      this.mv = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setType (id) {
      this.type = id
      this.page = -1
      this.mv = []
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async setYear (id) {
      this.year = id
      this.page = -1
      this.mv = []
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
