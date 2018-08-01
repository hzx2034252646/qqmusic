<template>
  <div id="recommend">
    <swiper :options="swiperOption" v-if="banner.length > 0">
      <swiper-slide v-for="(item, index) in banner" :key="index">
        <img :src="item.pic_info.url" alt="" class="banner_cover">
      </swiper-slide>
    </swiper>
    <loading v-else />
    <div class="list-wrapper" v-if="song.length > 0">
      <div class="list-title">
        新歌首发
        <router-link class="more" to="/newSong?id=1">更多</router-link>
      </div>
      <song :data="song" />
    </div>
    <div class="list-wrapper album" v-if="album.length > 0">
      <div class="list-title">
        最新专辑
        <router-link class="more" to="/album?type=new">更多</router-link>
      </div>
      <div class="list-item" v-for="(item,index) in album" :key="index" @click="$router.push('/album/'+item.album_mid)">
        <img v-lazy="album_pic(item.album_mid)" alt="">
        <p>{{ item.album_name }}</p>
        <p>{{ item.singers.map(item => item.singer_name).join('、')}}</p>
      </div>
    </div>
    <div class="list-wrapper" v-if="mv.length > 0">
      <div class="list-title">
        最新MV
        <router-link class="more" to="/newMV?type=all">更多</router-link>
      </div>
      <mv :data="mv" />
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import API from '@/api'
import song from '@/components/song'
import mv from '@/components/mv/list'
import loading from '@/components/loading'

export default {
  components: {
    swiper,
    swiperSlide,
    song,
    mv,
    loading
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        }
      },
      banner: [],
      mv: [],
      album: [],
      song: []
    }
  },
  methods: {
    album_pic (value) {
      return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + value + '.jpg'
    }
  },
  async mounted () {
    await this.$jsonp(API.GET_RECOMMEND).then(data => {
      this.banner = data.focus.data.content
      this.album = data.new_album.data.list.slice(0, 6)
      this.song = data.new_song.data.song_list.slice(0, 6)
    })
    await this.$jsonp(API.GET_NEW_MV, {
      lan: 'all',
      callbackName: 'get_new_mv'
    }).then(data => {
      this.mv = data.data.mvlist.map(item => {
        return {
          id: item.vid,
          title: item.mvtitle,
          pic: item.picurl,
          artist: item.singers.map(item => item.name).join('、')
        }
      }).slice(0, 6)
    })
  }
}
</script>

<style lang="scss" scoped>
  .banner_cover {
    width: 7.5rem;
    height: 3rem;
    vertical-align: middle;
  }
  .list-wrapper {
    overflow: hidden;
    .list-title {
      margin: .3rem 0;
      padding: 0 .3rem;
      position: relative;
      font-size: 1.1em;
      .more {
        color: #31c27c;
        float: right;
      }
      &:before {
        content: '';
        width: .06rem;
        height: 100%;
        background: #31c27c;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .list-item {
      width: 2.3rem;
      display: inline-block;
      margin-left: .15rem;
      margin-bottom: .3rem;
      vertical-align: top;
      img {
        width: 100%;
      }
      p {
        font-size: .9em;
        line-height: 1.5em;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    &.album {
      p {
        -webkit-line-clamp: 1;
      }
    }
  }
</style>
