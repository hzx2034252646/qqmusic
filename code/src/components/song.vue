<template>
  <div class="song-list">
    <div class="song-list-item"
    v-for="(item,index) in data" :key="index" @click="PLAY_MUSIC(item)">
      <div class="cover">
        <span v-if="num">{{ index + 1 }}</span>
        <img v-lazy="pic(item.album.mid)" alt="" v-else>
      </div>
      <div class="content">
        <p class="title">{{ item.title }}</p>
        <p class="singer">{{ item.singer | singer_filter }} - {{ item.album.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['data', 'num'],
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  filters: {
    singer_filter (value) {
      return value.map(item => item.title || item.name).join('、')
    }
  },
  methods: {
    ...mapActions(['PLAY_MUSIC']),
    pic (value) {
      return 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + value + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
  .song-list {
    position: relative;
    overflow: hidden;
    background: #fff;
    &::before {
      content: '';
      width: 100%;
      height: 1px;
      background: #ddd;
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .song-list-item {
    display: flex;
    padding: .2rem;
    border-bottom: 1px solid #ddd;
    .cover {
      width: 1rem;
      height: 1rem;
      padding-right: .2rem;
      line-height: 1rem;
      text-align: center;
      font-size: 1.4em;
      color: #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      width: 5.5rem;
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: .1rem;
        &.title {
          font-size: 1.1em;
        }
        &.singer {
          color: #999;
        }
      }
    }
  }
</style>
