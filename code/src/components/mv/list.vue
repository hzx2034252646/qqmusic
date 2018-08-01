<template>
  <div class="mv-list">
    <div class="mv-list-item" v-for="(item,index) in data" :key="index" @click="$router.push('/mv/' + item.id)">
      <div class="cover">
        <img v-lazy="{src: item.pic, error: require('../../assets/img/mv.png'), loading: require('../../assets/img/mv.png')}" alt="">
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
  .mv-list {
    overflow: hidden;
    background: #fff;
    .mv-list-item {
      width: 3.6rem;
      margin-bottom: .3rem;
      margin-left: .1rem;
      float: left;
      .cover {
        width: 100%;
        height: 2.03rem;
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
