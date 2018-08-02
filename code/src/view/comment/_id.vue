<template>
  <div id="comment">
    <app-bar :title="'评论 ' + comment_new_count" :back="true"/>
    <div v-if="comment_new.length > 0">
      <comment :data="comment_hot" :title="'最热评论 ' + comment_hot_count" />
      <p class="loadMore" @click="load_hot_comment" v-show="loadMore_hot">查看更多</p>
      <p class="loading" v-show="loading_hot" ref="tip_hot">正在加载...</p>
      <comment :data="comment_new" :title="'最新评论 ' + comment_new_count" />
      <p class="loadMore" @click="load_new_comment" v-show="loadMore_new">查看更多</p>
      <p class="loading" v-show="loading_new" ref="tip_new">正在加载...</p>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import API from '@/api'
import loading from '@/components/loading'
import appBar from '@/components/appBar'
import comment from '@/components/comment'

export default {
  components: {
    appBar,
    loading,
    comment
  },
  data () {
    return {
      loading_hot: false,
      loading_new: false,
      loadMore_hot: false,
      loadMore_new: false,
      page_hot: 0,
      page_new: 0,
      comment_hot: [],
      comment_hot_count: 0,
      comment_new: [],
      comment_new_count: 0
    }
  },
  computed: {
    topId () {
      return this.$route.params.id
    },
    type () {
      switch (this.$route.query.type) {
        case 'song':
          return 1
        case 'album':
          return 2
        case 'mv':
          return 5
      }
    }
  },
  methods: {
    load_hot_comment () {
      this.loadMore_hot = false
      this.loading_hot = true
      return this.$jsonp(API.GET_COMMENT, {
        pagenum: this.page_hot++,
        biztype: this.type,
        cmd: 6,
        topid: this.topId
      }).then(data => {
        let arr = data.comment.commentlist || []
        this.comment_hot = [...this.comment_hot, ...arr]
        (this.comment_hot_count === 0) && (this.comment_hot_count = data.comment.commenttotal)
        if (this.comment_hot.length < 10) {
          this.loadMore_hot = false
          this.loading_hot = false
          return
        }
        if (!arr || arr.length < 10) {
          this.loadMore_hot = false
          this.$refs['tip_hot'].innerHTML = '没有更多数据了'
          return
        }
        this.loadMore_hot = true
        this.loading_hot = false
      })
    },
    load_new_comment () {
      this.loadMore_new = false
      this.loading_new = true
      return this.$jsonp(API.GET_COMMENT, {
        pagenum: this.page_new++,
        biztype: this.type,
        cmd: 8,
        topid: this.topId
      }).then(data => {
        let arr = data.comment.commentlist || []
        this.comment_new = [...this.comment_new, ...arr]
        (this.comment_new_count === 0) && (this.comment_new_count = data.comment.commenttotal)
        if (this.comment_new.length < 10) {
          this.loadMore_new = false
          this.loading_new = false
          return
        }
        if (!arr || arr.length < 10) {
          this.loadMore_new = false
          this.$refs['tip_new'].innerHTML = '没有更多数据了'
          return
        }
        this.loadMore_new = true
        this.loading_new = false
      })
    },
    async loadData () {
      this.loading = true
      this.comment_hot = []
      this.comment_new = []
      this.page_hot = 0
      this.page_new = 0
      this.comment_hot_count = 0
      this.comment_new_count = 0
      await this.load_hot_comment()
      await this.load_new_comment()
      this.loading = false
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
  #comment {
    padding-top: .88rem;
    .loadMore {
      text-align: center;
      margin: .2rem 0;
      color: #31c27c;
      font-size: 1.2em;
    }
    .loading {
      text-align: center;
      margin: .2rem 0;
      font-size: 1.2em;
    }
  }
</style>
