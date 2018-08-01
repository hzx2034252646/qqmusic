<template>
  <div id="mv">
    <div v-if="!loading">
        <mv-video :data="mv_info" />
        <mv-detail :data="mv_info" />
        <p class="title" v-if="singer_mv.length > 0">同艺人的其他MV</p>
        <mv :data="singer_mv" />
        <p class="title" v-if="simi_mv.length > 0">相关MV</p>
        <mv :data="simi_mv" />
        <comment :data="comment_hot" :title="'最热评论 '+ comment_hot_count" style="padding-top: 1rem;">
          <router-link :to="/comment/ + vid + '?type=mv'">更多</router-link>
        </comment>
        <comment :data="comment_new" :title="'最新评论 '+ comment_new_count" style="padding-top: 1rem;">
          <router-link :to="/comment/ + vid + '?type=mv'">更多</router-link>
        </comment>
    </div>
    <loading v-if="loading" />
  </div>
</template>

<script>
import API from '@/api'
import mvVideo from '@/components/mv/video'
import mvDetail from '@/components/mv/detail'
import mv from '@/components/mv/list'
import loading from '@/components/loading'
import comment from '@/components/comment'

export default {
  components: {
    loading,
    mvVideo,
    mvDetail,
    mv,
    comment
  },
  data () {
    return {
      mv_info: {},
      comment_hot: [],
      comment_new: [],
      comment_hot_count: 0,
      comment_new_count: 0,
      loading: true
    }
  },
  computed: {
    simi_mv () {
      return this.mv_info.simmvlist.list.slice(0, 8).map(item => {
        return {
          id: item.vid,
          title: item.name,
          pic: item.picurl,
          artist: item.singers.map(item => item.name).join('、')
        }
      })
    },
    singer_mv () {
      return this.mv_info.singermvlist.list.slice(0, 8).map(item => {
        return {
          id: item.vid,
          title: item.name,
          pic: item.picurl,
          artist: item.singers.map(item => item.name).join('、')
        }
      })
    },
    vid () {
      return this.$route.params.id
    }
  },
  methods: {
    async loadData () {
      let file_id
      this.loading = true
      let { getMvInfo: { data: { mvlist } } } = await this.$jsonp(API.GET_MUSIC, {
        data: JSON.stringify({
          getMvInfo: {
            module: 'MvService.MvInfoProServer',
            method: 'GetMvInfoList',
            param: {
              'vidlist': [this.vid]
            }
          }
        })
      })
      file_id = mvlist[0].fileid
      let { data } = await this.$jsonp(API.GET_MV_INFO, {
        vid: this.vid
      })
      this.mv_info = data
      let { getMvUrl: { data: { data: mvUrl } } } = await this.$jsonp(API.GET_MUSIC, {
        data: JSON.stringify({
          getMvUrl: {
            module: 'Mv.MvDownloadUrlServer',
            method: 'GetMvUrls',
            param: {
              fileid: [file_id],
              filetype: [-1]
            }
          }
        })
      })
      this.mv_info = Object.assign(this.mv_info, {
        mv_url: mvUrl[file_id],
        cover: mvlist[0].cover_pic
      })
      this.loading = false
      let { comment, hot_comment } = await this.$jsonp(API.GET_COMMENT, {
        pagenum: 0,
        cmd: 8,
        topid: this.vid,
        biztype: 5
      })
      this.comment_new = comment.commentlist
      this.comment_hot = hot_comment.commentlist
      this.comment_new_count = comment.commenttotal
      this.comment_hot_count = hot_comment.commenttotal
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
  .title {
    font-size: 1.1em;
    text-align: center;
    margin: .3rem 0;
  }
</style>
