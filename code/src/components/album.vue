<template>
  <div class="album-list">
    <div class="album-list-item" v-for="(item,index) in data" :key="index" @click="$router.push('/album/'+item.id)">
      <div class="cover">
        <img v-lazy="item.pic" alt="">
      </div>
      <p class="title">{{ item.title }}</p>
      <p class="singer">{{ item.artist }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
  .album-list {
    overflow: hidden;
    background: #fff;
    .album-list-item {
      width: 3.45rem;
      margin-bottom: .3rem;
      margin-left: .2rem;
      float: left;
      .cover {
        width: 3.45rem;
        height: 3.45rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: .9em;
        line-height: 1.6em;
        &.singer {
          color: #999;
        }
      }
    }
  }
</style>
